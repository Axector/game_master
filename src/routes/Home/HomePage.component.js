import { PureComponent } from "react";

import "./HomePage.styles.scss";

export class HomePage extends PureComponent {
  render() {
    return (
      <div className="HomePage">
        <div className="title-wrapper">
          <p className="title">Welcome to Game Master App!</p>
        </div>
      </div>
    );
  }
}

export default HomePage;
