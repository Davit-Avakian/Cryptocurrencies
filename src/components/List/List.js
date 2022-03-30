import React, { useEffect, useState } from "react";
import { API_URL } from '../../configs'
import {query} from '../core/helpers/query'
import Loading from "../common/Loading";
import Pagination from "./Pagination";
import Table from "./Table";
import './Table.css'
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'

const List = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [error, setError] = useState(null);
    const [highToLow, setHighToLow] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const totalPages = 5;

    useEffect(() => {
        const {page} = query(location.search);
        if(!page){  
            navigate({
                pathname: '/',
                search: `?page=1`,
              })
        }

        fetchCurrency(page || 1);
    },[location.search])

    
    const fetchCurrency = (page) => {

        setIsLoading(true)

        fetch(`${API_URL}&page=${page || 1}&per_page=20`)
            .then(data => {
                if (data.status === 200) {
                    return data.json()
                }
                throw Error()
            })
            .then((currencies) => {
                setIsLoading(false);
                setCurrencies(currencies);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            })
    }

    const renderChangePercent = (percent) => {
        if (percent > 0) {
          return <span className="percent-raised">{percent}% &uarr;</span>
        } else if (percent < 0) {
          return <span className="percent-fallen">{percent}% &darr;</span>
        } else {
          return <span>{percent}</span>
        }
      }

      const handleChangePagination = (direction)=>{
        let {page} = query(location.search);
        page = direction === 'next' ? +page + 1 : +page - 1
        navigate({
            pathname: '/',
            search: `?page=${page}`,
          })
    }

    const sortCurrencies = (type, name) => {

        if(!name) {
            if(highToLow && !name) {
                currencies.sort((a ,b) => {
                return a[type] - b[type];
                })
                setHighToLow(false);
            }else {
                currencies.sort((a ,b) => {
                    return b[type] - a[type];
                })
                setHighToLow(true);
            }
        }else {
            if(highToLow){
            currencies.sort((a,b) => {
                return a[type].localeCompare(b[type])
            })
            setHighToLow(false);
        }else{
            currencies.sort((a,b) => {
                return b[type].localeCompare(a[type])
            })
            setHighToLow(true);
        }
        }
    
        const sortedCurrencies = [...currencies];

        setCurrencies(sortedCurrencies);
    }

        const {page} = query(location.search);
        
        if (error) {
            return <div>Error</div>
        }
        if (isLoading) {
            return <div className="loading-container">
                <Loading />
            </div>
        }
        return (
            <motion.div
                initial={{x: '100vw'}}
                animate={{x: 0}}
                transition={{type: 'tween', duration: 1.2}}
            >
            <Table currencies={currencies} renderChangePercent={renderChangePercent} sortCurrencies={sortCurrencies}/>
            <Pagination
            page={+page || 1}
            totalPages={totalPages}
            handleChangePagination={handleChangePagination}
            />
            </motion.div>
            )
    }
export default List