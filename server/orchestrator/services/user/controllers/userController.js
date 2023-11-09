const User = require("../models/users");

class UserController {
  static async handlerUserCreate(req, res) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const user = await User.createUser({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });

      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal Server Error");
    }
  }

  static async findAll(req, res) {
    try {
      const finduser = await User.findAll();

      res.status(200).json(finduser);
    } catch (error) {
      console.log(error);
    }
  }

  static async findByPk(req , res){
    try {
        const {id} = req.params
        const findByPk = await User.findByPk(id)

        res.status(200).json(findByPk)
    } catch (error) {
        console.log(error);
    }
  }

  static async deleteOne(req,res){
    try {
        const {id} = req.params

        const deleteOne = await User.deleteById(id)
        res.status(200).json("Delete User success")
    } catch (error) {
        console.log(error);
    }
  }
}

module.exports = UserController;
