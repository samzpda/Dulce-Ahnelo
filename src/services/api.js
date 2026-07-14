/**
 * API service layer.
 */

// NOTA: Si usas Vite, tu variable en Amplify o en tu archivo .env DEBE llamarse VITE_API_BASE_URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/sales';

/**
 * Submit a sale to the backend.
 *
 * @param {{ items: Array<{ productId: string, quantity: number }>, paymentMethod: string, notes: string }} saleData
 * @returns {Promise<{ success: boolean, message: string, saleId?: string }>}
 */
export async function submitSale(saleData) {

  // ── IMPLEMENTACIÓN REAL (Descomentada y lista para enviar a AWS) ──
  try {
    const response = await fetch('${API_BASE_URL}/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saleData),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `Error ${response.status}`);
    }

    // Retorna la respuesta real de tu Lambda (el success, el folio y el total)
    return await response.json();

  } catch (error) {
    console.error('Error al enviar la venta a la API:', error);
    throw error;
  }
}