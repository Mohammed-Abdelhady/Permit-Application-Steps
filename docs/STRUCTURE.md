# Project Structure

This project follows a well-organized folder structure for better maintainability and scalability.

## 📁 Folder Structure

```
src/
├── __tests__/           # Test files and test utilities
│   ├── components/     # Component tests
│   │   ├── forms/     # Form component tests
│   │   │   └── common/ # Common form component tests
│   │   └── shared/    # Shared component tests
│   ├── e2e/           # End-to-end test utilities
│   ├── mocks/         # Test mocks and fixtures
│   ├── pages/         # Page component tests
│   │   └── permit/   # Permit page tests
│   └── setup.ts       # Test setup configuration
├── components/         # Reusable UI components
│   ├── forms/         # Form-related components
│   │   ├── common/    # Common form components
│   │   │   ├── FormInput.tsx
│   │   │   ├── FormPlaceholder.tsx
│   │   │   ├── FormSelect/ # Complex select component
│   │   │   │   ├── components.ts
│   │   │   │   ├── index.tsx
│   │   │   │   ├── SelectDropdown.tsx
│   │   │   │   ├── SelectOption.tsx
│   │   │   │   ├── SelectTrigger.tsx
│   │   │   │   └── types.ts
│   │   │   ├── FormTextArea.tsx
│   │   │   └── types.ts
│   │   ├── FamilyFinancialForm.tsx
│   │   ├── PersonalInformationForm.tsx
│   │   └── SituationDescriptionForm.tsx
│   ├── permit/        # Permit-specific components
│   │   ├── ActionButtons.tsx
│   │   ├── ApplicationAnalysis.tsx
│   │   ├── ApplicationSummary.tsx
│   │   ├── ErrorState.tsx
│   │   ├── FamilyFinancialSummary.tsx
│   │   ├── LoadingState.tsx
│   │   ├── PersonalInformationSummary.tsx
│   │   ├── SituationDescriptionSummary.tsx
│   │   ├── SuccessHeader.tsx
│   │   └── index.ts
│   ├── shared/        # Shared components across the app
│   │   ├── AnimatedPageWrapper.tsx
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── PermitPageLayout.tsx
│   │   ├── ProgressIndicator.tsx
│   │   ├── TextSuggestionPopup/ # AI text suggestion popup
│   │   │   ├── index.tsx
│   │   │   ├── PopupActions.tsx
│   │   │   ├── PopupContent.tsx
│   │   │   ├── PopupHeader.tsx
│   │   │   └── types.ts
│   │   ├── ToastComponents.tsx
│   │   └── ToastContainer.tsx
│   └── index.ts       # Component exports
├── contexts/          # React Context providers
│   ├── NavigationContext.tsx
│   ├── NavigationTypes.ts
│   ├── ToastContext.tsx
│   ├── useNavigation.ts
│   └── index.ts
├── hooks/             # Custom React hooks
│   ├── useGenerateText.ts    # AI text generation hook
│   ├── usePermitSteps.ts     # Permit step management hook
│   ├── useRefreshWarning.ts  # Browser refresh warning hook
│   ├── useTextSuggestion.ts  # Text suggestion hook
│   ├── useToast.ts           # Toast notification hook
│   └── index.ts
├── pages/             # Page components (route components)
│   ├── permit/        # Permit-related pages
│   │   ├── PermitSubmissionSuccessPage.tsx
│   │   └── steps/     # Step-by-step pages
│   │       ├── FamilyFinancialInfoPage.tsx
│   │       ├── PersonalInformationPage.tsx
│   │       └── SituationDescriptionPage.tsx
│   └── index.ts       # Page exports
├── schemas/           # Form validation schemas
│   ├── familyFinancialSchema.ts
│   ├── personalInformationSchema.ts
│   ├── situationDescriptionSchema.ts
│   └── index.ts
├── store/             # Redux store and state management
│   ├── api/          # RTK Query API definitions
│   │   ├── baseApi.ts      # Base API configuration
│   │   ├── openAIApi.ts    # OpenAI API integration
│   │   ├── permitApi.ts    # Permit-specific API calls
│   │   └── index.ts
│   ├── constants/     # Store constants and configuration
│   │   ├── api.ts          # API constants
│   │   └── prompts/        # AI prompt templates
│   │       ├── ar.ts       # Arabic prompts
│   │       ├── en.ts       # English prompts
│   │       └── index.ts
│   ├── helpers/      # Store helper functions
│   │   ├── api.ts          # API helper functions
│   │   └── index.ts
│   ├── hooks/        # Custom Redux hooks
│   │   └── index.ts  # Typed dispatch and selector hooks
│   ├── middleware/   # Redux middleware
│   │   └── localStorage.ts # Local storage middleware
│   ├── services/     # Business logic services
│   │   ├── analysis.ts     # Analysis service
│   │   ├── storage.ts      # Storage service
│   │   └── index.ts
│   ├── slices/       # Redux slices
│   │   └── permitSlice.ts  # Permit state management
│   ├── types/        # Store-specific types
│   │   ├── openAI.ts       # OpenAI-related types
│   │   ├── permit.ts       # Permit-related types
│   │   └── index.ts
│   ├── utils/        # Store utility functions
│   │   ├── api.ts          # API utilities
│   │   └── index.ts
│   ├── ReduxProvider.tsx   # Redux provider component
│   ├── store.ts            # Store configuration
│   └── index.ts            # Store exports
├── types/             # TypeScript type definitions
│   ├── components.ts       # Component-related types
│   ├── openAI.ts          # OpenAI API types
│   ├── pages.ts           # Page-related types
│   ├── permit.ts          # Permit-related interfaces and types
│   ├── step.ts            # Step-related types
│   ├── toast.ts           # Toast notification types
│   └── index.ts
├── utils/             # Utility functions and helpers
│   ├── api.ts              # API utility functions
│   ├── constants.ts        # Application constants and enums
│   ├── formOptions.ts      # Form option configurations
│   ├── helpers.ts          # Common utility functions
│   └── seo.ts              # SEO utility functions
├── locales/           # Internationalization files
│   ├── en/            # English translations
│   │   └── translation.json
│   └── ar/            # Arabic translations
│       └── translation.json
├── assets/            # Static assets (images, icons, etc.)
│   ├── dge-logo.svg   # DGE logo
│   └── react.svg      # React logo
├── App.tsx            # Main application component with routing
├── main.tsx           # Application entry point
├── i18n.ts            # Internationalization configuration
├── index.css          # Global styles
└── App.css            # Component-specific styles
```

