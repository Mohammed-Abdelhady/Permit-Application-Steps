import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import type { SituationDescriptionFormData } from '@/schemas';
import { Button } from '@/components';

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
      <div className="group/field relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-6 backdrop-blur-sm transition-all duration-200 hover:from-purple-50 hover:to-pink-50">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
            <svg
              className="h-4 w-4 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p
            className={classNames(
              'text-sm font-semibold text-purple-700',
              isRTL ? 'text-right' : 'text-left'
            )}
          >
            {label}
          </p>
        </div>

        <div
          className={classNames(
            'relative overflow-hidden rounded-lg bg-white/70 p-4 backdrop-blur-sm',
            isRTL ? 'text-right' : 'text-left'
          )}
        >
          <p className="overflow-wrap-anywhere text-sm leading-relaxed break-words whitespace-pre-wrap text-gray-800">
            {isExpanded ? content : previewText}
          </p>

          {isLongText && (
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-600 transition-all duration-200 hover:bg-purple-100 hover:text-purple-700"
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isExpanded ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  )}
                </svg>
                {isExpanded
                  ? t('permit.text.show_less')
                  : t('permit.text.show_more')}
              </button>
              <button
                onClick={handleReadMore}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-600 transition-all duration-200 hover:bg-purple-100 hover:text-purple-700"
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {t('permit.text.read_in_overlay')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white/95 shadow-2xl ring-1 ring-gray-200 backdrop-blur-md"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-indigo-500/5"></div>

              {/* Modal Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-gray-200/50 bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-pink-100">
                    <svg
                      className="h-5 w-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3
                    className={classNames(
                      'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent',
                      isRTL ? 'text-right' : 'text-left'
                    )}
                  >
                    {label}
                  </h3>
                </div>
                <Button
                  onClick={handleCloseModal}
                  data-testid="modal-close-button"
                  variant="ghost"
                  colorScheme="gray"
                  size="sm"
                  className="h-10 w-10 p-0 hover:bg-red-100 hover:text-red-600 focus:ring-red-500"
                  aria-label="Close"
                >
                  <svg
                    className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90"
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
                </Button>
              </div>

              {/* Modal Content */}
              <div className="relative z-10 max-h-[calc(85vh-140px)] overflow-x-hidden overflow-y-auto">
                <div className="p-6">
                  <div
                    className={classNames(
                      'overflow-wrap-anywhere rounded-2xl bg-gradient-to-br from-gray-50/50 to-white/50 p-6 leading-relaxed break-words whitespace-pre-wrap text-gray-800 backdrop-blur-sm',
                      isRTL ? 'text-right' : 'text-left'
                    )}
                  >
                    {content}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="relative z-10 flex justify-end border-t border-gray-200/50 bg-gradient-to-r from-purple-50/30 to-pink-50/30 p-6 backdrop-blur-sm">
                <Button
                  onClick={handleCloseModal}
                  data-testid="modal-close-footer-button"
                  variant="primary"
                  colorScheme="purple"
                  size="lg"
                  leftIcon={
                    <svg
                      className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                  className="group"
                >
                  {t('permit.text.close')}
                </Button>
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
      className="group relative overflow-hidden rounded-2xl bg-white/90 p-8 shadow-lg ring-1 ring-gray-100 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="relative">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-pink-100">
            <svg
              className="h-6 w-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3
            className={classNames(
              'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent',
              isRTL ? 'text-right' : 'text-left'
            )}
          >
            {t('permit.steps.situation')}
          </h3>
        </div>

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
      </div>
    </motion.div>
  );
};
