import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";
import { validasaur } from "../../deps.js";

const loginValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required]
};

const getLoginData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    email: params.get("email"),
    password: params.get("password"),
  };
};

const processLogin = async ({ request, response, render, state }) => {
  const loginData = await getLoginData(request);

  const [passes, errors] = await validasaur.validate(
    loginData,
    loginValidationRules
  );

  if (!passes) {
    render("login.eta", { validationErrors: errors, loginData });
    return;
  }

  const userFromDatabase = await userService.findUserByEmail(loginData.email);
  if (userFromDatabase.length != 1) {
    render("login.eta", { validationErrors: { email: ["User not found."] }, loginData });
    return;
  }
  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(loginData.password, user.password);

  if (!passwordMatches) {
    render("login.eta", { validationErrors: { password: ["Incorrect password."] }, loginData });
    return;
  }

  await state.session.set("user", user);
  response.redirect("/topics");
};


const showLoginForm = ({ render }) => {
    render("login.eta");
};



export { processLogin, showLoginForm };