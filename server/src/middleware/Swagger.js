import fs from 'fs';
import path from 'path';
import swaggerUi from 'swaggerize-ui';
import Refs from 'json-refs';
import YAML from 'js-yaml';

const resolve = Refs.resolveRefs;

export default (app) => {
  const swaggerJson = YAML.load(fs.readFileSync(path.resolve('./api-docs/index.yaml').toString()));

  const options = {
    filter: ['relative', 'remote'],
    loaderOptions: {
      processContent: (res, callback) => {
        callback(null, YAML.load(res.text));
      },
    },
  };

  return resolve(swaggerJson, options).then((results) => {
    app.use('/api-doc', (req, res) => {
      res.json(results.resolved);
    });

    app.use('/docs', swaggerUi({
      docs: '/api-doc',
    }));
  });
};