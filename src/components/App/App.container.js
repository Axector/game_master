import { PureComponent } from "react";
import AppComponent from "./App.component";
import { initDispatchers } from '../../utils/initDispatchers';

export class AppContainer extends PureComponent {
  componentDidMount() {
    initDispatchers();
  }

  render() {
    return (
      <AppComponent />
    );
  }
}

export default AppContainer;
