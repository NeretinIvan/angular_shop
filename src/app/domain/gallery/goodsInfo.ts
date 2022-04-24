import { StreetAddress } from "./street-address";

export interface GoodsInfo {
    id: number;
    name: string;
    description: string | null;
    addresses: StreetAddress[]
}