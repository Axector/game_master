import { PureComponent } from "react";
import Map from "../../components/Map";
import Overlay from "../../components/Overlay";
import MapCellOverlay from "../../components/MapCellOverlay";
import Loader from "../../components/Loader";

import './MapPage.styles.scss';

export class MapPageComponent extends PureComponent {
  render() {
    const {
      isVisible,
      toggleMapCellOverlay,
      handleMapSave,
      isLoading,
    } = this.props;

    return (
      <div className="MapPage">
        <button className="MapPage-SaveButton" onClick={handleMapSave}>Save Map</button>
        <Map toggleMapCellOverlay={toggleMapCellOverlay} />
        <Overlay Component={MapCellOverlay} isVisible={isVisible} closeFunction={() => toggleMapCellOverlay(false)} />
        <Loader isLoading={isLoading} />
      </div>
    );
  }
}

export default MapPageComponent;
