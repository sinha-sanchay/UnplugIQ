# React Frontend UI

A modern React frontend application for the Challenge Platform, built with TypeScript, Vite, and modern development tools.

## Features

- ⚡️ **Vite** - Fast build tool and development server
- ⚛️ **React 18** - Latest React with concurrent features
- 🔷 **TypeScript** - Type safety and better developer experience
- 🎨 **CSS Modules** - Scoped styling with modern CSS features
- 🧪 **Vitest** - Fast unit testing with React Testing Library
- 📏 **ESLint** - Code linting with TypeScript support
- 💅 **Prettier** - Code formatting
- 🔄 **React Router** - Client-side routing
- 📡 **Axios** - HTTP client for API communication

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Input, Modal)
│   ├── forms/          # Form-specific components
│   └── layout/         # Layout components (Header, Sidebar)
├── pages/              # Page-level components
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── context/            # React Context providers
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
└── styles/             # Global styles and CSS modules
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Update environment variables in `.env.local` as needed

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run validate` - Run all checks (type-check, lint, test, format)
- `npm run clean` - Clean build artifacts

### API Integration

The frontend connects to the Spring Boot backend API running on `http://localhost:8080`. 

API endpoints are configured in `src/utils/constants.ts` and can be overridden via environment variables.

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/*` - `src/*`
- `@/components/*` - `src/components/*`
- `@/pages/*` - `src/pages/*`
- `@/hooks/*` - `src/hooks/*`
- `@/services/*` - `src/services/*`
- `@/context/*` - `src/context/*`
- `@/types/*` - `src/types/*`
- `@/utils/*` - `src/utils/*`
- `@/styles/*` - `src/styles/*`

### Testing

The project uses Vitest with React Testing Library for testing:

- Unit tests for components and utilities
- Integration tests for user flows
- Accessibility testing with jest-axe (to be added)

### Code Quality

- **ESLint** - Configured with TypeScript and React rules
- **Prettier** - Consistent code formatting
- **TypeScript** - Strict type checking enabled
- **Husky** - Git hooks for pre-commit validation (to be added)

### Browser Support

- Modern browsers with ES2020 support
- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api` |
| `VITE_APP_NAME` | Application name | `Challenge Platform` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |
| `VITE_DEV_MODE` | Development mode flag | `true` |

## Contributing

1. Follow the existing code style and conventions
2. Write tests for new features
3. Run `npm run validate` before committing
4. Use conventional commit messages

## License

This project is part of the Challenge Platform application.