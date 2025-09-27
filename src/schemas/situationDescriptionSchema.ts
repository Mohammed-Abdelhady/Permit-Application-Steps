import * as yup from 'yup';

// Situation Description validation schema
export const situationDescriptionSchema = yup.object().shape({
  currentFinancialSituation: yup
    .string()
    .required('validation.financialSituationRequired')
    .min(50, 'validation.financialSituationMinLength')
    .max(1000, 'validation.financialSituationMaxLength'),

  employmentCircumstances: yup
    .string()
    .required('validation.employmentCircumstancesRequired')
    .min(50, 'validation.employmentCircumstancesMinLength')
    .max(1000, 'validation.employmentCircumstancesMaxLength'),

  reasonForApplying: yup
    .string()
    .required('validation.reasonForApplyingRequired')
    .min(100, 'validation.reasonForApplyingMinLength')
    .max(2000, 'validation.reasonForApplyingMaxLength'),
});

export type SituationDescriptionFormData = yup.InferType<
  typeof situationDescriptionSchema
>;
