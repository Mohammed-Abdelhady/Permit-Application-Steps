import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';

interface SuggestionReadyStatusProps {
  descriptionId: string;
}

const SuggestionReadyStatus = ({
  descriptionId,
}: SuggestionReadyStatusProps) => {
  const { t } = useTranslation();

  return (
    <output
      id={descriptionId}
      className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6"
      aria-live="polite"
    >
      <div className="flex">
        <div className="flex-shrink-0" aria-hidden="true">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
        </div>
        <div className="ml-4">
          <h2 className="text-base font-semibold text-green-800">
            {t('ai.suggestion_ready', 'AI Suggestion Ready')}
          </h2>
          <p className="mt-2 text-sm text-green-700">
            {t(
              'ai.suggestion_description',
              'Review the suggestion below and choose an action.'
            )}
          </p>
        </div>
      </div>
    </output>
  );
};

export default SuggestionReadyStatus;
