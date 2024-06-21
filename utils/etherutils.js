import { ethers } from "ethers";


export async function getCurrentSigner(walletProvider) {

    try{
        const fallback = {undefined, undefined}
        if (!walletProvider) {
          console.log('No provider available');
        }
    
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = await provider.getSigner();
    
        if (!signer) {
        console.log('User is not logged in');
        return(fallback)
        
        }
    
        let address = await signer.getAddress()

    

        return {address, signer};
    } catch (error) {
      console.error('Error getting or validating address:', error.message);
      //throw error; // Re-throw the error for further handling
      return fallback
    }
  }


  export function handleEthersError(errorMessage){
    if (errorMessage) {
      return(errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1))
    } else {
      return("Undefined error")
    }
  }