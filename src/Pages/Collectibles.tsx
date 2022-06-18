import React,{ useEffect, useState }  from 'react';
import { useMoralis,useMoralisWeb3Api } from "react-moralis";
import { getUserOwnedAssets } from '../Services/AssetsService';

const Collectibles: React.FC = () => {
  /** Controller */
  const { isAuthenticated, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [userAddress, setUserAddress] = useState("");
  const [collectibles, setCollectibles] = useState<Array<any>>([]);

  // when component mounts, runs once
  useEffect(() => {
      if(isAuthenticated) {
        console.log('get NFTS');
        console.log(user?.get("ethAddress"));
        setUserAddress(user?.get("ethAddress"));
      }  


    return () => {
     
    }
  }, []);



/** Runs anytime collectibles array is updated  */
  useEffect(() => {
    if(isAuthenticated) {
    console.log('here:' + collectibles);
    getUserAssets();
    }

  }, [collectibles]);


  const getUserAssets = async () => {
   const assets = await getUserOwnedAssets(Web3Api, "eth",userAddress);
   console.log(assets);
  }

  


  /** View */
  return (
    <> Collectibles
         <button  onClick={() => setCollectibles(["s",2,"5"])}  className="btn btn-md btn-primary login">Get Collectibles</button>
    </>

  )
}

export default Collectibles