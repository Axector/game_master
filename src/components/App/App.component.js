import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Nav from '../Nav';
import Router from '../Router';
import store from '../../store';

function AppComponent() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default AppComponent;
