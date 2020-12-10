import createStore from 'unistore';
import devtools from 'unistore/devtools';

export interface StoreModel {
  settingShow: boolean;
  settingFull: boolean;
  cameraUrl: string;
  cameraEnable: boolean;
}

const initialState: StoreModel = {
  settingShow: false,
  settingFull: false,
  cameraUrl: '',
  cameraEnable: false,
};

const store = process.env.NODE_ENV === 'production' ? createStore(initialState) : devtools(createStore(initialState));

export default store;
