import useLocalStorage from './custom-hooks/LocalStorageHook';
import { addWatchlist, viewChart, viewNews, viewWatchlist } from './intents';
import {
  stockFluxSearch,
  getStockFluxData,
  getMiniChartData,
  getSymbolNews
} from './services/StockFluxService';
import { truncate } from './utils/formatters';
import {
  createWindow,
  getCurrentWindow,
  getCurrentWindowSync,
  getChildWindows,
  getCurrentWindowOptions,
  getAllApps,
  getStockFluxApps,
  getStockFluxApp
} from './openfin-api-utils/openfinApiHelpers';
import launchChildWindow from './services/ChildWindowLauncher';

export const Utils = {
  truncate
};

export const OpenfinApiHelpers = {
  createWindow,
  getCurrentWindow,
  getCurrentWindowSync,
  getChildWindows,
  getCurrentWindowOptions,
  getAllApps,
  getStockFluxApps,
  getStockFluxApp
};

export const StockFlux = {
  stockFluxSearch,
  getStockFluxData,
  getMiniChartData,
  getSymbolNews
};

export const Intents = {
  viewChart,
  viewNews,
  addWatchlist,
  viewWatchlist
};

export const StockFluxHooks = {
  useLocalStorage
};

export { launchChildWindow };
