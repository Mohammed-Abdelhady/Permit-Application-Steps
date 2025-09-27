/**
 * Module Mocks Setup
 *
 * This file contains vi.mock() calls that need to be hoisted.
 * Import this file in test files that need these mocks.
 */

import { vi } from 'vitest';
import {
  mockNavigate,
  mockUsePermitSteps,
  mockUseRefreshWarning,
  mockUseToast,
  mockTranslation,
} from './index';

// React Router Mocks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: '/permit/personal-information',
      search: '',
      hash: '',
      state: null,
      key: 'test-key',
    }),
    useParams: () => ({
      step: 'personal-information',
    }),
  };
});

// Custom Hooks Mocks
vi.mock('../../hooks/usePermitSteps', () => ({
  usePermitSteps: mockUsePermitSteps,
}));

vi.mock('../../hooks/useRefreshWarning', () => ({
  useRefreshWarning: mockUseRefreshWarning,
}));

vi.mock('../../hooks/useToast', () => ({
  useToast: mockUseToast,
}));

// i18n Mocks
vi.mock('react-i18next', () => ({
  useTranslation: () => mockTranslation,
  Trans: ({ children }: { children: React.ReactNode }) => children,
}));

// Redux Mocks
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => vi.fn(),
    useSelector: vi.fn(),
  };
});

// API Mocks
vi.mock('../../store/api/openAIApi', () => ({
  useGenerateTextMutation: () => [
    vi.fn(),
    {
      isLoading: false,
      error: null,
    },
  ],
}));

vi.mock('../../store/api/permitApi', () => ({
  useSubmitPermitMutation: () => [
    vi.fn(),
    {
      isLoading: false,
      error: null,
    },
  ],
}));
