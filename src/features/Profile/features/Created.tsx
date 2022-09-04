import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BlockchainContext } from '../../../context';
import { getMarketContract, getTokenContract } from '../../../services';
import { NftList } from '../../../components/UI';
import { NftPageTypes } from '../../../components/UI/Nft/List';

export const Created = () => {
  const { isConnected, getProvider } = useContext(BlockchainContext);

  const [nfts, setNfts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isConnected) {
      loadNFTs();
    }
  }, [isConnected]);

  const loadNFTs = async () => {
    setIsLoading(true);
    const provider = await getProvider();
    const signer = provider?.getSigner();
      
    const marketContract = getMarketContract(signer);
    const tokenContract = getTokenContract(signer);
    const data = await marketContract.fetchItemsCreated();
    
    const items = await Promise.all(data.map(async (i: any) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
      const item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
      };
      return item;
    }));
    // TODO: move to store
    setNfts(items);
    setIsLoading(false); 
  };
  
  if (!isLoading && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>);
  return (
    <div>
      {!!nfts.length && (
        <div className="p-4">
          <h2 className="text-2xl py-2">Items Created</h2>
          <NftList nfts={nfts} type={NftPageTypes.CREATED} />
        </div>
      )}
    </div>
  );
};
