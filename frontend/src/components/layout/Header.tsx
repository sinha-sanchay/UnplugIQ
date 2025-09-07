import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import './Header.css'

interface HeaderProps {
  onMenuToggle: () => void
  showMenuButton: boolean
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, showMenuButton }) => {
  const { user, isAuthenticated, logout } = useAuth()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close user menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  return (
    <header className="header" role="banner">
      <div className="header-content">
        {/* Left section - Menu button and logo */}
        <div className="header-left">
          {showMenuButton && (
            <button
              className="hamburger-button"
              onClick={onMenuToggle}
              aria-label="Toggle navigation menu"
              aria-expanded="false"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          )}
          
          <div className="header-logo">
            <h1 className="logo-text">ChallengeHub</h1>
          </div>
        </div>

        {/* Right section - User menu */}
        <div className="header-right">
          {isAuthenticated && user ? (
            <div className="user-menu" ref={userMenuRef}>
              <button
                className="user-menu-trigger"
                onClick={toggleUserMenu}
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                <div className="user-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.username}</span>
                <svg
                  className={`chevron-icon ${isUserMenuOpen ? 'rotated' : ''}`}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* User dropdown menu */}
              <div className={`user-dropdown ${isUserMenuOpen ? 'open' : ''}`}>
                <div className="user-info">
                  <div className="user-info-name">{user.username}</div>
                  <div className="user-info-email">{user.email}</div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <nav className="dropdown-nav" role="navigation" aria-label="User menu">
                  <a href="/profile" className="dropdown-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                        fill="currentColor"
                      />
                      <path
                        d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z"
                        fill="currentColor"
                      />
                    </svg>
                    Profile
                  </a>
                  
                  <button className="dropdown-item" onClick={handleLogout}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 2H2V14H6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 6L14 10L10 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 10H6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Logout
                  </button>
                </nav>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <a href="/login" className="auth-button login-button">
                Login
              </a>
              <a href="/register" className="auth-button register-button">
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}