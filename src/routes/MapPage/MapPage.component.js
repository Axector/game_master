import { PureComponent } from "react";
import Map from "../../components/Map";

import './MapPage.styles.scss';
import Overlay from "../../components/Overlay";
import MapCellOverlay from "../../components/MapCellOverlay";

export class MapPageComponent extends PureComponent {
  render() {
    const {
      isVisible,
      toggleMapCellOverlay,
    } = this.props;

    return (
      <div className="MapPage">
        <h1>Map</h1>
        <Map toggleMapCellOverlay={toggleMapCellOverlay} />
        <Overlay Component={MapCellOverlay} isVisible={isVisible} closeFunction={() => toggleMapCellOverlay(false)} />
      </div>
    );
  }
}

export default MapPageComponent;
