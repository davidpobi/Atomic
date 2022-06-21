import axios from 'axios';


const apiKey = "lW_NoYAb4qo9f2cBMfM4HzpxrGJ05nnT";
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection`;
const withMetadata = "true";

/** Fetches Users NFT Assets from chain */
export const getUserOwnedAssets = async(Web3Api:any, chain: string, address: string) => {
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





/** Fetches NFTs belonging to a specified contract */
export const getNFtsByContract_Alchemy = async(chain: string, contractAddress: string, startToken: string) => {
    let data: {assets: Array<any>, nextToken: string} = {
        assets: [],
        nextToken: "true"
    } 

    const config = {
        method: 'get',
        url: `${baseURL}?contractAddress=${contractAddress}&startToken=${startToken}&withMetadata=${withMetadata}`,
        headers: { }
      };
      
      await axios(config).then((response) => {

         const {nfts, nextToken } = response.data; 
         data.nextToken = nextToken;

         const results: Array<any>  = nfts;
         results.map((x:any) => {
         data.assets.push(x);
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