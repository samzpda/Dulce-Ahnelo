/**
 * Mock product catalog — prices are for DISPLAY ONLY.
 * The backend is the single source of truth for pricing.
 */
export const PRODUCTS = [
  { id: 'prod_a', name: 'Producto A', displayPrice: 25.00 },
  { id: 'prod_b', name: 'Producto B', displayPrice: 42.50 },
  { id: 'prod_c', name: 'Producto C', displayPrice: 18.75 },
  { id: 'prod_d', name: 'Producto D', displayPrice: 63.00 },
  { id: 'prod_e', name: 'Producto E', displayPrice: 99.99 },
  { id: 'prod_f', name: 'Producto F', displayPrice: 35.00 },
  { id: 'prod_g', name: 'Producto G', displayPrice: 55.50 },
  { id: 'prod_h', name: 'Producto H', displayPrice: 12.00 },
  { id: 'prod_i', name: 'Producto I', displayPrice: 78.25 },
  { id: 'prod_j', name: 'Producto J', displayPrice: 150.00 },
];

export const PAYMENT_METHODS = [
  { value: 'cash',     label: 'Efectivo' },
  { value: 'card',     label: 'Tarjeta' },
  { value: 'transfer', label: 'Transferencia' },
];
