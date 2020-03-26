import * as yup from "yup";
/* eslint-disable */

yup.setLocale({
  mixed: {
    // @ts-ignore
    required: "Field is required",
    max: "Field must be at most ${max} characters",
    min: "Field must have at least ${min} items"
  },
  string: {
    // @ts-ignore
    email: "Please enter a valid e-mail",
    max: "Field must be at most ${max} characters",
    min: "Field must have at least ${min} items"
  },
  array: {
    max: "Field must be at most ${max} characters",
    min: "Field must have at least ${min} items"
  }
});

yup.addMethod(yup.string, "phone", function() {
  return this.test({
    name: "phone",
    exclusive: true,
    // @ts-ignore
    message: <Translate id="form.phone_number_desc" />,
    test: value => {
      try {
        const phone = phoneUtil.parse(value);
        return phoneUtil.isValidNumber(phone);
      } catch (e) {
        return false;
      }
    }
  });
});

export default yup;

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
});
