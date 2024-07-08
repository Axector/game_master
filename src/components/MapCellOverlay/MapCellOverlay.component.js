import { PureComponent } from "react";

import './MapCellOverlay.styles.scss';

export class MapCellOverlayComponent extends PureComponent {
  render() {
    const {
      closeFunction,
      isColorTabOpened,
      toggleColorTab,
      selectColor,
      selectedColor,
      handleSubmit,
      handleImageSelect,
      isImageChanged,
      selectedImage,
    } = this.props;

    return (
      <div className="MapCellOverlay">
        <div className="MapCellOverlay-Tabs">
          <button onClick={() => toggleColorTab(true)} className="MapCellOverlay-ColorTab">Color</button>
          <button onClick={() => toggleColorTab(false)} className="MapCellOverlay-ImageTab">Image</button>
        </div>
        <div className="MapCellOverlay-Forms">
          {isColorTabOpened ? (
            <form onSubmit={(e) => handleSubmit(e, 'color')} className="MapCellOverlay-Form">
              <div className="MapCellOverlay-Form-Wrapper">
                <input
                  type="color"
                  className="MapCellOverlay-Form-ColorSwatch"
                  onChange={({ target: { value } }) => selectColor(value)}
                  value={selectedColor}
                />
              </div>
              <div className="MapCellOverlay-Form-Buttons">
                <button onClick={closeFunction} className="MapCellOverlay-Form-ButtonCancel">Cancel</button>
                <button className="MapCellOverlay-Form-ButtonSave">Save</button>
              </div>
            </form>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, 'image')} className="MapCellOverlay-Form">
              <div className="MapCellOverlay-Form-Wrapper">
                <div className="MapCellOverlay-Form-Preview-Outline" />
                <img src={selectedImage} className="MapCellOverlay-Form-Preview" alt="Preview" />
                <div>
                  <label
                    htmlFor="MapCellOverlay-Form-FileInput"
                    className="MapCellOverlay-Form-FileInput-Label"
                  >
                    Upload File
                  </label>
                  <input
                    id="MapCellOverlay-Form-FileInput"
                    className="MapCellOverlay-Form-FileInput"
                    onChange={handleImageSelect}
                    type="file"
                  />
                </div>
              </div>
              <div className="MapCellOverlay-Form-Buttons">
                <button onClick={closeFunction} className="MapCellOverlay-Form-ButtonCancel">Cancel</button>
                <button className="MapCellOverlay-Form-ButtonSave" disabled={!isImageChanged}>Save</button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default MapCellOverlayComponent;
