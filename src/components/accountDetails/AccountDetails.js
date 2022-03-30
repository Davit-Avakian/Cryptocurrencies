import React, { useEffect, useRef } from 'react'
import './AccountDetails.css';
import { Link } from 'react-router-dom';

const AccountDetails = (props) => {

    const ref = useRef();

    const closeDetailsWrapper = (e) => {
        const {closeDetails} = props;

        closeDetails(e,ref)
    }

    useEffect(() => {
      document.addEventListener('click', closeDetailsWrapper);

      return () => {
        document.removeEventListener('click', closeDetailsWrapper);
      }
    }, [])


      const {logout,id} = props;

    return (
      <div ref={ref} className='Account-Details'>
          <Link to={`/myprofile/${id}`} className='link'>
            <span>My Profile</span>
        </Link>
        <Link to={`/mypurchases/${id}`} className='link'>
          <span>My Purchases</span>
        </Link>

        <Link to={'/'} className='link'>
            <span onClick={logout}>Logout</span>
        </Link>
      </div>
    )
  }

export default AccountDetails;