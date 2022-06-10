import { ethers } from "ethers";
import { 
  NFT_ADDRESS,
  NFT_MARKET_ADDRESS,
  NFT_MARKET_CONTRACT,
  NFT_CONTRACT,
  INFURA_CURRENT_NETWORK,
  INFURA_PROJECT_ID 
} from "../config";
import { ENV } from "../utils";

export const rpcProvider = new ethers.providers.JsonRpcProvider(
  ENV("REACT_APP_PUBLIC_ROPSTEN_URL")
);

export function getMarketContract(signer?: any) {
  let provider = rpcProvider;
  if (signer) {
    provider = signer;
  }
  return new ethers.Contract(NFT_MARKET_ADDRESS, NFT_MARKET_CONTRACT.abi, provider);
}

export function getTokenContract(signer?: any) {
  let provider = rpcProvider;
  if (signer) {
    provider = signer;
  }
  return new ethers.Contract(NFT_ADDRESS, NFT_CONTRACT.abi, provider);
}