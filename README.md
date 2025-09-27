# 🛍️ E-Commerce Web Application

A modern, responsive e-commerce web application built with React, TypeScript, and MobX. Features product browsing, detailed product views, cart management, and real-time updates.

![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue.svg)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF.svg)
![MobX](https://img.shields.io/badge/MobX-6.10.2-orange.svg)

## ✨ Features

### 🏠 **Home Page (Product Listing)**
- **Grid Layout**: Responsive product grid with essential details (name, price, thumbnail, rating)
- **Category Filtering**: Multi-select category filters with real-time API calls
- **Sorting Options**: Sort by price (ascending/descending) and name (A-Z/Z-A)
- **Dynamic Loading**: Products fetched from external API with loading states
- **Responsive Design**: Mobile-friendly grid layout

### 📱 **Product Detail Page**
- **Dynamic Routing**: Clean URLs using `/product/:id/details` pattern
- **Complete Product Info**: Title, description, price, image, rating, and category
- **Interactive Quantity Controls**: Professional +/- buttons with validation
- **Add to Cart**: Enhanced functionality with visual feedback
- **Responsive Layout**: Stacked on mobile, side-by-side on desktop

### 🛒 **Shopping Cart**
- **Real-time Updates**: Cart badge updates instantly when items are added
- **Quantity Management**: Professional quantity controls with +/- buttons
- **Item Removal**: Confirmation dialogs prevent accidental removal
- **Persistent Storage**: Cart state saved to localStorage
- **Responsive Design**: Mobile-optimized layout with touch-friendly controls
- **Empty State**: Helpful "Browse Products" button when cart is empty

### 🧭 **Navigation & UI**
- **Sticky Header**: Navigation bar with cart badge showing item count
- **Responsive Footer**: Cart summary with total items and value
- **Visual Feedback**: Button animations and hover effects
- **Loading States**: Smooth loading indicators for API calls
- **Error Handling**: Graceful error messages and fallbacks

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version 16.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   # If using Git
   git clone <your-repository-url>
   cd ecommerce-app
   
   # Or download and extract the ZIP file, then navigate to the project folder
   ```

2. **Navigate to Project Directory**
   ```bash
   cd ecommerce-app
   ```

3. **Install Dependencies**
   ```bash
   npm install
   # or if you prefer yarn
   yarn install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or with yarn
   yarn dev
   ```

5. **Open in Browser**
   
   The application will automatically open in your default browser, or you can manually visit:
   ```
   http://localhost:5173/
   ```

   You should see the e-commerce application with products loaded from the Fake Store API.

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run preview` | Preview production build locally |

## 🛠️ Technologies Used

### **Frontend Framework**
- **React 18** - Modern UI library with hooks and functional components
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Lightning-fast build tool and development server

### **Routing & Navigation**
- **React Router DOM** - Client-side routing with dynamic URLs
- **Browser History API** - Clean URLs without hash routing

### **State Management**
- **MobX** - Reactive state management for cart functionality
- **React Context API** - Global state provider for MobX stores
- **localStorage** - Persistent cart storage across browser sessions

### **Styling & UI**
- **Inline Styles** - Component-scoped styling with TypeScript support
- **Responsive Design** - Mobile-first approach with breakpoint-based layouts
- **CSS Animations** - Smooth transitions and hover effects

### **API Integration**
- **Fake Store API** - External REST API for product data
- **Fetch API** - Native browser API for HTTP requests
- **Error Handling** - Comprehensive error boundaries and fallbacks

## 📁 Project Structure

```
ecommerce-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx       # Main layout with header/footer
│   │   └── ProductCard.tsx  # Product card component
│   │
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx     # Product listing page
│   │   ├── ProductDetailPage.tsx # Product details page
│   │   └── CartPage.tsx     # Shopping cart page
│   │
│   ├── store/               # MobX state management
│   │   ├── CartStore.ts     # Cart state and actions
│   │   └── index.ts         # Store exports
│   │
│   ├── context/             # React Context providers
│   │   └── StoreContext.tsx # MobX store provider
│   │
│   ├── services/            # API services
│   │   └── api.ts           # Fake Store API integration
│   │
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Product, Cart, and other types
│   │
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
│
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
└── README.md                # This file
```

## 🌐 API Integration

The application integrates with [Fake Store API](https://fakestoreapi.com/) for:

- **Products**: `GET /products` - Fetch all products
- **Categories**: `GET /products/categories` - Get available categories
- **Category Products**: `GET /products/category/{category}` - Products by category
- **Single Product**: `GET /products/{id}` - Individual product details

All API calls include error handling and loading states for optimal user experience.

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile (≤768px)**: Stacked layouts, touch-friendly buttons, smaller fonts
- **Tablet (769px-1024px)**: Balanced layouts with medium spacing
- **Desktop (≥1025px)**: Multi-column layouts with optimal spacing

## 🔧 Development

### **Code Quality**
- **ESLint** - Code linting with React and TypeScript rules
- **TypeScript** - Strict type checking enabled
- **Component Structure** - Consistent component patterns

### **Performance**
- **Vite HMR** - Hot module replacement for fast development
- **Code Splitting** - Automatic route-based code splitting
- **Lazy Loading** - Images loaded on demand

### **State Management**
- **MobX Observables** - Reactive data with automatic UI updates
- **Computed Values** - Derived state calculations
- **Actions** - Structured state mutations

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### **Preview Production Build**
```bash
npm run preview
```

Test the production build locally before deployment.

### **Deployment Options**
- **Vercel** - Connect your Git repository for automatic deployments
- **Netlify** - Drag and drop the `dist/` folder
- **GitHub Pages** - Use GitHub Actions for automated deployment
- **Firebase Hosting** - Deploy with Firebase CLI

## 🐛 Troubleshooting

### **Common Issues**

1. **Port 5173 already in use**
   ```bash
   # Kill the process or use a different port
   npm run dev -- --port 3000
   ```

2. **Dependencies not installing**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

4. **API requests failing**
   - Check internet connection
   - Verify Fake Store API is accessible: https://fakestoreapi.com/products

### **Development Tips**

- Use browser developer tools to inspect network requests
- Check the console for any JavaScript errors
- Use React Developer Tools extension for component debugging
- MobX Developer Tools for state inspection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Future Enhancements

- [ ] User authentication and profiles
- [ ] Product search functionality
- [ ] Wishlist/favorites feature
- [ ] Order history and tracking
- [ ] Payment integration
- [ ] Product reviews and ratings
- [ ] Admin panel for product management
- [ ] Multi-language support
- [ ] Dark mode theme

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [Issues](../../issues) on GitHub
3. Create a new issue with detailed information about your problem

---

**Happy Shopping! 🛍️**
