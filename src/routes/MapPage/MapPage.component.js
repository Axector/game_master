import { PureComponent } from "react";
import Map from "../../components/Map/Map.component";

import './MapPage.styles.scss';

export class MapPage extends PureComponent {
  render() {
    return (
      <div className="MapPage">
        <p>Map</p>
        <Map />
      </div>
    );
  }
}

export default MapPage;
