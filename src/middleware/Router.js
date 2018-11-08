import _ from 'lodash';
import ErrorMiddleware from './Error';
const express = require('express');

const path = require('path');
const globule = require('globule');
const fileNames = globule.find('./src/routes/*.js');
const DEFAULT_ROUTE_BASE = 'default';

export default (app) => {

    if (fileNames.length > 0) {
        _.each(fileNames, (fileNameWithPath) => {
            let fileName = path.basename(fileNameWithPath);
            let routeName = fileName.substr(0, fileName.lastIndexOf('.'));
            let routeBase = routeName.replace('Router','');
            app.use(`/${routeBase === DEFAULT_ROUTE_BASE ? '' : routeBase}`, require(`../routes/${routeName}`));
        });
    } else {
        console.log('No routes found!!');
    }
    app.use(ErrorMiddleware);
    //Handle Resource Not Found
    app.get('*', (req, res) => {
        res.send('Resource your looking for is not found. Please check the URI', 404);
    });
};