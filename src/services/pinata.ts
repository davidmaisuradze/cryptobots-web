import axios from 'axios';

const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

export const pinJSONToIPFS = async(JSONBody: any) => {
  try {
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    const pinataResult = await axios 
      .post(url, JSONBody, {
        headers: {
          pinata_api_key: key as string,
          pinata_secret_api_key: secret as string,
        }
      });

    return {
      success: true,
      pinataUrl: `https://gateway.pinata.cloud/ipfs/${pinataResult.data.IpfsHash}`,
    };
  } catch(error: any ) {
    console.log('pinata error', error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const pinFileToIPFS = async(data: any) => {
  try {
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const pinataResult = await axios 
      .post(url, data, {
        headers: {
          pinata_api_key: key as string,
          pinata_secret_api_key: secret as string,
          'Content-Type': 'multipart/form-data',
        }
      });

    return {
      success: true,
      pinataUrl: `https://gateway.pinata.cloud/ipfs/${pinataResult.data.IpfsHash}`,
    };
  } catch(error: any ) {
    console.log('pinata error', error);
    return {
      success: false,
      message: error.message,
    };
  }
};
