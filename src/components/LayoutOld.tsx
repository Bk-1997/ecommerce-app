import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../context/StoreContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = observer(({ children }) => {
  const { cartStore } = useStore();
  const location = useLocation();

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
    gap: '1rem'
  };

  const logoStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white'
  };

  const navLinksStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  };

  const linkStyle: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  };

  const activeLinkStyle: React.CSSProperties = {
    ...linkStyle,
    backgroundColor: '#34495e'
  };

  const cartBadgeStyle: React.CSSProperties = {
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    padding: '0.2rem 0.5rem',
    fontSize: '0.8rem',
    marginLeft: '0.5rem',
    minWidth: '1.5rem',
    textAlign: 'center'
  };

  const mainStyle: React.CSSProperties = {
    minHeight: 'calc(100vh - 120px)',
    padding: '2rem'
  };

  const footerStyle: React.CSSProperties = {
    backgroundColor: '#34495e',
    color: 'white',
    padding: '1rem 2rem',
    textAlign: 'center',
    marginTop: 'auto'
  };

  const footerContentStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: window.innerWidth <= 768 ? 'center' : 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    textAlign: window.innerWidth <= 768 ? 'center' : 'left'
  };

  const cartSummaryStyle: React.CSSProperties = {
    display: 'flex',
    gap: window.innerWidth <= 768 ? '1rem' : '2rem',
    alignItems: 'center',
    flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <nav style={navStyle}>
          <Link to="/" style={logoStyle}>
            E-Commerce Store
          </Link>
          <div style={navLinksStyle}>
            <Link 
              to="/" 
              style={location.pathname === '/' ? activeLinkStyle : linkStyle}
            >
              Home
            </Link>
            <Link 
              to="/cart" 
              style={location.pathname === '/cart' ? activeLinkStyle : linkStyle}
            >
              Cart
              {cartStore.totalItems > 0 && (
                <span style={cartBadgeStyle}>{cartStore.totalItems}</span>
              )}
            </Link>
          </div>
        </nav>
      </header>
      
      <main style={mainStyle}>
        {children}
      </main>
      
      <footer style={footerStyle}>
        <div style={footerContentStyle}>
          <div>© 2024 E-Commerce Store. All rights reserved.</div>
          <div style={cartSummaryStyle}>
            <div>Cart Items: {cartStore.totalItems}</div>
            <div>Total: ${cartStore.totalValue.toFixed(2)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default Layout;