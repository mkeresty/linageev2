import { ethers } from "ethers";


export async function getCurrentSigner(walletProvider) {

    try{
  
        if (!walletProvider) {
        throw new Error('No provider available');
        }
    
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = await provider.getSigner();
    
        if (!signer) {
        throw new Error('User is not logged in');
        }
    
        const address = await signer.getAddress();

    

        return {address, signer};
    } catch (error) {
      console.error('Error getting or validating address:', error.message);
      throw error; // Re-throw the error for further handling
    }
  }


  export function handleEthersError(errorMessage){
    if (errorMessage) {
      return(errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1))
    } else {
      return("Undefined error")
    }
  }