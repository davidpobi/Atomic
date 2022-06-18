import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { isLoggedIn, isLoggedOut } from '../../actions';
import {useInitMoralis,connectWeb3Wallet,disconnectWeb3Wallet, IMoralis} from '../../Services/AuthService';
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const Moralis:IMoralis = useInitMoralis();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
      if(Moralis.isAuthenticated) {
        console.log('signed in');
        
        dispatch(isLoggedIn());
      //  navigate('/assets');
      }else{
        console.log('signed out');

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