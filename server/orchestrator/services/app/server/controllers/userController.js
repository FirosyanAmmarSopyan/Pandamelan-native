const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
class UserController {
  static async handlerRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async handlerLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "error invalid email or password" };
      } else {
        let validPw = bcrypt.compareSync(password, user.password);
        if (validPw) {
          const payload = {
            id: user.id,
            email: user.email,
          };

          const access_token = jwt.sign(payload, process.env.SECRET_KEY_JWT);

          res.status(200).json({
            access_token,
          });
        } else {
          throw { name: "error invalid email or password" };
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
