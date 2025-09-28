export interface TextSuggestionPopupProps {
  isOpen: boolean;
  suggestion: string;
  isLoading: boolean;
  error: string | null;
  onAccept: (text: string) => void;
  onEdit: (text: string) => void;
  onDiscard: () => void;
  onClose: () => void;
}

export interface PopupHeaderProps {
  onClose: () => void;
}

export interface PopupContentProps {
  isLoading: boolean;
  error: string | null;
  suggestion: string;
  editedText: string;
  isEditing: boolean;
  onEditTextChange: (text: string) => void;
}

export interface PopupActionsProps {
  isLoading: boolean;
  error: string | null;
  suggestion: string;
  editedText: string;
  isEditing: boolean;
  onDiscard: () => void;
  onEdit: () => void;
  onUseEdited: () => void;
  onCancelEdit: () => void;
  onAcceptOriginal: () => void;
  onClose: () => void;
}
