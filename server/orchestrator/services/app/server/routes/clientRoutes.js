const express = require("express");
const clientRoutes = express.Router();
const EntityController = require('../controllers/entityController')

clientRoutes.get("/jobs", EntityController.renderAllJobs);
clientRoutes.get('/jobs/:id' , EntityController.getDetail)


module.exports = clientRoutes;
