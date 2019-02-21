import { ValidatorMiddleware } from './ValidatorMiddleware';
const express = require('express');
const log4js = require('log4js');
const logger = log4js.getLogger('app');

const path = require('path');
const globule = require('globule');

export const createRoutes = () => (app, routeInfo) => {
  const router = express.Router();
  routeInfo.reduce((updatedRouter, { method, path, schema, handler }) => {
    logger.info(`registering route :`, '\x1b[36m' ,` \n\n     ${method}  ${path} \n`, '\x1b[0m');
    updatedRouter[method](path, ValidatorMiddleware(schema, method), handler);
    return updatedRouter;
  }, router);
  app.use(`/ec-election/`, router);
};
