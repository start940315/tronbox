const command = {
  command: "init",
  description: "Initialize new and empty tronBox project",
  builder: {},
  run: function (options, done) {
    const fs = require("fs");
    const path = require("path");
    const Config = require('../../components/Config');
    const config = Config.default().with({
      logger: console
    });
    if (!fs.existsSync(path.join(__dirname, "./truffle-config.js"))) {
      config.logger.log('It\'s not a truffle project. Will start `tronbox init`');
      config.logger.log();
      const InitCommand = require('./init');
      return InitCommand.run(options, done);
    }

    function downloadConfig() {
      return new Promise((resolve, reject) => {
        const request = require('request');
        request.get('https://raw.githubusercontent.com/tronsuper/bare-box/master/tronbox.js')
          .pipe(fs.createWriteStream(path.join(__dirname, './tronbox-config.js')))
          .on('close', () => {
            resolve();
          });
      });
    }

    downloadConfig()
      .then(() => {
        config.logger.log('OK. Convertion is done. Enjoy tronbox!');
        config.logger.log();
        done();
      });
    
  },
};

module.exports = command;
