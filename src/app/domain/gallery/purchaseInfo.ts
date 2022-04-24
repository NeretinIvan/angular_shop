import { GoodsInfo } from "./goodsInfo";

export interface PurchaseInfo {
    customerName: string;
    phoneNumber: string;
    email: string;
    goodsPurchased: GoodsInfo[];
}