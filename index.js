const { CronJob } = require('cron');
const run = require('./job');

(function main() {
  new CronJob({
    cronTime: '* * * * *',
    onTick: async () => {
      console.log('starting');
      try {
        await run();
      } catch (err) {
        console.log(err);
      }
    },
    start: true,
  });
}());
