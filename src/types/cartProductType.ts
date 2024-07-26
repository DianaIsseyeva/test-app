export type CartProductType = {
  id: number;
  title: string;
  price: number;
  image: Array<{
    id: number;
    url: string;
  }>;
};
