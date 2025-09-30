import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../context/StoreContext';
import { CartItem } from '../types';

interface CartPageProps {
  cartStore: any;
}

interface CartPageState {
  windowWidth: number;
}

class CartPageClass extends Component<CartPageProps, CartPageState> {
  constructor(props: CartPageProps) {
    super(props);
    this.state = {
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1200
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  handleUpdateQuantity = (productId: number, quantity: number) => {
    const validatedQuantity = Math.min(Math.max(1, quantity), 99);
    this.props.cartStore.updateQuantity(productId, validatedQuantity);
    this.forceUpdate();
  };

  handleRemoveItem = (productId: number) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      this.props.cartStore.removeFromCart(productId);
      this.forceUpdate();
    }
  };

  handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      this.props.cartStore.clearCart();
      this.forceUpdate();
    }
  };

  render() {
    const { cartStore } = this.props;
    const { windowWidth } = this.state;
    const items: CartItem[] = cartStore.items || [];
    const isMobile = windowWidth <= 768;
    const hasItems = !cartStore.isEmpty;

    const containerStyle: React.CSSProperties = {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    };

    const titleStyle: React.CSSProperties = {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: 'bold',
      color: '#2c3e50'
    };

    const clearButtonStyle: React.CSSProperties = {
      padding: '0.5rem 1rem',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem'
    };

    const backLinkStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      color: '#3498db',
      textDecoration: 'none',
      marginBottom: '2rem',
      fontSize: '1rem',
      fontWeight: '500'
    };

    const emptyCartStyle: React.CSSProperties = {
      textAlign: 'center',
      padding: '3rem',
      fontSize: '1.2rem',
      color: '#666'
    };

    const cartItemStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '100px 1fr auto auto auto',
      gap: '1rem',
      alignItems: 'center',
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginBottom: '1rem',
      backgroundColor: 'white'
    };

    const mobileItemLayoutStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    };

    const mobileItemRowStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    };

    const itemImageStyle: React.CSSProperties = {
      width: isMobile ? '60px' : '80px',
      height: isMobile ? '60px' : '80px',
      objectFit: 'contain',
      borderRadius: '4px'
    };

    const itemInfoStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      flex: 1
    };

    const itemTitleStyle: React.CSSProperties = {
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      textDecoration: 'none'
    };

    const itemPriceStyle: React.CSSProperties = {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#e74c3c',
      fontWeight: 'bold'
    };

    const quantityControlsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '0.2rem',
      border: '2px solid #ddd',
      borderRadius: '6px',
      backgroundColor: 'white',
      overflow: 'hidden'
    };

    const quantityButtonStyle: React.CSSProperties = {
      width: isMobile ? '35px' : '40px',
      height: isMobile ? '35px' : '40px',
      border: 'none',
      backgroundColor: '#f8f9fa',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '1.2rem' : '1.4rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      transition: 'all 0.2s ease',
      userSelect: 'none'
    };

    const quantityButtonDisabledStyle: React.CSSProperties = {
      ...quantityButtonStyle,
      backgroundColor: '#e9ecef',
      color: '#adb5bd',
      cursor: 'not-allowed'
    };

    const quantityInputStyle: React.CSSProperties = {
      width: isMobile ? '45px' : '50px',
      height: isMobile ? '35px' : '40px',
      padding: '0',
      textAlign: 'center',
      border: 'none',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      backgroundColor: 'white',
      outline: 'none'
    };

    const removeButtonStyle: React.CSSProperties = {
      padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: isMobile ? '0.8rem' : '0.9rem'
    };

    const totalSectionStyle: React.CSSProperties = {
      marginTop: '2rem',
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      textAlign: 'right'
    };

    const totalItemsStyle: React.CSSProperties = {
      fontSize: '1.2rem',
      marginBottom: '0.5rem'
    };

    const totalPriceStyle: React.CSSProperties = {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#e74c3c'
    };

    const continueShoppingStyle: React.CSSProperties = {
      display: 'inline-block',
      marginTop: '1rem',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#3498db',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '4px',
      fontSize: '1rem'
    };

    const mobileActionsStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    };

    if (cartStore.isEmpty) {
      return (
        <div style={containerStyle}>
          <Link to="/" style={backLinkStyle}>
            ← Continue Shopping
          </Link>
          <div style={emptyCartStyle}>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link 
              to="/" 
              style={{
                ...continueShoppingStyle,
                backgroundColor: '#27ae60',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#219a52';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#27ae60';
              }}
            >
              🛍️ Browse Products
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div style={containerStyle}>
        <Link to="/" style={backLinkStyle}>
          ← Continue Shopping
        </Link>
        
        <header style={headerStyle}>
          <h1 style={titleStyle}>Shopping Cart ({items.length} items)</h1>
          <button 
            onClick={this.handleClearCart}
            style={clearButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c0392b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#e74c3c';
            }}
          >
            Clear Cart
          </button>
        </header>

        {hasItems && (
          <div>
            {items.map((item: CartItem) => (
            <div key={item.product.id} style={cartItemStyle}>
              {isMobile ? (
                // Mobile Layout
                <div style={mobileItemLayoutStyle}>
                  <div style={mobileItemRowStyle}>
                    <img 
                      src={item.product.image} 
                      alt={item.product.title}
                      style={itemImageStyle}
                    />
                    <div style={itemInfoStyle}>
                      <Link 
                        to={`/product/${item.product.id}/details`}
                        style={itemTitleStyle}
                      >
                        {item.product.title}
                      </Link>
                      <div style={itemPriceStyle}>
                        ${item.product.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                  
                  <div style={mobileActionsStyle}>
                    <div style={quantityControlsStyle}>
                      <button
                        onClick={() => this.handleUpdateQuantity(item.product.id, item.quantity - 1)}
                        style={item.quantity <= 1 ? quantityButtonDisabledStyle : quantityButtonStyle}
                        disabled={item.quantity <= 1}
                        onMouseEnter={(e) => {
                          if (item.quantity > 1) {
                            e.currentTarget.style.backgroundColor = '#e9ecef';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (item.quantity > 1) {
                            e.currentTarget.style.backgroundColor = '#f8f9fa';
                          }
                        }}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => this.handleUpdateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                        style={quantityInputStyle}
                        onFocus={(e) => e.target.select()}
                      />
                      <button
                        onClick={() => this.handleUpdateQuantity(item.product.id, item.quantity + 1)}
                        style={quantityButtonStyle}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e9ecef';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8f9fa';
                        }}
                      >
                        +
                      </button>
                    </div>
                    
                    <div style={{
                      ...itemPriceStyle,
                      fontSize: '1.1rem'
                    }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    
                    <button
                      onClick={() => this.handleRemoveItem(item.product.id)}
                      style={removeButtonStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#c0392b';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#e74c3c';
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                // Desktop Layout
                <>
                  <img 
                    src={item.product.image} 
                    alt={item.product.title}
                    style={itemImageStyle}
                  />
                  
                  <div style={itemInfoStyle}>
                    <Link 
                      to={`/product/${item.product.id}/details`}
                      style={itemTitleStyle}
                    >
                      {item.product.title}
                    </Link>
                    <div style={itemPriceStyle}>
                      ${item.product.price.toFixed(2)} each
                    </div>
                  </div>
                  
                  <div style={quantityControlsStyle}>
                    <button
                      onClick={() => this.handleUpdateQuantity(item.product.id, item.quantity - 1)}
                      style={item.quantity <= 1 ? quantityButtonDisabledStyle : quantityButtonStyle}
                      disabled={item.quantity <= 1}
                      onMouseEnter={(e) => {
                        if (item.quantity > 1) {
                          e.currentTarget.style.backgroundColor = '#e9ecef';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (item.quantity > 1) {
                          e.currentTarget.style.backgroundColor = '#f8f9fa';
                        }
                      }}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => this.handleUpdateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                      style={quantityInputStyle}
                      onFocus={(e) => e.target.select()}
                    />
                    <button
                      onClick={() => this.handleUpdateQuantity(item.product.id, item.quantity + 1)}
                      style={quantityButtonStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e9ecef';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                      }}
                    >
                      +
                    </button>
                  </div>
                  
                  <div style={itemPriceStyle}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button
                    onClick={() => this.handleRemoveItem(item.product.id)}
                    style={removeButtonStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#c0392b';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#e74c3c';
                    }}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
            ))}
          </div>
        )}

        {hasItems && (
          <div style={totalSectionStyle}>
            <div style={totalItemsStyle}>
              Total Items: {cartStore.totalItems}
            </div>
            <div style={totalPriceStyle}>
              Total: ${cartStore.totalValue.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const CartPage: React.FC = observer(() => {
  const { cartStore } = useStore();
  return <CartPageClass cartStore={cartStore} />;
});

export default CartPage;