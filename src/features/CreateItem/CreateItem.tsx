import { useContext, useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

import { BlockchainContext } from '../../context';
import { getMarketContract, getTokenContract, pinJSONToIPFS, pinFileToIPFS } from '../../services';
import { Image } from '../../components/UI/Image';

export const CreateItem = () => {
  const { getProvider } = useContext(BlockchainContext);

  const [fileUrl, setFileUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState('');
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' });
  const navigate = useNavigate();

  const onChange = async (e: any) => {
    const file = e.target.files[0];
    const tempUrl = URL.createObjectURL(file);
    setUploadedFile(file);
    setFileUrl(tempUrl);
  };
  
  const createMarket = async () => {
    try {
      const { name, description, price } = formInput;
      if (!name || !description || !price) return;

      const formData = new FormData();
      formData.append('file', uploadedFile);

      const pinataFileUploadResult = await pinFileToIPFS(formData);
      console.log(pinataFileUploadResult, 'pinataFileUploadResult');

      const pinataResult = await pinJSONToIPFS({
        name,
        description,
        image: pinataFileUploadResult.pinataUrl,
      });
      console.log(pinataResult, 'pinataResult');

      createSale(pinataResult.pinataUrl);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  };

  const createSale = async (url: any) => {
    const provider = await getProvider();
    const signer = provider?.getSigner();
    
    /* next, create the item */
    const tokenContract = getTokenContract(signer);
    let transaction = await tokenContract.createToken(url);
    let tx = await transaction.wait();

    const event = tx.events[0];
    const value = event.args[2];
    const tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, 'ether');
    console.log(price, '----- price');
  
    /* then list the item for sale on the marketplace */
    const marketContract = getMarketContract(signer);
    let listingPrice = await marketContract.getListingPrice();
    listingPrice = listingPrice.toString();
    
    console.log(listingPrice, '----- listingPrice');

    transaction = await marketContract.createMarketItem(tokenContract.address, tokenId, price, { value: listingPrice });
    tx = await transaction.wait();

    console.log(tx, '----- tx');
    navigate('/');
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
            <Image className="rounded mt-4" src={fileUrl} />
          )
        }
        <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Asset
        </button>
      </div>
    </div>
  );
};
