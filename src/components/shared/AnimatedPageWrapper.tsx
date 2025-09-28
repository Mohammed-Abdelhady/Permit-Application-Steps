import { motion } from 'framer-motion';
import { type AnimatedPageWrapperProps } from '@/types/components';

const AnimatedPageWrapper = ({
  children,
  direction = 'forward',
}: AnimatedPageWrapperProps) => {
  const normalizedDirection = direction === 'none' ? 'forward' : direction;

  const variants = {
    initial: (dir: string) => ({
      opacity: 0,
      x: dir === 'forward' ? 100 : -100,
      scale: 0.95,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: string) => ({
      opacity: 0,
      x: dir === 'forward' ? -100 : 100,
      scale: 0.95,
    }),
  };

  const transition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    duration: 0.4,
  };

  return (
    <motion.div
      custom={normalizedDirection}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPageWrapper;
