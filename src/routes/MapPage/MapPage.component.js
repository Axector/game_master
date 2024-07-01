import { PureComponent } from "react";
import { connect } from "react-redux";
import { updateMapStore } from "../../store/Map/Map.action";

import './MapPage.styles.scss';

export const mapStateToProps = (state) => ({
  mapWidth: state.MapReducer.mapWidth,
  mapHeight: state.MapReducer.mapHeight,
});

export const mapDispatchToProps = (dispatch) => ({
  setMapWidth: (mapWidth) => dispatch(updateMapStore({ mapWidth })),
  setMapHeight: (mapHeight) => dispatch(updateMapStore({ mapHeight })),
});

export class MapPage extends PureComponent {
  render() {
    const {
      mapWidth,
      mapHeight,
      setMapWidth,
      setMapHeight,
    } = this.props;

    return (
      <div className="container">
        <p>Map</p>
        <p>{mapWidth}</p>
        <p>{mapHeight}</p>
        <button onClick={() => setMapWidth(mapWidth + 1)}>INCREASE WIDTH</button>
        <button onClick={() => setMapWidth(mapWidth - 1)}>DECREASE WIDTH</button>
        <button onClick={() => setMapHeight(mapHeight + 1)}>INCREASE HEIGHT</button>
        <button onClick={() => setMapHeight(mapHeight - 1)}>DECREASE HEIGHT</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
