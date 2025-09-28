import { motion } from 'framer-motion';
import classNames from 'classnames';
import { type ProgressIndicatorProps } from '@/types/components';

const ProgressIndicator = ({ steps, currentStep }: ProgressIndicatorProps) => {
  // Helper function to get step status
  const getStepStatus = (step: (typeof steps)[0]) => {
    if (step.isCompleted) return 'Completed';
    if (step.isActive) return 'Current';
    return 'Pending';
  };

  return (
    <motion.div
      data-testid="progress-indicator"
      className="mb-4 md:mb-6 lg:mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      aria-label={`Step ${currentStep} of ${steps.length}: ${steps.find(s => s.number === currentStep)?.title}`}
    >
      {/* Steps */}
      <div className="mb-4 flex flex-col space-y-4 md:mb-6 md:flex-row md:items-center md:justify-between md:space-y-0">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            data-testid={`step-${step.number}`}
            className="relative flex items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* Connecting Line - positioned behind text */}
            {index < steps.length - 1 && (
              <div className="absolute top-10 left-4 -z-10 h-8 w-0.5 bg-gray-300 md:top-4 md:left-8 md:h-0.5 md:w-12 lg:w-16">
                {step.isCompleted && (
                  <motion.div
                    className="h-full w-full bg-blue-600 md:h-full md:w-full"
                    initial={{ height: 0, width: 0 }}
                    animate={{ height: '100%', width: '100%' }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                )}
              </div>
            )}

            {/* Step Circle */}
            <motion.button
              type="button"
              data-testid={`step-${step.number}-circle`}
              className={classNames(
                'relative',
                'z-10',
                'flex',
                'h-6',
                'w-6',
                'items-center',
                'justify-center',
                'rounded-full',
                'text-xs',
                'font-semibold',
                'transition-colors',
                'duration-300',
                'md:h-8',
                'md:w-8',
                'md:text-sm',
                'focus:outline-none',
                'focus:ring-2',
                'focus:ring-blue-500',
                'focus:ring-offset-1',
                {
                  'bg-blue-600 text-white': step.isActive,
                  'bg-green-600 text-white': step.isCompleted && !step.isActive,
                  'border border-gray-300 bg-gray-200 text-gray-600':
                    !step.isActive && !step.isCompleted,
                }
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Step ${step.number}: ${step.title} - ${getStepStatus(step)}`}
            >
              <motion.span
                key={step.isCompleted ? 'check' : step.number}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                {step.isCompleted ? '✓' : step.number}
              </motion.span>
            </motion.button>

            {/* Step Title - with background to cover line */}
            <motion.span
              className={classNames(
                'relative',
                'z-10',
                'ml-2',
                'bg-white',
                'px-1',
                'text-xs',
                'font-medium',
                'transition-colors',
                'duration-300',
                'md:ml-3',
                'md:text-sm',
                {
                  'text-blue-700': step.isActive,
                  'text-green-700': step.isCompleted && !step.isActive,
                  'text-gray-600': !step.isActive && !step.isCompleted,
                }
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
            >
              {step.title}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Animated Progress Bar */}
      <motion.div
        data-testid="progress-bar-container"
        className="h-2 w-full overflow-hidden rounded-sm bg-gray-200 shadow-inner"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          data-testid="progress-bar-fill"
          className="h-2 rounded-sm bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / steps.length) * 100}%` }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Progress Text */}
      <motion.div
        data-testid="progress-text"
        className="mt-2 text-center text-xs text-gray-600 md:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        Step {currentStep} of {steps.length}
      </motion.div>
    </motion.div>
  );
};

export default ProgressIndicator;
