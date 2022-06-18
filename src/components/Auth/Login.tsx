import React, { useEffect } from 'react';
import {useInitMoralis,connectWeb3Wallet,disconnectWeb3Wallet, IMoralis} from '../../Services/AuthService';


const Login: React.FC = () => {
  const Moralis:IMoralis = useInitMoralis();
  console.log(Moralis.isAuthenticated);

  useEffect(() => {
      if(Moralis.isAuthenticated) {
       console.log('signed in');
      }else{
        console.log('signed out');
      }

      return () => {

      }

  },[Moralis.isAuthenticated]);



  /** A function to connect to a web3 wallet */
  const connectWallet = async (walletTtype: string) => {
    console.log(walletTtype);

    if(!Moralis.isAuthenticated || !Moralis.account) {
          await connectWeb3Wallet(Moralis);
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
           <button  onClick={() => disconnectWallet()}  className="btn btn-md btn-primary login">disconnect</button>
        }
    </div>
  )
}

export default Login;