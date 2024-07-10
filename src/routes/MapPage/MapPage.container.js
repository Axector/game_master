import { PureComponent } from "react";
import MapPageComponent from "./MapPage.component";
import MapDispatcher from "../../store/Map/Map.dispatcher";
import { debounce } from '../../utils/debounce';
import { connect } from "react-redux";

export const mapStateToProps = (state) => ({
  isLoading: state.MapReducer.isLoading,
});

export const mapDispatchToProps = () => ({});

export class MapPageContainer extends PureComponent {
  state = {
    isVisible: false,
  };

  containerFunctions = {
    toggleMapCellOverlay: this.toggleMapCellOverlay.bind(this),
    handleMapSave: this.handleMapSave.bind(this),
  };

  containerProps() {
    const { isLoading } = this.props;
    const { isVisible } = this.state;

    return ({
      isLoading: isLoading,
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

  handleMapSave() {
    MapDispatcher.saveMap();
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

export default connect(mapStateToProps, mapDispatchToProps)(MapPageContainer);
