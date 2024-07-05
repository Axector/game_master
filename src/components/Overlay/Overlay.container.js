import { PureComponent } from "react";
import OverlayComponent from "./Overlay.component";

export class OverlayContainer extends PureComponent {
  containerFunctions = {
    closeOverlay: this.closeOverlay.bind(this),
  };

  containerProps() {
    const {
      isVisible,
      Component,
    } = this.props;

    return ({
      isVisible,
      Component,
    });
  }

  closeOverlay(e) {
    const {closeFunction} = this.props;

    e.preventDefault();
    closeFunction();
  }

  render() {
    return (
      <OverlayComponent
        {...this.containerProps()}
        {...this.containerFunctions}
      />
    );
  }
}

export default OverlayContainer;
