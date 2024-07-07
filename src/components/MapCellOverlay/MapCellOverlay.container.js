import { PureComponent } from "react";
import { connect } from "react-redux";
import MapCellOverlayComponent from "./MapCellOverlay.component";
import { updateMapStore } from "../../store/Map/Map.action";

export const mapStateToProps = (state) => ({
  map: state.MapReducer.map,
  selectedCell: state.MapReducer.selectedCell,
  defaultCell: state.MapReducer.defaultCell,
});

export const mapDispatchToProps = (dispatch) => ({
  updateMap: (map) => dispatch(updateMapStore({ map })),
});

export class MapCellOverlayContainer extends PureComponent {
  state = {
    isColorTabOpened: true,
    selectedColor: { r: 0, g: 0, b: 0 },
    isImageChanged: false,
    selectedImage: '',
  };

  containerFunctions = {
    toggleColorTab: this.toggleColorTab.bind(this),
    selectColor: this.selectColor.bind(this),
    handleSubmit: this.handleSubmit.bind(this),
    handleImageSelect: this.handleImageSelect.bind(this),
  };

  containerProps() {
    const { closeFunction } = this.props;
    const {
      isColorTabOpened,
      selectedColor,
      isImageChanged,
      selectedImage,
    } = this.state;

    return ({
      closeFunction,
      isColorTabOpened,
      selectedColor,
      isImageChanged,
      selectedImage,
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
      defaultCell: {
        data: defaultColor,
      },
    } = this.props;

    if (type === 'image') {
      const colors = defaultColor.replace('rgb', '').replace('(', '').replace(')', '').split(',');

      this.setState({
        isColorTabOpened: false,
        selectedImage: data,
        selectColor: { r: colors[0], g: colors[1], b: colors[2] },
      });
    } else if (type === 'color') {
      const colors = data.replace('rgb', '').replace('(', '').replace(')', '').split(',');

      this.setState({
        isColorTabOpened: true,
        selectedColor: { r: colors[0], g: colors[1], b: colors[2] },
        selectedImage: '',
        isImageChanged: false,
      });
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

  handleColorSubmit() {
    const {
      selectedCell: {
        x, y
      },
    } = this.props;
    const { selectedColor: {
      r, g, b,
    } } = this.state;

    const newMap = this.getMapCopy();
    newMap[y][x] = { type: 'color', data: `rgb(${r},${g},${b})` };

    return newMap;
  }

  handleImageSubmit() {
    const {
      selectedCell: {
        x, y
      },
    } = this.props;
    const { selectedImage } = this.state;

    const newMap = this.getMapCopy();
    const imageSrc = selectedImage;
    newMap[y][x] = { type: 'image', data: imageSrc };

    return newMap;
  }

  handleSubmit(e, type) {
    e.preventDefault();

    const {
      updateMap,
      closeFunction,
    } = this.props;

    if (type === 'color') {
      updateMap(this.handleColorSubmit());
    } else if (type === 'image') {
      updateMap(this.handleImageSubmit());
    }

    closeFunction(e);
  }

  handleImageSelect(e) {
    const imageUrl = URL.createObjectURL(e.target.files[0]);

    this.setState({
      isImageChanged: true,
      selectedImage: imageUrl,
    })
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
