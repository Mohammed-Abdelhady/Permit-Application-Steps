export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  required?: boolean;
  isRTL?: boolean;
  placeholder?: string;
  description?: string;
  searchable?: boolean;
  clearable?: boolean;
  maxHeight?: number;
  onValueChange?: (value: string) => void;
}

export interface SelectOptionProps {
  option: SelectOption;
  isSelected: boolean;
  isHighlighted: boolean;
  onSelect: (value: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export interface SelectDropdownProps {
  isOpen: boolean;
  searchable: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filteredOptions: SelectOption[];
  value: string;
  highlightedIndex: number;
  onSelect: (value: string) => void;
  onHighlight: (index: number) => void;
  onClearHighlight: () => void;
  maxHeight: number;
  searchId: string;
  listboxId: string;
}

export interface SelectTriggerProps {
  isOpen: boolean;
  displayValue: string;
  selectedOption: SelectOption | undefined;
  clearable: boolean;
  error?: string;
  required?: boolean;
  ariaDescribedBy?: string;
  onToggle: () => void;
  onClear: (e: React.MouseEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onBlur: () => void;
}
