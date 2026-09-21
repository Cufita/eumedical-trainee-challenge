export type ButtonVariant = 'gold' | 'outline' | 'outline-dark' | 'ghost' | 'dark'

const base =
  'inline-flex items-center gap-2 justify-center rounded-pill font-label text-base border-2 border-transparent transition-transform duration-150 hover:-translate-y-px whitespace-nowrap px-[26px] py-[13px]'

const variantClasses: Record<ButtonVariant, string> = {
  gold: 'bg-gold text-navy-2 font-bold hover:shadow-[0_10px_24px_-10px_rgba(231,159,26,0.6)]',
  outline: 'border-navy! text-navy bg-transparent hover:bg-navy hover:text-white',
  'outline-dark': 'border-white/55! text-white hover:bg-white hover:text-navy',
  ghost: 'text-navy underline underline-offset-[3px] px-1.5!',
  dark: 'bg-navy text-white hover:bg-navy-2',
}

export function buttonClasses(variant: ButtonVariant = 'gold', className = '') {
  return [base, variantClasses[variant], className].filter(Boolean).join(' ')
}
