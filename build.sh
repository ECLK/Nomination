#!/usr/bin/env bash

#Delete existing build files
rm -r build

#Install npm modules
npm install

#Build the application
npm run build

#Set production flags and get rid of dev dependencies for the deployment
# npm prune --production