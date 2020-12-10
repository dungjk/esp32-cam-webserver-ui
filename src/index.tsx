import 'preact/debug';
import { h, render } from 'preact';
import { Provider } from 'unistore/preact';
import appStore from './store/app.store';
import App from 'components/app-component';
import './scss/styles.scss';

render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.body
);
