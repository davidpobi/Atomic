import React,{ useEffect, useState }  from 'react';
import "./Collections.scss";
import { useMoralis,useMoralisWeb3Api } from "react-moralis";
import { getNFtsByContract_Alchemy } from '../../Services/AssetsService';
import { useSelector,useDispatch } from 'react-redux';
import { getCollection} from '../../Store/actions';
import { useParams } from 'react-router-dom';

const Collections: React.FC = () => {
  /** Controller */
 
  const { isAuthenticated, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

 // const [userAddress, setUserAddress] = useState("");
  const [startToken, setStartToken] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const collection: Array<any>  =  useSelector((state:any) => state.collections);
  const dispatch = useDispatch();
  const { contractId } = useParams();

 
  useEffect(() => {
      if(!isAuthenticated) {return;}
      //  setUserAddress(user?.get("ethAddress"));

      
   
  }, []);



  useEffect(() => {
    if(contractId && validateEthereumAddress(contractId)) {
        getUserAssetsByContract(contractId,startToken); 
      }
  },[contractId]);





  const getUserAssetsByContract = async (contractAddress: string, startToken: string) => {
    if(!hasNextPage) {
      console.log('done fetching');
      return;
    }

    const result = await getNFtsByContract_Alchemy("eth",contractAddress,startToken);
    console.log(result.assets);
    if(result.assets.length > 0) {
      dispatch(getCollection(result.assets));
    }
    if(!result.nextToken) {
      setHasNextPage(false);
      return;
    }

    setStartToken(result.nextToken);
   }
 



   const validateEthereumAddress = (address : string) => {
    const txt_1 = address.slice(0,2);
    const txt_2 = address.slice(2,address.length);
    if(txt_1 !== '0x') {
      return false;
    }
     
    if(txt_1 === '0x' && txt_2.length > 5) {
      return true;
     }
      
   }



  /** View */
  return (
 
    <> 
        <div className='page-header'>
          <h1 className='heading'>Collections</h1>
          <button  onClick={() => getUserAssetsByContract(contractId || '',startToken)}  className="btn btn-md btn-primary getCollectibles">Get Collection</button> 
        </div>
 
          <div className='assets-list'>
            <ul className='list-inline'>
              {
               collection.map((asset) => {
                  return  (
                  <li className="list-inline-item center" key={asset.id.tokenId}>
                    <div className="asset-card">
                      {
                        asset.metadata.image_url ?  <img src={asset.metadata.image_url} className="preview"/> :   <img src={asset.media[0].gateway} className="preview"/>
                      }
                    <label className='name center'>{asset.metadata.name}</label>
                    </div>
        
                   </li>
                    )
                })
              }
       
            </ul>
          </div>
    </>

  )
}

export default Collections;