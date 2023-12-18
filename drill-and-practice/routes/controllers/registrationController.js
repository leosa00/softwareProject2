import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registrationValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)]
};

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userData = {
    email: params.get("email"),
    password: params.get("password"),
  };

  const [passes, errors] = await validasaur.validate(userData, registrationValidationRules);

  if (!passes) {
    render("register.eta", { validationErrors: errors, userData });
    return;
  }

  await userService.addUser(
    userData.email,
    await bcrypt.hash(userData.password)
  );

  response.redirect("/auth/login");
};

const showRegistrationForm = ({ render }) => {
  render("register.eta");
};

export { registerUser, showRegistrationForm };