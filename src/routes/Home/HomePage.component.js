import { PureComponent } from "react";

import "./HomePage.styles.scss";

export class HomePageComponent extends PureComponent {
  render() {
    return (
      <div className="HomePage">
        <div className="title-wrapper">
          <h1 className="title">Welcome to Game Master App!</h1>
        </div>
      </div>
    );
  }
}

export default HomePageComponent;
