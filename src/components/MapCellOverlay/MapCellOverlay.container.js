import { PureComponent } from "react";
import { connect } from "react-redux";
import MapCellOverlayComponent from "./MapCellOverlay.component";
import { updateMapStore } from "../../store/Map/Map.action";

export const mapStateToProps = (state) => ({
  map: state.MapReducer.map,
  selectedCell: state.MapReducer.selectedCell,
});

export const mapDispatchToProps = (dispatch) => ({
  updateMap: (map) => dispatch(updateMapStore({ map })),
});

export class MapCellOverlayContainer extends PureComponent {
  state = {
    isColorTabOpened: true,
    selectedColor: { r: 0, g: 0, b: 0 },
  };

  containerFunctions = {
    toggleColorTab: this.toggleColorTab.bind(this),
    selectColor: this.selectColor.bind(this),
    handleSubmit: this.handleSubmit.bind(this),
  };

  containerProps() {
    const { closeFunction } = this.props;
    const {
      isColorTabOpened,
      selectedColor,
    } = this.state;

    return ({
      closeFunction,
      isColorTabOpened,
      selectedColor,
    });
  }

  componentDidUpdate(prevProps) {
    const { isVisible } = this.props;
    const { isVisible: prevIsVisisble } = prevProps;

    if (isVisible === prevIsVisisble) {
      return;
    }

    const {
      selectedCell: {
        type,
        data,
      },
    } = this.props;

    const colors = data.replace('rgb', '').replace('(', '').replace(')', '').split(',');

    if (type === 'image') {
      this.setState({ isColorTabOpened: false });
    } else if (type === 'color') {
      this.setState({ isColorTabOpened: true });
      this.setState({ selectedColor: { r: colors[0], g: colors[1], b: colors[2] } });
    }
  }

  toggleColorTab(state) {
    this.setState({ isColorTabOpened: state });
  }

  selectColor(value, type) {
    const { selectedColor } = this.state;
    const colorValue = Math.min(Math.max(value, 0), 255);

    switch (type) {
      case 'r':
        this.setState({ selectedColor: { ...selectedColor, r: colorValue } });
        break;
      case 'g':
        this.setState({ selectedColor: { ...selectedColor, g: colorValue } });
        break;
      case 'b':
        this.setState({ selectedColor: { ...selectedColor, b: colorValue } });
        break;
      default:
    }
  }

  getMapCopy() {
    const { map } = this.props;

    const newMap = [];
    map.forEach((mapLine, y) => {
      newMap.push([]);

      mapLine.forEach((cell) => {
        newMap[y].push(cell);
      });
    });

    return newMap;
  }

  handleColorSubmit(form) {
    const {
      selectedCell: {
        x, y
      },
    } = this.props;
    const colorWrappers = [].slice.call(form.getElementsByClassName('MapCellOverlay-ColorForm-Color'));

    const colors = [];
    colorWrappers.forEach((colorWrapper) => {
      const color = colorWrapper.getElementsByTagName('input')[0].value;
      colors.push(color);
    });

    const newMap = this.getMapCopy();
    newMap[y][x] = { type: 'color', data: `rgb(${colors[0]},${colors[1]},${colors[2]})` };

    return newMap;
  }

  handleImageSubmit(form) {
    const {
      selectedCell: {
        x, y
      },
    } = this.props;
    const image = form.getElementsByClassName('MapCellOverlay-ImageForm-FileInput')[0].files[0];

    const newMap = this.getMapCopy();
    const imageSrc = URL.createObjectURL(image);
    newMap[y][x] = { type: 'image', data: imageSrc };

    return newMap;
  }

  handleSubmit(e, type) {
    e.preventDefault();

    const {
      updateMap,
      closeFunction,
    } = this.props;
    const form = e.target;

    if (type === 'color') {
      updateMap(this.handleColorSubmit(form));
    } else if (type === 'image') {
      updateMap(this.handleImageSubmit(form));
    }

    closeFunction(e);
  }

  render() {
    return (
      <MapCellOverlayComponent
        {...this.containerProps()}
        {...this.containerFunctions}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapCellOverlayContainer);
