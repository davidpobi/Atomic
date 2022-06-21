import React,{ useEffect, useState }  from 'react';
import { useMoralis,useMoralisWeb3Api } from "react-moralis";
import { getNFtsByContract_Alchemy, getUserOwnedAssets } from '../Services/AssetsService';
import { useSelector,useDispatch } from 'react-redux';
import { getAssets } from '../Store/actions';


const Collectibles: React.FC = () => {
  /** Controller */
  const { isAuthenticated, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [userAddress, setUserAddress] = useState("");
  const [startToken, setStartToken] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const collectibles: Array<any>  =  useSelector((state:any) => state.collectibles);

  const contractAddress: string = "0x2765b02b022b1e3cc84afef86d7a21c14b79cec4"; // 0x61fce80d72363b731425c3a2a46a1a5fed9814b2
  const dispatch = useDispatch();


  useEffect(() => {
      if(!isAuthenticated) {return;}
        setUserAddress(user?.get("ethAddress"));

      if(collectibles.length > 0) {return;}
        getUserAssets();       
  }, []);




  const getUserAssets = async () => {
   const assets = await getUserOwnedAssets(Web3Api, "eth",userAddress);
   console.log(assets);
   dispatch(getAssets(assets));
   return assets;
  }




  const getUserAssetsByContract = async (contractAddress: string, startToken: string) => {
    if(!hasNextPage) {
      console.log('done fetching');
      return;
    }

    const result = await getNFtsByContract_Alchemy("eth",contractAddress,startToken);
    console.log(result.assets);
    if(!result.nextToken) {
      setHasNextPage(false);
      return;
    }

    setStartToken(result.nextToken);
   }
 
  

  /** View */
  return (
    <> <h1>Collectibles</h1>
          <button  onClick={() => getUserAssetsByContract(contractAddress,startToken)}  className="btn btn-md btn-primary getCollectibles">Get Collection</button> 
    </>

  )
}

export default Collectibles