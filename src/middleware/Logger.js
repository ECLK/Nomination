const fs = require('fs');
var path = require('path');
let log4js = require('log4js');

const LOGS_PATH = './log';
const LOGGER_REGEX = /^\s+at\s+(\S+)\s\((.+?)([^\/]+):(\d+):\d+\)$/;
const LOG_DEPTH = 10;
const loggerFunction = () => {
    return (new Error).stack.split("\n")[LOG_DEPTH]
        .replace(LOGGER_REGEX,  function () {
            return arguments[1] +' '+ arguments[3] +' line '+ arguments[4];
        });
};

export default (app) => {
    /**
     * make a log directory, just in case it isn't there.
     */
    try {
        if (!fs.existsSync(LOGS_PATH)){
            console.log('Log directory not found.');
            fs.mkdirSync(LOGS_PATH);
            console.log('Log directory created.');
        }
    } catch (e) {
        if (e.code != 'EEXIST') {
            console.log("Could not set up log directory, error was: ", e);
            process.exit(1);
        }
    }

    log4js.configure(path.join(__dirname, '..', 'config', 'log4js-config.json'));
    app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
};
