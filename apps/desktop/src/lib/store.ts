import Store from 'electron-store';
import { BackgroundSettings } from '../state/settings';

const schema = {
  'settings.background': {
    type: 'object',
    additionalProperties: true
  }
};

const store = new Store<{ 'settings.background': BackgroundSettings }>({ schema });

export default store;
