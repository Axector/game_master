import { PureComponent } from "react";

import './Loader.styles.scss';

export class LoaderComponent extends PureComponent {
  render() {
    const { isLoading } = this.props;

    if (!isLoading) {
      return null;
    }

    return (
      <div className="Loader" />
    );
  }
}

export default LoaderComponent;
