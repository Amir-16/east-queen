import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { scaleIn } from '@/lib/motion'

export default function ProductCard({ product, type, className }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={cn(
        'group bg-white rounded-xl border border-slate-100 shadow-card p-6',
        'hover:shadow-hover hover:border-gold-300/40 transition-all duration-300',
        className,
      )}
    >
      <div className="text-4xl mb-4">{product.icon}</div>
      <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-700 text-[10px] font-semibold uppercase tracking-wider mb-3">
        {product.category}
      </span>
      <h3 className="font-inter font-bold text-navy-900 text-lg mb-2 group-hover:text-gold-600 transition-colors duration-200">
        {product.name}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">{product.description}</p>

      <Link
        href={type === 'export' ? '/export' : '/import'}
        className="inline-flex items-center gap-1.5 text-gold-500 hover:text-gold-600 text-sm font-semibold group/link"
      >
        View Details
        <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform duration-200" />
      </Link>
    </motion.div>
  )
}
