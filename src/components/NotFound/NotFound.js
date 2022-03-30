import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='NotFound'>
            <h2>Page Not Found</h2>
            <Link to={'/'} className='NotFound-link'>
                <h3>Go to homepage</h3>
            </Link>
        </div>
    )
}

export default NotFound;