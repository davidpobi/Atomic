
export interface IMoralis {
    authenticate: any;
    isAuthenticated:any;
    isAuthenticating:any; 
    user:any;
    account:any; 
    logout:any;
}


export interface ProtectedRouteProps  {
    isAuthenticated?: boolean;
    authenticationPath: string;
    outlet: JSX.Element;
};


export interface IContract {
    name:string;
    symbol:string;
    tokenType:string;
    totalSupply: number;
}
  