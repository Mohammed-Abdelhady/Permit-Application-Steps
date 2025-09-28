# Project Structure

This project follows a well-organized folder structure for better maintainability and scalability.

## 📁 Folder Structure

````
src/
├── components/           # Reusable UI components
│   ├── shared/          # Shared components across the app
│   │   ├── ProgressIndicator.tsx  # Smart progress indicator with dynamic steps
│   │   └── Navigation.tsx         # Configurable navigation component
│   └── index.ts         # Component exports
├── pages/               # Page components (route components)
│   ├── permit/         # Permit-related pages
│   │   ├── PersonalInformationPage.tsx
│   │   ├── FamilyFinancialInfoPage.tsx
│   │   └── SituationDescriptionPage.tsx
│   └── index.ts        # Page exports
├── layouts/            # Layout components
│   ├── PermitLayout.tsx # Main layout for permit flow with header & i18n
│   └── index.ts        # Layout exports
├── hooks/              # Custom React hooks
│   ├── usePermitSteps.ts # Hook for permit step management
│   └── index.ts        # Hook exports
├── store/              # Redux store and state management
│   ├── api/           # RTK Query API definitions
│   │   └── baseApi.ts # Base API configuration
│   ├── hooks/         # Custom Redux hooks
│   │   └── index.ts   # Typed dispatch and selector hooks
│   ├── slices/        # Redux slices
│   │   └── permitSlice.ts # Permit state management
│   ├── store.ts       # Store configuration
│   ├── ReduxProvider.tsx # Redux provider component
│   └── index.ts       # Store exports
├── types/              # TypeScript type definitions
│   └── permit.ts      # Permit-related interfaces and types
├── utils/              # Utility functions and helpers
│   ├── helpers.ts     # Common utility functions
│   └── constants.ts   # Application constants and enums
├── locales/           # Internationalization files
│   ├── en/           # English translations
│   │   └── translation.json
│   └── ar/           # Arabic translations
│       └── translation.json
├── assets/           # Static assets (images, icons, etc.)
│   └── react.svg    # React logo
├── App.tsx          # Main application component with routing
├── main.tsx         # Application entry point
├── i18n.ts          # Internationalization configuration
├── index.css        # Global styles
└── App.css          # Component-specific styles
```## 🎯 Architecture Principles

### 1. **Separation of Concerns**
- **Pages**: Components that represent full pages/routes
- **Components**: Reusable UI building blocks
- **Layouts**: Wrapper components for consistent page structure
- **Hooks**: Custom React hooks for business logic
- **Types**: TypeScript interfaces and type definitions
- **Utils**: Pure functions and constants for common operations

### 2. **Component Organization**
- **Shared Components**: Generic, reusable across the entire app
- **Feature Components**: Specific to particular features
- **Page Components**: Top-level route components
- **Layout Components**: Structural wrappers with common UI patterns

### 3. **Hook Strategy**
- **Custom Hooks**: Business logic abstraction (e.g., `usePermitSteps`)
- **Redux Hooks**: Typed store integration hooks
- **Reusable Logic**: Step management, form handling, API calls

### 4. **Import/Export Strategy**
- Index files (`index.ts`) for clean imports
- Named exports for better tree-shaking
- Consistent import paths across all modules
- Barrel exports for organized module structure

### 5. **State Management**
- Redux Toolkit for global state
- RTK Query for API calls and caching
- Custom hooks for Redux integration
- Typed hooks for better developer experience

### 6. **Constants & Configuration**
- Centralized constants in `/utils/constants.ts`
- Step definitions and route mappings
- Application-wide configuration values
````
