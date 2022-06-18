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