const bcryptjs = require('bcryptjs');
const { User } = require('../../models');

module.exports = {
  createUser: async (args) => {
    try {
      const { email, password: passwordInput } = args.userInput;
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        throw new Error('User already exists.');
      }
      const hash = await bcryptjs.hash(passwordInput, 12);
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
};
