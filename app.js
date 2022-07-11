const { createApp } = require('@unleash/proxy');
const { Strategy } = require('unleash-client');

class TimeStampStrategy extends Strategy {
  constructor() {
    super('TimeStampStrategy');
  }

  isEnabled(parameters, context) {
    console.log('triggering strategy...');
    return Date.parse(parameters.enableAfter) < Date.now();
  }
}

const port = 3000;

const app = createApp({
    unleashUrl: 'https://app.unleash-hosted.com/red/api/',
    unleashApiToken: '*:development.5e9bed98f283f4133370e4683e40d09159e36f88cecd567db9f07e68',
    proxySecrets: ['proxy-secret', 'another-proxy-secret', 'some-secret'],
    refreshInterval: 1000,
    customStrategies: [new TimeStampStrategy()]
});

app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`Unleash Proxy listening on http://localhost:${port}/proxy`),
);
