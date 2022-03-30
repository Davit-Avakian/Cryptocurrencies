import React from "react";
import logo from './logo.png'
import './Header.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";
import { motion } from 'framer-motion'

const Header = ({openPopUp, signedIn, openAccountDetails}) =>{




    return (
        <motion.div className="Header"
            initial={{y : '-100vh'}}
            animate={{y: 0}}
            transition={{type: 'spring', duration: 1.5, stiffness: 70, damping: 8}}
        >
            <Link to={'/'}>
                <img src={logo} alt="" className="Header-logo"/>
            </Link>
            <Search />
            {
              !signedIn ?  <div>
                    <span className="Create-Account" onClick={() => openPopUp('create')}>Create Account</span>
                    <span>or</span>
                    <span className="Sign-in" onClick={openPopUp}>Sign In</span>
                </div> : 

                <div className="icon" onClick={openAccountDetails}>
                    <FontAwesomeIcon icon={faAlignJustify} />
                </div>
            }
        </motion.div>
    )
}
export default Header