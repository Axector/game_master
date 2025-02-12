import { PureComponent } from "react";
import { Link } from "react-router-dom";

import "./Nav.styles.scss";

export class NavComponent extends PureComponent {
  render() {
    return (
      <nav className="Nav">
        <ul className="links">
          <li className="link-wrapper">
            <Link className="link" to="/game_master">Home</Link>
          </li>
          <li className="link-wrapper">
            <Link className="link" to="/game_master/map">Map</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavComponent;
