import { motion } from 'framer-motion';
import classNames from 'classnames';
import { type ProgressIndicatorProps } from '../../types/components';

const ProgressIndicator = ({ steps, currentStep }: ProgressIndicatorProps) => {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Steps */}
      <div className="mb-6 flex items-center justify-between">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            className="relative flex items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* Connecting Line - positioned behind text */}
            {index < steps.length - 1 && (
              <div className="absolute top-4 left-8 -z-10 h-0.5 w-16 bg-gray-300">
                {step.isCompleted && (
                  <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                )}
              </div>
            )}

            {/* Step Circle */}
            <motion.div
              className={classNames(
                'relative',
                'z-10',
                'flex',
                'h-8',
                'w-8',
                'items-center',
                'justify-center',
                'rounded-full',
                'text-sm',
                'font-semibold',
                'transition-colors',
                'duration-300',
                {
                  'bg-blue-600 text-white': step.isActive,
                  'bg-green-600 text-white': step.isCompleted && !step.isActive,
                  'border border-gray-300 bg-gray-200 text-gray-600':
                    !step.isActive && !step.isCompleted,
                }
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                key={step.isCompleted ? 'check' : step.number}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {step.isCompleted ? '✓' : step.number}
              </motion.span>
            </motion.div>

            {/* Step Title - with background to cover line */}
            <motion.span
              className={classNames(
                'relative',
                'z-10',
                'ml-3',
                'bg-white',
                'px-1',
                'text-sm',
                'font-medium',
                'transition-colors',
                'duration-300',
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
        className="h-2 w-full overflow-hidden rounded-sm bg-gray-200 shadow-inner"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="h-2 rounded-sm bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / steps.length) * 100}%` }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Progress Text */}
      <motion.div
        className="mt-2 text-center text-sm text-gray-600"
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
