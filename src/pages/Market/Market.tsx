import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getMarketContract, getTokenContract } from "../../services";
import { BlockchainContext } from "../../context";

export const Market = () => {
  const { getProvider } = useContext(BlockchainContext);

  const [nfts, setNfts] = useState<any>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {    
    const provider = await getProvider();
    const tokenContract = getTokenContract(provider);
    const marketContract = getMarketContract(provider);
    const data = await marketContract.fetchMarketItems();
    
    const items = await Promise.all(data.map(async (i: any) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");
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
    setLoadingState("loaded"); 
  };

  const buyNft = async (nft: any) => {
    const provider = await getProvider();
    const signer = provider?.getSigner();
    const marketContract = getMarketContract(signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await marketContract.createMarketSale(marketContract.address, nft.itemId, {
      value: price
    });
    await transaction.wait();
    loadNFTs();
  };
  
  if (loadingState === "loaded" && !nfts.length) {
    return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>);
  }

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft: any, i: any) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p style={{ height: "64px" }} className="text-2xl font-semibold">{nft.name}</p>
                  <div style={{ height: "70px", overflow: "hidden" }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
                  <button 
                    className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" 
                    onClick={() => buyNft(nft)}
                  >
                      Buy
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
