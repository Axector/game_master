import { PureComponent, createRef } from "react";
import { connect } from "react-redux";

import './Map.styles.scss';

export const mapStateToProps = (state) => ({
  map: state.MapReducer.map,
});

export const mapDispatchToProps = () => ({});

export class Map extends PureComponent {
  canvasRef = createRef();

  drawMapCellColor(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * width + x * 5, y * height + y * 5, width, height);
  }

  drawMapCellImage(ctx, x, y, width, height, image) {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, x * width + x * 5, y * height + y * 5, width, height);
    };
    img.src = image;
  }

  drawMap() {
    const { map } = this.props;

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 1000;

    canvas.addEventListener('click', (e) => {
      const {
        offsetX: x,
        offsetY: y,
      } = e;

      console.log(`XXX position: [${x}, ${y}]`);
    });

    for (let x = 0; x < map[0].length; ++x) {
      for (let y = 0; y < map.length; ++y) {
        const {
          type,
          data,
        } = map[y][x];

        if (type === 'image') {
          this.drawMapCellImage(ctx, x, y, 50, 50, data);
        } else if (type === 'color') {
          this.drawMapCellColor(ctx, x, y, 50, 50, data);
        }
      }
    }
  }

  async waitForCanvas(func) {
    setTimeout(() => {
      while (!this.canvasRef.current) { }

      func();
    }, 0);
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);
