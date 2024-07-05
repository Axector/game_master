import { PureComponent } from "react";

import './Overlay.styles.scss';

export class OverlayComponent extends PureComponent {
  render() {
    const { isVisible, Component, closeOverlay } = this.props;

    return (
      <div className="Overlay" data-lesch-visible={isVisible}>
        <Component closeFunction={closeOverlay} isVisible={isVisible} />
      </div>
    );
  }
}

export default OverlayComponent;
