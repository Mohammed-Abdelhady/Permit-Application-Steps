import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import FormInput from './common/FormInput';
import FormSelect from './common/FormSelect';
import {
  familyFinancialSchema,
  type FamilyFinancialFormData,
} from '../../schemas';
import {
  MARITAL_STATUS_OPTIONS,
  EMPLOYMENT_STATUS_OPTIONS,
  HOUSING_STATUS_OPTIONS,
} from '../../utils/formOptions';

interface FamilyFinancialFormProps {
  onSubmit: (data: FamilyFinancialFormData) => void;
  initialData?: Partial<FamilyFinancialFormData>;
  isSubmitting?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

export interface FamilyFinancialFormRef {
  submitForm: () => Promise<boolean>;
  isValid: boolean;
}

const FamilyFinancialForm = forwardRef<
  FamilyFinancialFormRef,
  FamilyFinancialFormProps
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
  } = useForm<FamilyFinancialFormData>({
    resolver: yupResolver(familyFinancialSchema),
    defaultValues: {
      maritalStatus: '',
      dependents: 0,
      employmentStatus: '',
      monthlyIncome: 0,
      housingStatus: '',
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
        maritalStatus: '',
        dependents: 0,
        employmentStatus: '',
        monthlyIncome: 0,
        housingStatus: '',
        ...initialData,
      });
    }
  }, [initialData, reset]);

  // Notify parent about validation state changes
  useEffect(() => {
    onValidationChange?.(isValid && isDirty);
  }, [isValid, isDirty, onValidationChange]);

  const handleFormSubmit = async (data: FamilyFinancialFormData) => {
    setShowAllErrors(false); // Reset error display on successful submit
    onSubmit(data);
  };

  return (
    <motion.form
      data-testid="family-financial-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 md:space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Family Information Section */}
      <motion.div
        data-testid="family-information-section"
        className="space-y-4 md:space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-800 md:text-xl">
          {t('form.sections.family')}
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-2 lg:gap-8 xl:grid-cols-2">
          <div>
            <FormSelect
              {...register('maritalStatus')}
              data-testid="marital-status-select"
              value={watch('maritalStatus') || ''}
              label="form.fields.maritalStatus"
              options={MARITAL_STATUS_OPTIONS}
              placeholder="form.placeholders.maritalStatus"
              searchable
              clearable
              onValueChange={value => {
                register('maritalStatus').onChange({
                  target: { name: 'maritalStatus', value },
                });
                trigger('maritalStatus');
              }}
              error={
                showAllErrors || touchedFields.maritalStatus
                  ? errors.maritalStatus?.message
                  : undefined
              }
              required
              isRTL={isRTL}
            />
          </div>

          <FormInput
            {...register('dependents')}
            data-testid="dependents-input"
            type="number"
            label="form.fields.dependents"
            placeholder={t('form.placeholders.dependents')}
            onValueChange={value => {
              const numValue = value ? parseInt(value, 10) : 0;
              register('dependents').onChange({
                target: { name: 'dependents', value: numValue },
              });
              trigger('dependents');
            }}
            error={
              showAllErrors || touchedFields.dependents
                ? errors.dependents?.message
                : undefined
            }
            required
            isRTL={isRTL}
          />
        </div>
      </motion.div>

      {/* Employment Information Section */}
      <motion.div
        data-testid="employment-information-section"
        className="space-y-4 md:space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-800 md:text-xl">
          {t('form.sections.employment')}
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-2 lg:gap-8 xl:grid-cols-2">
          <div>
            <FormSelect
              {...register('employmentStatus')}
              data-testid="employment-status-select"
              value={watch('employmentStatus') || ''}
              label="form.fields.employmentStatus"
              options={EMPLOYMENT_STATUS_OPTIONS}
              placeholder="form.placeholders.employmentStatus"
              searchable
              clearable
              onValueChange={value => {
                register('employmentStatus').onChange({
                  target: { name: 'employmentStatus', value },
                });
                trigger('employmentStatus');
              }}
              error={
                showAllErrors || touchedFields.employmentStatus
                  ? errors.employmentStatus?.message
                  : undefined
              }
              required
              isRTL={isRTL}
            />
          </div>

          <FormInput
            {...register('monthlyIncome')}
            data-testid="monthly-income-input"
            type="number"
            label="form.fields.monthlyIncome"
            placeholder={t('form.placeholders.monthlyIncome')}
            onValueChange={value => {
              const numValue = value ? parseFloat(value) : 0;
              register('monthlyIncome').onChange({
                target: { name: 'monthlyIncome', value: numValue },
              });
              trigger('monthlyIncome');
            }}
            error={
              showAllErrors || touchedFields.monthlyIncome
                ? errors.monthlyIncome?.message
                : undefined
            }
            required
            isRTL={isRTL}
          />
        </div>
      </motion.div>

      {/* Housing Information Section */}
      <motion.div
        data-testid="housing-information-section"
        className="space-y-4 md:space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-800 md:text-xl">
          {t('form.sections.housing')}
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
          <div>
            <FormSelect
              {...register('housingStatus')}
              data-testid="housing-status-select"
              value={watch('housingStatus') || ''}
              label="form.fields.housingStatus"
              options={HOUSING_STATUS_OPTIONS}
              placeholder="form.placeholders.housingStatus"
              searchable
              clearable
              onValueChange={value => {
                register('housingStatus').onChange({
                  target: { name: 'housingStatus', value },
                });
                trigger('housingStatus');
              }}
              error={
                showAllErrors || touchedFields.housingStatus
                  ? errors.housingStatus?.message
                  : undefined
              }
              required
              isRTL={isRTL}
            />
          </div>
        </div>
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

FamilyFinancialForm.displayName = 'FamilyFinancialForm';

export default FamilyFinancialForm;
