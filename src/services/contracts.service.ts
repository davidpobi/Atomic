import axios from 'axios';


/** Fetches Metadata for a specified contract */
export const getContractMetadata = async(contractAddress: string) => {
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${process.env.ALCHEMY_API_KEY}/getContractMetadata`;
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
        if(error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data);
        }
      });

      return data;
}



/** Fetches NFTs belonging to a specified contract from server or client*/
export const getTokensByContract = async(chain: string, contractAddress: string, startToken: string) => {
    const isServer = typeof window === 'undefined'? true : false;
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${isServer?process.env.ALCHEMY_API_KEY:process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForCollection`;

    let data: {assets: Array<any>, nextToken: string} = {
        assets: [],
        nextToken: "true"
    } 

    const config = {
        method: 'get',
        url: `${baseURL}?contractAddress=${contractAddress}&startToken=${startToken}&limit=5&withMetadata=${true}`,
        headers: { }
      };
      
      await axios(config).then((response) => {

         const {nfts, nextToken } = response.data; 
         data.nextToken = nextToken;

         const results: Array<any>  = nfts;
         results.map((x:any) => {
            if(x.media[0].raw.length !== 0 && x.error === undefined) {
             data.assets.push(x);
            }
            return 0;
         });        
      })
      .catch((error) =>  {
        if(!isServer){
          console.log(error);
        }
          if(error.code === "ERR_BAD_REQUEST") {
              console.log(error.response.data);
          }
        });

    return data;
}