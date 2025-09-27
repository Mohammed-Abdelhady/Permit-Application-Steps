import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import type { SituationDescriptionFormData } from '../../schemas';

interface SituationDescriptionSummaryProps {
  data: SituationDescriptionFormData;
  isRTL: boolean;
}

interface TextFieldProps {
  label: string;
  content: string;
  isRTL: boolean;
  t: (key: string) => string;
}

const TextField = ({ label, content, isRTL, t }: TextFieldProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isLongText = content.length > 150;
  const previewText = isLongText ? `${content.substring(0, 150)}...` : content;

  const handleReadMore = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <p
          className={classNames(
            'mb-2 text-sm font-medium text-gray-600',
            isRTL ? 'text-right' : 'text-left'
          )}
        >
          {label}
        </p>
        <div
          className={classNames(
            'relative overflow-hidden rounded-lg bg-gray-50 p-3',
            isRTL ? 'text-right' : 'text-left'
          )}
        >
          <p className="overflow-wrap-anywhere text-sm leading-relaxed break-words whitespace-pre-wrap text-gray-800">
            {isExpanded ? content : previewText}
          </p>

          {isLongText && (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-800"
              >
                {isExpanded
                  ? t('permit.text.show_less')
                  : t('permit.text.show_more')}
              </button>
              <button
                onClick={handleReadMore}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 transition-colors hover:text-blue-800"
              >
                <span>📖</span> {t('permit.text.read_in_overlay')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <h3
                  className={classNames(
                    'text-lg font-semibold text-gray-900',
                    isRTL ? 'text-right' : 'text-left'
                  )}
                >
                  {label}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 transition-colors hover:text-gray-600"
                  aria-label="Close"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="max-h-[calc(80vh-120px)] overflow-x-hidden overflow-y-auto p-6">
                <div
                  className={classNames(
                    'overflow-wrap-anywhere word-break-break-all leading-relaxed break-words whitespace-pre-wrap text-gray-800',
                    isRTL ? 'text-right' : 'text-left'
                  )}
                >
                  {content}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end border-t border-gray-200 p-6">
                <button
                  onClick={handleCloseModal}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  {t('permit.text.close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const SituationDescriptionSummary = ({
  data,
  isRTL,
}: SituationDescriptionSummaryProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="rounded-xl bg-white p-6 shadow-md"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h3
        className={classNames(
          'mb-4 text-lg font-semibold text-blue-800',
          isRTL ? 'text-right' : 'text-left'
        )}
      >
        {t('permit.steps.situation')}
      </h3>

      <div className="space-y-6">
        <TextField
          label={t('form.fields.currentFinancialSituation')}
          content={data.currentFinancialSituation}
          isRTL={isRTL}
          t={t}
        />

        <TextField
          label={t('form.fields.employmentCircumstances')}
          content={data.employmentCircumstances}
          isRTL={isRTL}
          t={t}
        />

        <TextField
          label={t('form.fields.reasonForApplying')}
          content={data.reasonForApplying}
          isRTL={isRTL}
          t={t}
        />
      </div>
    </motion.div>
  );
};
