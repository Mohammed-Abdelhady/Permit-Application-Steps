import * as yup from 'yup';

// Family Financial Information validation schema
export const familyFinancialSchema = yup.object().shape({
  maritalStatus: yup
    .string()
    .required('validation.maritalStatusRequired')
    .oneOf(
      ['single', 'married', 'divorced', 'widowed'],
      'validation.maritalStatusValid'
    ),

  dependents: yup
    .number()
    .required('validation.dependentsRequired')
    .min(0, 'validation.dependentsMinValue')
    .max(20, 'validation.dependentsMaxValue')
    .integer('validation.dependentsInteger'),

  employmentStatus: yup
    .string()
    .required('validation.employmentStatusRequired')
    .oneOf(
      ['employed', 'unemployed', 'self-employed', 'retired'],
      'validation.employmentStatusValid'
    ),

  monthlyIncome: yup
    .number()
    .required('validation.monthlyIncomeRequired')
    .min(0, 'validation.monthlyIncomeMinValue')
    .max(1000000, 'validation.monthlyIncomeMaxValue'),

  housingStatus: yup
    .string()
    .required('validation.housingStatusRequired')
    .oneOf(
      ['owned', 'rented', 'family', 'other'],
      'validation.housingStatusValid'
    ),
});

export type FamilyFinancialFormData = yup.InferType<
  typeof familyFinancialSchema
>;
