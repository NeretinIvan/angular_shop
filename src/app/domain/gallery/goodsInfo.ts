import { StreetAddress } from "./street-address";

export interface GoodsInfo {
    name: string;
    price: number;
    description?: string | null;
    image?: string | null;
    addresses: StreetAddress[];
}

export const DEFAULT_GOODS_PLACEHOLDER: GoodsInfo = {
    name: 'goods-name',
    price: 0.00,
    image: "/assets/gif/loading.gif",
    addresses: [
      {
        address: "goods address",
        coordinates: {latitude: 0, longitude: 0}
      }
    ]
  }