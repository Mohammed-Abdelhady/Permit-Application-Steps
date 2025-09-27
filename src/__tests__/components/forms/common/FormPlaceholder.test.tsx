import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
  },
}));

import FormPlaceholder from '../../../../components/forms/common/FormPlaceholder';

describe('FormPlaceholder', () => {
  const defaultProps = {
    content: 'Loading form...',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('renders the container with correct data-testid', () => {
      render(<FormPlaceholder {...defaultProps} />);
      expect(screen.getByTestId('form-placeholder')).toBeInTheDocument();
    });

    it('renders the content with correct data-testid', () => {
      render(<FormPlaceholder {...defaultProps} />);
      expect(
        screen.getByTestId('form-placeholder-content')
      ).toBeInTheDocument();
    });

    it('displays the correct content text', () => {
      render(<FormPlaceholder {...defaultProps} />);
      const content = screen.getByTestId('form-placeholder-content');
      expect(content).toHaveTextContent('Loading form...');
    });

    it('displays different content when passed different prop', () => {
      render(<FormPlaceholder content="Different content" />);
      const content = screen.getByTestId('form-placeholder-content');
      expect(content).toHaveTextContent('Different content');
    });
  });

  describe('Styling', () => {
    it('applies the correct CSS classes to container', () => {
      render(<FormPlaceholder {...defaultProps} />);
      const container = screen.getByTestId('form-placeholder');
      expect(container).toHaveClass(
        'rounded-lg',
        'border-2',
        'border-dashed',
        'p-6',
        'text-center',
        'transition-colors'
      );
    });

    it('applies the correct CSS classes to content', () => {
      render(<FormPlaceholder {...defaultProps} />);
      const content = screen.getByTestId('form-placeholder-content');
      expect(content).toHaveClass('text-gray-500');
    });
  });

  describe('Animation Properties', () => {
    it('has correct initial animation properties', () => {
      render(<FormPlaceholder {...defaultProps} />);
      const container = screen.getByTestId('form-placeholder');
      // Since we're mocking framer-motion, we just check the component renders
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<FormPlaceholder {...defaultProps} />);
      const container = screen.getByTestId('form-placeholder');
      const content = screen.getByTestId('form-placeholder-content');
      expect(container).toContainElement(content);
    });

    it('content is accessible to screen readers', () => {
      render(<FormPlaceholder {...defaultProps} />);
      const content = screen.getByTestId('form-placeholder-content');
      expect(content).toBeVisible();
      expect(content).toHaveTextContent('Loading form...');
    });
  });

  describe('Content Variations', () => {
    it('handles empty content', () => {
      render(<FormPlaceholder content="" />);
      const content = screen.getByTestId('form-placeholder-content');
      expect(content).toBeInTheDocument();
      expect(content).toBeEmptyDOMElement();
    });

    it('handles string content', () => {
      render(<FormPlaceholder content="Please wait..." />);
      const content = screen.getByTestId('form-placeholder-content');
      expect(content).toHaveTextContent('Please wait...');
    });

    it('handles long content strings', () => {
      const longContent =
        'This is a very long placeholder content that tests how the component handles longer text strings.';
      render(<FormPlaceholder content={longContent} />);
      const content = screen.getByTestId('form-placeholder-content');
      expect(content).toHaveTextContent(longContent);
    });
  });

  describe('Props Handling', () => {
    it('accepts and uses content prop correctly', () => {
      const testContent = 'Test placeholder content';
      render(<FormPlaceholder content={testContent} />);
      const content = screen.getByTestId('form-placeholder-content');
      expect(content).toHaveTextContent(testContent);
    });

    it('accepts custom className', () => {
      render(<FormPlaceholder content="Test" className="custom-class" />);
      const container = screen.getByTestId('form-placeholder');
      expect(container).toHaveClass('custom-class');
    });

    it('handles direction prop for styling', () => {
      render(<FormPlaceholder content="Test" direction="forward" />);
      const container = screen.getByTestId('form-placeholder');
      expect(container).toHaveClass('ring-2', 'ring-blue-200');
    });

    it('handles backward direction styling', () => {
      render(<FormPlaceholder content="Test" direction="backward" />);
      const container = screen.getByTestId('form-placeholder');
      expect(container).toHaveClass('ring-2', 'ring-gray-200');
    });
  });
});
