const express = require("express");
const jobRoutes = express.Router();
const EntityController = require('../controllers/entityController')

jobRoutes.get("", EntityController.renderAllJobs);
jobRoutes.get('/:id' , EntityController.getDetail)
jobRoutes.post('' , EntityController.handlerJobs)
jobRoutes.put('/:id' , EntityController.replaceEditJob)
jobRoutes.delete('/:id' , EntityController.deleteJob)

module.exports = jobRoutes;
