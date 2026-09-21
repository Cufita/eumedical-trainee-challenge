import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'

export interface FilterOption {
  value: string
  label: string
}

export function FilterDropdown({
  label,
  options,
  value,
  onChange,
  allLabel = 'Todos',
}: {
  label: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  allLabel?: string
}) {
  const activeLabel = options.find((o) => o.value === value)?.label ?? allLabel

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="flex items-center gap-2 px-4 py-2.5 rounded-pill border-[1.5px] border-mist bg-white font-label text-sm text-navy hover:border-sage-pale">
        <span className="text-slate">{label}:</span> {activeLabel}
        <ChevronDown size={16} />
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="mt-2 w-48 rounded-xl border border-mist bg-white shadow-lg py-1.5 z-10 focus:outline-none"
      >
        <MenuItem>
          <button
            type="button"
            onClick={() => onChange('')}
            className="w-full text-left px-4 py-2 text-sm text-navy data-[focus]:bg-cloud"
          >
            {allLabel}
          </button>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value}>
            <button
              type="button"
              onClick={() => onChange(option.value)}
              className="w-full text-left px-4 py-2 text-sm text-navy data-[focus]:bg-cloud"
            >
              {option.label}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}
