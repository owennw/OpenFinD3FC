import * as fdc3 from 'openfin-fdc3';

export const viewChart = async function(symbol, stockName) {
  const availableApps = await fdc3.findIntent(fdc3.Intents.VIEW_CHART);
  if (availableApps && availableApps.apps) {
    const chart = availableApps.apps.find(app => app.appId === 'chart');
    if (chart) {
      await fdc3.raiseIntent(
        fdc3.Intents.VIEW_CHART,
        {
          type: 'security',
          name: code,
          id: {
            default: name
          }
        },
        chart.name
      );
    }
  }
};
