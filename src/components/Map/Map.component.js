import { PureComponent, createRef } from "react";

import './Map.styles.scss';

export class MapComponent extends PureComponent {
  canvasRef = createRef();

  drawMapCell(ctx, cell, x, y) {
    const { type, data } = cell;
    const {
      mapCellSize,
      spaceBetweenMapCells,
    } = this.props;

    const xPos = x * mapCellSize + x * spaceBetweenMapCells + spaceBetweenMapCells / 2;
    const yPos = y * mapCellSize + y * spaceBetweenMapCells + spaceBetweenMapCells / 2;

    switch (type) {
      case 'image':
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, xPos, yPos, mapCellSize, mapCellSize);
        };
        img.src = data;

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

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = mapSize.x * mapCellSize + mapSize.x * spaceBetweenMapCells;
    canvas.height = mapSize.y * mapCellSize + mapSize.y * spaceBetweenMapCells;

    canvas.addEventListener('click', ({ offsetX, offsetY }) => {
      openCellConfig({ x: offsetX, y: offsetY });
    });

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

    return (
      <div className="Map" >
        <div className="Map-Wrapper">
          <canvas className="Canvas" ref={this.canvasRef} />
        </div>
      </div>
    );
  }
}

export default MapComponent;
