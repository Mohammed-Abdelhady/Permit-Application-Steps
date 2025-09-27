import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import FormInput from './common/FormInput';
import FormSelect from './common/FormSelect';
import {
  personalInformationSchema,
  type PersonalInformationFormData,
} from '../../schemas';
import { GENDER_OPTIONS, COUNTRY_OPTIONS } from '../../utils/formOptions';

interface PersonalInformationFormProps {
  onSubmit: (data: PersonalInformationFormData) => void;
  initialData?: Partial<PersonalInformationFormData>;
  isSubmitting?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

export interface PersonalInformationFormRef {
  submitForm: () => Promise<boolean>;
  isValid: boolean;
}

const PersonalInformationForm = forwardRef<
  PersonalInformationFormRef,
  PersonalInformationFormProps
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
  } = useForm<PersonalInformationFormData>({
    resolver: yupResolver(personalInformationSchema),
    defaultValues: {
      name: '',
      nationalId: '',
      dateOfBirth: undefined,
      gender: '',
      address: '',
      city: '',
      state: '',
      country: '',
      phone: '',
      email: '',
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

  // Notify parent about validation state changes
  useEffect(() => {
    onValidationChange?.(isValid && isDirty);
  }, [isValid, isDirty, onValidationChange]);

  const handleFormSubmit = async (data: PersonalInformationFormData) => {
    setShowAllErrors(false); // Reset error display on successful submit
    onSubmit(data);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Personal Information Section */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          {t('form.sections.personal')}
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            {...register('name')}
            label="form.fields.name"
            placeholder={t('form.placeholders.name')}
            onValueChange={value => {
              register('name').onChange({
                target: { name: 'name', value },
              });
              trigger('name');
            }}
            error={
              showAllErrors || touchedFields.name
                ? errors.name?.message
                : undefined
            }
            required
            isRTL={isRTL}
          />

          <FormInput
            {...register('nationalId')}
            label="form.fields.nationalId"
            placeholder={t('form.placeholders.nationalId')}
            onValueChange={value => {
              register('nationalId').onChange({
                target: { name: 'nationalId', value },
              });
              trigger('nationalId');
            }}
            error={
              showAllErrors || touchedFields.nationalId
                ? errors.nationalId?.message
                : undefined
            }
            required
            isRTL={isRTL}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            {...register('dateOfBirth')}
            type="date"
            label="form.fields.dateOfBirth"
            onValueChange={value => {
              register('dateOfBirth').onChange({
                target: { name: 'dateOfBirth', value },
              });
              trigger('dateOfBirth');
            }}
            error={
              showAllErrors || touchedFields.dateOfBirth
                ? errors.dateOfBirth?.message
                : undefined
            }
            required
            isRTL={isRTL}
          />

          <div>
            <FormSelect
              {...register('gender')}
              value={watch('gender') || ''}
              label="form.fields.gender"
              options={GENDER_OPTIONS}
              placeholder="form.placeholders.gender"
              searchable
              clearable
              onValueChange={value => {
                register('gender').onChange({
                  target: { name: 'gender', value },
                });
                trigger('gender');
              }}
              error={
                showAllErrors || touchedFields.gender
                  ? errors.gender?.message
                  : undefined
              }
              required
              isRTL={isRTL}
            />
          </div>
        </div>
      </motion.div>

      {/* Address Information Section */}

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          {t('form.sections.address')}
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            {...register('address')}
            label="form.fields.address"
            placeholder={t('form.placeholders.address')}
            onValueChange={value => {
              register('address').onChange({
                target: { name: 'address', value },
              });
              trigger('address');
            }}
            error={
              showAllErrors || touchedFields.address
                ? errors.address?.message
                : undefined
            }
            required
            isRTL={isRTL}
          />
          <FormSelect
            {...register('country')}
            value={watch('country') || ''}
            label="form.fields.country"
            options={COUNTRY_OPTIONS}
            placeholder="form.placeholders.country"
            searchable
            clearable
            onValueChange={value => {
              register('country').onChange({
                target: { name: 'country', value },
              });
              trigger('country');
            }}
            error={
              showAllErrors || touchedFields.country
                ? errors.country?.message
                : undefined
            }
            required
            isRTL={isRTL}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            {...register('city')}
            label="form.fields.city"
            placeholder={t('form.placeholders.city')}
            onValueChange={value => {
              register('city').onChange({
                target: { name: 'city', value },
              });
              trigger('city');
            }}
            error={
              showAllErrors || touchedFields.city
                ? errors.city?.message
                : undefined
            }
            required
            isRTL={isRTL}
          />

          <FormInput
            {...register('state')}
            label="form.fields.state"
            placeholder={t('form.placeholders.state')}
            onValueChange={value => {
              register('state').onChange({
                target: { name: 'state', value },
              });
              trigger('state');
            }}
            error={
              showAllErrors || touchedFields.state
                ? errors.state?.message
                : undefined
            }
            required
            isRTL={isRTL}
          />
        </div>
      </motion.div>

      {/* Contact Information Section */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          {t('form.sections.contact')}
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            {...register('phone')}
            type="tel"
            label="form.fields.phone"
            placeholder={t('form.placeholders.phone')}
            onValueChange={value => {
              register('phone').onChange({
                target: { name: 'phone', value },
              });
              trigger('phone');
            }}
            error={
              showAllErrors || touchedFields.phone
                ? errors.phone?.message
                : undefined
            }
            required
            isRTL={isRTL}
          />

          <FormInput
            {...register('email')}
            type="email"
            label="form.fields.email"
            placeholder={t('form.placeholders.email')}
            onValueChange={value => {
              register('email').onChange({
                target: { name: 'email', value },
              });
              trigger('email');
            }}
            error={
              showAllErrors || touchedFields.email
                ? errors.email?.message
                : undefined
            }
            required
            isRTL={isRTL}
          />
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

PersonalInformationForm.displayName = 'PersonalInformationForm';

export default PersonalInformationForm;
