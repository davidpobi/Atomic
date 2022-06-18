import { useMoralis } from "react-moralis";

export interface IMoralis {
    authenticate: any;
    isAuthenticated:any;
    isAuthenticating:any; 
    user:any;
    account:any; 
    logout:any;
}


export const useInitMoralis = () => {
    const moralis:IMoralis = useMoralis();
    return moralis;
} 



export const connectWeb3Wallet = async(Moralis:any) => {
    try {
        const result = await Moralis.authenticate({signingMessage: "Log into Atomic app"});
        if(result) {
            console.log('user logged in');
        }else{
            console.log('failed to log in user');
        }
    } catch(err) {
        console.log(err);
    }
}


export const disconnectWeb3Wallet = async(Moralis:any) => {
    try {
        await Moralis.logout();
    } catch(err) {
        console.log(err);
    }
}