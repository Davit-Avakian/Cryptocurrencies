import { render } from '@testing-library/react';
import { func } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrencyURL } from '../../configs';
import './Details.css';
import PurchasePopUp from './PurchasePopUp';

const Details = (props) => {

    const [currency, setCurrency] = useState([]);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [buy, setBuy] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCurrency();
    }, [id])


    const fetchCurrency = () => {

        fetch(`${getCurrencyURL(id)}`)
            .then(data => data.json())
            .then(response => {
                setCurrency(response);
            })
    }

    const openPurchasePopUp = (buy) => {
        if(buy) {
            setOpenPopUp(true);
            setBuy(true);
            return;
        }
        setOpenPopUp(true);
        setBuy(false);
    }

    const closePurchasePopUp = () => {
        setOpenPopUp(false);
        setBuy(false);
    }


        const {signedIn, setPurchases} = props;

        return (
        <div className='Detail'>
            <span className='go-back' onClick={() => navigate(-1)}>Go Back</span>
            {
                currency.map(({id, name, image, current_price, market_cap, circulating_supply}) => {
                    return (
                            <div className='Detail-info' key={id}>
                                <img src={image} style={{width: '100px', height: '100px'}}></img>
                                <h2>{name}</h2>
                                <span>Price - {current_price}$</span>
                                <span>Market Cap - {market_cap}$</span>
                                <span>Circulating Supply - {circulating_supply}$</span>
                                {
                                signedIn ? <div className='Detail-Buttons'>
                                    <button className='buy' onClick={() => openPurchasePopUp(true)}>BUY</button>
                                    <button className='sell' onClick={() => openPurchasePopUp(false)}>SELL</button>
                                </div> : null
                                }
                                {openPopUp ? <PurchasePopUp id={id} buy={buy} currencyName={name} currencyPrice={current_price} closePopUp={closePurchasePopUp} setPurchases={setPurchases}/> : null}
                            </div>
                    )
                })
            }
        </div>
    )
}

export default Details;