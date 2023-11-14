const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis(
  "redis://default:zt7wz8ROMwcHdYqipE9H5OaLIjfCgZ3R@redis-17119.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:17119"
);
// const AppUrl = 'http://localhost:4001/'
const UserUrl = "http://localhost:4002/user/";

const typeDefsUser = `#graphql
  type User {
    _id: ID
    username: String
    email:String
    password:String
    role:String
    phoneNumber:String
    address:String
  }
  type ResponseSuccess {
    message: String
  }

  type AddUser {
    acknowledged: Boolean
    insertedId: String
  }

  type Query {
    getUser: [User]
    getUserById(id:ID!) : User
  }

  type Mutation {
    handlerAddUser(
        username: String
        email: String
        password: String
        role: String
        phoneNumber: String
        address: String
    ):AddUser

    deleteUser(
    id:ID
    ):ResponseSuccess
  }
`;

const resolversUser = {
  Query: {
    getUser: async () => {
      try {
        const userCache = await redis.get("users");
        if (userCache) {
          return JSON.parse(userCache);
        } else {
          const { data } = await axios.get(UserUrl);
          await redis.set("users" , JSON.stringify(data))
          return data;
        }
      } catch (error) {
        throw error;
      }
    },
    getUserById: async (_, { id }) => {
      try {
        const { data } = await axios.get(UserUrl + id);
        return data;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    handlerAddUser: async (_, args) => {
      try {
        console.log("MASUK ADD USER");
        const { data } = await axios.post(UserUrl, args);
       await redis.del("users")
        return data;
      } catch (error) {
        throw error;
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        console.log(id, "<><><><>");
        const { data } = await axios.delete(UserUrl + id);
        console.log(data);
       await redis.del("users")

        return data;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefsUser, resolversUser };
