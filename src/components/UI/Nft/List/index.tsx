import { FC } from 'react';
import NftItem from '../Item';

export enum NftPageTypes {
  MARKET = 'MARKET',
  COLLECTED = 'COLLECTED',
  CREATED = 'CREATED',
  SOLD = 'SOLD',
}

type Props = {
  nfts: any[];
  type: NftPageTypes;
  buyNft?: (nft: any) => Promise<void>;
}

export const NftList: FC<Props> = ({ nfts, type, buyNft }) => {
  return (
    <div className="mt-4 max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
      { nfts?.map((nft: any) =>
        <div key={nft.itemId || nft.tokenId} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <NftItem
            item={nft}
            type={type}
            buyNft={buyNft}
          />
        </div>
      )}
    </div>
  );
};

export default NftList;
