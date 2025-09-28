import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SelectOption from './SelectOption';
import type { SelectDropdownProps } from './types';

const SelectDropdown = ({
  isOpen,
  searchable,
  searchTerm,
  onSearchChange,
  filteredOptions,
  value,
  highlightedIndex,
  onSelect,
  onHighlight,
  onClearHighlight,
  maxHeight,
  searchId,
  listboxId,
}: SelectDropdownProps) => {
  const { t } = useTranslation();
  const listboxRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listboxRef.current) {
      const highlightedElement = listboxRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-testid="form-select-dropdown"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg"
        >
          {/* Search Input */}
          {searchable && (
            <div className="border-b border-gray-200 p-2">
              <input
                data-testid="form-select-search-input"
                ref={searchRef}
                id={searchId}
                type="text"
                value={searchTerm}
                onChange={e => onSearchChange(e.target.value)}
                placeholder={t('common.search')}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                aria-label={t('common.searchOptions')}
              />
            </div>
          )}

          {/* Options List */}
          <ul
            data-testid="form-select-options-list"
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            className="max-h-60 overflow-auto py-1"
            style={{ maxHeight }}
          >
            {filteredOptions.length === 0 ? (
              <li
                data-testid="form-select-no-results"
                className="px-4 py-2 text-sm text-gray-500"
              >
                {searchTerm
                  ? t('common.noResultsFound')
                  : t('common.noOptionsAvailable')}
              </li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = value === option.value;
                const isHighlighted = index === highlightedIndex;

                return (
                  <SelectOption
                    key={option.value}
                    option={option}
                    isSelected={isSelected}
                    isHighlighted={isHighlighted}
                    onSelect={onSelect}
                    onMouseEnter={() => onHighlight(index)}
                    onMouseLeave={onClearHighlight}
                  />
                );
              })
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectDropdown;