## 🎯 Architecture Principles

### 1. **Separation of Concerns**

- **Pages**: Components that represent full pages/routes
- **Components**: Reusable UI building blocks organized by feature and purpose
- **Contexts**: React Context providers for global state management
- **Hooks**: Custom React hooks for business logic abstraction
- **Schemas**: Form validation schemas using Zod or similar libraries
- **Types**: TypeScript interfaces and type definitions
- **Utils**: Pure functions and constants for common operations
- **Store**: Redux store with RTK Query for API management

### 2. **Component Organization**

- **Forms**: Form-related components with common form elements
- **Permit**: Feature-specific components for permit functionality
- **Shared**: Generic, reusable components across the entire app
- **Page Components**: Top-level route components
- **Complex Components**: Multi-file components (e.g., FormSelect, TextSuggestionPopup)

### 3. **Testing Strategy**

- **Unit Tests**: Component tests in `__tests__/components/`
- **Page Tests**: Page-specific logic tests
- **E2E Tests**: End-to-end test utilities and scenarios
- **Mocks**: Centralized test mocks and fixtures
- **Test Setup**: Global test configuration

### 4. **Hook Strategy**

- **Custom Hooks**: Business logic abstraction (e.g., `usePermitSteps`, `useGenerateText`)
- **Redux Hooks**: Typed store integration hooks
- **Context Hooks**: Context-specific hooks (e.g., `useNavigation`)
- **Reusable Logic**: Step management, form handling, API calls, AI integration

### 5. **State Management**

- **Redux Toolkit**: Global state management
- **RTK Query**: API calls, caching, and data fetching
- **Context API**: Component-level state sharing
- **Local Storage**: Persistent state management via middleware
- **Services**: Business logic services for complex operations

### 6. **API Integration**

- **Base API**: Core API configuration and setup
- **Feature APIs**: Specific API endpoints (OpenAI, Permit)
- **Constants**: API endpoints and configuration
- **Prompts**: AI prompt templates for different languages
- **Helpers**: API utility functions and error handling

### 7. **Type Safety**

- **Global Types**: Application-wide type definitions
- **Store Types**: Redux store-specific types
- **Component Types**: Component prop and state types
- **API Types**: API request/response type definitions
- **Feature Types**: Feature-specific type definitions

### 8. **Internationalization**

- **Multi-language Support**: English and Arabic translations
- **Context-aware**: Language-specific prompts and content
- **Centralized**: Translation files in `/locales/`
- **Dynamic**: Runtime language switching

### 9. **Form Management**

- **Validation Schemas**: Centralized form validation
- **Common Components**: Reusable form elements
- **Type Safety**: Form data type definitions
- **Options**: Form option configurations

### 10. **AI Integration**

- **Text Generation**: AI-powered text suggestions
- **Multi-language Prompts**: Language-specific AI prompts
- **Popup Interface**: User-friendly AI suggestion interface
- **Context-aware**: AI suggestions based on form context
