import React, { useEffect, useRef, useState } from 'react'
import './PurchasePopUp.css';

export default function PurchasePopUp({id, buy, currencyName, currencyPrice, closePopUp, setPurchases}) {
    const [inputValue, setInput] = useState('');
    const ref = useRef(null);

    function closePopUpWrapper(e) {
        if(!ref.current || ref.current.contains(e.target)) {
            return;
        }
        closePopUp();
    }

    useEffect(() => {
        document.addEventListener('click', closePopUpWrapper);

        return () => {
            document.removeEventListener('click', closePopUpWrapper);
        }
    },[]);

  return (
    <div className='PurchasePopUp' ref={ref}>
        <h2>{buy ? 'Buy ' : 'Sell '}{currencyName}</h2>
        <div>
          <input value={inputValue} type='number' placeholder='quantity' onChange={(e) => setInput(e.target.value)}></input>
          <span>
              = {inputValue ? `${inputValue * currencyPrice}$` : 0}
          </span>
        </div>
        <button disabled={!+inputValue} onClick={() =>{ setPurchases(id,buy,currencyName, inputValue, currencyPrice)
        closePopUp()}}>Confirm</button>
    </div>
  )
}
