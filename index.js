const { CronJob } = require('cron');
const config = require('config');
const run = require('./job');

(function main() {
  new CronJob({
    cronTime: config.cronTime,
    onTick: async () => {
      console.log('starting...');
      try {
        await run();
      } catch (err) {
        console.log(err);
      }
    },
    start: true,
  });
}());
