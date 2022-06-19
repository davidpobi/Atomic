import { useMoralis } from "react-moralis";
import { IMoralis } from "../Models/interfaces";



export const useInitMoralis = () => {
    const moralis:IMoralis = useMoralis();
    return moralis;
} 



/** Connects to Web3 Wallet */
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




/** Disconnect to Web3 Wallet */
export const disconnectWeb3Wallet = async(Moralis:any) => {
    try {
        await Moralis.logout();
    } catch(err) {
        console.log(err);
    }
}