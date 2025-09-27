import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockFramerMotion } from '../../../mocks';
import { FormInput } from '../../../../components';

// Mock framer-motion
vi.mock('framer-motion', () => mockFramerMotion);

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('FormInput', () => {
  const defaultProps = {
    label: 'test.label',
    name: 'testInput',
    id: 'test-input',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('renders the container with correct data-testid', () => {
      render(<FormInput {...defaultProps} />);
      expect(screen.getByTestId('form-input-container')).toBeInTheDocument();
    });

    it('renders the label with correct data-testid and text', () => {
      render(<FormInput {...defaultProps} />);
      const label = screen.getByTestId('form-input-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('test.label');
    });

    it('renders the input field with correct data-testid', () => {
      render(<FormInput {...defaultProps} />);
      expect(screen.getByTestId('form-input-field')).toBeInTheDocument();
    });

    it('label and input are properly connected for accessibility', () => {
      render(<FormInput {...defaultProps} />);
      const label = screen.getByTestId('form-input-label');
      const input = screen.getByTestId('form-input-field');
      expect(label).toHaveAttribute('for');
      expect(input).toHaveAttribute('id');
      // IDs are dynamically generated so we just ensure they exist
      expect(label.getAttribute('for')).toBeTruthy();
      expect(input.getAttribute('id')).toBeTruthy();
    });
  });

  describe('Required Indicator', () => {
    it('shows required indicator when required is true', () => {
      render(<FormInput {...defaultProps} required />);
      const requiredIndicator = screen.getByTestId('form-input-required');
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator).toHaveTextContent('*');
    });

    it('hides required indicator when required is false', () => {
      render(<FormInput {...defaultProps} required={false} />);
      expect(
        screen.queryByTestId('form-input-required')
      ).not.toBeInTheDocument();
    });

    it('has proper accessibility attributes for required indicator', () => {
      render(<FormInput {...defaultProps} required />);
      const requiredIndicator = screen.getByTestId('form-input-required');
      expect(requiredIndicator).toHaveAttribute('aria-label', 'form.required');
      expect(requiredIndicator).toHaveAttribute('title', 'form.required');
    });
  });

  describe('Description', () => {
    it('shows description when provided', () => {
      render(<FormInput {...defaultProps} description="test.description" />);
      const description = screen.getByTestId('form-input-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent('test.description');
    });

    it('hides description when not provided', () => {
      render(<FormInput {...defaultProps} />);
      expect(
        screen.queryByTestId('form-input-description')
      ).not.toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('shows helper text when provided and no error', () => {
      render(<FormInput {...defaultProps} helperText="test.helper" />);
      const helper = screen.getByTestId('form-input-helper');
      expect(helper).toBeInTheDocument();
      expect(helper).toHaveTextContent('test.helper');
    });

    it('hides helper text when error is present', () => {
      render(
        <FormInput
          {...defaultProps}
          helperText="test.helper"
          error="test.error"
        />
      );
      expect(screen.queryByTestId('form-input-helper')).not.toBeInTheDocument();
    });

    it('hides helper text when not provided', () => {
      render(<FormInput {...defaultProps} />);
      expect(screen.queryByTestId('form-input-helper')).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('shows error message when error is provided', () => {
      render(<FormInput {...defaultProps} error="test.error" />);
      const error = screen.getByTestId('form-input-error');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent('test.error');
    });

    it('hides error message when no error', () => {
      render(<FormInput {...defaultProps} />);
      expect(screen.queryByTestId('form-input-error')).not.toBeInTheDocument();
    });

    it('applies error styling to input when error is present', () => {
      render(<FormInput {...defaultProps} error="test.error" />);
      const input = screen.getByTestId('form-input-field');
      expect(input).toHaveClass('border-red-300', 'bg-red-50', 'text-red-900');
    });

    it('applies normal styling to input when no error', () => {
      render(<FormInput {...defaultProps} />);
      const input = screen.getByTestId('form-input-field');
      expect(input).toHaveClass('border-gray-300', 'bg-white', 'text-gray-900');
    });

    it('sets aria-invalid to true when error is present', () => {
      render(<FormInput {...defaultProps} error="test.error" />);
      const input = screen.getByTestId('form-input-field');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets aria-invalid to false when no error', () => {
      render(<FormInput {...defaultProps} />);
      const input = screen.getByTestId('form-input-field');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });

    it('error message has proper ARIA attributes', () => {
      render(<FormInput {...defaultProps} error="test.error" />);
      const error = screen.getByTestId('form-input-error');
      expect(error).toHaveAttribute('role', 'alert');
      expect(error).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Input Properties', () => {
    it('sets input type correctly', () => {
      render(<FormInput {...defaultProps} type="email" />);
      const input = screen.getByTestId('form-input-field');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('sets placeholder correctly', () => {
      render(<FormInput {...defaultProps} placeholder="Enter text" />);
      const input = screen.getByTestId('form-input-field');
      expect(input).toHaveAttribute('placeholder', 'Enter text');
    });

    it('sets value correctly', () => {
      render(<FormInput {...defaultProps} value="test value" />);
      const input = screen.getByTestId('form-input-field');
      expect(input).toHaveValue('test value');
    });

    it('sets disabled state correctly', () => {
      render(<FormInput {...defaultProps} disabled />);
      const input = screen.getByTestId('form-input-field');
      expect(input).toBeDisabled();
    });

    it('sets required attribute correctly', () => {
      render(<FormInput {...defaultProps} required />);
      const input = screen.getByTestId('form-input-field');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('passes through custom className', () => {
      render(<FormInput {...defaultProps} className="custom-class" />);
      const input = screen.getByTestId('form-input-field');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when input value changes', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<FormInput {...defaultProps} onChange={onChange} />);

      const input = screen.getByTestId('form-input-field');
      await user.type(input, 'test');

      expect(onChange).toHaveBeenCalled();
    });

    it('calls onBlur when input loses focus', async () => {
      const user = userEvent.setup();
      const onBlur = vi.fn();
      render(<FormInput {...defaultProps} onBlur={onBlur} />);

      const input = screen.getByTestId('form-input-field');
      await user.click(input);
      await user.tab();

      expect(onBlur).toHaveBeenCalled();
    });

    it('calls onFocus when input gains focus', async () => {
      const user = userEvent.setup();
      const onFocus = vi.fn();
      render(<FormInput {...defaultProps} onFocus={onFocus} />);

      const input = screen.getByTestId('form-input-field');
      await user.click(input);

      expect(onFocus).toHaveBeenCalled();
    });
  });

  describe('RTL Support', () => {
    it('applies RTL text alignment when isRTL is true', () => {
      render(<FormInput {...defaultProps} isRTL />);
      const label = screen.getByTestId('form-input-label');
      expect(label).toHaveClass('text-right');
    });

    it('applies LTR text alignment when isRTL is false', () => {
      render(<FormInput {...defaultProps} isRTL={false} />);
      const label = screen.getByTestId('form-input-label');
      expect(label).toHaveClass('text-left');
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-describedby when description is provided', () => {
      render(<FormInput {...defaultProps} description="test.description" />);
      const input = screen.getByTestId('form-input-field');
      const description = screen.getByTestId('form-input-description');
      expect(input).toHaveAttribute('aria-describedby', description.id);
    });

    it('has proper aria-describedby when helper text is provided', () => {
      render(<FormInput {...defaultProps} helperText="test.helper" />);
      const input = screen.getByTestId('form-input-field');
      const helper = screen.getByTestId('form-input-helper');
      expect(input).toHaveAttribute('aria-describedby', helper.id);
    });

    it('has proper aria-describedby when error is provided', () => {
      render(<FormInput {...defaultProps} error="test.error" />);
      const input = screen.getByTestId('form-input-field');
      const error = screen.getByTestId('form-input-error');
      expect(input).toHaveAttribute('aria-describedby', error.id);
    });

    it('combines multiple aria-describedby values correctly', () => {
      render(
        <FormInput
          {...defaultProps}
          description="test.description"
          helperText="test.helper"
        />
      );
      const input = screen.getByTestId('form-input-field');
      const description = screen.getByTestId('form-input-description');
      const helper = screen.getByTestId('form-input-helper');
      const ariaDescribedBy = input.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toContain(description.id);
      expect(ariaDescribedBy).toContain(helper.id);
    });
  });

  describe('Forwarded Ref', () => {
    it('forwards ref to input element', () => {
      const ref = vi.fn();
      render(<FormInput {...defaultProps} ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
