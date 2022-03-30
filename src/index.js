import React, { useMemo, useState } from 'react';
import ReactDom from 'react-dom';
import './index.css'
import { Header, List, Details, NotFound, PopUp, AccountDetails } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyProfile from './components/accountDetails/MyProfile';
import MyPurchases from './components/accountDetails/MyPurchases';
import { motion } from 'framer-motion'

let currentUser = {};

const App = () => {


  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);  
  const [openPopUp, setOpenPopUp] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [signedIn, setSignedIn] = useState(currentUser.signedIn);
  const [accountDetails, setAccountDetails] = useState(false);
  const [error, setError] = useState(false);

  const createAccountCheck = async(users, user) => {
    await setError(false);

    users.forEach(us => {
      if(us.email == user.email) {
        setError(true)
      }
    })
  }

  const createAccountSubmit = async(user) => {
    const newUsers = JSON.parse(localStorage.getItem('users')) ? [...JSON.parse(localStorage.getItem('users'))] : [];
    user.id = newUsers.length+1;
    user.purchases = [];
    await createAccountCheck(newUsers, user);

    if(error) {
      return
    }

    newUsers.push(user)
    localStorage.setItem('users', JSON.stringify(newUsers))

    setOpenPopUp(false);
    setSignedIn(true);

    currentUser = user;
    }
  

  const openPopUpFunc = (type) => {

    setError(false);

    if(type == 'create') {
      setOpenPopUp(true);
      setCreateAccount(true);

      return;
    }

    setOpenPopUp(true);
  }

  const closePopUp = (e,ref) => {
    e.stopPropagation();
    
    if(ref.current.contains(e.target)) {
      return;
    }
    setOpenPopUp(false);
    setCreateAccount(false);
  }

  const submitSignInCheck = async(users, user) => {

    await setError(true);
    
    users.forEach(us => {
      if(us.email == user.email && us.password == user.password) {
        currentUser = us;
        setError(false);

        return;
      }
    })
  }

  const submitSignIn = async(user) => {
    const newUsers = JSON.parse(localStorage.getItem('users'));

    await submitSignInCheck(newUsers,user);

    if(error) {
      return;
    }

    setOpenPopUp(false);
    setSignedIn(true);
}

  const openAccountDetails = (e) => {
    e.stopPropagation();
    
    setAccountDetails(true);
  }

  const closeDetails = (e,ref) => {
    if(ref && ref.current.contains(e.target)) {
      return;
    }

    setAccountDetails(false);
  }

  const logout = () => {

    setSignedIn(false);
    setAccountDetails(false);
    setPurchases([]);
}

 const setPurchases = async(id, buy, name, count, price) => {
    const users = JSON.parse(localStorage.getItem('users'));

    const purchase = {
      id,
      type: buy ? 'buy' : 'sell',
      name,
      count,
      price: price*count,
    }

    const newUsers = users.map(user => {
      if(user.id == currentUser.id) {
        user.purchase = user.purchases ? user.purchases.push(purchase) : [purchase];
        currentUser = user;
      }
      return user;
    });


    await setUsers(newUsers);

    localStorage.setItem('users', JSON.stringify(newUsers));
}

  
      return (
      <BrowserRouter>
        <div>
          <Header openPopUp={openPopUpFunc} signedIn={signedIn} openAccountDetails={openAccountDetails}/>
          {openPopUp ? 
          <div>
            <PopUp closePopUp={closePopUp} createAccountSubmit={createAccountSubmit} createAccount={createAccount} submitSignIn={submitSignIn} error={error}/> 
          </div>
          : null
          }
          {accountDetails ? <AccountDetails closeDetails={closeDetails} logout={logout} id={currentUser.id}/> : null}
          <Routes>
            <Route path={'/'} element={<List />}/>
            <Route path={'/currency/:id'} element={(<Details signedIn={signedIn} setPurchases={setPurchases}/>)}/>
            <Route path={'/myprofile/:id'} element={<MyProfile users={users} currentUser={currentUser}/>}/>
            <Route path={'/mypurchases/:id'} element={<MyPurchases users={users} currentUser={currentUser}/>}/>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }


ReactDom.render(
   <App/>,
  document.getElementById('root')
)





