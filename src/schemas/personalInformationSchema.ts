import * as yup from 'yup';

// Personal Information Form Schema
export const personalInformationSchema = yup.object({
  name: yup
    .string()
    .required('validation.nameRequired')
    .min(2, 'validation.nameMinLength')
    .max(50, 'validation.nameMaxLength')
    .matches(/^[a-zA-Z\s]*$/, 'validation.namePattern'),

  nationalId: yup
    .string()
    .required('validation.nationalIdRequired')
    .min(10, 'validation.nationalIdMinLength')
    .max(20, 'validation.nationalIdMaxLength')
    .matches(/^\d+$/, 'validation.nationalIdPattern'),

  dateOfBirth: yup
    .date()
    .transform((value, originalValue) => {
      // Transform empty string to undefined so Yup can handle it properly
      if (originalValue === '' || originalValue === null) {
        return undefined;
      }
      return value;
    })
    .required('validation.dateOfBirthRequired')
    .max(new Date(), 'validation.dateOfBirthFuture')
    .test('age', 'validation.minimumAge', function (value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }),

  gender: yup
    .string()
    .required('validation.genderRequired')
    .oneOf(['male', 'female', 'other'], 'validation.genderValid'),

  address: yup
    .string()
    .required('validation.addressRequired')
    .min(10, 'validation.addressMinLength')
    .max(200, 'validation.addressMaxLength'),

  city: yup
    .string()
    .required('validation.cityRequired')
    .min(2, 'validation.cityMinLength')
    .max(50, 'validation.cityMaxLength')
    .matches(/^[a-zA-Z\s]*$/, 'validation.cityPattern'),

  state: yup
    .string()
    .required('validation.stateRequired')
    .min(2, 'validation.stateMinLength')
    .max(50, 'validation.stateMaxLength')
    .matches(/^[a-zA-Z\s]*$/, 'validation.statePattern'),

  country: yup
    .string()
    .required('validation.countryRequired')
    .length(2, 'validation.countryCodeLength')
    .matches(/^[a-z]{2}$/, 'validation.countryCodePattern'),

  phone: yup
    .string()
    .required('validation.phoneRequired')
    .min(10, 'validation.phoneMinLength')
    .max(15, 'validation.phoneMaxLength')
    .matches(/^[+]?[1-9]\d{0,15}$/, 'validation.phonePattern'),

  email: yup
    .string()
    .required('validation.emailRequired')
    .email('validation.emailInvalid')
    .max(100, 'validation.emailMaxLength'),
});

export type PersonalInformationFormData = yup.InferType<
  typeof personalInformationSchema
>;
