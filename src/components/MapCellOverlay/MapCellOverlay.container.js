import { PureComponent } from "react";
import { connect } from "react-redux";
import MapCellOverlayComponent from "./MapCellOverlay.component";
import { updateMapStore } from "../../store/Map/Map.action";
import { getImage, saveImage } from "../../db/firebase";

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
    selectedImage: { imageUrl: '' },
  };

  containerFunctions = {
    toggleColorTab: this.toggleColorTab.bind(this),
    selectColor: this.selectColor.bind(this),
    handleSubmit: this.handleSubmit.bind(this),
    handleImageSelect: this.handleImageSelect.bind(this),
    closeFunction: this.closeOverlay.bind(this),
  };

  containerProps() {
    const {
      isColorTabOpened,
      selectedColor,
      isImageChanged,
      selectedImage,
    } = this.state;

    return ({
      isColorTabOpened,
      selectedColor,
      isImageChanged,
      selectedImage,
    });
  }

  componentDidUpdate(prevProps) {
    const { isVisible } = this.props;
    const { isVisible: prevIsVisisble } = prevProps;

    if (isVisible === prevIsVisisble || !isVisible) {
      return;
    }

    this.setSelectedCellOverlay();
  }

  async setSelectedCellOverlay() {
    const {
      selectedCell: {
        type,
        data,
        imageName,
      },
      defaultCell: {
        data: defaultColor,
      },
    } = this.props;

    if (type === 'image') {
      this.setState({
        isColorTabOpened: false,
        selectedColor: defaultColor,
      });

      const selectedImage = {
        imageUrl: (imageName ? await getImage(imageName) : '')
      };

      this.setState({ selectedImage: selectedImage });
    } else if (type === 'color') {
      this.setState({
        isColorTabOpened: true,
        selectedColor: data,
        isImageChanged: false,
      });
    }
  }

  toggleColorTab(state) {
    this.setState({ isColorTabOpened: state });
  }

  selectColor(value) {
    this.setState({ selectedColor: value });
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
    const { selectedColor } = this.state;

    const newMap = this.getMapCopy();
    newMap[y][x] = { type: 'color', data: selectedColor };

    return newMap;
  }

  handleImageSubmit() {
    const {
      selectedCell: {
        x, y
      },
    } = this.props;
    const {
      selectedImage: {
        imageUrl,
        imageFile,
        imageFile: {
          name: imageName,
        },
      },
    } = this.state;

    saveImage(imageFile);

    const newMap = this.getMapCopy();
    newMap[y][x] = { type: 'image', data: imageUrl, imageName: imageName };

    return newMap;
  }

  handleSubmit(e, type) {
    e.preventDefault();

    const { updateMap } = this.props;

    if (type === 'color') {
      updateMap(this.handleColorSubmit());
    } else if (type === 'image') {
      updateMap(this.handleImageSubmit());
    }

    this.closeOverlay(e);
  }

  handleImageSelect(e) {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);

    this.setState({
      isImageChanged: true,
      selectedImage: { imageUrl, imageFile },
    })
  }

  closeOverlay(e) {
    const { closeFunction } = this.props;

    this.setState({ selectedImage: { imageUrl: '' } });

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
