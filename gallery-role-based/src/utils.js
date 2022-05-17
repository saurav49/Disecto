import { Cloudinary } from "@cloudinary/url-gen";
const CLOUD_NAME = "cloudmedia49";
const cld = new Cloudinary({
  cloud: {
    cloudName: `${CLOUD_NAME}`,
  },
});

const ROLES = {
  user: 2001,
  admin: 5150,
};

const validateEmail = (email) => {
  const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return validEmailRegex.test(email);
};

const validatePassword = (password) => {
  const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  return validPasswordRegex.test(password);
};

const isMatch = (password, confirmPassword) => {
  return password === confirmPassword ? true : false;
};

export { cld, validateEmail, validatePassword, isMatch, ROLES };
