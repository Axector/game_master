import { PureComponent, createRef } from "react";

import './Map.styles.scss';

export class MapComponent extends PureComponent {
  canvasRef = createRef();

  drawMapCell(ctx, cell, x, y) {
    const { type, data } = cell;
    const { mapCellSize } = this.props;

    switch (type) {
      case 'image':
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, x * mapCellSize + x, y * mapCellSize + y, mapCellSize, mapCellSize);
        };
        img.src = data;

        break;
      default:
      case 'color':
        ctx.fillStyle = data;
        ctx.fillRect(x * mapCellSize + x, y * mapCellSize + y, mapCellSize, mapCellSize);

        break;
    }
  }

  drawMap() {
    const {
      map,
      openCellConfig,
      mapCellSize,
    } = this.props;

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = map[0].length * mapCellSize + map[0].length;
    canvas.height = map.length * mapCellSize + map.length;

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
