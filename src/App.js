import MapPage from './routes/MapPage/MapPage.component';
import HomePage from './routes/Home/HomePage.component';
import Nav from './components/Nav/Nav.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/game_master" element={<HomePage />} />
          <Route path="/game_master/map" element={<MapPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
