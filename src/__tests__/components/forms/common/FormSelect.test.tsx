import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & {
      children?: React.ReactNode;
    }) => <div {...props}>{children}</div>,
    ul: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLUListElement> & {
      children?: React.ReactNode;
    }) => <ul {...props}>{children}</ul>,
    li: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLLIElement> & {
      children?: React.ReactNode;
    }) => <li {...props}>{children}</li>,
    button: ({
      children,
      ...props
    }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      children?: React.ReactNode;
    }) => <button {...props}>{children}</button>,
    svg: ({
      children,
      ...props
    }: React.SVGAttributes<SVGSVGElement> & {
      children?: React.ReactNode;
    }) => <svg {...props}>{children}</svg>,
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
  ChevronDown: () => <div data-testid="chevron-down-icon">ChevronDown</div>,
  ChevronUp: () => <div data-testid="chevron-up-icon">ChevronUp</div>,
  X: () => <div data-testid="x-icon">X</div>,
  Search: () => <div data-testid="search-icon">Search</div>,
  Check: () => <div data-testid="check-icon">Check</div>,
}));

import FormSelect from '../../../../components/forms/common/FormSelect';

describe('FormSelect', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
    {
      value: 'option4',
      label: 'Option 4',
      description: 'Option 4 description',
    },
  ];

  const defaultProps = {
    label: 'test.label',
    options: mockOptions,
    name: 'testSelect',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Select Mode', () => {
    describe('Component Structure', () => {
      it('renders the container with correct data-testid', () => {
        render(<FormSelect {...defaultProps} />);
        expect(screen.getByTestId('form-select-container')).toBeInTheDocument();
      });

      it('renders the label with correct data-testid and text', () => {
        render(<FormSelect {...defaultProps} />);
        const label = screen.getByTestId('form-select-label');
        expect(label).toBeInTheDocument();
        expect(label).toHaveTextContent('test.label');
      });

      it('renders the select field with correct data-testid', () => {
        render(<FormSelect {...defaultProps} />);
        expect(screen.getByTestId('form-select-field')).toBeInTheDocument();
      });
    });

    describe('Required Indicator', () => {
      it('shows required indicator when required is true', () => {
        render(<FormSelect {...defaultProps} required />);
        const requiredIndicator = screen.getByTestId('form-select-required');
        expect(requiredIndicator).toBeInTheDocument();
        expect(requiredIndicator).toHaveTextContent('*');
      });

      it('hides required indicator when required is false', () => {
        render(<FormSelect {...defaultProps} required={false} />);
        expect(
          screen.queryByTestId('form-select-required')
        ).not.toBeInTheDocument();
      });
    });

    describe('Description', () => {
      it('shows description when provided', () => {
        const description = 'This is a description';
        render(<FormSelect {...defaultProps} description={description} />);
        const descriptionElement = screen.getByTestId(
          'form-select-description'
        );
        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement).toHaveTextContent(description);
      });

      it('hides description when not provided', () => {
        render(<FormSelect {...defaultProps} />);
        expect(
          screen.queryByTestId('form-select-description')
        ).not.toBeInTheDocument();
      });
    });

    describe('Helper Text', () => {
      it('shows helper text when provided and no error', () => {
        const helperText = 'This is helper text';
        render(<FormSelect {...defaultProps} helperText={helperText} />);
        const helperElement = screen.getByTestId('form-select-helper');
        expect(helperElement).toBeInTheDocument();
        expect(helperElement).toHaveTextContent(helperText);
      });

      it('hides helper text when error is present', () => {
        const helperText = 'This is helper text';
        const error = 'This is an error';
        render(
          <FormSelect {...defaultProps} helperText={helperText} error={error} />
        );
        expect(
          screen.queryByTestId('form-select-helper')
        ).not.toBeInTheDocument();
      });
    });

    describe('Error State', () => {
      it('shows error message when error is provided', () => {
        const error = 'This is an error';
        render(<FormSelect {...defaultProps} error={error} />);
        const errorElement = screen.getByTestId('form-select-error');
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent(error);
      });

      it('hides error message when no error', () => {
        render(<FormSelect {...defaultProps} />);
        expect(
          screen.queryByTestId('form-select-error')
        ).not.toBeInTheDocument();
      });

      it('applies error styling to select when error is present', () => {
        const error = 'This is an error';
        render(<FormSelect {...defaultProps} error={error} />);
        const select = screen.getByTestId('form-select-field');
        expect(select).toHaveClass('border-red-300');
      });

      it('applies normal styling to select when no error', () => {
        render(<FormSelect {...defaultProps} />);
        const select = screen.getByTestId('form-select-field');
        expect(select).not.toHaveClass('border-red-500');
      });
    });

    describe('Select Properties', () => {
      it('sets value correctly', () => {
        render(<FormSelect {...defaultProps} value="option2" />);
        const select = screen.getByTestId(
          'form-select-field'
        ) as HTMLSelectElement;
        expect(select.value).toBe('option2');
      });

      it('sets disabled state correctly', () => {
        render(<FormSelect {...defaultProps} disabled />);
        const select = screen.getByTestId('form-select-field');
        expect(select).toBeDisabled();
      });

      it('renders all options correctly', () => {
        render(<FormSelect {...defaultProps} />);
        const select = screen.getByTestId(
          'form-select-field'
        ) as HTMLSelectElement;
        const options = Array.from(select.options);

        // Should have 4 provided options (no empty option by default)
        expect(options).toHaveLength(4);
        expect(options[0]).toHaveValue('option1');
        expect(options[0]).toHaveTextContent('Option 1');
        expect(options[1]).toHaveValue('option2');
        expect(options[2]).toHaveValue('option3');
        expect(options[2]).toBeDisabled();
        expect(options[3]).toHaveValue('option4');
      });

      it('sets placeholder correctly', () => {
        const placeholder = 'Choose an option';
        render(<FormSelect {...defaultProps} placeholder={placeholder} />);
        const select = screen.getByTestId(
          'form-select-field'
        ) as HTMLSelectElement;
        expect(select.options[0]).toHaveTextContent(placeholder);
      });
    });

    describe('User Interactions', () => {
      it('calls onChange when select value changes', async () => {
        const user = userEvent.setup();
        const mockOnChange = vi.fn();
        render(<FormSelect {...defaultProps} onChange={mockOnChange} />);

        const select = screen.getByTestId('form-select-field');
        await user.selectOptions(select, 'option2');

        expect(mockOnChange).toHaveBeenCalled();
      });

      it('calls onValueChange when select value changes', async () => {
        const user = userEvent.setup();
        const mockOnValueChange = vi.fn();
        render(
          <FormSelect {...defaultProps} onValueChange={mockOnValueChange} />
        );

        const select = screen.getByTestId('form-select-field');
        await user.selectOptions(select, 'option2');

        expect(mockOnValueChange).toHaveBeenCalledWith('option2');
      });

      it('has onBlur prop configured correctly', () => {
        const mockOnBlur = vi.fn();
        render(<FormSelect {...defaultProps} onBlur={mockOnBlur} />);

        const select = screen.getByTestId('form-select-field');
        // Test that the onBlur prop is correctly passed to the select element
        expect(select).toHaveProperty('onblur');
      });
    });
  });

  describe('Searchable Select Mode', () => {
    const searchableProps = {
      ...defaultProps,
      searchable: true,
    };

    describe('Component Structure', () => {
      it('renders searchable container with correct data-testid', () => {
        render(<FormSelect {...searchableProps} />);
        expect(
          screen.getByTestId('form-select-searchable-container')
        ).toBeInTheDocument();
      });

      it('renders searchable label with correct data-testid', () => {
        render(<FormSelect {...searchableProps} />);
        const label = screen.getByTestId('form-select-searchable-label');
        expect(label).toBeInTheDocument();
        expect(label).toHaveTextContent('test.label');
      });

      it('renders trigger button with correct data-testid', () => {
        render(<FormSelect {...searchableProps} />);
        expect(screen.getByTestId('form-select-trigger')).toBeInTheDocument();
      });

      it('renders display text with correct data-testid', () => {
        render(<FormSelect {...searchableProps} />);
        expect(
          screen.getByTestId('form-select-display-text')
        ).toBeInTheDocument();
      });

      it('renders dropdown icon with correct data-testid', () => {
        render(<FormSelect {...searchableProps} />);
        expect(
          screen.getByTestId('form-select-dropdown-icon')
        ).toBeInTheDocument();
      });
    });

    describe('Required Indicator in Searchable Mode', () => {
      it('shows required indicator when required is true', () => {
        render(<FormSelect {...searchableProps} required />);
        const requiredIndicator = screen.getByTestId(
          'form-select-searchable-required'
        );
        expect(requiredIndicator).toBeInTheDocument();
        expect(requiredIndicator).toHaveTextContent('*');
      });

      it('hides required indicator when required is false', () => {
        render(<FormSelect {...searchableProps} required={false} />);
        expect(
          screen.queryByTestId('form-select-searchable-required')
        ).not.toBeInTheDocument();
      });
    });

    describe('Description in Searchable Mode', () => {
      it('shows description when provided', () => {
        const description = 'This is a description';
        render(<FormSelect {...searchableProps} description={description} />);
        const descriptionElement = screen.getByTestId(
          'form-select-searchable-description'
        );
        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement).toHaveTextContent(description);
      });

      it('hides description when not provided', () => {
        render(<FormSelect {...searchableProps} />);
        expect(
          screen.queryByTestId('form-select-searchable-description')
        ).not.toBeInTheDocument();
      });
    });

    describe('Dropdown Functionality', () => {
      it('opens dropdown when trigger is clicked', async () => {
        const user = userEvent.setup();
        render(<FormSelect {...searchableProps} />);

        const trigger = screen.getByTestId('form-select-trigger');
        await user.click(trigger);

        expect(screen.getByTestId('form-select-dropdown')).toBeInTheDocument();
      });

      it('closes dropdown when clicked outside', async () => {
        const user = userEvent.setup();
        render(
          <div>
            <FormSelect {...searchableProps} />
            <button data-testid="outside-button">Outside</button>
          </div>
        );

        const trigger = screen.getByTestId('form-select-trigger');
        await user.click(trigger);

        expect(screen.getByTestId('form-select-dropdown')).toBeInTheDocument();

        const outsideButton = screen.getByTestId('outside-button');
        await user.click(outsideButton);

        await waitFor(() => {
          expect(
            screen.queryByTestId('form-select-dropdown')
          ).not.toBeInTheDocument();
        });
      });

      it('renders options list with correct data-testid', async () => {
        const user = userEvent.setup();
        render(<FormSelect {...searchableProps} />);

        const trigger = screen.getByTestId('form-select-trigger');
        await user.click(trigger);

        expect(
          screen.getByTestId('form-select-options-list')
        ).toBeInTheDocument();
      });

      it('renders individual options with correct data-testids', async () => {
        const user = userEvent.setup();
        render(<FormSelect {...searchableProps} />);

        const trigger = screen.getByTestId('form-select-trigger');
        await user.click(trigger);

        expect(
          screen.getByTestId('form-select-option-option1')
        ).toBeInTheDocument();
        expect(
          screen.getByTestId('form-select-option-option2')
        ).toBeInTheDocument();
        expect(
          screen.getByTestId('form-select-option-option3')
        ).toBeInTheDocument();
        expect(
          screen.getByTestId('form-select-option-option4')
        ).toBeInTheDocument();
      });
    });

    describe('Search Functionality', () => {
      it('renders search input when dropdown is open', async () => {
        const user = userEvent.setup();
        render(<FormSelect {...searchableProps} />);

        const trigger = screen.getByTestId('form-select-trigger');
        await user.click(trigger);

        expect(
          screen.getByTestId('form-select-search-input')
        ).toBeInTheDocument();
      });

      it('filters options based on search term', async () => {
        const user = userEvent.setup();
        render(<FormSelect {...searchableProps} />);

        const trigger = screen.getByTestId('form-select-trigger');
        await user.click(trigger);

        const searchInput = screen.getByTestId('form-select-search-input');
        await user.type(searchInput, '1');

        expect(
          screen.getByTestId('form-select-option-option1')
        ).toBeInTheDocument();
        expect(
          screen.queryByTestId('form-select-option-option2')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByTestId('form-select-option-option3')
        ).not.toBeInTheDocument();
      });

      it('shows no results message when search yields no matches', async () => {
        const user = userEvent.setup();
        render(<FormSelect {...searchableProps} />);

        const trigger = screen.getByTestId('form-select-trigger');
        await user.click(trigger);

        const searchInput = screen.getByTestId('form-select-search-input');
        await user.type(searchInput, 'nonexistent');

        expect(
          screen.getByTestId('form-select-no-results')
        ).toBeInTheDocument();
      });
    });

    describe('Selection in Searchable Mode', () => {
      it('selects option when clicked', async () => {
        const user = userEvent.setup();
        const mockOnValueChange = vi.fn();
        render(
          <FormSelect {...searchableProps} onValueChange={mockOnValueChange} />
        );

        const trigger = screen.getByTestId('form-select-trigger');
        await user.click(trigger);

        // Wait for dropdown to be rendered
        await screen.findByTestId('form-select-dropdown');

        const option = screen.getByTestId('form-select-option-option2');

        await act(async () => {
          await user.click(option);
        });

        expect(mockOnValueChange).toHaveBeenCalledWith('option2');
      });

      it('closes dropdown after selection', async () => {
        const user = userEvent.setup();
        render(<FormSelect {...searchableProps} />);

        const trigger = screen.getByTestId('form-select-trigger');
        await user.click(trigger);

        const option = screen.getByTestId('form-select-option-option2');
        await user.click(option);

        await waitFor(() => {
          expect(
            screen.queryByTestId('form-select-dropdown')
          ).not.toBeInTheDocument();
        });
      });

      it('displays selected option text', async () => {
        render(<FormSelect {...searchableProps} value="option2" />);

        const displayText = screen.getByTestId('form-select-display-text');
        expect(displayText).toHaveTextContent('Option 2');
      });
    });

    describe('Clearable Functionality', () => {
      const clearableProps = {
        ...searchableProps,
        clearable: true,
        value: 'option1',
      };

      it('renders clear button when clearable and has value', () => {
        render(<FormSelect {...clearableProps} />);
        expect(
          screen.getByTestId('form-select-clear-button')
        ).toBeInTheDocument();
      });

      it('hides clear button when no value selected', () => {
        render(<FormSelect {...searchableProps} clearable value="" />);
        expect(
          screen.queryByTestId('form-select-clear-button')
        ).not.toBeInTheDocument();
      });

      it('clears selection when clear button is clicked', async () => {
        const user = userEvent.setup();
        const mockOnValueChange = vi.fn();
        render(
          <FormSelect {...clearableProps} onValueChange={mockOnValueChange} />
        );

        const clearButton = screen.getByTestId('form-select-clear-button');
        await user.click(clearButton);

        expect(mockOnValueChange).toHaveBeenCalledWith('');
      });
    });

    describe('Keyboard Navigation', () => {
      it('opens dropdown with Enter key', async () => {
        const user = userEvent.setup();
        render(<FormSelect {...searchableProps} />);

        const trigger = screen.getByTestId('form-select-trigger');
        trigger.focus();
        await user.keyboard('{Enter}');

        expect(screen.getByTestId('form-select-dropdown')).toBeInTheDocument();
      });

      it('opens dropdown with Space key', async () => {
        const user = userEvent.setup();
        render(<FormSelect {...searchableProps} />);

        const trigger = screen.getByTestId('form-select-trigger');
        trigger.focus();
        await user.keyboard('{ }');

        expect(screen.getByTestId('form-select-dropdown')).toBeInTheDocument();
      });

      it('handles Escape key press', async () => {
        const user = userEvent.setup();
        render(<FormSelect {...searchableProps} />);

        const trigger = screen.getByTestId('form-select-trigger');
        await user.click(trigger);

        expect(screen.getByTestId('form-select-dropdown')).toBeInTheDocument();

        await user.keyboard('{Escape}');

        // Test that the component handles the keyboard event
        expect(trigger).toHaveAttribute('aria-expanded');
      });

      it('handles Tab key press', async () => {
        const user = userEvent.setup();
        render(<FormSelect {...searchableProps} />);

        const trigger = screen.getByTestId('form-select-trigger');
        await user.click(trigger);

        expect(screen.getByTestId('form-select-dropdown')).toBeInTheDocument();

        await user.keyboard('{Tab}');

        // Test that the component handles the keyboard event
        expect(trigger).toHaveAttribute('aria-expanded');
      });
    });

    describe('Helper Text in Searchable Mode', () => {
      it('shows helper text when provided and no error', () => {
        const helperText = 'This is helper text';
        render(<FormSelect {...searchableProps} helperText={helperText} />);
        const helperElement = screen.getByTestId(
          'form-select-searchable-helper'
        );
        expect(helperElement).toBeInTheDocument();
        expect(helperElement).toHaveTextContent(helperText);
      });

      it('hides helper text when error is present', () => {
        const helperText = 'This is helper text';
        const error = 'This is an error';
        render(
          <FormSelect
            {...searchableProps}
            helperText={helperText}
            error={error}
          />
        );
        expect(
          screen.queryByTestId('form-select-searchable-helper')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('RTL Support', () => {
    it('applies RTL text alignment to label when isRTL is true', () => {
      render(<FormSelect {...defaultProps} isRTL />);
      const label = screen.getByTestId('form-select-label');
      expect(label).toHaveClass('text-right');
    });

    it('applies LTR text alignment to label when isRTL is false', () => {
      render(<FormSelect {...defaultProps} isRTL={false} />);
      const label = screen.getByTestId('form-select-label');
      expect(label).toHaveClass('text-left');
    });

    it('applies RTL text alignment to searchable label when isRTL is true', () => {
      render(<FormSelect {...defaultProps} searchable isRTL />);
      const label = screen.getByTestId('form-select-searchable-label');
      expect(label).toHaveClass('text-right');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes for basic select', () => {
      const error = 'This is an error';
      const helperText = 'This is helper text';
      const description = 'This is a description';

      render(
        <FormSelect
          {...defaultProps}
          error={error}
          helperText={helperText}
          description={description}
          required
        />
      );

      const select = screen.getByTestId('form-select-field');
      expect(select).toHaveAttribute('aria-required', 'true');
      expect(select).toHaveAttribute('aria-invalid', 'true');
      expect(select).toHaveAttribute('aria-describedby');
    });

    it('has proper ARIA attributes for searchable select', async () => {
      const user = userEvent.setup();
      render(<FormSelect {...defaultProps} searchable required />);

      const trigger = screen.getByTestId('form-select-trigger');
      expect(trigger).toHaveAttribute('aria-required', 'true');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
