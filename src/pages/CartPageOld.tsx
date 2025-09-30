import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../context/StoreContext';
import { CartItem } from '../types';

interface CartPageProps {
  cartStore: any;
}

class CartPageClass extends Component<CartPageProps> {
  handleUpdateQuantity = (productId: number, quantity: number) => {
    this.props.cartStore.updateQuantity(productId, quantity);
  };

  handleRemoveItem = (productId: number) => {
    this.props.cartStore.removeFromCart(productId);
  };

  handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      this.props.cartStore.clearCart();
    }
  };

  render() {
    const { cartStore } = this.props;
    const items: CartItem[] = cartStore.items;

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
      fontSize: '2rem',
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
      gridTemplateColumns: '100px 1fr auto auto auto',
      gap: '1rem',
      alignItems: 'center',
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginBottom: '1rem',
      backgroundColor: 'white'
    };

    const cartItemMobileStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginBottom: '1rem',
      backgroundColor: 'white'
    };

    const mobileItemRowStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    };

    const mobileActionsStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    };

    const itemImageStyle: React.CSSProperties = {
      width: '80px',
      height: '80px',
      objectFit: 'contain',
      borderRadius: '4px'
    };

    const itemInfoStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    };

    const itemTitleStyle: React.CSSProperties = {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#2c3e50'
    };

    const itemPriceStyle: React.CSSProperties = {
      fontSize: '1rem',
      color: '#e74c3c',
      fontWeight: 'bold'
    };

    const quantityControlsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    };

    const quantityButtonStyle: React.CSSProperties = {
      width: '30px',
      height: '30px',
      border: '1px solid #ddd',
      backgroundColor: 'white',
      cursor: 'pointer',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    const quantityInputStyle: React.CSSProperties = {
      width: '60px',
      padding: '0.25rem',
      textAlign: 'center',
      border: '1px solid #ddd',
      borderRadius: '4px'
    };

    const removeButtonStyle: React.CSSProperties = {
      padding: '0.5rem 1rem',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9rem'
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

    if (items.length === 0) {
      return (
        <div style={containerStyle}>
          <Link to="/" style={backLinkStyle}>
            ← Continue Shopping
          </Link>
          <div style={emptyCartStyle}>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/" style={continueShoppingStyle}>
              Browse Products
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

        <div>
          {items.map((item: CartItem) => (
            <div key={item.product.id}>
              {/* Desktop Layout */}
              <div 
                style={{
                  ...cartItemStyle,
                  display: window.innerWidth > 768 ? 'grid' : 'none'
                }}
              >
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
                    style={quantityButtonStyle}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => this.handleUpdateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                    style={quantityInputStyle}
                  />
                  <button
                    onClick={() => this.handleUpdateQuantity(item.product.id, item.quantity + 1)}
                    style={quantityButtonStyle}
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
              </div>

              {/* Mobile Layout */}
              <div 
                style={{
                  ...cartItemMobileStyle,
                  display: window.innerWidth <= 768 ? 'flex' : 'none'
                }}
              >
                <div style={mobileItemRowStyle}>
                  <img 
                    src={item.product.image} 
                    alt={item.product.title}
                    style={{
                      ...itemImageStyle,
                      width: '60px',
                      height: '60px'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <Link 
                      to={`/product/${item.product.id}/details`}
                      style={{
                        ...itemTitleStyle,
                        fontSize: '1rem',
                        textDecoration: 'none'
                      }}
                    >
                      {item.product.title}
                    </Link>
                    <div style={{
                      ...itemPriceStyle,
                      fontSize: '0.9rem'
                    }}>
                      ${item.product.price.toFixed(2)} each
                    </div>
                  </div>
                </div>
                
                <div style={mobileActionsStyle}>
                  <div style={quantityControlsStyle}>
                    <button
                      onClick={() => this.handleUpdateQuantity(item.product.id, item.quantity - 1)}
                      style={quantityButtonStyle}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => this.handleUpdateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                      style={{
                        ...quantityInputStyle,
                        width: '50px'
                      }}
                    />
                    <button
                      onClick={() => this.handleUpdateQuantity(item.product.id, item.quantity + 1)}
                      style={quantityButtonStyle}
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
                    style={{
                      ...removeButtonStyle,
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.8rem'
                    }}
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
            </div>
          ))}
        </div>

        <div style={totalSectionStyle}>
          <div style={totalItemsStyle}>
            Total Items: {cartStore.totalItems}
          </div>
          <div style={totalPriceStyle}>
            Total: ${cartStore.totalValue.toFixed(2)}
          </div>
        </div>
      </div>
    );
  }
}

const CartPage: React.FC = observer(() => {
  const { cartStore } = useStore();
  return <CartPageClass cartStore={cartStore} />;
});

export default CartPage;