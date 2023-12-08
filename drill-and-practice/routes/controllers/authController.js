import * as userService from '../services/userService.js';
// Add a utility for hashing passwords - you'll need to implement this
import { hashPassword, verifyPassword } from '../utils/passwordUtils.js';

const registerUser = async ({ request, response }) => {
    const { value } = await request.body();
    const hashedPassword = await hashPassword(value.password);
    const newUser = await userService.createUser(value.email, hashedPassword);
    response.body = { message: "User registered successfully", newUser };
};

const loginUser = async ({ request, response }) => {
    const { value } = await request.body();
    const user = await userService.findUserByEmail(value.email);
    if (user && await verifyPassword(value.password, user.password)) {
        response.body = { message: "Login successful" };
    } else {
        response.status = 401;
        response.body = { message: "Invalid credentials" };
    }
};

export { registerUser, loginUser };