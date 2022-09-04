import { FunctionComponent } from 'react';
import { NftPageTypes } from '../List';
import { Image } from '../../Image';

type NftItemProps = {
  item: any;
  type: NftPageTypes;
  buyNft?: (nft: any) => Promise<void>;
}

function shortifyAddress(address: string) {
  return `0x****${address.slice(-4)}`;
}

export const NftItem: FunctionComponent<NftItemProps> = ({ item, type, buyNft }) => {
  return (
    <>
      <div className="flex-shrink-0">
        <img
          className={'h-full w-full object-cover'}
          src={item.image}
          alt="New NFT"
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center mt-2">
              <div>
                <Image src="/assets/images/default_avatar.png" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Creator</p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{shortifyAddress(item.seller)}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-indigo-600">
              Creatures NFT
            </p>
          </div>
          <div className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">{item.name}</p>
            <p className="mt-3 mb-3 text-base text-gray-500">{item.description}</p>
            <p className="mt-3 mb-3 text-base text-gray-500">{item.price} ETH</p>
          </div>
        </div>
        <div>
          {type === NftPageTypes.MARKET && 
            (
              <button
                onClick={() => {
                  buyNft && buyNft(item);
                }}
                type="button"
                className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Buy
              </button>
            )
          }
        </div>
      </div>
    </>
  );
};

export default NftItem;
