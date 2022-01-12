const bcrypt = require('bcryptjs');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async (args) => {
    try {
      const { email, password: passwordInput } = args.userInput;
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        throw new Error('User already exists.');
      }
      const hash = await bcrypt.hash(passwordInput, 12);
      const user = new User({
        email,
        password: hash,
      });
      const userSaveResult = await user.save();
      const { password, ...savedUser } = userSaveResult._doc;
      return savedUser;
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw new Error(`Username or password is incorrect.`);
    }
    const passwordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!passwordCorrect) {
      throw new Error(`Username or password is incorrect.`);
    }
    const token = jwt.sign(
      { userId: foundUser.id, email: foundUser.email },
      process.env.JWT_Private_Key,
      { expiresIn: `${process.env.JWT_Valid_Hours}h` }
    );

    return {
      userId: foundUser.id,
      token,
      tokenExpiration: process.env.JWT_Valid_Hours,
    };
  },
};
