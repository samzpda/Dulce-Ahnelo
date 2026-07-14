/**
 * API service layer.
 *
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  REPLACE `API_BASE_URL` with your API Gateway endpoint URL.  ║
 * ╚═══════════════════════════════════════════════════════════════╝
 *
 * The `submitSale` function sends a POST with ONLY:
 *   - items: [{ productId, quantity }]
 *   - paymentMethod
 *   - notes
 *
 * Unit cost and total cost are NEVER included in the payload.
 */

const API_BASE_URL = import.meta.env.API_BASE_URL || '/api';

/**
 * Submit a sale to the backend.
 *
 * @param {{ items: Array<{ productId: string, quantity: number }>, paymentMethod: string, notes: string }} saleData
 * @returns {Promise<{ success: boolean, message: string, saleId?: string }>}
 */
export async function submitSale(saleData) {
  // --- SIMULATED RESPONSE (remove this block when your API is live) ---
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log('[Mock API] POST →', `${API_BASE_URL}/sales`, saleData);
  return {
    success: true,
    message: 'Venta registrada exitosamente.',
    saleId: `SALE-${Date.now()}`,
  };
  // --- END SIMULATION ---

  /* 
  // ── REAL IMPLEMENTATION (uncomment when ready) ──
  const response = await fetch(`${API_BASE_URL}/sales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(saleData),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Error ${response.status}`);
  }

  return response.json();
  */
}
