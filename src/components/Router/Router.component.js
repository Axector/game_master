import { PureComponent } from "react";
import { Route, Routes } from "react-router-dom";
import MapPage from "../../routes/MapPage";
import HomePage from "../../routes/HomePage";

export class RouteComponent extends PureComponent {
  render() {
    return (
      <Routes>
        <Route path="/game_master" element={<HomePage />} />
        <Route path="/game_master/map" element={<MapPage />} />
      </Routes>
    );
  }
}

export default RouteComponent;
