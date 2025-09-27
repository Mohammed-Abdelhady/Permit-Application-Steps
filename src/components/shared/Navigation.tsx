import { useTranslation } from 'react-i18next';

interface NavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
  showSubmit?: boolean;
  isSubmitting?: boolean;
}

const Navigation = ({
  onPrevious,
  onNext,
  onSubmit,
  showPrevious = false,
  showNext = false,
  showSubmit = false,
  isSubmitting = false,
}: NavigationProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between pt-6">
      <div>
        {showPrevious && (
          <button
            type="button"
            onClick={onPrevious}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-gray-700 hover:bg-gray-50"
          >
            {t('permit.navigation.previous')}
          </button>
        )}
      </div>
      <div className="flex space-x-4">
        {showNext && (
          <button
            type="button"
            onClick={onNext}
            className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
          >
            {t('permit.navigation.next')}
          </button>
        )}
        {showSubmit && (
          <button
            type="submit"
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`rounded-lg px-6 py-2 text-white ${
              isSubmitting
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSubmitting
              ? t('form.submitting')
              : t('permit.navigation.submit')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
