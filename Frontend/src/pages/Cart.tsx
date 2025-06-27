import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { spacing, typography, components } from '../styles/designSystem';

const Cart = () => {
  const { t } = useTranslation();
  const { state, removeFromCart, updateQuantity, updateRentalPeriod, toggleRentalType, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // TODO: Implement checkout logic
    setTimeout(() => {
      alert('Checkout functionality will be implemented here!');
      setIsCheckingOut(false);
    }, 2000);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className={`${spacing.container}`}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="text-6xl text-gray-300 mx-auto mb-6">🛒</div>
              <h1 className={`${typography.h2} text-gray-800 mb-4`}>
                {t('cart.empty.title')}
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                {t('cart.empty.description')}
              </p>
              <a
                href="/books"
                className={`${components.button.primary} inline-flex items-center space-x-2`}
              >
                <span>📚</span>
                <span>{t('cart.empty.browseBooks')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className={`${spacing.container}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className={`${typography.h1} text-gray-800 mb-8`}>
            {t('cart.title')} ({state.totalItems} {t('cart.items')})
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`${typography.h3} text-gray-800`}>
                    {t('cart.items')}
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    {t('cart.clearAll')}
                  </button>
                </div>

                <div className="space-y-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Book Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-24 h-32 object-cover rounded-lg"
                          />
                        </div>

                        {/* Book Details */}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {t('books.details.author')}: {item.author.en}
                          </p>

                          {/* Rental/Purchase Toggle */}
                          <div className="flex items-center space-x-4 mb-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                checked={item.isRental}
                                onChange={() => toggleRentalType(item.id, true)}
                                className="text-blue-600"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                {t('cart.rental')} (रु. {item.rentalPrice}/day + रु. {item.deposit} deposit)
                              </span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                checked={!item.isRental}
                                onChange={() => toggleRentalType(item.id, false)}
                                className="text-blue-600"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                {t('cart.purchase')} (रु. {item.price})
                              </span>
                            </label>
                          </div>

                          {/* Rental Period (only show if rental is selected) */}
                          {item.isRental && (
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('cart.rentalPeriod')}:
                              </label>
                              <div className="flex items-center space-x-2">
                                <select
                                  value={item.rentalPeriod}
                                  onChange={(e) => updateRentalPeriod(item.id, parseInt(e.target.value))}
                                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value={3}>3 {t('cart.days')}</option>
                                  <option value={7}>7 {t('cart.days')}</option>
                                  <option value={14}>14 {t('cart.days')}</option>
                                  <option value={30}>30 {t('cart.days')}</option>
                                </select>
                                <span className="text-gray-400">📅</span>
                              </div>
                            </div>
                          )}

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <label className="text-sm font-medium text-gray-700">
                                {t('cart.quantity')}:
                              </label>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                >
                                  ➖
                                </button>
                                <span className="px-4 py-1 text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                >
                                  ➕
                                </button>
                              </div>
                            </div>

                            {/* Item Price */}
                            <div className="text-right">
                              <p className="text-lg font-bold text-blue-600">
                                रु. {item.isRental 
                                  ? ((item.deposit * item.quantity) + (item.rentalPrice * item.rentalPeriod * item.quantity)).toLocaleString()
                                  : (item.price * item.quantity).toLocaleString()
                                }
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.isRental 
                                  ? `Deposit: रु. ${item.deposit} + ${item.rentalPeriod} ${t('cart.days')} × रु. ${item.rentalPrice}/day`
                                  : `रु. ${item.price} each`
                                }
                              </p>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center space-x-2 text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              <span>🗑️</span>
                              <span>{t('cart.remove')}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className={`${typography.h3} text-gray-800 mb-6`}>
                  {t('cart.orderSummary')}
                </h2>

                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 truncate">
                          {item.title}
                        </p>
                        <p className="text-gray-500">
                          {item.quantity} × {item.isRental 
                            ? `रु. ${item.rentalPrice}/day + रु. ${item.deposit} deposit (${item.rentalPeriod} ${t('cart.days')})`
                            : `रु. ${item.price}`
                          }
                        </p>
                      </div>
                      <p className="font-medium text-gray-800 ml-4">
                        रु. {item.isRental 
                          ? ((item.deposit * item.quantity) + (item.rentalPrice * item.rentalPeriod * item.quantity)).toLocaleString()
                          : (item.price * item.quantity).toLocaleString()
                        }
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{t('cart.subtotal')}</span>
                    <span className="font-medium">रु. {state.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{t('cart.delivery')}</span>
                    <span className="font-medium text-green-600">{t('cart.free')}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                    <span>{t('cart.total')}</span>
                    <span>रु. {state.totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`${components.button.primary} w-full mt-6 flex items-center justify-center space-x-2 ${
                    isCheckingOut ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{t('cart.processing')}</span>
                    </>
                  ) : (
                    <>
                      <span>💳</span>
                      <span>{t('cart.checkout')}</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  {t('cart.secureCheckout')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 