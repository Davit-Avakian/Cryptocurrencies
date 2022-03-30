import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../configs';
import Loading from "../common/Loading";
import './Search.css'



function Search() {

    const [currencies, setCurrencies] = useState([]);
    const [currenciesFound, setCurrenciesFound] = useState([]);
    const [currencyInput, setCurrencyInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

        (async () => {
            const data = await fetch(API_URL, {
                method: "GET",
                headers: { "Content-type": "application/json" },
                body: null,
        });
            const response = await data.json();
            setCurrencies(response);
        })();
    },[]);

    function getResult(e) {
        const searchQuery = e.target.value;
        setCurrencyInput(searchQuery);

        if(!searchQuery) {
            setCurrenciesFound([]);
            return
        }

        const inputChars = e.target.value.split('');
        setIsLoading(true)


        setTimeout(() => {
            const result = currencies.filter(item =>{
                return inputChars.every(char => item.id.includes(char))
            });
            setCurrenciesFound(result);
            setIsLoading(false);
        }, 500)
        
    }

    function handleRedirect(id) {
        setCurrencyInput('');

        navigate(`/currency/${id}`);
    }
    
    function renderResult() {
        if(!currencyInput) {
            return '';
        }
        if(currenciesFound.length) {
            return (
                <div className="Search-result-container">
                {currenciesFound.map(result =>
                <div
                    key={result.id}
                    className="Search-result"
                    onClick={() => handleRedirect(result.id)}
                >
                    {result.name} ({result.symbol})
                </div>
                )}
            </div>
        )
        }
        if(!isLoading) {
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                    No results found.
                    </div>
                </div>
            )
        }
    }

  return (
    <div className='Search'>
        <input className='Search-input' value={currencyInput} placeholder='Currency Name' onChange={getResult}></input>
        <i className='Search-icon'></i>
        {isLoading && <div className='Search-loading'> <Loading width='12px' height='12px'/> </div>}
        {renderResult()}
    </div>
  )
}
export default Search;