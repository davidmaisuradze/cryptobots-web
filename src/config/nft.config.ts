import { ENV } from '../utils';

import NFT_CONTRACT_PATH from '../contracts/NFT.json';
import NFT_MARKET_CONTRACT_PATH from '../contracts/NFTMarket.json';

export const INFURA_PROJECT_ID='78dfe734697046818bd832da3312ee34';
export const INFURA_CURRENT_NETWORK='goerli';
export const NFT_CONTRACT = NFT_CONTRACT_PATH;
export const NFT_MARKET_CONTRACT = NFT_MARKET_CONTRACT_PATH;
export const NFT_ADDRESS = ENV('REACT_APP_NFT_ADDRESS');
export const NFT_MARKET_ADDRESS = ENV('REACT_APP_NFT_MARKET_ADDRESS');

