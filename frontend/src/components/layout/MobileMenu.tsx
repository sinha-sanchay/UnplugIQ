import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './MobileMenu.css'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  badge?: string | number
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { user, isAuthenticated } = useAuth()

  // Close menu on route change
  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 4C3 3.44772 3.44772 3 4 3H7C7.55228 3 8 3.44772 8 4V7C8 7.55228 7.55228 8 7 8H4C3.44772 8 3 7.55228 3 7V4Z"
            fill="currentColor"
          />
          <path
            d="M12 4C12 3.44772 12.4477 3 13 3H16C16.5523 3 17 3.44772 17 4V7C17 7.55228 16.5523 8 16 8H13C12.4477 8 12 7.55228 12 7V4Z"
            fill="currentColor"
          />
          <path
            d="M3 13C3 12.4477 3.44772 12 4 12H7C7.55228 12 8 12.4477 8 13V16C8 16.5523 7.55228 17 7 17H4C3.44772 17 3 16.5523 3 16V13Z"
            fill="currentColor"
          />
          <path
            d="M12 13C12 12.4477 12.4477 12 13 12H16C16.5523 12 17 12.4477 17 13V16C17 16.5523 16.5523 17 16 17H13C12.4477 17 12 16.5523 12 16V13Z"
            fill="currentColor"
          />
        </svg>
      )
    },
    {
      id: 'challenges',
      label: 'Challenges',
      href: '/challenges',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: 'submissions',
      label: 'My Submissions',
      href: '/submissions',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 2C9 1.44772 9.44772 1 10 1H14C14.5523 1 15 1.44772 15 2V4H17C17.5523 4 18 4.44772 18 5V17C18 17.5523 17.5523 18 17 18H3C2.44772 18 2 17.5523 2 17V5C2 4.44772 2.44772 4 3 4H5V2C5 1.44772 5.44772 1 6 1H10C10.5523 1 11 1.44772 11 2V4H13V2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 8L8 10L14 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      href: '/profile',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
            fill="currentColor"
          />
          <path
            d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
            fill="currentColor"
          />
        </svg>
      )
    }
  ]

  const isActiveRoute = (href: string): boolean => {
    if (href === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <aside 
      className={`mobile-menu ${isOpen ? 'open' : ''}`}
      role="navigation" 
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <div className="mobile-menu-content">
        {/* Header */}
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo">
            <h2 className="logo-text">ChallengeHub</h2>
          </div>
          <button
            className="mobile-menu-close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* User info */}
        {isAuthenticated && user && (
          <div className="mobile-menu-user">
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">{user.username}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="mobile-menu-nav">
          <ul className="mobile-nav-list" role="list">
            {navigationItems.map((item) => (
              <li key={item.id} className="mobile-nav-item">
                <a
                  href={item.href}
                  className={`mobile-nav-link ${isActiveRoute(item.href) ? 'active' : ''}`}
                  aria-current={isActiveRoute(item.href) ? 'page' : undefined}
                >
                  <span className="mobile-nav-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="mobile-nav-label">{item.label}</span>
                  {item.badge && (
                    <span className="mobile-nav-badge" aria-label={`${item.badge} items`}>
                      {item.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Challenge types */}
        <div className="mobile-menu-section">
          <h3 className="mobile-section-title">Challenge Types</h3>
          <ul className="mobile-filter-list" role="list">
            <li className="mobile-filter-item">
              <a href="/challenges?type=WRITING" className="mobile-filter-link">
                <span className="filter-dot writing" aria-hidden="true"></span>
                <span className="filter-label">Writing</span>
              </a>
            </li>
            <li className="mobile-filter-item">
              <a href="/challenges?type=SPEAKING" className="mobile-filter-link">
                <span className="filter-dot speaking" aria-hidden="true"></span>
                <span className="filter-label">Speaking</span>
              </a>
            </li>
            <li className="mobile-filter-item">
              <a href="/challenges?type=LOGICAL" className="mobile-filter-link">
                <span className="filter-dot logical" aria-hidden="true"></span>
                <span className="filter-label">Logical</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mobile-menu-footer">
          <div className="mobile-footer-text">
            <span className="app-version">v1.0.0</span>
          </div>
        </div>
      </div>
    </aside>
  )
}