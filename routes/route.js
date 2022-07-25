const routes = require('express').Router();
const controller = require('../controller/controller')

routes.route('/categories')
    .post(controller.createCategories)
    .get(controller.getCategories)

routes.route('/transaction')
    .post(controller.createTransaction)
    .get(controller.getTransaction)
    .delete(controller.deleteTransaction)


routes.route('/labels')
    .get(controller.getLabels)


module.exports = routes;
