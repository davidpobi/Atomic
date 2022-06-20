import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isLoggedIn, isLoggedOut } from '../../Store/actions';
import {useInitMoralis,connectWeb3Wallet,disconnectWeb3Wallet} from '../../Services/AuthService';
import { useNavigate } from "react-router-dom";
import { IMoralis } from '../../Models/interfaces';

const Login: React.FC = () => {
  const Moralis:IMoralis = useInitMoralis();
  const dispatch = useDispatch();
  let navigate = useNavigate();



  useEffect(() => {
      if(Moralis.isAuthenticated) {
        dispatch(isLoggedIn());
      //  navigate('/assets');
      }else{
        dispatch(isLoggedOut());
        navigate('/');
      } 

  },[Moralis.isAuthenticated]);



  /** A function to connect to a web3 wallet */
  const connectWallet = async (walletTtype: string) => {
    if(!Moralis.isAuthenticated || !Moralis.account) {
        if(walletTtype === 'metamask'){
          await connectWeb3Wallet(Moralis);
        }
    }
  }



  /** A function to disconnect from a web3 wallet */
  const disconnectWallet = async () => {
      await disconnectWeb3Wallet(Moralis);
  }


  return (
      <div>
       {
           !Moralis.isAuthenticated ? <button  onClick={() => connectWallet('metamask')}  className="btn btn-md btn-primary login">Connect</button> : 
           <button  onClick={() => disconnectWallet()}  className="btn btn-md btn-primary login">Disconnect</button>
        }
    </div>
  )
}

export default Login;