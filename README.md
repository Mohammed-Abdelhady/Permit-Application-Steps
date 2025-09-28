# 🏛️ AI-Powered Permit Application System

A modern, intelligent permit application platform built with React and TypeScript. This application streamlines the permit submission process through a multi-step form flow with AI-powered assistance, real-time validation, and comprehensive user experience features.

## 📋 Requirements

### System Requirements

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Development Tools

- **VS Code** (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - TypeScript Importer
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

### API Requirements

- **OpenAI API Key**: For AI-powered text suggestions

## 🚀 Getting Started

### 1. OpenAI API Setup

1. **Create OpenAI Account**
   - Visit [https://platform.openai.com/](https://platform.openai.com/)
   - Sign up for a new account

2. **Create Organization**
   - Create a new organization in your OpenAI dashboard
   - Set up billing information

3. **Generate API Key**
   - Navigate to API Keys section
   - Click "Create new secret key"
   - Give it a descriptive name and select your project
   - Copy the generated API key (you won't see it again!)

4. **Configure API Key**
   - Go to API Keys list
   - Click "Edit" on your secret key
   - Set **Permissions** to "Restricted"
   - Enable **Model capabilities** as needed
   - **Important**: Add billing credit to avoid 429 rate limit errors

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` file and add your API key:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_API_BASE_URL=your_backend_api_url
```

### 3. Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

The project includes comprehensive testing setup with unit tests, integration tests, and end-to-end testing.

### Unit Testing (Vitest)

Run unit tests with Vitest:

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

**Test Coverage:**

- Form components (`FormInput`, `FormSelect`, `FormTextArea`)
- Shared components (`TextSuggestionPopup`, `Navigation`)
- Page logic tests for all permit steps
- Custom hooks and utilities

### End-to-End Testing (Playwright)

Run E2E tests with Playwright:

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests without server
npm run test:e2e:no-server

# Run E2E tests with UI
npm run test:e2e:ui

# Debug E2E tests
npm run test:e2e:debug

# Run E2E tests in headed mode
npm run test:e2e:headed

# View E2E test report
npm run test:e2e:report
```

**E2E Test Coverage:**

- Complete permit application flow
- Form interactions and validation
- Navigation between steps
- Accessibility compliance
- Cross-browser compatibility

### Test Structure

```
src/__tests__/
├── components/          # Component unit tests
│   ├── forms/          # Form component tests
│   └── shared/         # Shared component tests
├── pages/              # Page logic tests
└── mocks/              # Test mocks and utilities

e2e/                    # End-to-end tests
├── accessibility.spec.ts
├── permit-application-flow-clean.spec.ts
└── permit-application-final.spec.ts
```

## 📦 Dependencies

### Core Framework

- **React 19.1.1** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript development
- **Vite 7.1.7** - Fast build tool and development server

### State Management & Data Fetching

- **Redux Toolkit 2.9.0** - Modern Redux with less boilerplate
- **React Redux 9.2.0** - React bindings for Redux
- **React Hook Form 7.63.0** - Performant forms with easy validation
- **@hookform/resolvers 5.2.2** - Validation resolvers for React Hook Form

### UI & Styling

- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Framer Motion 12.23.22** - Production-ready motion library
- **Lucide React 0.544.0** - Beautiful & consistent icon toolkit
- **Classnames 2.5.1** - Utility for conditionally joining classNames

### Internationalization

- **i18next 25.5.2** - Internationalization framework
- **react-i18next 16.0.0** - React integration for i18next
- **i18next-browser-languagedetector 8.2.0** - Language detection

### Validation & Utilities

- **Yup 1.7.1** - JavaScript schema validation
- **React Router DOM 7.9.3** - Declarative routing for React

### Development Tools

- **ESLint 9.36.0** - Code linting and quality
- **Prettier 3.6.2** - Code formatting
- **Husky 9.1.7** - Git hooks made easy
- **Lint-staged 16.2.1** - Run linters on staged files

### Testing

- **Vitest 3.2.4** - Fast unit testing framework
- **@testing-library/react 16.3.0** - Simple and complete testing utilities
- **@testing-library/jest-dom 6.8.0** - Custom jest matchers
- **Playwright 1.55.1** - End-to-end testing
- **@axe-core/playwright 4.10.2** - Accessibility testing

## 🐳 Production Deployment

### Docker Compose (Recommended)

The project includes a complete Docker setup with `docker-compose.yml` for easy production deployment.

#### Quick Start

```bash
# Build and start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

#### Available Commands

```bash
# Rebuild and restart (after code changes)
docker-compose up -d --build

# View real-time logs
docker-compose logs -f ai-permit-app

# Stop and remove containers
docker-compose down

# Stop, remove containers and volumes
docker-compose down -v
```

### Production Environment Variables

For production deployment, ensure these environment variables are set:

```env
NODE_ENV=production
VITE_OPENAI_API_KEY=your_production_openai_key
VITE_API_BASE_URL=your_production_api_url
```

### Production Features

- **Multi-stage build** for optimized image size
- **Nginx** for serving static files and handling routing
- **Gzip compression** for better performance
- **Security headers** for enhanced protection
- **Static asset caching** for improved load times
- **Client-side routing support** for React Router
