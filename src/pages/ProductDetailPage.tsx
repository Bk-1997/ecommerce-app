import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ApiService } from '../services/api';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductDetailPageProps {
  productId: string;
}

interface ProductDetailPageState {
  product: Product | null;
  loading: boolean;
  error: string | null;
  quantity: number;
}

class ProductDetailPageClass extends Component<ProductDetailPageProps & { cartStore: any }, ProductDetailPageState> {
  constructor(props: ProductDetailPageProps & { cartStore: any }) {
    super(props);
    this.state = {
      product: null,
      loading: true,
      error: null,
      quantity: 1
    };
  }

  async componentDidMount() {
    await this.loadProduct();
  }

  async componentDidUpdate(prevProps: ProductDetailPageProps & { cartStore: any }) {
    if (prevProps.productId !== this.props.productId) {
      await this.loadProduct();
    }
  }

  loadProduct = async () => {
    try {
      this.setState({ loading: true, error: null });
      const product = await ApiService.fetchProductById(parseInt(this.props.productId));
      this.setState({ product, loading: false });
    } catch (error) {
      this.setState({ 
        error: 'Failed to load product. Please try again later.',
        loading: false 
      });
    }
  };

  handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Math.max(1, parseInt(event.target.value) || 1);
    this.setState({ quantity });
  };

  handleQuantityIncrement = () => {
    this.setState(prevState => ({ quantity: prevState.quantity + 1 }));
  };

  handleQuantityDecrement = () => {
    this.setState(prevState => ({ 
      quantity: Math.max(1, prevState.quantity - 1) 
    }));
  };

  handleAddToCart = () => {
    const { product, quantity } = this.state;
    if (product) {
      this.props.cartStore.addToCart(product, quantity);
      this.setState({ quantity: 1 });
      const button = document.querySelector('[data-add-to-cart]') as HTMLButtonElement;
      if (button) {
        const originalText = button.textContent;
        button.textContent = '✓ Added to Cart!';
        button.style.backgroundColor = '#27ae60';
        setTimeout(() => {
          button.textContent = originalText;
          button.style.backgroundColor = '#27ae60';
        }, 2000);
      }
    }
  };

  render() {
    const { product, loading, error, quantity } = this.state;

    const containerStyle: React.CSSProperties = {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
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

    const productContainerStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
      gap: window.innerWidth <= 768 ? '2rem' : '3rem',
      alignItems: 'start'
    };

    const imageStyle: React.CSSProperties = {
      width: '100%',
      maxWidth: '500px',
      height: 'auto',
      objectFit: 'contain',
      borderRadius: '8px'
    };

    const productInfoStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    };

    const titleStyle: React.CSSProperties = {
      fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      lineHeight: '1.3'
    };

    const priceStyle: React.CSSProperties = {
      fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem',
      fontWeight: 'bold',
      color: '#e74c3c'
    };

    const ratingStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '1.1rem'
    };

    const starStyle: React.CSSProperties = {
      color: '#f39c12'
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#555'
    };

    const categoryStyle: React.CSSProperties = {
      display: 'inline-block',
      padding: '0.5rem 1rem',
      backgroundColor: '#ecf0f1',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: '500',
      color: '#2c3e50'
    };

    const addToCartSectionStyle: React.CSSProperties = {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      padding: '1.5rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      marginTop: '1rem',
      flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
      textAlign: window.innerWidth <= 768 ? 'center' : 'left'
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
      width: '40px',
      height: '40px',
      border: 'none',
      backgroundColor: '#f8f9fa',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.4rem',
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
      width: '60px',
      height: '40px',
      padding: '0',
      textAlign: 'center',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      backgroundColor: 'white',
      outline: 'none'
    };

    const addToCartButtonStyle: React.CSSProperties = {
      padding: '0.75rem 2rem',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    };

    const loadingStyle: React.CSSProperties = {
      textAlign: 'center',
      padding: '2rem',
      fontSize: '1.2rem'
    };

    const errorStyle: React.CSSProperties = {
      textAlign: 'center',
      padding: '2rem',
      fontSize: '1.2rem',
      color: '#e74c3c'
    };



    if (loading) {
      return (
        <div style={containerStyle}>
          <div style={loadingStyle}>Loading product...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div style={containerStyle}>
          <Link to="/" style={backLinkStyle}>
            ← Back to Products
          </Link>
          <div style={errorStyle}>{error}</div>
        </div>
      );
    }

    if (!product) {
      return (
        <div style={containerStyle}>
          <Link to="/" style={backLinkStyle}>
            ← Back to Products
          </Link>
          <div style={errorStyle}>Product not found</div>
        </div>
      );
    }

    return (
      <div style={containerStyle}>
        <Link to="/" style={backLinkStyle}>
          ← Back to Products
        </Link>
        
        <div style={productContainerStyle}>
          <div>
            <img 
              src={product.image} 
              alt={product.title} 
              style={imageStyle}
            />
          </div>
          
          <div style={productInfoStyle}>
            <h1 style={titleStyle}>{product.title}</h1>
            
            <div style={ratingStyle}>
              <span style={starStyle}>★</span>
              <span>{product.rating.rate}</span>
              <span>({product.rating.count} reviews)</span>
            </div>
            
            <div style={priceStyle}>${product.price.toFixed(2)}</div>
            
            <div style={categoryStyle}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </div>
            
            <p style={descriptionStyle}>{product.description}</p>
            
            <div style={addToCartSectionStyle}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: window.innerWidth <= 768 ? 'center' : 'flex-start' }}>
                <label style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  Quantity:
                </label>
                <div style={quantityControlsStyle}>
                  <button
                    onClick={this.handleQuantityDecrement}
                    style={quantity <= 1 ? quantityButtonDisabledStyle : quantityButtonStyle}
                    disabled={quantity <= 1}
                    onMouseEnter={(e) => {
                      if (quantity > 1) {
                        e.currentTarget.style.backgroundColor = '#e9ecef';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (quantity > 1) {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                      }
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={this.handleQuantityChange}
                    style={quantityInputStyle}
                    onFocus={(e) => e.target.select()}
                  />
                  <button
                    onClick={this.handleQuantityIncrement}
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
              </div>
              
              <button
                data-add-to-cart
                onClick={this.handleAddToCart}
                style={addToCartButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#219a52';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#27ae60';
                }}
              >
                Add to My Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ProductDetailPage: React.FC<{ productId: string }> = observer(({ productId }) => {
  const { cartStore } = useStore();
  return <ProductDetailPageClass productId={productId} cartStore={cartStore} />;
});

export default ProductDetailPage;