import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = getCartItemCount();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo-link">
              <h1>E-Commerce</h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            {isAuthenticated && (
              <>
                <Link to="/orders" className="nav-link">Orders</Link>
                <Link to="/support" className="nav-link">Support</Link>
                {isAdmin && (
                  <Link to="/admin" className="nav-link">Admin</Link>
                )}
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            {/* Cart */}
            <Link to="/cart" className="cart-link">
              <span className="cart-icon">🛒</span>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="user-menu">
                <button 
                  className="user-button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span className="user-icon">👤</span>
                  <span className="user-name">{user?.fullName}</span>
                </button>
                <div className={`user-dropdown ${isMenuOpen ? 'dropdown-open' : ''}`}>
                  <Link to="/profile" className="dropdown-link">Profile</Link>
                  <Link to="/orders" className="dropdown-link">My Orders</Link>
                  <button onClick={handleLogout} className="dropdown-link">Logout</button>
                </div>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="auth-link">Login</Link>
                <Link to="/register" className="auth-link auth-link-primary">Register</Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;