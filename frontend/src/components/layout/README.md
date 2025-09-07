# Layout Components

This directory contains the base layout components for the React frontend application. These components provide the foundational structure for the application's user interface.

## Components

### AppLayout
The main layout wrapper that provides the overall application structure.

**Features:**
- Responsive design with mobile-first approach
- Automatic sidebar/mobile menu switching based on screen size
- Handles overlay and body scroll management
- Keyboard navigation support (Escape key)
- Click-outside-to-close functionality

**Usage:**
```tsx
import { AppLayout } from './components/layout'

function MyPage() {
  return (
    <AppLayout>
      <div>Your page content here</div>
    </AppLayout>
  )
}
```

### Header
Top navigation bar with user menu and branding.

**Features:**
- User authentication display
- Dropdown user menu with profile and logout options
- Hamburger menu button for mobile
- Responsive design
- Keyboard navigation support
- ARIA accessibility attributes

**Props:**
- `onMenuToggle: () => void` - Callback for hamburger menu toggle
- `showMenuButton: boolean` - Whether to show the hamburger menu button

### Sidebar
Desktop navigation sidebar with main navigation and quick filters.

**Features:**
- Main navigation with active state highlighting
- Challenge type quick filters
- Responsive icons and labels
- Smooth hover animations
- Accessibility support with proper ARIA labels

**Navigation Items:**
- Dashboard
- Challenges
- My Submissions
- Profile

**Quick Filters:**
- Writing challenges
- Speaking challenges
- Logical challenges

### MobileMenu
Mobile-specific navigation menu with slide-in animation.

**Features:**
- Slide-in animation from left
- User information display
- Full navigation menu
- Challenge type filters
- Close button and overlay
- Prevents body scroll when open
- Keyboard navigation (Escape to close)

**Props:**
- `isOpen: boolean` - Whether the menu is open
- `onClose: () => void` - Callback when menu should close

### LayoutWrapper
Convenience wrapper component for easy integration with routing.

**Usage:**
```tsx
import { LayoutWrapper } from './components/layout'

// In your router
<Route 
  path="/dashboard" 
  element={
    <LayoutWrapper>
      <DashboardPage />
    </LayoutWrapper>
  } 
/>
```

## Responsive Breakpoints

The layout uses a mobile-first responsive design with the following breakpoints:

- **Mobile**: 320px - 767px (single column, hamburger menu)
- **Tablet**: 768px - 1023px (adapted layouts)
- **Desktop**: 1024px+ (full sidebar, multi-column layouts)

## CSS Custom Properties

The layout components use CSS custom properties for consistent theming:

### Layout Dimensions
- `--sidebar-width: 280px`
- `--sidebar-width-collapsed: 64px`
- `--header-height: 64px`
- `--mobile-menu-width: 280px`

### Z-Index Layers
- `--z-dropdown: 1000`
- `--z-sticky: 1020`
- `--z-modal: 1050`

### Animation
- `--duration-fast: 150ms`
- `--duration-normal: 250ms`
- `--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)`

## Accessibility Features

All layout components include comprehensive accessibility support:

- **Keyboard Navigation**: Full keyboard support with proper focus management
- **ARIA Labels**: Descriptive labels for screen readers
- **Semantic HTML**: Proper use of semantic elements (nav, main, aside, etc.)
- **Focus Management**: Visible focus indicators and logical tab order
- **Screen Reader Support**: Proper announcements and navigation

## Integration with Authentication

The layout components integrate with the authentication system:

- Header displays user information when authenticated
- Shows login/register buttons when not authenticated
- User menu provides logout functionality
- Mobile menu displays user avatar and info

## Styling

Each component has its own CSS file with:

- Component-specific styles
- Responsive media queries
- Hover and focus states
- Animation transitions
- Accessibility considerations

## Dependencies

The layout components depend on:

- React 18+
- React Router v6 (for navigation)
- Custom authentication hook (`useAuth`)
- CSS custom properties support

## Browser Support

The layout components support:

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties
- Modern JavaScript features (ES6+)

## Performance Considerations

- Components use React.memo where appropriate
- CSS animations use transform and opacity for better performance
- Event listeners are properly cleaned up
- Responsive images and lazy loading ready

## Testing

The layout components can be tested with:

- Unit tests for component rendering
- Integration tests for user interactions
- Accessibility tests with jest-axe
- Responsive design tests across breakpoints

## Future Enhancements

Potential future improvements:

- Theme switching (dark/light mode)
- Customizable sidebar width
- Additional navigation patterns
- Enhanced mobile gestures
- Progressive Web App features