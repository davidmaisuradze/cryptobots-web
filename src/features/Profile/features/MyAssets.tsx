import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getMarketContract, getTokenContract } from '../../../services';
import { BlockchainContext } from '../../../context';
import { NftList } from '../../../components/UI';
import { NftPageTypes } from '../../../components/UI/Nft/List';

export const MyAssets = () => {
  const { isConnected, getProvider } = useContext(BlockchainContext);

  const [nfts, setNfts] = useState<any>([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    if (isConnected) {
      loadNFTs();
    }
  }, [isConnected]);

  const loadNFTs = async () => {
    const provider = await getProvider();
    
    if (!provider) {
      return;
    }

    const signer = provider.getSigner();

    const marketContract = getMarketContract(signer);
    const tokenContract = getTokenContract(signer);
    const data = await marketContract.fetchMyNFTs();
    
    const items = await Promise.all(data.map(async (i: any) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
      const item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      };
      return item;
    }));
    setNfts(items);
    setLoadingState('loaded'); 
  };

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets owned</h1>);
  return (
    <div>
      <div className="p-4">
        <NftList nfts={nfts} type={NftPageTypes.COLLECTED} />
      </div>
    </div>
  );
};
