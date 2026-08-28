export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+8801713042261"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-pulse-dot group-hover:opacity-50" />
      <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-transform duration-200">
        <svg viewBox="0 0 32 32" fill="white" className="w-6 h-6">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.332L4 29l7.82-2.206A12.941 12.941 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm5.95 17.022c-.247.693-1.459 1.357-1.993 1.395-.51.037-.994.235-3.343-.695-2.82-1.104-4.62-3.965-4.76-4.148-.14-.183-1.14-1.52-1.14-2.902 0-1.382.72-2.062 1.004-2.357.247-.26.56-.38.757-.38.19 0 .38.002.547.01.175.01.413-.065.645.493.247.587.84 2.033.912 2.18.073.147.12.32.024.514-.097.196-.147.316-.293.487-.147.17-.31.38-.44.51-.148.146-.302.303-.13.596.172.293.764 1.26 1.64 2.04 1.127 1.003 2.075 1.313 2.368 1.46.293.147.463.122.634-.073.17-.196.73-.85.926-1.14.196-.293.393-.245.66-.147.267.098 1.697.8 1.99.945.292.147.487.22.558.342.073.122.073.693-.173 1.386z"/>
        </svg>
      </span>
    </a>
  )
}
