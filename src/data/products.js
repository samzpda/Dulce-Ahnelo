/**
 * Mock product catalog — prices are for DISPLAY ONLY.
 * The backend is the single source of truth for pricing.
 */
export const PRODUCTS = [
  { id: 'prod_a', name: 'El original', displayPrice: 95.00 },
  { id: 'prod_b', name: 'El Anhelo', displayPrice: 105.00 },
  { id: 'prod_c', name: 'El Abrazo', displayPrice: 105.00 },
  { id: 'prod_d', name: 'El Consentido', displayPrice: 135.00 },
  { id: 'prod_e', name: 'El Pecado', displayPrice: 145.00 },
  { id: 'prod_f', name: 'Extra Fresa', displayPrice: 10.00 },
  { id: 'prod_g', name: 'Extra Nutella', displayPrice: 15.00 },
  { id: 'prod_h', name: 'Extra Chantilly', displayPrice: 10.00 },
  { id: 'prod_i', name: 'hershey', displayPrice: 10.00 },
  { id: 'prod_j', name: 'Lechera', displayPrice: 10.00 },
  { id: 'prod_k', name: 'Bola de Oreo', displayPrice: 20.00 },
  { id: 'prod_l', name: 'Brownie', displayPrice: 20.00 },
  { id: 'prod_m', name: 'Kinder bueno mini', displayPrice: 20.00 },
];

export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Efectivo' },
  { value: 'transfer', label: 'Transferencia' },
];
