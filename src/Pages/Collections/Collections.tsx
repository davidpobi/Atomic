import React,{ useEffect, useState }  from 'react';
import "./Collections.scss";
import { useMoralis,useMoralisWeb3Api } from "react-moralis";
import { getNFtsByContract_Alchemy } from '../../Services/AssetsService';
import { useSelector,useDispatch } from 'react-redux';
import { getCollection} from '../../Store/actions';
import { useParams } from 'react-router-dom';

const Collections: React.FC = () => {
 
  /** Controller */

  const [startToken, setStartToken] = useState("");
  const [currentTokenPos, setCurrentTokenPos] = useState(0);
  const [pageTokens, setPageTokens] = useState([""]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const collection: Array<any>  =  useSelector((state:any) => state.collections);
  const dispatch = useDispatch();
  const { contractId } = useParams();



  useEffect(() => {
    if(contractId && validateEthereumAddress(contractId)) {
      getNFTsByContract(contractId,startToken,true); 
      }
  },[contractId]);



  const getNFTsByContract = async (contractAddress: string, pageToken: string, setNext: boolean) => {
    if(!hasNextPage) {
      console.log('done fetching');
      return;
    }

    const result = await getNFtsByContract_Alchemy("eth",contractAddress,pageToken);
    //console.log(result);
      if(result.assets.length > 0) {
        dispatch(getCollection(result.assets));
      }

      if(!result.nextToken) {
        setHasNextPage(false);
        return;
      }

      if(setNext) {
      setStartToken(result.nextToken);
      }
   }



   const pageNext = () => {
    getNFTsByContract(contractId || "",startToken,true);
    setPageTokens(oldArray => [...oldArray, startToken]);
    setCurrentTokenPos((currentTokenPos + 1));
   }
 


   const pageBack = () => {
     const offset = pageTokens[currentTokenPos - 1];
     setCurrentTokenPos((currentTokenPos - 1));

     if(currentTokenPos == 0) {
      console.log('1st page');
      setCurrentTokenPos(0);
      return;
    }

     setStartToken(pageTokens[pageTokens.length-1]);
     const set = pageTokens;
     set.pop();
     setPageTokens(set);

     if(offset === undefined) {
      getNFTsByContract(contractId || "","",false);
     }else{
      getNFTsByContract(contractId || "",offset,false);
     }
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
          <button  onClick={() => getNFTsByContract(contractId || '',startToken,true)}  className="btn btn-md btn-primary getCollectibles">Get Collection</button> 
        </div>
 
          <div className='assets-list'>
            <ul className='list-inline'>
              {
               collection.map((asset) => {
                  return  (
                  <li className="list-inline-item center" key={asset.id.tokenId}>
                    <div className="asset-card">
                      {
                        asset.metadata.image_url ?  <img src={asset.media[0].gateway} className="preview"/> :   <img src={asset.media[0].gateway} className="preview"/>
                      }
                    <label className='name center'>{asset.metadata.name}</label>
                    </div>
        
                   </li>
                    )
                })
              }
       
            </ul>
          </div>

          <ul className='actionsList'>
              <li>
                  <button  onClick={() => pageNext()} className='actionBtn'>
                  <span className="material-icons icon center">
                      arrow_forward
                      </span> 
                  </button>
              </li>

              <li>
                  <button   onClick={() => pageBack()} className='actionBtn'>
                  <span className="material-icons icon center">
                      arrow_back
                  </span> 
                  </button>
              </li>
          </ul>
          
    </>

  )
}

export default Collections;