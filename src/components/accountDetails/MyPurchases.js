import React from 'react'
import './MyPurchases.css';

export default function MyPurchases({users, currentUser}) {
  

  return (
    <div className='MyPurchases'>
      <h2>My Purchases</h2>
        { currentUser.purchases &&
            currentUser.purchases.map(({type, name, count, price}, index) => {
              return (
                <div className='Purchase' key={index}>
                  <span>Type - {type}</span>
                  <span>Name - {name}</span>
                  <span>Count - {count}</span> 
                  <span>Price - {price}</span>
                </div>
              )
            })
          }
      </div>
  )
}

