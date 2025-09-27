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
