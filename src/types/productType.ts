export type ProductType = {
  id: number;
  attributes: {
    title: string;
    price: number;
    image: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
        };
      }>;
    };
  };
};
