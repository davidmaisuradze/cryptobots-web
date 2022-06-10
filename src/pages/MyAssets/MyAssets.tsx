import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getMarketContract, getTokenContract } from "../../services";
import { BlockchainContext } from "../../context";

export const MyAssets = () => {
  const { getProvider } = useContext(BlockchainContext);

  const [nfts, setNfts] = useState<any>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    const provider = await getProvider();
      
    const marketContract = getMarketContract();
    const tokenContract = getTokenContract(provider);
    const data = await marketContract.fetchMyNFTs();
    
    const items = await Promise.all(data.map(async (i: any) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");
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
    setLoadingState("loaded"); 
  };

  if (loadingState === "loaded" && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets owned</h1>);
  return (
    <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft: any, i: any) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
