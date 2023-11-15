const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis(
  "redis://default:zt7wz8ROMwcHdYqipE9H5OaLIjfCgZ3R@redis-17119.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:17119"
);
const APP_SERVICE_URL = "http://54.206.35.117/";
const USER_SERVICE_URL = "http://54.206.35.117/";

const typeDefsApp = `#graphql
  type Job {
    id:ID
    title: String
    description: String
    companyId: Int
    authorId: String
    jobType: String,
    Company:Company,
    Skills: [Skill]
    User:User
  }
  type User {
    _id: ID
    username: String
    email:String
    password:String
    role:String
    phoneNumber:String
    address:String
  }

  type Company {
    id: ID
    name: String
    companyLogo: String
    location: String
    email: String
    description: String
    }

    type Skill {
      id: ID
    jobId: Int
    name: String
    level: String
    }

    type ResponseSuccess {
      message: String
    }

    input skillInput {
      name: String
      level: String
    }

  type Mutation {
    handlerAddJob(
      title: String
      description: String
      companyId: Int
      authorId: String
      jobType: String
      skills: [skillInput]
    ): Job

    updateJob(
      id: ID
      title: String
      description: String
      companyId: Int
      authorId: String
      jobType: String
      skills: [skillInput]  
    ): ResponseSuccess

    deleteJob(
      id: ID!
    ) : ResponseSuccess
  }

  type Query {
    getJob: [Job]
    getJobById(id: ID!):Job
  }
`;

const resolversApp = {
  Query: {
    getJob: async () => {
      try {
        const jobCache = await redis.get("jobs");
        if (jobCache) {
          return JSON.parse(jobCache);
        } else {
          const { data } = await axios.get(APP_SERVICE_URL + "jobs");
          await redis.set("jobs", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        throw error;
      }
    },
    getJobById: async (_, { id }) => {
      try {
        const { data } = await axios.get(APP_SERVICE_URL + "jobs/" + id);
        console.log(data,"ini DATAAAAAAAAAAAAa");
        const {data:user} = await axios.get(USER_SERVICE_URL + "user/" + data.authorId)
        data.User = user
        return data;
      } catch (error) {
        // console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    handlerAddJob: async (_, args) => {
      try {
        const { title, description, companyId, authorId, jobType, skills } =
          args;
        const { data } = await axios.post(APP_SERVICE_URL + "jobs", {
          title,
          description,
          companyId,
          authorId,
          jobType,
          skills,
        });
        await redis.del("jobs")
        return data;
      } catch (error) {
        throw error;
      }
    },
    updateJob: async (_, args) => {
      try {
        const id = args.id;
        const { title, description, companyId, authorId, jobType, skills } =
          args;
        const { data } = await axios.put(APP_SERVICE_URL + "jobs/" + id, {
          title,
          description,
          companyId,
          authorId,
          jobType,
          skills,
        });
        await redis.del("jobs")
        return data;
      } catch (error) {
        throw error;
      }
    },
    deleteJob: async (_, args) => {
      try {
        const id = args.id;
        const { data } = await axios.delete(APP_SERVICE_URL + "jobs/" + id);
        await redis.del("jobs")
        return data;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefsApp, resolversApp };
