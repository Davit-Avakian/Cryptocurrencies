import React, { useEffect, useRef, useState } from 'react';
import './PopUp.css'
import { motion } from 'framer-motion';

const PopUp = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const ref = useRef();

    const closePopUpWrapper = (e) => {
        const {closePopUp} = props;

        closePopUp(e, ref)
    }

    const getInputValue = (e, type) => {
        type == "email" ? setEmail(e.target.value) : setPassword(e.target.value);
    }

    const clearState = () => {
        setEmail('');
        setPassword('');
    }


    useEffect(() => {
        document.addEventListener('click', closePopUpWrapper);

        return () => {
            document.removeEventListener('click', closePopUpWrapper);
        }
    }, [])

        const {createAccountSubmit, createAccount, submitSignIn, error} = props;

        return (
            
            <motion.div ref={ref} className='PopUp'
                initial={{y: '-100vh', x: -100}}
                animate={{y : -100, x: -100}}
                transition={{type: 'tween', duration: 1,}}
            >
                    <h2>{createAccount ? 'Create Account' : 'Sign In'}</h2>
                    <div className='PopUp-inputs'>
                        <input value={email} type='text' placeholder='email' onChange={(e) => getInputValue(e,'email')}></input>
                        <input value={password} type='text' placeholder='password' onChange={(e) => getInputValue(e,'password')}></input>
                        {error ? <span className='error'>{createAccount ? 'Email already exists' : 'Invalid Email or Password'}</span> : null}
                        <button disabled={!(email && password)} onClick={() => {
                            if(createAccount) {
                                createAccountSubmit({email, password});
                            }else {
                                submitSignIn({email, password});
                            }
                            clearState();
                        }}>{createAccount ? 'Create' : 'Sign In'}</button>
                    </div>
            </motion.div>
        )
    }
export default PopUp;