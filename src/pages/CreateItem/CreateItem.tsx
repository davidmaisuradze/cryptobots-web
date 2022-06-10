import { useContext, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { BlockchainContext } from "../../context";
import { getMarketContract, getTokenContract } from "../../services";

const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
});

export const CreateItem = () => {
  const { getProvider } = useContext(BlockchainContext);

  const [fileUrl, setFileUrl] = useState("");
  const [formInput, updateFormInput] = useState({ price: "", name: "", description: "" });
  const navigate = useNavigate();

  const onChange = async (e: any) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      );
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }  
  };
  
  const createMarket = async () => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }  
  };

  const createSale = async (url: any) => {
    const provider = await getProvider();
    const signer = provider?.getSigner();
    
    console.log(provider, "provider");
    console.log(signer, "signer");
    /* next, create the item */
    const tokenContract = getTokenContract(signer);
    let transaction = await tokenContract.createToken(url);
    let tx = await transaction.wait();

    const event = tx.events[0];
    const value = event.args[2];
    const tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");
    console.log(price, "----- price");
  
    /* then list the item for sale on the marketplace */
    const marketContract = getMarketContract(signer);
    let listingPrice = await marketContract.getListingPrice();
    listingPrice = listingPrice.toString();
    
    console.log(listingPrice, "----- listingPrice");

    transaction = await marketContract.createMarketItem(tokenContract.address, tokenId, price, { value: listingPrice });
    tx = await transaction.wait();

    console.log(tx, "----- tx");
    navigate("/");
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Asset
        </button>
      </div>
    </div>
  );
};
