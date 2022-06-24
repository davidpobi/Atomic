import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const withMetadata = "true";

/** Fetches Users NFT Assets from chain with Moralis API  */
export const getUserOwnedAssets_Moralis = async(Web3Api:any, chain: string, address: string) => {
    let assets: Array<any> = [];
    const options: any = {
        chain: chain,
        address: address
    }
    const userEthNFTs = await Web3Api.account.getNFTs(options);

    if(userEthNFTs.total > 0) {
        assets = userEthNFTs.result;
    }
    return assets;
}



/** Fetches Users NFT Assets from chain with Alchemy API */
export const getUserOwnedAssets_Alchemy = async(chain: string, ethAddress: string, startToken: string) => {
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}/getNFTs`;
    
    let data: {assets: Array<any>, nextToken: string} = {
        assets: [],
        nextToken: "true"
    } 

    const config = {
        method: 'get',
        url: `${baseURL}?owner=${ethAddress}&withMetadata=${withMetadata}`,
        headers: { }
      };
      
      await axios(config).then((response) => {

         const {ownedNfts,pageKey } = response.data; 
         data.nextToken = pageKey;

         const results: Array<any>  = ownedNfts;
         results.map((x:any) => {
              if(x.media[0].raw.length !== 0) {
             data.assets.push(x);
             }

             return 0;
         });
        // console.log(JSON.stringify(response.data, null, 2))
        console.log(response.data);
      })
      .catch((error) =>  {
          console.log(error);
          if(error.code === "ERR_BAD_REQUEST") {
              console.log(error.response.data);
          }
        });

    return data;
}





/** Fetches NFTs belonging to a specified contract */
export const getNFtsByContract_Alchemy = async(chain: string, contractAddress: string, startToken: string) => {
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}/getNFTsForCollection`;

    let data: {assets: Array<any>, nextToken: string} = {
        assets: [],
        nextToken: "true"
    } 

    const config = {
        method: 'get',
        url: `${baseURL}?contractAddress=${contractAddress}&startToken=${startToken}&limit=5&withMetadata=${withMetadata}`,
        headers: { }
      };
      
      await axios(config).then((response) => {

         const {nfts, nextToken } = response.data; 
         data.nextToken = nextToken;

         const results: Array<any>  = nfts;
         results.map((x:any) => {
            if(x.media[0].raw.length !== 0) {
             data.assets.push(x);
            }
            return 0;
         });
        //  console.log(JSON.stringify(response.data, null, 2))
      })
      .catch((error) =>  {
          console.log(error);
          if(error.code === "ERR_BAD_REQUEST") {
              console.log(error.response.data);
          }
        });

    return data;
}




export const getNFtsByContract_Moralis = async(Web3Api:any, chain: string, address: string) => {
    let assets: Array<any> = [];

    const options: any = {
        chain: chain,
        address: address,
        token_address: "0x2765b02b022b1e3cc84afef86d7a21c14b79cec4"
    }
    const results = await Web3Api.account.getNFTsForContract(options);

    console.log(results);
    if(results.total > 0) {
        assets = results.result;
    }


    return assets;
}



export const getContractMetadata = async(contractAddress: string,) => {
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}/getContractMetadata`;
    let data: any = null;

    const options: any = {
        method: 'get',
        url: `${baseURL}?contractAddress=${contractAddress}`,
        headers: { }
      };
      
      await axios(options).then((response) => {
        if(response.data !== undefined) {
            data = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
        if(error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data);
        }
      });

      return data;
}




export const presentToast = (customId: string,message: string,duration:number,position:any, toastClass?: string) => {
    if(toast.isActive(customId)) {
        return;
    }  
    toast(message,{
        position: position ,
        autoClose: duration,
        icon: false,
        closeButton: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        toastId: customId,
        className: toastClass
    });
}