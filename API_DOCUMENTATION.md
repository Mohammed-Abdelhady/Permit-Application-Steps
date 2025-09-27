# DGE Permit Application API Documentation

## Table of Contents

- [Overview](#overview)
- [API Architecture](#api-architecture)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Analysis Engine](#analysis-engine)
- [Storage System](#storage-system)
- [Usage Examples](#usage-examples)
- [Development Guidelines](#development-guidelines)

## Overview

The DGE (Department of Government Employment) Permit Application API is a comprehensive system for managing permit applications with intelligent analysis, local storage persistence, and multi-language support. Built with RTK Query and TypeScript, it provides a complete mock API simulation with realistic features.

### Key Features

- 🧠 **Intelligent Analysis Engine** - Content-aware scoring and recommendations
- 💾 **Local Storage Persistence** - Applications saved in browser localStorage
- 🌍 **Multi-language Support** - English and Arabic translations
- 📊 **Real-time Validation** - Dynamic scoring based on content quality
- 🔄 **State Management** - Redux Toolkit with RTK Query
- 📱 **Responsive Design** - Mobile and desktop optimized
- 🎯 **TypeScript Integration** - Full type safety and IntelliSense

---

## API Architecture

### Technology Stack

- **RTK Query**: Data fetching and caching
- **Redux Toolkit**: State management
- **TypeScript**: Type safety and development experience
- **Framer Motion**: Animations and transitions
- **React Hook Form**: Form validation and management
- **i18next**: Internationalization

### Mock API Implementation

The API uses RTK Query's `queryFn` approach to simulate real API behavior without HTTP requests:

```typescript
// Mock API Structure
export const permitApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    submitSituationDescription: builder.mutation<Response, FormData>({
      queryFn: async data => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Process and return mock data
        return { data: result };
      },
    }),
  }),
});
```

---

## Authentication

Currently, the API operates without authentication for development purposes. All endpoints are publicly accessible.

### Future Authentication Plan

```typescript
// Planned authentication structure
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface UserSession {
  userId: string;
  email: string;
  role: 'applicant' | 'reviewer' | 'admin';
  permissions: string[];
}
```

---

## Endpoints

### 1. Submit Situation Description

**Endpoint**: `submitSituationDescription`  
**Method**: POST  
**Purpose**: Analyze and save situation description with intelligent scoring

#### Request Body

```typescript
interface SituationDescriptionFormData {
  currentFinancialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}
```

#### Response

```typescript
interface SituationDescriptionResponse {
  success: boolean;
  message: string;
  data: {
    id: string; // Unique identifier
    submissionDate: string; // ISO timestamp
    status: 'saved' | 'validated'; // Based on validation score
    validationScore: number; // 0-100 percentage
    recommendations: string[]; // Personalized suggestions
  };
}
```

#### Example Response

```json
{
  "success": true,
  "message": "Situation description submitted successfully",
  "data": {
    "id": "1727433600000-abc123",
    "submissionDate": "2025-09-27T12:00:00.000Z",
    "status": "validated",
    "validationScore": 85,
    "recommendations": [
      "Application appears complete and well-documented",
      "Consider providing debt management documentation"
    ]
  }
}
```

### 2. Submit Complete Permit Application

**Endpoint**: `submitPermitApplication`  
**Method**: POST  
**Purpose**: Submit complete application with analysis and localStorage persistence

#### Request Body

```typescript
interface PermitApplicationData {
  personalInformation?: PersonalInformationFormData | null;
  familyFinancial?: FamilyFinancialFormData | null;
  situationDescription?: SituationDescriptionFormData;
}
```

#### Response

```typescript
interface PermitSubmissionResponse {
  success: boolean;
  message: string;
  data: {
    applicationId: string; // Format: "DGE-{uniqueId}"
    submissionDate: string; // ISO timestamp
    status: 'pending' | 'approved' | 'rejected';
    estimatedProcessingDays: number; // Calculated based on completeness
  };
}
```

#### Example Response

```json
{
  "success": true,
  "message": "Permit application submitted successfully",
  "data": {
    "applicationId": "DGE-1727433600000-xyz789",
    "submissionDate": "2025-09-27T12:00:00.000Z",
    "status": "pending",
    "estimatedProcessingDays": 8
  }
}
```

### 3. Get Permit by ID

**Endpoint**: `getPermitById`  
**Method**: GET  
**Purpose**: Retrieve complete permit data from localStorage

#### Parameters

- `applicationId` (string): The unique application identifier

#### Response

```typescript
interface GetPermitResponse {
  success: boolean;
  message: string;
  data: StoredPermitData | null;
}

interface StoredPermitData {
  applicationId: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  estimatedProcessingDays: number;
  applicationData: PermitApplicationData;
  analysis?: {
    validationScore: number;
    recommendations: string[];
  };
}
```

### 4. Get Permit Status

**Endpoint**: `getPermitStatus`  
**Method**: GET  
**Purpose**: Get current application status with mock status simulation

#### Parameters

- `applicationId` (string): The unique application identifier

#### Response

```typescript
interface PermitStatusResponse {
  success: boolean;
  message: string;
  data: {
    status: 'pending' | 'approved' | 'rejected' | 'under_review';
    lastUpdated: string;
    notes: string;
  };
}
```

---

## Data Models

### Core Form Data Types

#### Personal Information

```typescript
interface PersonalInformationFormData {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  dependents: number;
}
```

#### Family Financial Information

```typescript
interface FamilyFinancialFormData {
  employmentStatus: 'employed' | 'unemployed' | 'self-employed' | 'retired';
  monthlyIncome: number;
  housingStatus: 'owned' | 'rented' | 'family' | 'other';
  // Additional financial fields...
}
```

#### Situation Description

```typescript
interface SituationDescriptionFormData {
  currentFinancialSituation: string; // Min 50, Max 1000 chars
  employmentCircumstances: string; // Min 50, Max 1000 chars
  reasonForApplying: string; // Min 100, Max 2000 chars
}
```

---

## Error Handling

### Error Response Structure

```typescript
interface APIError {
  success: false;
  message: string;
  code?: string;
  details?: unknown;
}
```

### Common Error Scenarios

#### Validation Errors

```json
{
  "success": false,
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": {
    "field": "reasonForApplying",
    "error": "Minimum 100 characters required"
  }
}
```

#### Not Found Errors

```json
{
  "success": false,
  "message": "Application not found",
  "code": "NOT_FOUND",
  "details": {
    "applicationId": "DGE-invalid-id"
  }
}
```

---

## Analysis Engine

### Validation Scoring Algorithm

The analysis engine evaluates applications based on multiple criteria:

#### Scoring Components

1. **Content Length Analysis**

   ```typescript
   // Financial situation (max 30 points)
   if (data.currentFinancialSituation.length >= 100) score += 30;

   // Employment circumstances (max 25 points)
   if (data.employmentCircumstances.length >= 100) score += 25;

   // Reason for applying (max 25 points)
   if (data.reasonForApplying.length >= 150) score += 25;
   ```

2. **Keyword Analysis**

   ```typescript
   // Financial keywords
   if (content.toLowerCase().includes('income')) score += 20;
   if (content.toLowerCase().includes('debt')) {
     recommendations.push('Consider providing debt management documentation');
   }

   // Employment keywords
   if (content.toLowerCase().includes('contract')) score += 15;
   if (content.toLowerCase().includes('unemployed')) {
     recommendations.push('Include job search documentation');
   }
   ```

3. **Urgency Detection**
   ```typescript
   if (content.toLowerCase().includes('urgent')) {
     recommendations.push(
       'Provide supporting documents for urgent circumstances'
     );
   }
   ```

#### Recommendation Engine

Based on the analysis, the system generates personalized recommendations:

- **Score < 50%**: "Consider providing more detailed information in all sections"
- **Score ≥ 80%**: "Application appears complete and well-documented"
- **Debt mentions**: "Consider providing debt management documentation"
- **Unemployment**: "Include job search documentation or unemployment benefits info"
- **Urgent cases**: "Provide supporting documents for urgent circumstances"

### Processing Time Calculation

```typescript
let processingDays = 14; // Base processing time

// Reduce time based on completeness
if (data.personalInformation) processingDays -= 2;
if (data.familyFinancial) processingDays -= 2;
if (data.situationDescription) processingDays -= 3;

// Expedited processing for urgent cases
if (
  data.situationDescription?.reasonForApplying.toLowerCase().includes('urgent')
) {
  processingDays -= 3;
}

// Ensure minimum processing time
processingDays = Math.max(processingDays, 5);
```

---

## Storage System

### localStorage Implementation

The API uses browser localStorage to persist application data:

#### Storage Key Structure

```typescript
const PERMITS_STORAGE_KEY = 'dge_permits';
```

#### Storage Functions

```typescript
// Save permit to localStorage
const savePermitToStorage = (permit: StoredPermitData): void => {
  try {
    const existingPermits = getPermitsFromStorage();
    const updatedPermits = [...existingPermits, permit];
    localStorage.setItem(PERMITS_STORAGE_KEY, JSON.stringify(updatedPermits));
  } catch (error) {
    console.error('Error saving permit to localStorage:', error);
  }
};

// Retrieve permits from localStorage
const getPermitsFromStorage = (): StoredPermitData[] => {
  try {
    const stored = localStorage.getItem(PERMITS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading permits from localStorage:', error);
    return [];
  }
};

// Get specific permit by ID
const getPermitById = (applicationId: string): StoredPermitData | null => {
  try {
    const permits = getPermitsFromStorage();
    return (
      permits.find(permit => permit.applicationId === applicationId) || null
    );
  } catch (error) {
    console.error('Error finding permit by ID:', error);
    return null;
  }
};
```

#### Stored Data Structure

```typescript
interface StoredPermitData {
  applicationId: string; // Unique identifier
  submissionDate: string; // ISO timestamp
  status: 'pending' | 'approved' | 'rejected';
  estimatedProcessingDays: number; // Calculated processing time
  applicationData: PermitApplicationData; // Complete form data
  analysis?: {
    // Analysis results
    validationScore: number;
    recommendations: string[];
  };
}
```

---

## Usage Examples

### React Component Integration

#### Using RTK Query Hooks

```tsx
import {
  useSubmitSituationDescriptionMutation,
  useSubmitPermitApplicationMutation,
  useGetPermitByIdQuery,
} from '../store/api/permitApi';

const SituationDescriptionPage = () => {
  const [submitSituationDescription, { isLoading: isSituationLoading }] =
    useSubmitSituationDescriptionMutation();
  const [submitPermitApplication, { isLoading: isApplicationLoading }] =
    useSubmitPermitApplicationMutation();

  const handleSubmit = async (data: SituationDescriptionFormData) => {
    try {
      // Submit situation description
      const situationResponse = await submitSituationDescription(data).unwrap();

      if (situationResponse.success) {
        toast.success('Situation description saved successfully');

        // Submit complete application
        const completeApplication = {
          personalInformation,
          familyFinancial,
          situationDescription: data,
        };

        const applicationResponse =
          await submitPermitApplication(completeApplication).unwrap();

        if (applicationResponse.success) {
          // Navigate to success page with application ID
          navigate(`/permit/success/${applicationResponse.data.applicationId}`);
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit application');
    }
  };
};
```

#### Success Page with Data Fetching

```tsx
const PermitSubmissionSuccessPage = () => {
  const { applicationId } = useParams<{ applicationId: string }>();

  const {
    data: permitResponse,
    isLoading,
    isError,
  } = useGetPermitByIdQuery(applicationId || '', {
    skip: !applicationId,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !permitResponse?.data) return <ErrorPage />;

  const permitData = permitResponse.data;

  return (
    <div>
      <h1>Application Submitted Successfully!</h1>
      <p>Application ID: {permitData.applicationId}</p>

      {/* Display analysis results */}
      {permitData.analysis && (
        <div>
          <h2>Application Analysis</h2>
          <p>Validation Score: {permitData.analysis.validationScore}%</p>
          <ul>
            {permitData.analysis.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
```

### Error Handling Pattern

```tsx
const handleAPICall = async () => {
  try {
    const response = await apiCall(data).unwrap();

    if (response.success) {
      // Handle success
      toast.success(response.message);
    }
  } catch (error: unknown) {
    // Type-safe error handling
    const apiError = error as {
      data?: { message?: string };
      message?: string;
    };

    const errorMessage =
      apiError.data?.message ||
      apiError.message ||
      'An unexpected error occurred';

    toast.error(errorMessage);
    console.error('API Error:', error);
  }
};
```

---

## Development Guidelines

### Adding New Endpoints

1. **Define Response Interface**

```typescript
interface NewEndpointResponse {
  success: boolean;
  message: string;
  data: YourDataType;
}
```

2. **Add to permitApi**

```typescript
newEndpoint: builder.mutation<NewEndpointResponse, RequestType>({
  queryFn: async (requestData) => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay

    // Your logic here
    const result: NewEndpointResponse = {
      success: true,
      message: 'Operation successful',
      data: processedData,
    };

    return { data: result };
  },
  invalidatesTags: ['Permit'],
}),
```

3. **Export Hook**

```typescript
export const { useNewEndpointMutation } = permitApi;
```

### Best Practices

#### Type Safety

- Always define proper TypeScript interfaces
- Use strict typing for all API responses
- Avoid `any` types in favor of specific interfaces

#### Error Handling

- Implement consistent error response structures
- Provide meaningful error messages
- Log errors for debugging purposes

#### Performance

- Use RTK Query caching effectively
- Implement proper loading states
- Add appropriate delays to simulate real API behavior

#### Testing

```typescript
// Example test structure
describe('permitApi', () => {
  test('should submit situation description successfully', async () => {
    const mockData: SituationDescriptionFormData = {
      currentFinancialSituation: 'Test financial situation...',
      employmentCircumstances: 'Test employment...',
      reasonForApplying: 'Test reason for applying...',
    };

    const result = await store.dispatch(
      permitApi.endpoints.submitSituationDescription.initiate(mockData)
    );

    expect(result.data?.success).toBe(true);
    expect(result.data?.data.validationScore).toBeGreaterThan(0);
  });
});
```

### Translation Integration

All API responses should support internationalization:

```typescript
// In translation files
"api": {
  "success": {
    "situation_submitted": "Situation description submitted successfully",
    "application_submitted": "Permit application submitted successfully"
  },
  "errors": {
    "validation_failed": "Validation failed",
    "not_found": "Application not found"
  }
}
```

---

## Future Enhancements

### Planned Features

- [ ] **Real API Integration**: Replace mock implementation with actual backend
- [ ] **Authentication System**: JWT-based authentication and authorization
- [ ] **File Upload Support**: Document attachment functionality
- [ ] **Email Notifications**: Status update notifications
- [ ] **Advanced Search**: Filter and search applications
- [ ] **Audit Trail**: Track all application changes
- [ ] **Export Functionality**: PDF generation for applications
- [ ] **Batch Operations**: Bulk status updates for reviewers

### Performance Optimizations

- [ ] **Caching Strategy**: Implement advanced RTK Query caching
- [ ] **Pagination**: Large dataset pagination support
- [ ] **Compression**: Response data compression
- [ ] **Offline Support**: PWA with offline functionality

---

## Contributing

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npx tsc --noEmit

# Run tests
npm test
```

### Code Standards

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write comprehensive tests for new features
- Update documentation for API changes
- Use conventional commit messages

---

## Support

For questions or issues regarding the DGE Permit Application API:

- **Documentation**: This file and inline code comments
- **Type Definitions**: Check TypeScript interfaces in source code
- **Examples**: Refer to existing component implementations
- **Debugging**: Use browser developer tools and console logging

---

_Last Updated: September 27, 2025_  
_Version: 1.0.0_
