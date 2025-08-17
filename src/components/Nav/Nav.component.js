import { PureComponent } from "react";
import { Link as ReactLink } from "react-router-dom";

import "./Nav.styles.scss";

export class NavComponent extends PureComponent {
  render() {
    return (
      <nav className="Nav">
        <ul className="links">
          <li className="link-wrapper">
            <ReactLink className="link" to="/game_master">Home</ReactLink>
          </li>
          <li className="link-wrapper">
            <ReactLink className="link" to="/game_master/#/map">Map</ReactLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavComponent;
