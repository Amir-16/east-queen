import { motion } from 'framer-motion'

const variants = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  dark: 'btn-primary-dark',
  ghost: 'inline-flex items-center gap-2 text-primary hover:text-primary-dark font-display font-semibold text-sm transition-colors duration-200 group',
}

export default function Button({ children, variant = 'primary', className = '', as: Tag = 'button', ...props }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Tag className={`${variants[variant]} ${className}`} {...props}>
        {children}
      </Tag>
    </motion.div>
  )
}
