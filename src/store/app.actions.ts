import { Store } from 'unistore';
import { StoreModel } from './app.store';

const actions = (store: Store<StoreModel>) => ({
  toggleSetting: (state, show: boolean) => {
    return {
      settingShow: !!show,
    };
  },
});

export default actions;
