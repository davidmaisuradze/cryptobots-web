import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BlockchainContext } from "../../context";
import { getMarketContract, getTokenContract } from "../../services";

export const CreatorDashboard = () => {
  const { getProvider } = useContext(BlockchainContext);

  const [nfts, setNfts] = useState<any>([]);
  const [sold, setSold] = useState<any>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  const loadNFTs = async () => {
    const provider = await getProvider();
    const signer = provider?.getSigner();
      
    const marketContract = getMarketContract(signer);
    const tokenContract = getTokenContract(signer);
    const data = await marketContract.fetchItemsCreated();
    
    const items = await Promise.all(data.map(async (i: any) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");
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
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold);
    setSold(soldItems);
    setNfts(items);
    setLoadingState("loaded"); 
  };
  
  if (loadingState === "loaded" && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>);
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Created</h2>
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
      <div className="px-4">
        {
          Boolean(sold.length) && (
            <div>
              <h2 className="text-2xl py-2">Items sold</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
                  sold.map((nft: any, i: any) => (
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
          )
        }
      </div>
    </div>
  );
};
