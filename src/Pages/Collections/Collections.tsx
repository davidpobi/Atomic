import React,{ useEffect, useState }  from 'react';
import "./Collections.scss";
import { getContractMetadata, getNFtsByContract_Alchemy, presentToast } from '../../Services/AssetsService';
import { useSelector,useDispatch } from 'react-redux';
import { getCollection} from '../../Store/actions';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Collections: React.FC = () => {
 
  /** Contract Metadata */
  const [contractData, setContractData] = useState({name:"",symbol:"",tokenType:"",totalSupply: 0});
  const [isContractReady,setIsContractReady] = useState<boolean>(true);
  const [isShowTokenType,setIsShowTokenType] = useState(false);


  const [startToken, setStartToken] = useState("");
  const [currentTokenPos, setCurrentTokenPos] = useState(0);
  const [pageTokens, setPageTokens] = useState([""]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalNftsCount, setTotalNftsCount] = useState(0);
  const collection: Array<any>  =  useSelector((state:any) => state.collections);
  const dispatch = useDispatch();
  const { contractId } = useParams();




  useEffect(() => {
    if(contractId && validateEthereumAddress(contractId)) {
      getContractMetadata_(contractId.trim());
      getNFTsByContract(contractId.trim(),startToken,true); 
      }
  },[contractId]);




  const getContractMetadata_ = async (contractAddress: string,) => {
     const data:any =  await getContractMetadata(contractAddress);
     if(data === null) {
       setIsContractReady(false);
       presentToast_("invalidAddress-toast","Invalid Contract Address !!",3000,toast.POSITION.BOTTOM_CENTER,'toast-red');
       return;
     }

     setIsContractReady(true);
     setContractData(data.contractMetadata);
  }



  const getNFTsByContract = async (contractAddress: string, pageToken: string, setNext: boolean) => {
    const result = await getNFtsByContract_Alchemy("eth",contractAddress,pageToken);
    console.log(result);
      if(result.assets.length > 0) {
        dispatch(getCollection(result.assets));
      //  return;
      }


      if(!result.nextToken) {
        setHasNextPage(false);
        return;
      }

      if(setNext) {
      setStartToken(result.nextToken);
      const updateNftsCount = totalNftsCount + result.assets.length;
      setTotalNftsCount(updateNftsCount);
      }
   }



   const pageNext = () => {
    if(!hasNextPage) {
      presentToast_("end-toast","End of collection !",1000,toast.POSITION.BOTTOM_RIGHT);
      return;
    }

    getNFTsByContract(contractId || "",startToken,true);
    setPageTokens(oldArray => [...oldArray, startToken]);
    setCurrentTokenPos((currentTokenPos + 1));
   }
 

 
   const pageBack = () => {
     const offset = pageTokens[currentTokenPos - 1];
     setCurrentTokenPos((currentTokenPos - 1));
     if(currentTokenPos === 0) {
      setCurrentTokenPos(0);
      presentToast_("start-toast","Start of collection !",1000,toast.POSITION.BOTTOM_RIGHT);
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

     const updateNftsCount = totalNftsCount - 5;
     setTotalNftsCount(updateNftsCount);
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


   const presentToast_ = (customId: string,message: string,duration: number,position:any,toastClass?:string) => {
     presentToast(customId,message,duration,position,toastClass);
   }



  /** View */
  return (
 
    <> 
          {
            isContractReady && (
              <div>
              <div  className='page-header'>
                <h1 className='heading'>
                  {
                    contractData.name? <span className='name'>{contractData.name}</span> : <span className='name_address' hidden={collection.length == 0}><a  href={"https://etherscan.io/address/" + contractId } target="_blank">{contractId?.slice(0,12)}
                    <span className="material-icons">open_in_new</span></a>
                    </span> 
                  }

                <span onClick={() => setIsShowTokenType(!isShowTokenType) } className="btn badge badge-pill badge-primary symbol">
                {contractData.symbol}
                </span>

                <span hidden={!isShowTokenType} className="btn badge badge-pill badge-primary token-type">
                {contractData.tokenType.toUpperCase()}
                </span>
              </h1>
          
                <button className="btn btn-md btn-primary getCollectibles">
                <span className="material-icons icon">add</span> 
                <span className='txt'>New Collection</span>
                </button> 
              </div>
      
                <div  className='assets-list'>
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

        

                <ul  className='actionsList'>
                   <li hidden={contractData.totalSupply === undefined}>
                        <button  className='actionBtn pager'>
                         {totalNftsCount} of {contractData.totalSupply}
                        </button>
                    </li>
                    <li>
                        <button  onClick={() => pageNext()}   disabled={!isContractReady} className='actionBtn'>
                        <span className="material-icons icon center">
                            arrow_forward
                            </span> 
                        </button>
                    </li>

                    <li>
                        <button   onClick={() => pageBack()}  disabled={!isContractReady} className='actionBtn'>
                        <span className="material-icons icon center">
                            arrow_back
                        </span> 
                        </button>
                    </li>
                </ul>

              </div>

            )
          }

        
         {
           !isContractReady && (
            <div  className="invalidContract">
            <label className='msg center'>Invalid Contract Address. Check Again</label>
          </div>
          
           )
         }

          <ToastContainer  />
    </>

  )
}

export default Collections;