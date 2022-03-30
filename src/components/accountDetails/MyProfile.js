import React, {} from 'react'
import { useParams } from 'react-router-dom';
import './MyProfile.css';

const MyProfile = ({ currentUser }) =>{


    return (
      <div className='MyProfile'>
          <h2>My Profile</h2>
          <span>Email - {currentUser.email}</span>
      </div>
    )
  }

export default MyProfile;