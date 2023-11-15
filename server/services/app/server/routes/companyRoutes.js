const express = require("express");
const companyRoutes = express.Router();
const EntityController = require('../controllers/entityController')

companyRoutes.get("/", EntityController.renderAllCompanies);
companyRoutes.post("/" , EntityController.handlerCompanies)
companyRoutes.delete('/:id' , EntityController.deleteCompanies)
module.exports = companyRoutes;
