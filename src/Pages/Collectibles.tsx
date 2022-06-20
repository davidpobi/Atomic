import React,{ useEffect, useState }  from 'react';
import { useMoralis,useMoralisWeb3Api } from "react-moralis";
import { getUserOwnedAssets } from '../Services/AssetsService';
import { useSelector,useDispatch } from 'react-redux';
import { getAssets } from '../Store/actions';


const Collectibles: React.FC = () => {
  /** Controller */
  const { isAuthenticated, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [userAddress, setUserAddress] = useState("");
  const collectibles: Array<any>  =  useSelector((state:any) => state.collectibles);
  const dispatch = useDispatch();


  // when component mounts, runs once
  useEffect(() => {
      if(isAuthenticated) {
        setUserAddress(user?.get("ethAddress"));

        if(collectibles.length == 0) {
          getUserAssets();
        }else{
            console.log('already fetched');
          }
      }  


    return () => {

    }
  }, []);



  const getUserAssets = async () => {
   const assets = await getUserOwnedAssets(Web3Api, "eth",userAddress);
   console.log(assets);
   dispatch(getAssets(assets));
   return assets;
  }

  

  /** View */
  return (
    <> <h1>Collectibles</h1>
         {/* <button  onClick={() => setCollectibles(["s",2,"5"])}  className="btn btn-md btn-primary getCollectibles">Get Collectibles</button> */}
    </>

  )
}

export default Collectibles