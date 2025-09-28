/**
 * Simple TextSuggestionPopup Debug Test
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { TextSuggestionPopup } from '../../../components/shared/TextSuggestionPopup';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & {
      children?: React.ReactNode;
    }) => <div {...props}>{children}</div>,
    button: ({
      children,
      ...props
    }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      children?: React.ReactNode;
    }) => <button {...props}>{children}</button>,
    p: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLParagraphElement> & {
      children?: React.ReactNode;
    }) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Zap: () => <div>Zap</div>,
  X: () => <div>X</div>,
  AlertCircle: () => <div>AlertCircle</div>,
  CheckCircle2: () => <div>CheckCircle2</div>,
  Trash2: () => <div>Trash2</div>,
  Edit3: () => <div>Edit3</div>,
  Check: () => <div>Check</div>,
}));

describe('TextSuggestionPopup Debug', () => {
  test('should render basic component', () => {
    const props = {
      isOpen: true,
      suggestion: 'Test suggestion',
      isLoading: false,
      error: null,
      onAccept: vi.fn(),
      onEdit: vi.fn(),
      onDiscard: vi.fn(),
      onClose: vi.fn(),
    };

    render(<TextSuggestionPopup {...props} />);

    expect(screen.getByTestId('text-suggestion-overlay')).toBeInTheDocument();
  });

  test('should render loading state', () => {
    const props = {
      isOpen: true,
      suggestion: '',
      isLoading: true,
      error: null,
      onAccept: vi.fn(),
      onEdit: vi.fn(),
      onDiscard: vi.fn(),
      onClose: vi.fn(),
    };

    render(<TextSuggestionPopup {...props} />);

    expect(screen.getByTestId('text-suggestion-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
  });
});
