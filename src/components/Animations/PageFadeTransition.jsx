import { motion } from 'framer-motion';

const FadePageTransition = ({ children, durationInSec = 0.5 }) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: durationInSec, type: 'tween', ease: 'linear' }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default FadePageTransition;
