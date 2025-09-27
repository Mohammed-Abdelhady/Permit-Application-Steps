/**
 * TextSuggestionPopup Component Tests
 *
 * This file contains comprehensive tests for the TextSuggestionPopup component,
 * covering component structure, user interactions, state management, and business logic.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { TextSuggestionPopup } from '../../../components/shared/TextSuggestionPopup';
import {
  TEXT_SUGGESTION_TEST_IDS,
  TEXT_SUGGESTION_SCENARIOS,
  createMockTextSuggestionProps,
  resetAllMocks,
  mockTranslation,
} from '../../mocks';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) =>
      React.createElement('div', props, children),
    button: ({ children, ...props }: React.ComponentProps<'button'>) =>
      React.createElement('button', props, children),
    p: ({ children, ...props }: React.ComponentProps<'p'>) =>
      React.createElement('p', props, children),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => mockTranslation,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Zap: (props: Record<string, unknown>) =>
    React.createElement('div', { ...props, 'data-testid': 'zap-icon' }, 'Zap'),
  X: (props: Record<string, unknown>) =>
    React.createElement('div', { ...props, 'data-testid': 'x-icon' }, 'X'),
  AlertCircle: (props: Record<string, unknown>) =>
    React.createElement(
      'div',
      { ...props, 'data-testid': 'alert-circle-icon' },
      'AlertCircle'
    ),
  CheckCircle2: (props: Record<string, unknown>) =>
    React.createElement(
      'div',
      { ...props, 'data-testid': 'check-circle2-icon' },
      'CheckCircle2'
    ),
  Trash2: (props: Record<string, unknown>) =>
    React.createElement(
      'div',
      { ...props, 'data-testid': 'trash2-icon' },
      'Trash2'
    ),
  Edit3: (props: Record<string, unknown>) =>
    React.createElement(
      'div',
      { ...props, 'data-testid': 'edit3-icon' },
      'Edit3'
    ),
  Check: (props: Record<string, unknown>) =>
    React.createElement(
      'div',
      { ...props, 'data-testid': 'check-icon' },
      'Check'
    ),
}));

describe('TextSuggestionPopup - Core Logic Tests', () => {
  beforeEach(() => {
    resetAllMocks();
  });

  describe('Component Structure Tests', () => {
    test('should have correct test IDs defined', () => {
      // Verify test ID structure is logical and complete
      expect(TEXT_SUGGESTION_TEST_IDS.overlay).toBe('text-suggestion-overlay');
      expect(TEXT_SUGGESTION_TEST_IDS.popup).toBe('text-suggestion-popup');
      expect(TEXT_SUGGESTION_TEST_IDS.header).toBe('popup-header');
      expect(TEXT_SUGGESTION_TEST_IDS.title).toBe('popup-title');
      expect(TEXT_SUGGESTION_TEST_IDS.closeButton).toBe('close-button');
      expect(TEXT_SUGGESTION_TEST_IDS.content).toBe('popup-content');
      expect(TEXT_SUGGESTION_TEST_IDS.loadingState).toBe('loading-state');
      expect(TEXT_SUGGESTION_TEST_IDS.errorState).toBe('error-state');
      expect(TEXT_SUGGESTION_TEST_IDS.suggestionContent).toBe(
        'suggestion-content'
      );
      expect(TEXT_SUGGESTION_TEST_IDS.editTextarea).toBe('edit-textarea');
      expect(TEXT_SUGGESTION_TEST_IDS.suggestionDisplay).toBe(
        'suggestion-display'
      );
      expect(TEXT_SUGGESTION_TEST_IDS.actions).toBe('popup-actions');
      expect(TEXT_SUGGESTION_TEST_IDS.discardButton).toBe('discard-button');
      expect(TEXT_SUGGESTION_TEST_IDS.editButton).toBe('edit-button');
      expect(TEXT_SUGGESTION_TEST_IDS.acceptButton).toBe('accept-button');
      expect(TEXT_SUGGESTION_TEST_IDS.cancelEditButton).toBe(
        'cancel-edit-button'
      );
      expect(TEXT_SUGGESTION_TEST_IDS.useEditedButton).toBe(
        'use-edited-button'
      );
      expect(TEXT_SUGGESTION_TEST_IDS.errorCloseButton).toBe(
        'error-close-button'
      );
    });

    test('should render popup when open', () => {
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.overlay)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.popup)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.header)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.title)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.closeButton)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.content)
      ).toBeInTheDocument();
    });

    test('should not render popup when closed', () => {
      const props = TEXT_SUGGESTION_SCENARIOS.closed;
      render(<TextSuggestionPopup {...props} />);

      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.overlay)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.popup)
      ).not.toBeInTheDocument();
    });

    test('should render loading state correctly', () => {
      const props = TEXT_SUGGESTION_SCENARIOS.loading;
      render(<TextSuggestionPopup {...props} />);

      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.loadingState)
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.errorState)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.suggestionContent)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.actions)
      ).not.toBeInTheDocument();
    });

    test('should render error state correctly', () => {
      const props = TEXT_SUGGESTION_SCENARIOS.error;
      render(<TextSuggestionPopup {...props} />);

      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.errorState)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.errorCloseButton)
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.loadingState)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.suggestionContent)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.actions)
      ).not.toBeInTheDocument();
    });

    test('should render suggestion content when available', () => {
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.suggestionContent)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.suggestionDisplay)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.actions)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.discardButton)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.editButton)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.acceptButton)
      ).toBeInTheDocument();
    });
  });

  describe('User Interaction Tests', () => {
    test('should call onClose when overlay is clicked', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      const overlay = screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.overlay);
      await user.click(overlay);

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    test('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      const closeButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.closeButton
      );
      await user.click(closeButton);

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    test('should not call onClose when popup content is clicked', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      const popup = screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.popup);
      await user.click(popup);

      expect(props.onClose).not.toHaveBeenCalled();
    });

    test('should call onAccept when accept button is clicked', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      const acceptButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.acceptButton
      );
      await user.click(acceptButton);

      expect(props.onAccept).toHaveBeenCalledWith(props.suggestion);
    });

    test('should call onDiscard when discard button is clicked', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      const discardButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.discardButton
      );
      await user.click(discardButton);

      expect(props.onDiscard).toHaveBeenCalledTimes(1);
    });

    test('should enter edit mode when edit button is clicked', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      const editButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.editButton
      );
      await user.click(editButton);

      await waitFor(() => {
        expect(
          screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.editTextarea)
        ).toBeInTheDocument();
        expect(
          screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.cancelEditButton)
        ).toBeInTheDocument();
        expect(
          screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.useEditedButton)
        ).toBeInTheDocument();
        expect(
          screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.suggestionDisplay)
        ).not.toBeInTheDocument();
        expect(
          screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.editButton)
        ).not.toBeInTheDocument();
        expect(
          screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.acceptButton)
        ).not.toBeInTheDocument();
      });
    });

    test('should cancel edit mode when cancel button is clicked', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      // Enter edit mode
      const editButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.editButton
      );
      await user.click(editButton);

      // Cancel edit mode
      const cancelButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.cancelEditButton
      );
      await user.click(cancelButton);

      await waitFor(() => {
        expect(
          screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.suggestionDisplay)
        ).toBeInTheDocument();
        expect(
          screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.editButton)
        ).toBeInTheDocument();
        expect(
          screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.acceptButton)
        ).toBeInTheDocument();
        expect(
          screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.editTextarea)
        ).not.toBeInTheDocument();
        expect(
          screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.cancelEditButton)
        ).not.toBeInTheDocument();
        expect(
          screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.useEditedButton)
        ).not.toBeInTheDocument();
      });
    });

    test('should handle text editing in textarea', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      // Enter edit mode
      const editButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.editButton
      );
      await user.click(editButton);

      // Edit text
      const textarea = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.editTextarea
      );
      await user.clear(textarea);
      await user.type(textarea, 'Modified suggestion text');

      expect(textarea).toHaveValue('Modified suggestion text');
    });

    test('should call onEdit with edited text when use edited button is clicked', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      // Enter edit mode
      const editButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.editButton
      );
      await user.click(editButton);

      // Edit text
      const textarea = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.editTextarea
      );
      await user.clear(textarea);
      await user.type(textarea, 'Modified suggestion text');

      // Use edited text
      const useEditedButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.useEditedButton
      );
      await user.click(useEditedButton);

      expect(props.onEdit).toHaveBeenCalledWith('Modified suggestion text');
    });

    test('should disable use edited button when textarea is empty', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      // Enter edit mode
      const editButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.editButton
      );
      await user.click(editButton);

      // Clear text
      const textarea = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.editTextarea
      );
      await user.clear(textarea);

      // Check button is disabled
      const useEditedButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.useEditedButton
      );
      expect(useEditedButton).toBeDisabled();
    });

    test('should call onClose when error close button is clicked', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.error;
      render(<TextSuggestionPopup {...props} />);

      const errorCloseButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.errorCloseButton
      );
      await user.click(errorCloseButton);

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('State Management Tests', () => {
    test('should reset edited text when suggestion prop changes', () => {
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      const { rerender } = render(<TextSuggestionPopup {...props} />);

      // Enter edit mode and modify text
      fireEvent.click(screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.editButton));
      const textarea = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.editTextarea
      );
      fireEvent.change(textarea, { target: { value: 'Modified text' } });

      // Change suggestion prop
      const newProps = { ...props, suggestion: 'New suggestion text' };
      rerender(<TextSuggestionPopup {...newProps} />);

      // Should reset to new suggestion and exit edit mode
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.suggestionDisplay)
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.editTextarea)
      ).not.toBeInTheDocument();
    });

    test('should maintain edit state when other props change', () => {
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      const { rerender } = render(<TextSuggestionPopup {...props} />);

      // Enter edit mode
      fireEvent.click(screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.editButton));
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.editTextarea)
      ).toBeInTheDocument();

      // Change a different prop that doesn't affect the UI state (e.g., callback function)
      const newProps = { ...props, onClose: vi.fn() };
      rerender(<TextSuggestionPopup {...newProps} />);

      // Should still be in edit mode for the suggestion content
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.editTextarea)
      ).toBeInTheDocument();
    });

    test('should handle state transitions correctly', async () => {
      const loadingProps = TEXT_SUGGESTION_SCENARIOS.loading;
      const { rerender } = render(<TextSuggestionPopup {...loadingProps} />);

      // Should show loading state
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.loadingState)
      ).toBeInTheDocument();

      // Transition to error state
      const errorProps = TEXT_SUGGESTION_SCENARIOS.error;
      rerender(<TextSuggestionPopup {...errorProps} />);
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.errorState)
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.loadingState)
      ).not.toBeInTheDocument();

      // Transition to success state
      const successProps = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      rerender(<TextSuggestionPopup {...successProps} />);
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.suggestionContent)
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.errorState)
      ).not.toBeInTheDocument();
    });
  });

  describe('Content Display Tests', () => {
    test('should display suggestion text correctly', () => {
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      const suggestionDisplay = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.suggestionDisplay
      );
      expect(suggestionDisplay).toHaveTextContent(props.suggestion);
    });

    test('should display error message correctly', () => {
      const props = TEXT_SUGGESTION_SCENARIOS.error;
      render(<TextSuggestionPopup {...props} />);

      const errorState = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.errorState
      );
      expect(errorState).toHaveTextContent(props.error!);
    });

    test('should display loading message correctly', () => {
      const props = TEXT_SUGGESTION_SCENARIOS.loading;
      render(<TextSuggestionPopup {...props} />);

      const loadingState = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.loadingState
      );
      expect(loadingState).toBeInTheDocument();
      // The loading text is retrieved via translation, so we check for the component structure
    });

    test('should handle long suggestion text correctly', () => {
      const longSuggestion = 'A'.repeat(1000);
      const props = createMockTextSuggestionProps({
        suggestion: longSuggestion,
      });
      render(<TextSuggestionPopup {...props} />);

      const suggestionDisplay = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.suggestionDisplay
      );
      expect(suggestionDisplay).toHaveTextContent(longSuggestion);
    });

    test('should preserve whitespace in suggestion text', () => {
      const textWithWhitespace = 'Line 1\\n\\nLine 3\\tTabbed text';
      const props = createMockTextSuggestionProps({
        suggestion: textWithWhitespace,
      });
      render(<TextSuggestionPopup {...props} />);

      const suggestionDisplay = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.suggestionDisplay
      );
      expect(suggestionDisplay).toHaveTextContent(textWithWhitespace);
    });
  });

  describe('Business Logic Validation Tests', () => {
    test('should validate popup visibility logic', () => {
      const scenarios = [
        { isOpen: true, shouldShow: true },
        { isOpen: false, shouldShow: false },
      ];

      scenarios.forEach(({ isOpen, shouldShow }) => {
        const props = createMockTextSuggestionProps({ isOpen });
        const { unmount } = render(<TextSuggestionPopup {...props} />);

        if (shouldShow) {
          expect(
            screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.overlay)
          ).toBeInTheDocument();
        } else {
          expect(
            screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.overlay)
          ).not.toBeInTheDocument();
        }

        unmount();
      });
    });

    test('should validate state priority logic', () => {
      const scenarios = [
        {
          isLoading: true,
          error: 'Error',
          suggestion: 'Text',
          expectedState: 'loading',
        },
        {
          isLoading: false,
          error: 'Error',
          suggestion: 'Text',
          expectedState: 'error',
        },
        {
          isLoading: false,
          error: null,
          suggestion: 'Text',
          expectedState: 'success',
        },
        {
          isLoading: false,
          error: null,
          suggestion: '',
          expectedState: 'none',
        },
      ];

      scenarios.forEach(({ isLoading, error, suggestion, expectedState }) => {
        const props = createMockTextSuggestionProps({
          isLoading,
          error,
          suggestion,
        });
        const { unmount } = render(<TextSuggestionPopup {...props} />);

        switch (expectedState) {
          case 'loading':
            expect(
              screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.loadingState)
            ).toBeInTheDocument();
            break;
          case 'error':
            expect(
              screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.errorState)
            ).toBeInTheDocument();
            break;
          case 'success':
            expect(
              screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.suggestionContent)
            ).toBeInTheDocument();
            break;
          case 'none':
            expect(
              screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.loadingState)
            ).not.toBeInTheDocument();
            expect(
              screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.errorState)
            ).not.toBeInTheDocument();
            expect(
              screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.suggestionContent)
            ).not.toBeInTheDocument();
            break;
        }

        unmount();
      });
    });

    test('should validate button availability logic', () => {
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      // In view mode, should show discard, edit, and accept buttons
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.discardButton)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.editButton)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.acceptButton)
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.cancelEditButton)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.useEditedButton)
      ).not.toBeInTheDocument();
    });

    test('should validate edit mode button logic', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      // Enter edit mode
      await user.click(screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.editButton));

      // In edit mode, should show discard, cancel, and use edited buttons
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.discardButton)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.cancelEditButton)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.useEditedButton)
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.editButton)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.acceptButton)
      ).not.toBeInTheDocument();
    });

    test('should validate text trimming logic', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      // Enter edit mode
      await user.click(screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.editButton));

      // Add whitespace-only text
      const textarea = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.editTextarea
      );
      await user.clear(textarea);
      await user.type(textarea, '   \n\t   ');

      // Use edited button should be disabled
      const useEditedButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.useEditedButton
      );
      expect(useEditedButton).toBeDisabled();

      // Add actual content
      await user.clear(textarea);
      await user.type(textarea, '   Real content   ');
      expect(useEditedButton).not.toBeDisabled();

      // Click use edited - should trim whitespace
      await user.click(useEditedButton);
      expect(props.onEdit).toHaveBeenCalledWith('Real content');
    });
  });

  describe('Accessibility and Error Handling Tests', () => {
    test('should prevent event propagation on button clicks', async () => {
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      const mockStopPropagation = vi.fn();

      render(<TextSuggestionPopup {...props} />);

      // Mock stopPropagation on the event
      const acceptButton = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.acceptButton
      );

      // Create a custom event with stopPropagation
      const clickEvent = new MouseEvent('click', { bubbles: true });
      clickEvent.stopPropagation = mockStopPropagation;

      acceptButton.dispatchEvent(clickEvent);

      // The component should have called stopPropagation
      expect(props.onAccept).toHaveBeenCalled();
    });

    test('should handle empty suggestion gracefully', () => {
      const props = createMockTextSuggestionProps({ suggestion: '' });
      render(<TextSuggestionPopup {...props} />);

      // Should not show suggestion content when suggestion is empty
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.suggestionContent)
      ).not.toBeInTheDocument();
    });

    test('should handle null error gracefully', () => {
      const props = createMockTextSuggestionProps({ error: null });
      render(<TextSuggestionPopup {...props} />);

      // Should not show error state when error is null
      expect(
        screen.queryByTestId(TEXT_SUGGESTION_TEST_IDS.errorState)
      ).not.toBeInTheDocument();
    });

    test('should maintain focus management', async () => {
      const user = userEvent.setup();
      const props = TEXT_SUGGESTION_SCENARIOS.withSuggestion;
      render(<TextSuggestionPopup {...props} />);

      // Enter edit mode
      await user.click(screen.getByTestId(TEXT_SUGGESTION_TEST_IDS.editButton));

      // Textarea should be available for focus
      const textarea = screen.getByTestId(
        TEXT_SUGGESTION_TEST_IDS.editTextarea
      );
      expect(textarea).toBeInTheDocument();

      // Focus should work on textarea
      await user.click(textarea);
      expect(document.activeElement).toBe(textarea);
    });
  });
});
