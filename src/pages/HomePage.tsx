import React, { Component } from 'react';
import { ApiService } from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface HomePageState {
  products: Product[];
  categories: string[];
  selectedCategories: string[];
  sortBy: string;
  loading: boolean;
  error: string | null;
}

class HomePage extends Component<{}, HomePageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      selectedCategories: [],
      sortBy: 'default',
      loading: true,
      error: null
    };
  }

  async componentDidMount() {
    await this.loadInitialData();
  }

  loadInitialData = async () => {
    try {
      this.setState({ loading: true, error: null });
      const [products, categories] = await Promise.all([
        ApiService.fetchProducts(),
        ApiService.fetchCategories()
      ]);
      this.setState({ 
        products, 
        categories, 
        loading: false 
      });
    } catch (error) {
      this.setState({ 
        error: 'Failed to load data. Please try again later.',
        loading: false 
      });
    }
  };

  handleCategoryChange = async (category: string) => {
    const { selectedCategories } = this.state;
    let newSelectedCategories: string[];
    
    if (selectedCategories.includes(category)) {
      newSelectedCategories = selectedCategories.filter(cat => cat !== category);
    } else {
      newSelectedCategories = [...selectedCategories, category];
    }
    
    this.setState({ selectedCategories: newSelectedCategories });
    await this.fetchFilteredProducts(newSelectedCategories, this.state.sortBy);
  };

  handleSortChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value;
    this.setState({ sortBy });
    await this.fetchFilteredProducts(this.state.selectedCategories, sortBy);
  };

  fetchFilteredProducts = async (categories: string[], sortBy: string) => {
    try {
      this.setState({ loading: true, error: null });
      const products = await ApiService.fetchProducts(
        categories.length > 0 ? categories : undefined,
        sortBy
      );
      this.setState({ products, loading: false });
    } catch (error) {
      this.setState({ 
        error: 'Failed to filter products. Please try again.',
        loading: false 
      });
    }
  };

  render() {
    const { products, categories, selectedCategories, sortBy, loading, error } = this.state;

    const containerStyle: React.CSSProperties = {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    };

    const headerStyle: React.CSSProperties = {
      textAlign: 'center',
      marginBottom: window.innerWidth <= 768 ? '1.5rem' : '2rem'
    };

    const filtersStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '2rem',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      alignItems: window.innerWidth <= 768 ? 'flex-start' : 'center',
      flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
    };

    const filterGroupStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      alignItems: 'center'
    };

    const labelStyle: React.CSSProperties = {
      fontWeight: 'bold',
      marginRight: '0.5rem'
    };

    const checkboxStyle: React.CSSProperties = {
      margin: '0 0.25rem 0 0.5rem'
    };

    const selectStyle: React.CSSProperties = {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem'
    };

    const productsGridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768 
        ? 'repeat(auto-fit, minmax(250px, 1fr))' 
        : 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: window.innerWidth <= 768 ? '1rem' : '2rem',
      marginTop: '2rem'
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

    const noProductsStyle: React.CSSProperties = {
      textAlign: 'center',
      padding: '2rem',
      fontSize: '1.2rem',
      color: '#666'
    };

    if (loading) {
      return (
        <div style={containerStyle}>
          <div style={loadingStyle}>Loading products...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div style={containerStyle}>
          <div style={errorStyle}>{error}</div>
        </div>
      );
    }

    return (
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h1>Our Products</h1>
          <p>Discover our wide range of quality products</p>
        </header>

        <div style={filtersStyle}>
          <div style={filterGroupStyle}>
            <span style={labelStyle}>Categories:</span>
            {categories.map(category => (
              <label key={category} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => this.handleCategoryChange(category)}
                  style={checkboxStyle}
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            ))}
          </div>

          <div style={filterGroupStyle}>
            <label style={labelStyle}>Sort by:</label>
            <select value={sortBy} onChange={this.handleSortChange} style={selectStyle}>
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Name: A to Z</option>
              <option value="title-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div style={noProductsStyle}>
            No products found matching your criteria.
          </div>
        ) : (
          <div style={productsGridStyle}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default HomePage;