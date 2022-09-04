import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { getMarketContract, getTokenContract } from '../../services';
import { BlockchainContext } from '../../context';
import { BaseLayout, NftList } from '../../components/UI';
import { NftPageTypes } from '../../components/UI/Nft/List';
import { NFT_MARKET_CONTRACT } from '../../config';

export const Market = () => {
  
  // const dispatch = useDispatch();
  // dispatch(setAppError('asdasdasd'));
  // const { errorMessage } = useStateSelector(selectApp);
  // console.log(errorMessage, 'errorMessage');

  const { connectedAccount, isConnected, isAccountLoading, getProvider } = useContext(BlockchainContext);

  const [nfts, setNfts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected) {
      loadNFTs();
    }
  }, [isConnected]);

  const loadNFTs = async () => {
    setIsLoading(true);
    const marketContract = getMarketContract();
    const tokenContract = getTokenContract();
    const data = await marketContract.fetchMarketItems();
    
    const items = await Promise.all(data.map(async (i: any) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
      const item = {
        price,
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      };
      return item;
    }));
    setNfts(items);
    setIsLoading(false);
  };

  const buyNft = async (nft: any) => {
    const provider = await getProvider();
    const signer = provider?.getSigner();
    const marketContract = getMarketContract(signer);
    const tokenContract = getTokenContract();

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    console.log(price, 'price');
    console.log(marketContract, 'marketContract');
    console.log(nft.itemId, 'nft.itemId');
    const transaction = await marketContract.createMarketSale(tokenContract.address, nft.itemId, {
      value: price
    });
    await transaction.wait();
    loadNFTs();
  };
  
  if (!isLoading && !nfts.length) {
    return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>);
  } 

  return (
    <div className="relative bg-gray-50 pt-4 pb-8 px-2 sm:px-6 lg:pt-8 lg:pb-8 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Powerful Creatures NFTs</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Mint a NFT to get unlimited ownership forever!
          </p>
        </div>
        { connectedAccount ?
          <NftList nfts={nfts} type={NftPageTypes.MARKET} buyNft={buyNft} /> :
          <div className="rounded-md bg-yellow-50 p-4 mt-10">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    { isAccountLoading ?
                      'Loading...' :
                      ''
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};
