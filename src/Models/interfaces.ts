
export interface IMoralis {
    authenticate: any;
    isAuthenticated:any;
    isAuthenticating:any; 
    user:any;
    account:any; 
    logout:any;
}


export type ProtectedRouteProps = {
    isAuthenticated?: boolean;
    authenticationPath: string;
    outlet: JSX.Element;
  };
  