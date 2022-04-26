import { StreetAddress } from "./street-address";

export interface GoodsInfo {
    id: number;
    name: string;
    price: number;
    description?: string | null;
    addresses: StreetAddress[]
}

export const DEFAULT_GOODS_PLACEHOLDER: GoodsInfo = {
    id: 0,
    name: 'goods-name',
    price: 0.00,
    addresses: [
      {
        address: "goods address",
        coordinates: {latitude: 0, longitude: 0}
      }
    ]
  }