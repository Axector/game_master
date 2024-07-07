import { PureComponent } from "react";
import { connect } from "react-redux";
import MapComponent from "./Map.component";
import { updateMapStore } from "../../store/Map/Map.action";

export const mapStateToProps = (state) => ({
  map: state.MapReducer.map,
  mapCellSize: state.MapReducer.mapCellSize,
  mapSize: state.MapReducer.mapSize,
  spaceBetweenMapCells: state.MapReducer.spaceBetweenMapCells,
});

export const mapDispatchToProps = (dispatch) => ({
  updateSelectedCell: (selectedCell) => dispatch(updateMapStore({ selectedCell })),
});

export class MapContainer extends PureComponent {
  containerFunctions = {
    openCellConfig: this.openCellConfig.bind(this),
  };

  containerProps() {
    const {
      map,
      mapCellSize,
      mapSize,
      spaceBetweenMapCells,
    } = this.props;

    return ({
      map,
      mapCellSize,
      mapSize,
      spaceBetweenMapCells,
    });
  }

  openCellConfig({ x, y }) {
    const {
      toggleMapCellOverlay,
      mapCellSize,
      map,
      mapSize,
      updateSelectedCell,
    } = this.props;

    const xPos = Math.floor((x - mapSize.x) / mapCellSize);
    const yPos = Math.floor((y - mapSize.y) / mapCellSize);

    updateSelectedCell({ ...map[yPos][xPos], x: xPos, y: yPos });
    toggleMapCellOverlay(true);
  }

  render() {
    return (
      <MapComponent
        {...this.containerProps()}
        {...this.containerFunctions}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
