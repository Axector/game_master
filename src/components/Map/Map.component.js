import { PureComponent, createRef } from "react";

import './Map.styles.scss';
import { getImage } from "../../db/firebase";

export class MapComponent extends PureComponent {
  canvasRef = createRef();

  state = {
    eventsSet: false,
  };

  async drawMapCell(ctx, cell, x, y) {
    const { type, data } = cell;
    const {
      mapCellSize,
      spaceBetweenMapCells,
    } = this.props;

    const xPos = x * mapCellSize + x * spaceBetweenMapCells + spaceBetweenMapCells / 2;
    const yPos = y * mapCellSize + y * spaceBetweenMapCells + spaceBetweenMapCells / 2;

    switch (type) {
      case 'image':
        const { imageName } = cell;

        const imageUrl = await getImage(imageName);

        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, xPos, yPos, mapCellSize, mapCellSize);
        };
        img.src = imageUrl;

        break;
      default:
      case 'color':
        ctx.fillStyle = data;
        ctx.fillRect(xPos, yPos, mapCellSize, mapCellSize);

        break;
    }
  }

  drawMap() {
    const {
      map,
      openCellConfig,
      mapCellSize,
      mapSize,
      spaceBetweenMapCells,
    } = this.props;
    const { eventsSet } = this.state;

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = mapSize.x * mapCellSize + mapSize.x * spaceBetweenMapCells;
    canvas.height = mapSize.y * mapCellSize + mapSize.y * spaceBetweenMapCells;

    if (!eventsSet) {
      canvas.addEventListener('click', ({ offsetX, offsetY }) => {
        openCellConfig(offsetX, offsetY);
      });

      this.setState({ eventsSet: true });
    }

    map.forEach((mapLine, y) => {
      mapLine.forEach((mapCell, x) => {
        this.drawMapCell(ctx, mapCell, x, y);
      });
    });
  }

  async waitForCanvas(func) {
    setTimeout(() => {
      while (!this.canvasRef.current) { }

      func();
    }, 100);
  }

  render() {
    this.waitForCanvas(this.drawMap.bind(this));

    const {
      handleMapSizeChange,
      mapSize,
      spaceBetweenMapCells,
      handleSpaceBetweenCellsChange,
    } = this.props;

    return (
      <div className="Map" >
        <div className="Map-Settings">
          <div className="Map-Settings-MapSize">
            <label>Map Width</label>
            <input
              type="range"
              min="1"
              max="30"
              value={mapSize.x}
              onChange={({ target: { value } }) => handleMapSizeChange(value, 'x', 1, 30)}
            />
            <input
              type="number"
              min="1"
              max="30"
              value={mapSize.x}
              onChange={({ target: { value } }) => handleMapSizeChange(value, 'x', 1, 30)}
            />
          </div>
          <div className="Map-Settings-MapSize">
            <label>Map Height</label>
            <input
              type="range"
              min="1"
              max="50"
              value={mapSize.y}
              onChange={({ target: { value } }) => handleMapSizeChange(value, 'y', 1, 50)}
            />
            <input
              type="number"
              min="1"
              max="50"
              value={mapSize.y}
              onChange={({ target: { value } }) => handleMapSizeChange(value, 'y', 1, 50)}
            />
          </div>
          <div className="Map-Settings-SpaceBetweenCells">
            <label>Space between cells</label>
            <input
              type="range"
              min="0"
              max="5"
              value={spaceBetweenMapCells}
              onChange={({ target: { value } }) => handleSpaceBetweenCellsChange(value, 0, 5)}
            />
            <input
              type="number"
              min="0"
              max="5"
              value={spaceBetweenMapCells}
              onChange={({ target: { value } }) => handleSpaceBetweenCellsChange(value, 0, 5)}
            />
          </div>
        </div>
        <div className="Map-Wrapper">
          <canvas className="Canvas" ref={this.canvasRef} />
        </div>
      </div>
    );
  }
}

export default MapComponent;
