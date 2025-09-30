import { motion } from 'framer-motion';
import classNames from 'classnames';
import { forwardRef } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'text';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonColorScheme =
  | 'blue'
  | 'purple'
  | 'emerald'
  | 'red'
  | 'gray'
  | 'indigo'
  | 'pink'
  | 'teal';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: ButtonColorScheme;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  animated?: boolean;
  'data-testid': string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      colorScheme = 'blue',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      animated = true,
      className,
      children,
      disabled,
      'data-testid': dataTestId,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    // Base classes
    const baseClasses = classNames(
      'group relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform-gpu',
      {
        'w-full': fullWidth,
      }
    );

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs rounded-lg',
      md: 'px-4 py-2 text-sm rounded-xl',
      lg: 'px-6 py-3 text-base rounded-2xl',
      xl: 'px-8 py-4 text-lg rounded-2xl',
    };

    // Color scheme classes
    const getColorClasses = () => {
      const colorMap = {
        primary: {
          blue: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500',
          purple:
            'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 focus:ring-purple-500',
          emerald:
            'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 focus:ring-emerald-500',
          red: 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-pink-700 focus:ring-red-500',
          gray: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg hover:shadow-xl hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500',
          indigo:
            'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500',
          pink: 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg hover:shadow-xl hover:from-pink-700 hover:to-rose-700 focus:ring-pink-500',
          teal: 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-cyan-700 focus:ring-teal-500',
        },
        secondary: {
          blue: 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 focus:ring-blue-500',
          purple:
            'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 hover:border-purple-300 focus:ring-purple-500',
          emerald:
            'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 focus:ring-emerald-500',
          red: 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 hover:border-red-300 focus:ring-red-500',
          gray: 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 focus:ring-gray-500',
          indigo:
            'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 focus:ring-indigo-500',
          pink: 'bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100 hover:border-pink-300 focus:ring-pink-500',
          teal: 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 hover:border-teal-300 focus:ring-teal-500',
        },
        outline: {
          blue: 'border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 focus:ring-blue-500',
          purple:
            'border-2 border-purple-600 text-purple-600 bg-white hover:bg-purple-50 focus:ring-purple-500',
          emerald:
            'border-2 border-emerald-600 text-emerald-600 bg-white hover:bg-emerald-50 focus:ring-emerald-500',
          red: 'border-2 border-red-600 text-red-600 bg-white hover:bg-red-50 focus:ring-red-500',
          gray: 'border-2 border-gray-600 text-gray-600 bg-white hover:bg-gray-50 focus:ring-gray-500',
          indigo:
            'border-2 border-indigo-600 text-indigo-600 bg-white hover:bg-indigo-50 focus:ring-indigo-500',
          pink: 'border-2 border-pink-600 text-pink-600 bg-white hover:bg-pink-50 focus:ring-pink-500',
          teal: 'border-2 border-teal-600 text-teal-600 bg-white hover:bg-teal-50 focus:ring-teal-500',
        },
        ghost: {
          blue: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
          purple: 'text-purple-600 hover:bg-purple-50 focus:ring-purple-500',
          emerald:
            'text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500',
          red: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
          gray: 'text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
          indigo: 'text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
          pink: 'text-pink-600 hover:bg-pink-50 focus:ring-pink-500',
          teal: 'text-teal-600 hover:bg-teal-50 focus:ring-teal-500',
        },
        danger:
          'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-pink-700 focus:ring-red-500',
        success:
          'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 focus:ring-emerald-500',
        text: 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:ring-gray-500',
      };

      if (
        variant === 'primary' ||
        variant === 'secondary' ||
        variant === 'outline' ||
        variant === 'ghost'
      ) {
        return colorMap[variant][colorScheme];
      }
      return colorMap[variant];
    };

    const buttonClasses = classNames(
      baseClasses,
      sizeClasses[size],
      getColorClasses(),
      className
    );

    const renderButtonContent = () => (
      <>
        {/* Animated background overlay for interactive effects */}
        <div className="rounded-inherit absolute inset-0 overflow-hidden">
          {/* Primary button shimmer effect */}
          {variant === 'primary' && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:animate-pulse group-hover:opacity-100" />
            </>
          )}

          {/* Secondary button hover effect */}
          {variant === 'secondary' && (
            <div className="rounded-inherit absolute inset-0 bg-gradient-to-r from-gray-100/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          )}

          {/* Outline button hover effect */}
          {variant === 'outline' && (
            <div className="rounded-inherit absolute inset-0 bg-gradient-to-r from-gray-50/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          )}

          {/* Ghost button hover effect */}
          {variant === 'ghost' && (
            <div className="rounded-inherit absolute inset-0 bg-gradient-to-r from-gray-100/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          )}
        </div>

        {/* Loading spinner with enhanced animation */}
        {isLoading && (
          <div className="relative flex-shrink-0">
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {/* Loading pulse effect */}
            <div className="absolute inset-0 animate-ping rounded-full bg-current opacity-20" />
          </div>
        )}

        {/* Left icon with hover animation */}
        {leftIcon && !isLoading && (
          <span className="flex-shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:scale-110">
            {leftIcon}
          </span>
        )}

        {/* Button content with subtle animation */}
        <span className="relative z-10 flex items-center gap-2 transition-all duration-200 group-hover:translate-x-0.5">
          {children}
        </span>

        {/* Right icon with hover animation */}
        {rightIcon && !isLoading && (
          <span className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:scale-110">
            {rightIcon}
          </span>
        )}
      </>
    );

    if (animated) {
      // Filter out conflicting props between HTML button and Framer Motion
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const {
        onDrag: _onDrag,
        onDragStart: _onDragStart,
        onDragEnd: _onDragEnd,
        onAnimationStart: _onAnimationStart,
        onAnimationEnd: _onAnimationEnd,
        ...buttonProps
      } = props;
      /* eslint-enable @typescript-eslint/no-unused-vars */
      return (
        <motion.button
          ref={ref}
          className={buttonClasses}
          disabled={isDisabled}
          data-testid={dataTestId}
          {...(isDisabled && { 'aria-disabled': 'true' })}
          {...(isLoading && { 'aria-busy': 'true' })}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          whileHover={
            isDisabled
              ? {}
              : {
                  scale: 1.02,
                  y: -2,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                  },
                }
          }
          whileTap={
            isDisabled
              ? {}
              : {
                  scale: 0.98,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 600,
                    damping: 20,
                  },
                }
          }
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          {...buttonProps}
        >
          {renderButtonContent()}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        data-testid={dataTestId}
        {...(isDisabled && { 'aria-disabled': 'true' })}
        {...(isLoading && { 'aria-busy': 'true' })}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        {...props}
      >
        {renderButtonContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
