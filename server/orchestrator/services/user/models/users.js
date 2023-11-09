const {getDb} = require('../config/mongo')
const bcrypt = require('bcryptjs')
const {ObjectId} = require('mongodb')
class User{

    static async connectDb(){
        try {
            
            const collection = await getDb().collection('users')
            return collection
        } catch (error) {
            console.log(error);
        }
    }

    static async createUser({username , email , password , role , phoneNumber , address}){
        try {
            const collection = await this.connectDb()
            const hashPw = bcrypt.hashSync(password , 10)
            const user = await collection.insertOne({
                username , email , password : hashPw , role , phoneNumber , address
            })
            return user
        } catch (error) {
            console.log(error);
        }
    }

    static async findAll() {
        try {
            const collection = await this.connectDb()

            const findUser = await collection.find().toArray()

            return findUser

        } catch (error) {
            console.log(error);
        }
    }

    static async findByPk(id){
        try {
            const collection = await this.connectDb()

            const findByPk = await collection.findOne({_id : new ObjectId(id)})

            return findByPk
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteById(id){
        try {
            const collection = await this.connectDb()
            const deleteOne = await collection.deleteOne({_id : new ObjectId(id)})

            return deleteOne
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = User