export default function SectionTag({ children, color = 'green' }) {
  const styles = {
    green: 'text-forest-600 before:bg-earth-400',
    earth: 'text-earth-600 before:bg-earth-400',
    sky:   'text-sky-600   before:bg-earth-400',
    dark:  'text-forest-300 before:bg-earth-400',
  }
  return (
    <div className={`eyebrow ${styles[color]}`}>
      {children}
    </div>
  )
}
