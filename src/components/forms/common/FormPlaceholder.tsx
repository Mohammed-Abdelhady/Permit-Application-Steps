import { motion } from 'framer-motion';
import classNames from 'classnames';
import { type FormPlaceholderProps } from '@/types/components';

const FormPlaceholder = ({
  content,
  className,
  direction = 'none',
}: FormPlaceholderProps) => {
  return (
    <motion.div
      data-testid="form-placeholder"
      className={classNames(
        'rounded-lg',
        'border-2',
        'border-dashed',
        'p-6',
        'text-center',
        'transition-colors',
        {
          'border-gray-300': true,
          'hover:border-blue-300': true,
          'ring-2 ring-blue-200': direction === 'forward',
          'ring-2 ring-gray-200': direction === 'backward',
        },
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <p data-testid="form-placeholder-content" className="text-gray-500">
        {content}
      </p>
    </motion.div>
  );
};

export default FormPlaceholder;
