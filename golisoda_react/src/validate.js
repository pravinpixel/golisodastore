import * as yup from "yup";

export const phoneRegExp = /^[0-9]{10}$/;
export const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z^\s]{2,})+$/;

const AddressValidationSchema = yup.object().shape({
  name: yup.string().max(255).required("Enter your name"),
  email: yup.string().max(255).required("Enter Your Email Id").matches(emailRegExp, "Enter Valid Email Id"),
  mobile_no: yup.string().required("Enter your Mobile Number").matches(phoneRegExp, 'Enter 10 Digit Mobile Number'),
  address_type_id: yup.string().max(255).required("Enter your Address type"),
  address: yup.string().max(255).required("Enter your Address"),
  city: yup.string().max(255).required("Enter your City"),
  state: yup.string().max(255).required("Enter your State"),
  country: yup.string().max(255).required("Enter your Country"),
  post_code: yup.array().required("Enter Your Post code").typeError().test("validate", "Enter Your Post code", (value) => {
    if (value?.length !== 0) {
      return true
    }
  }),
});

export { AddressValidationSchema };