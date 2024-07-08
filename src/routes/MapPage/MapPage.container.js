import { PureComponent } from "react";
import MapPageComponent from "./MapPage.component";
import MapDispatcher from "../../store/Map/Map.dispatcher";
import { debounce } from '../../utils/debounce';

export class MapPageContainer extends PureComponent {
  state = {
    isVisible: false,
  };

  containerFunctions = {
    toggleMapCellOverlay: this.toggleMapCellOverlay.bind(this),
  };

  containerProps() {
    const { isVisible } = this.state;

    return ({
      isVisible: isVisible,
    });
  }

  componentDidMount() {
    MapDispatcher.initMapCellSize();

    window.addEventListener('resize', this.updateMapCellSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMapCellSize);
  }

  updateMapCellSize = debounce(() => MapDispatcher.initMapCellSize(), 100);

  toggleMapCellOverlay(state) {
    this.setState({ isVisible: state });
  }

  render() {
    return (
      <MapPageComponent
        {...this.containerProps()}
        {...this.containerFunctions}
      />
    );
  }
}

export default MapPageContainer;
