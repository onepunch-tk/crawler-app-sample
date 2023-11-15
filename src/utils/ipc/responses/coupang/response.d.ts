type CoupangDefaultResponse = {
  ok: boolean;
  error?: string;
};
type CP_DefaultCategory = {
  id: string;
  content: string;
};
type CP_SecondDepthCategory = CP_DefaultCategory & {
  thirdDepth?: CP_DefaultCategory[];
};
type CP_FirstDepthCategory = CP_DefaultCategory & {
  secondDepth?: CP_SecondDepthCategory[];
};

type CoupangCategoriesResponse = CoupangDefaultResponse & {
  results?: CP_FirstDepthCategory[];
};

type CP_ProductType = {
  productName: string;
  img: string;
  price: string;
  dcRate?: string;
  priceBase?: string;
  rocketDelivery: boolean;
  starRating: string;
  ratingTotalCount: string;
  productUrl: string;
};

type CoupangProductsResponse = CoupangDefaultResponse & {
  products: CP_ProductType[];
};
