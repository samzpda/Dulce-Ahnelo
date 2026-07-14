import './App.css';
import { PRODUCTS, PAYMENT_METHODS } from './data/products';
import { useSaleForm } from './hooks/useSaleForm';

/**
 * Format a number as MXN currency.
 */
function formatCurrency(value) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(value);
}

export default function App() {
  const {
    cartItems,
    totalCost,
    itemCount,
    paymentMethod,
    notes,
    addProductToCart,
    incrementProduct,
    decrementProduct,
    removeProduct,
    updatePaymentMethod,
    updateNotes,
    isValid,
    status,
    feedback,
    handleSubmit,
  } = useSaleForm();

  const isLoading = status === 'loading';

  return (
    <main className="pos-page">
      {/* ── Header ── */}
      <header className="pos-header">
        <span className="pos-header__icon" role="img" aria-label="store">🍰</span>
        <h1 className="pos-header__title">Dulce Anhelo</h1>
        <p className="pos-header__subtitle">Punto de Venta</p>
      </header>

      {/* ── POS Card ── */}
      <section className="pos-card" aria-label="Formulario de venta">
        <form className="pos-form" onSubmit={handleSubmit} noValidate>

          {/* ── Product Selection Dropdown ── */}
          <div className="form-group">
            <label htmlFor="pos-select-product" className="form-group__label">
              Agregar Producto
            </label>
            <select
              id="pos-select-product"
              className="form-control"
              value=""
              onChange={(e) => {
                addProductToCart(e.target.value);
              }}
              disabled={isLoading}
            >
              <option value="" disabled>
                Busca o selecciona un producto…
              </option>
              {PRODUCTS.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — {formatCurrency(product.displayPrice)}
                </option>
              ))}
            </select>
          </div>

          {/* ── Selected Products List ── */}
          <div className="form-group">
            <span className="form-group__label">
              Carrito de Compras {cartItems.length > 0 && `(${itemCount})`}
            </span>
            
            {cartItems.length === 0 ? (
              <div className="cart-empty-state">
                <span className="cart-empty-state__icon">🛒</span>
                <p className="cart-empty-state__text">El carrito está vacío.</p>
                <p className="cart-empty-state__subtext">Selecciona un producto arriba para agregarlo.</p>
              </div>
            ) : (
              <div className="product-grid">
                {cartItems.map((item) => (
                  <div key={item.id} className="product-row product-row--active">
                    {/* Product info */}
                    <div className="product-row__info">
                      <span className="product-row__name">{item.name}</span>
                      <span className="product-row__price">
                        {formatCurrency(item.displayPrice)} / ud.
                      </span>
                    </div>

                    {/* Quantity stepper & Actions */}
                    <div className="product-row__actions">
                      <div className="qty-stepper">
                        <button
                          type="button"
                          className="qty-stepper__btn qty-stepper__btn--minus"
                          onClick={() => decrementProduct(item.id)}
                          disabled={isLoading}
                          aria-label={`Disminuir ${item.name}`}
                        >
                          −
                        </button>
                        <span className="qty-stepper__value qty-stepper__value--active">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="qty-stepper__btn qty-stepper__btn--plus"
                          onClick={() => incrementProduct(item.id)}
                          disabled={isLoading}
                          aria-label={`Aumentar ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Remove item button */}
                      <button
                        type="button"
                        className="btn-remove-item"
                        onClick={() => removeProduct(item.id)}
                        disabled={isLoading}
                        aria-label={`Eliminar ${item.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Payment Method ── */}
          <div className="form-group">
            <label htmlFor="pos-payment" className="form-group__label form-group__label--required">
              Método de Pago
            </label>
            <select
              id="pos-payment"
              className="form-control"
              value={paymentMethod}
              onChange={(e) => updatePaymentMethod(e.target.value)}
              disabled={isLoading}
            >
              <option value="" disabled>
                Selecciona un método…
              </option>
              {PAYMENT_METHODS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* ── Notes ── */}
          <div className="form-group">
            <label htmlFor="pos-notes" className="form-group__label">
              Notas
              <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                {' '}(opcional)
              </span>
            </label>
            <textarea
              id="pos-notes"
              className="form-control"
              placeholder="Indicaciones especiales, dedicatorias, etc."
              rows={3}
              value={notes}
              onChange={(e) => updateNotes(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* ── Cart Summary ── */}
          {cartItems.length > 0 && (
            <>
              <hr className="divider" />
              <div className="cart-summary">
                <div className="cart-summary__items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-summary__line">
                      <span className="cart-summary__line-name">
                        {item.name} <span className="cart-summary__line-qty">×{item.quantity}</span>
                      </span>
                      <span className="cart-summary__line-total">{formatCurrency(item.lineTotal)}</span>
                    </div>
                  ))}
                </div>
                <div className="cart-summary__total">
                  <span className="cart-summary__total-label">Total Estimado</span>
                  <span className="cart-summary__total-value">{formatCurrency(totalCost)}</span>
                </div>
                <div className="cart-summary__hint">Sujeto a confirmación del servidor</div>
              </div>
            </>
          )}

          {/* ── Feedback Messages ── */}
          {feedback && (
            <div
              className={`feedback ${
                status === 'success' ? 'feedback--success' : 'feedback--error'
              }`}
              role="alert"
            >
              <span className="feedback__icon">
                {status === 'success' ? '✓' : '✕'}
              </span>
              <span>{feedback}</span>
            </div>
          )}

          {/* ── Submit Button ── */}
          <button
            id="pos-submit"
            type="submit"
            className={`btn-submit ${isLoading ? 'btn-submit--loading' : ''}`}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Registrando venta…' : 'Registrar Venta'}
          </button>
        </form>
      </section>

      {/* ── Footer ── */}
      <footer className="pos-footer">
        <p className="pos-footer__text">
          Dulce Anhelo POS © {new Date().getFullYear()}
        </p>
        <p className="pos-footer__security">
          🔒 Los precios son calculados en el servidor
        </p>
      </footer>
    </main>
  );
}
