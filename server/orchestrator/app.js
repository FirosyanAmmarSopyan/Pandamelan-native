const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const Redis = require("ioredis");
const redis = new Redis("redis://default:zt7wz8ROMwcHdYqipE9H5OaLIjfCgZ3R@redis-17119.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:17119");
const {typeDefsApp , resolversApp} = require('./schema/appType')
const {typeDefsUser , resolversUser} = require('./schema/userType')

const server = new ApolloServer({
    typeDefs : [typeDefsApp , typeDefsUser],
    resolvers : [resolversApp , resolversUser],
    introspection: true
})



startStandaloneServer(server, {
    listen:{port : process.env.PORT || 4000}
})
.then(({url}) => console.log(`🚀  Server ready at: ${url}`))
.catch(console.log())

