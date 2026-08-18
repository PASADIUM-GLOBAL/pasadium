export const endpoints = {
  platform: "/v1/platform",
  contact: "/v1/contact",
  trade: {
    ticker: "/v1/trade/ticker",
    portfolio: "/v1/trade/portfolio",
    order: "/v1/trade/order",
  },
  market: {
    products: "/v1/market/products",
    product: "/v1/market/product/:id",
    order: "/v1/market/order",
    cart: "/v1/market/cart",
  },
  media: {
    feed: "/v1/media/feed",
    content: "/v1/media/content/:id",
    publish: "/v1/media/publish",
  },
} as const;
