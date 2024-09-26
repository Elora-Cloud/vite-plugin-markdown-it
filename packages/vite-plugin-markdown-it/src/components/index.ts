import type { App, Plugin } from 'vue';
import { globalComponents } from './components';
import './style/index.scss';

export * from './components';
const VitePluginMarkdownIt: Plugin = {
  install(App: App) {
    globalComponents.forEach((item) => {
      App.use(item);
    });
  },
};

export default VitePluginMarkdownIt;
