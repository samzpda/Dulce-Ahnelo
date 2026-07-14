import { useState, useCallback, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { submitSale } from '../services/api';

/**
 * Custom hook that owns all POS cart state and submission logic.
 * Supports adding products dynamically and managing their quantities.
 */
export function useSaleForm() {
  // cart is a Map-like object: { [productId]: quantity }
  const [cart, setCart] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [feedback, setFeedback] = useState('');

  /* ── Cart operations ── */
  const addProductToCart = useCallback((productId) => {
    if (!productId) return;
    setFeedback('');
    setStatus('idle');
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  }, []);

  const incrementProduct = useCallback((productId) => {
    setFeedback('');
    setStatus('idle');
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  }, []);

  const decrementProduct = useCallback((productId) => {
    setFeedback('');
    setStatus('idle');
    setCart((prev) => {
      const current = prev[productId] || 0;
      if (current <= 1) {
        // Remove product from cart
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: current - 1 };
    });
  }, []);

  const removeProduct = useCallback((productId) => {
    setFeedback('');
    setStatus('idle');
    setCart((prev) => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const getQuantity = useCallback(
    (productId) => cart[productId] || 0,
    [cart],
  );

  /* ── Derived display-only values ── */
  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([productId, quantity]) => {
        const product = PRODUCTS.find((p) => p.id === productId);
        if (!product) return null;
        return {
          ...product,
          quantity,
          lineTotal: product.displayPrice * quantity,
        };
      })
      .filter(Boolean);
  }, [cart]);

  const totalCost = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartItems],
  );

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  /* ── Field updaters ── */
  const updatePaymentMethod = useCallback((value) => {
    setFeedback('');
    setStatus('idle');
    setPaymentMethod(value);
  }, []);

  const updateNotes = useCallback((value) => {
    setFeedback('');
    setStatus('idle');
    setNotes(value);
  }, []);

  /* ── Validation ── */
  const isValid = useMemo(() => {
    return cartItems.length > 0 && paymentMethod !== '';
  }, [cartItems, paymentMethod]);

  /* ── Submit handler ── */
  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      if (!isValid) return;

      setStatus('loading');
      setFeedback('');

      try {
        // SECURITY: payload contains NO pricing info
        const payload = {
          items: cartItems.map(({ id, quantity }) => ({
            productId: id,
            quantity,
          })),
          paymentMethod,
          notes: notes.trim(),
        };

        const result = await submitSale(payload);
        setStatus('success');
        setFeedback(result.message || 'Venta registrada exitosamente.');
        // Reset form on success
        setCart({});
        setPaymentMethod('');
        setNotes('');
      } catch (err) {
        setStatus('error');
        setFeedback(err.message || 'Ocurrió un error al registrar la venta.');
      }
    },
    [cartItems, paymentMethod, notes, isValid],
  );

  return {
    cart,
    cartItems,
    totalCost,
    itemCount,
    paymentMethod,
    notes,
    addProductToCart,
    incrementProduct,
    decrementProduct,
    removeProduct,
    getQuantity,
    updatePaymentMethod,
    updateNotes,
    isValid,
    status,
    feedback,
    handleSubmit,
  };
}
