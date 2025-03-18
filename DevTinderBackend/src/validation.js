const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("First name and last name are required.");
    }

    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Please provide a valid email address.");
    }

    const passwordOptions = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    };

    if (!password || !validator.isStrongPassword(password, passwordOptions)) {
        throw new Error(
            "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol."
        );
    }

    return true;
};

module.exports = { validateSignUpData };