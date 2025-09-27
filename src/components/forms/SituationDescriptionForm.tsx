import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import FormTextArea from './common/FormTextArea';
import {
  situationDescriptionSchema,
  type SituationDescriptionFormData,
} from '../../schemas';

interface SituationDescriptionFormProps {
  onSubmit: (data: SituationDescriptionFormData) => void;
  initialData?: Partial<SituationDescriptionFormData>;
  isSubmitting?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

export interface SituationDescriptionFormRef {
  submitForm: () => Promise<boolean>;
  isValid: boolean;
}

const SituationDescriptionForm = forwardRef<
  SituationDescriptionFormRef,
  SituationDescriptionFormProps
>(({ onSubmit, initialData, onValidationChange }, ref) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [showAllErrors, setShowAllErrors] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, touchedFields },
    watch,
    trigger,
    reset,
  } = useForm<SituationDescriptionFormData>({
    resolver: yupResolver(situationDescriptionSchema),
    defaultValues: {
      currentFinancialSituation: '',
      employmentCircumstances: '',
      reasonForApplying: '',
      ...initialData,
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  // Expose form methods through ref
  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const isFormValid = await trigger();
      if (isFormValid) {
        const data = watch();
        onSubmit(data);
      } else {
        // Show all errors when validation fails
        setShowAllErrors(true);
      }
      return isFormValid;
    },
    isValid,
  }));

  // Reset form when initialData changes (e.g., when loaded from localStorage)
  useEffect(() => {
    if (initialData) {
      reset({
        currentFinancialSituation: '',
        employmentCircumstances: '',
        reasonForApplying: '',
        ...initialData,
      });
    }
  }, [initialData, reset]);

  // Notify parent about validation state changes
  useEffect(() => {
    onValidationChange?.(isValid && isDirty);
  }, [isValid, isDirty, onValidationChange]);

  const handleFormSubmit = async (data: SituationDescriptionFormData) => {
    setShowAllErrors(false); // Reset error display on successful submit
    onSubmit(data);
  };

  return (
    <motion.form
      data-testid="situation-description-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 md:space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Financial Situation Section */}
      <motion.div
        data-testid="financial-situation-section"
        className="space-y-4 md:space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-800 md:text-xl">
          {t('form.sections.financialSituation')}
        </h3>

        <FormTextArea
          {...register('currentFinancialSituation')}
          data-testid="current-financial-situation-input"
          value={watch('currentFinancialSituation') || ''}
          label="form.fields.currentFinancialSituation"
          placeholder={t('form.placeholders.currentFinancialSituation')}
          rows={5}
          resize="vertical"
          enableAIHelp={true}
          aiFieldType="financial"
          error={
            showAllErrors || touchedFields.currentFinancialSituation
              ? errors.currentFinancialSituation?.message
              : undefined
          }
          required
          isRTL={isRTL}
          maxLength={1000}
        />
      </motion.div>

      {/* Employment Circumstances Section */}
      <motion.div
        data-testid="employment-circumstances-section"
        className="space-y-4 md:space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-800 md:text-xl">
          {t('form.sections.employmentCircumstances')}
        </h3>

        <FormTextArea
          {...register('employmentCircumstances')}
          data-testid="employment-circumstances-input"
          value={watch('employmentCircumstances') || ''}
          label="form.fields.employmentCircumstances"
          placeholder={t('form.placeholders.employmentCircumstances')}
          rows={5}
          resize="vertical"
          enableAIHelp={true}
          aiFieldType="employment"
          error={
            showAllErrors || touchedFields.employmentCircumstances
              ? errors.employmentCircumstances?.message
              : undefined
          }
          required
          isRTL={isRTL}
          maxLength={1000}
        />
      </motion.div>

      {/* Application Reason Section */}
      <motion.div
        data-testid="application-reason-section"
        className="space-y-4 md:space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-800 md:text-xl">
          {t('form.sections.applicationReason')}
        </h3>

        <FormTextArea
          {...register('reasonForApplying')}
          data-testid="reason-for-applying-input"
          value={watch('reasonForApplying') || ''}
          label="form.fields.reasonForApplying"
          placeholder={t('form.placeholders.reasonForApplying')}
          rows={6}
          resize="vertical"
          enableAIHelp={true}
          aiFieldType="reason"
          error={
            showAllErrors || touchedFields.reasonForApplying
              ? errors.reasonForApplying?.message
              : undefined
          }
          required
          isRTL={isRTL}
          maxLength={2000}
        />
      </motion.div>

      {/* Submit Button - Hidden but accessible for form submission */}
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <button type="submit" className="sr-only" aria-label={t('form.submit')}>
          {t('form.submit')}
        </button>
      </motion.div>
    </motion.form>
  );
});

SituationDescriptionForm.displayName = 'SituationDescriptionForm';

export default SituationDescriptionForm;
