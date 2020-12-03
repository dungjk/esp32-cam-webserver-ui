import createStore from 'redux-zero';
import { connect } from 'redux-zero/devtools';
import { applyMiddleware } from 'redux-zero/middleware';

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

let middlewares: any = [];
if (process.env.NODE_ENV === 'development') {
  middlewares = connect ? applyMiddleware(connect(initialState)) : [];
}
const store = createStore<StoreModel>(initialState as any, middlewares);

export default store;
