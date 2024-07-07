import { PureComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import Nav from '../Nav';
import Router from '../Router';

export class AppComponent extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
          <Router />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default AppComponent;
