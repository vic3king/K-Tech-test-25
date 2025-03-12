export interface DeliveryData {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
  cats: {
    name: string;
    subscriptionActive: boolean;
    breed: string;
    pouchSize: string;
  }[];
}
