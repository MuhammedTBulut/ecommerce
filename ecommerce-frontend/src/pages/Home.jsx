import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to E-Commerce Store</h1>
            <p>Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast, reliable delivery.</p>
            {isAuthenticated ? (
              <div className="hero-actions">
                <h2>Welcome back, {user?.fullName}!</h2>
                <Link to="/products" className="btn btn-primary">Shop Now</Link>
              </div>
            ) : (
              <div className="hero-actions">
                <Link to="/register" className="btn btn-primary">Get Started</Link>
                <Link to="/products" className="btn btn-secondary">Browse Products</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Get your orders delivered quickly with our reliable shipping partners.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Shopping</h3>
              <p>Shop with confidence knowing your personal and payment information is protected.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>We offer competitive prices and regular discounts on all our products.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎧</div>
              <h3>24/7 Support</h3>
              <p>Our customer support team is always ready to help you with any questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            <Link to="/products?category=electronics" className="category-card">
              <div className="category-image">📱</div>
              <h3>Electronics</h3>
            </Link>
            <Link to="/products?category=clothing" className="category-card">
              <div className="category-image">👕</div>
              <h3>Clothing</h3>
            </Link>
            <Link to="/products?category=home" className="category-card">
              <div className="category-image">🏠</div>
              <h3>Home & Garden</h3>
            </Link>
            <Link to="/products?category=sports" className="category-card">
              <div className="category-image">⚽</div>
              <h3>Sports</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Shopping?</h2>
            <p>Join thousands of satisfied customers and discover your next favorite product.</p>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;