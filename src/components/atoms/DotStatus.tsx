export function DotStatus({ past = false }: { past?: boolean }) {
  return <span className={`w-2.5 h-2.5 rounded-full flex-none ${past ? 'bg-navy/35' : 'bg-sage-deep'}`} />
}
