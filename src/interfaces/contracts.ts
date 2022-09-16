export interface IContract {
    address?:string;
    name:string;
    symbol:string;
    tokenType:string;
    totalSupply: number;
}
  
export interface IContractDetailsResult {
    isValid: boolean;
    metadata: IContract | any;
    assets: Array<any>;
    nextToken?:string | null;
    isSeoReady?:boolean;
}