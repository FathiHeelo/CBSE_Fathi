import type { Product } from '../types/product';

export interface AddToCartDetail {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

export function dispatchAddToCart(
  product: Product,
  quantity = 1,
  options: { size?: string; color?: string } = {},
): AddToCartDetail {
  const detail: AddToCartDetail = {
    productId: product.id,
    title: product.title,
    price: product.price,
    quantity,
    image: product.thumbnail,
    ...options,
  };

  window.dispatchEvent(
    new CustomEvent<AddToCartDetail>('catalog:add-to-cart', {
      detail,
      bubbles: true,
      composed: true,
    }),
  );

  return detail;
}

