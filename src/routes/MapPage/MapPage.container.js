import { PureComponent } from "react";
import MapPageComponent from "./MapPage.component";

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
