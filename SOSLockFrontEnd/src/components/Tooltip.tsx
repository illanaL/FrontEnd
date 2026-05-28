type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
type TooltipVariant = 'default' | 'info' | 'success' | 'danger'

type TooltipProps = {
  content: string
  position?: TooltipPosition
  variant?: TooltipVariant
  children: React.ReactNode
}

const tooltipBase =
  'absolute z-50 pointer-events-none whitespace-nowrap ' +
  'text-[13px] font-normal leading-snug px-2.5 py-1.5 rounded-md ' +
  'opacity-0 group-hover:opacity-100 ' +
  'transition-all duration-[120ms] ease-out'

const positions: Record<TooltipPosition, string> = {
  top:    'bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 translate-y-1 group-hover:translate-y-0',
  bottom: 'top-[calc(100%+8px)]    left-1/2 -translate-x-1/2 -translate-y-1 group-hover:translate-y-0',
  left:   'right-[calc(100%+8px)]  top-1/2  translate-x-1 -translate-y-1/2  group-hover:translate-x-0',
  right:  'left-[calc(100%+8px)]   top-1/2 -translate-x-1 -translate-y-1/2  group-hover:translate-x-0',
}

const variants: Record<TooltipVariant, string> = {
  default: 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900',
  info:    'bg-blue-600 text-white',
  success: 'bg-teal-700 text-white',
  danger:  'bg-orange-700 text-white',
}

export function Tooltip({
  content,
  position = 'top',
  variant = 'default',
  children,
}: TooltipProps) {
  return (
    <div className="relative inline-flex group">
      {children}
      <span
        role="tooltip"
        className={`${tooltipBase} ${positions[position]} ${variants[variant]}`}
      >
        {content}
      </span>
    </div>
  )
}