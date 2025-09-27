import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock framer-motion first
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
    textarea: 'textarea',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock Redux API completely to prevent context issues
vi.mock('../../../../store/api', () => ({
  useGenerateTextSuggestionMutation: () => [
    vi.fn(),
    { isLoading: false, error: null },
  ],
}));

// Mock TextSuggestionPopup
vi.mock('../../../components/shared/TextSuggestionPopup', () => ({
  TextSuggestionPopup: ({
    isVisible,
    onAccept,
    onReject,
  }: {
    isVisible: boolean;
    onAccept: (text: string) => void;
    onReject: () => void;
  }) => (
    <div data-testid="text-suggestion-popup">
      {isVisible && (
        <div>
          <button
            data-testid="accept-suggestion"
            onClick={() => onAccept('suggested text')}
          >
            Accept
          </button>
          <button data-testid="reject-suggestion" onClick={onReject}>
            Reject
          </button>
        </div>
      )}
    </div>
  ),
}));

// Mock useTextSuggestion hook completely
vi.mock('../../../../hooks/useTextSuggestion', () => ({
  useTextSuggestion: vi.fn(() => ({
    isPopupOpen: false,
    suggestion: '',
    isLoading: false,
    error: null,
    handleHelpMeWrite: vi.fn(),
    handleAcceptSuggestion: vi.fn(),
    handleRejectSuggestion: vi.fn(),
  })),
}));

import FormTextArea from '../../../../components/forms/common/FormTextArea';

describe('FormTextArea', () => {
  const defaultProps = {
    label: 'test.label',
    name: 'testTextArea',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('renders the container with correct data-testid', () => {
      render(<FormTextArea {...defaultProps} />);
      expect(screen.getByTestId('form-textarea-container')).toBeInTheDocument();
    });

    it('renders the label with correct data-testid and text', () => {
      render(<FormTextArea {...defaultProps} />);
      const label = screen.getByTestId('form-textarea-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('test.label');
    });

    it('renders the textarea field with correct data-testid', () => {
      render(<FormTextArea {...defaultProps} />);
      expect(screen.getByTestId('form-textarea-field')).toBeInTheDocument();
    });
  });

  describe('Required Indicator', () => {
    it('shows required indicator when required is true', () => {
      render(<FormTextArea {...defaultProps} required />);
      const requiredIndicator = screen.getByTestId('form-textarea-required');
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator).toHaveTextContent('*');
    });

    it('hides required indicator when required is false', () => {
      render(<FormTextArea {...defaultProps} required={false} />);
      expect(
        screen.queryByTestId('form-textarea-required')
      ).not.toBeInTheDocument();
    });
  });

  describe('Description', () => {
    it('shows description when provided', () => {
      render(<FormTextArea {...defaultProps} description="test.description" />);
      const description = screen.getByTestId('form-textarea-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent('test.description');
    });

    it('hides description when not provided', () => {
      render(<FormTextArea {...defaultProps} />);
      expect(
        screen.queryByTestId('form-textarea-description')
      ).not.toBeInTheDocument();
    });
  });

  describe('AI Help Feature', () => {
    it('shows AI help button when enableAIHelp is true', () => {
      render(<FormTextArea {...defaultProps} enableAIHelp />);
      expect(screen.getByTestId('form-textarea-ai-help')).toBeInTheDocument();
    });

    it('hides AI help button when enableAIHelp is false', () => {
      render(<FormTextArea {...defaultProps} enableAIHelp={false} />);
      expect(
        screen.queryByTestId('form-textarea-ai-help')
      ).not.toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('shows helper text when provided and no error', () => {
      render(<FormTextArea {...defaultProps} helperText="test.helper" />);
      const helper = screen.getByTestId('form-textarea-helper');
      expect(helper).toBeInTheDocument();
      expect(helper).toHaveTextContent('test.helper');
    });

    it('hides helper text when error is present', () => {
      render(
        <FormTextArea
          {...defaultProps}
          helperText="test.helper"
          error="test.error"
        />
      );
      expect(
        screen.queryByTestId('form-textarea-helper')
      ).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('shows error message when error is provided', () => {
      render(<FormTextArea {...defaultProps} error="test.error" />);
      const error = screen.getByTestId('form-textarea-error');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent('test.error');
    });

    it('hides error message when no error', () => {
      render(<FormTextArea {...defaultProps} />);
      expect(
        screen.queryByTestId('form-textarea-error')
      ).not.toBeInTheDocument();
    });

    it('applies error styling to textarea when error is present', () => {
      render(<FormTextArea {...defaultProps} error="test.error" />);
      const textarea = screen.getByTestId('form-textarea-field');
      expect(textarea).toHaveClass(
        'border-red-300',
        'bg-red-50',
        'text-red-900'
      );
    });

    it('applies normal styling to textarea when no error', () => {
      render(<FormTextArea {...defaultProps} />);
      const textarea = screen.getByTestId('form-textarea-field');
      expect(textarea).toHaveClass(
        'border-gray-300',
        'bg-white',
        'text-gray-900'
      );
    });
  });

  describe('Textarea Properties', () => {
    it('sets placeholder correctly', () => {
      render(<FormTextArea {...defaultProps} placeholder="Enter text" />);
      const textarea = screen.getByTestId('form-textarea-field');
      expect(textarea).toHaveAttribute('placeholder', 'Enter text');
    });

    it('sets value correctly', () => {
      render(<FormTextArea {...defaultProps} value="test value" />);
      const textarea = screen.getByTestId('form-textarea-field');
      expect(textarea).toHaveValue('test value');
    });

    it('sets disabled state correctly', () => {
      render(<FormTextArea {...defaultProps} disabled />);
      const textarea = screen.getByTestId('form-textarea-field');
      expect(textarea).toBeDisabled();
    });

    it('sets rows correctly', () => {
      render(<FormTextArea {...defaultProps} rows={5} />);
      const textarea = screen.getByTestId('form-textarea-field');
      expect(textarea).toHaveAttribute('rows', '5');
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when textarea value changes', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<FormTextArea {...defaultProps} onChange={onChange} />);

      const textarea = screen.getByTestId('form-textarea-field');
      await user.type(textarea, 'test');

      expect(onChange).toHaveBeenCalled();
    });

    it('calls onBlur when textarea loses focus', async () => {
      const user = userEvent.setup();
      const onBlur = vi.fn();
      render(<FormTextArea {...defaultProps} onBlur={onBlur} />);

      const textarea = screen.getByTestId('form-textarea-field');
      await user.click(textarea);
      await user.tab();

      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('RTL Support', () => {
    it('applies RTL text alignment when isRTL is true', () => {
      render(<FormTextArea {...defaultProps} isRTL />);
      const label = screen.getByTestId('form-textarea-label');
      expect(label).toHaveClass('text-right');
    });

    it('applies LTR text alignment when isRTL is false', () => {
      render(<FormTextArea {...defaultProps} isRTL={false} />);
      const label = screen.getByTestId('form-textarea-label');
      expect(label).toHaveClass('text-left');
    });
  });
});
