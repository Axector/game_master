import { PureComponent } from "react";

import './MapCellOverlay.styles.scss';

export class MapCellOverlayComponent extends PureComponent {
  render() {
    const {
      closeFunction,
      isColorTabOpened,
      toggleColorTab,
      selectColor,
      selectedColor: {
        r, g, b,
      },
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
                <div className="MapCellOverlay-Form-Preview-Outline" />
                <div
                  className="MapCellOverlay-Form-Preview"
                  style={{ backgroundColor: `rgb(${r},${g},${b})` }}
                />
                <div className="MapCellOverlay-Form-Colors">
                  <div className="MapCellOverlay-Form-Color">
                    <label htmlFor="MapCellOverlay-Form-Color-R">R</label>
                    <input
                      id="MapCellOverlay-Form-Color-R"
                      onChange={({ target: { value } }) => selectColor(value, 'r')}
                      type="range"
                      min="0"
                      max="255"
                      value={r}
                    />
                    <input
                      id="MapCellOverlay-Form-Color-R"
                      onChange={({ target: { value } }) => selectColor(value, 'r')}
                      type="number"
                      min="0"
                      max="255"
                      value={r}
                    />
                  </div>
                  <div className="MapCellOverlay-Form-Color">
                    <label htmlFor="MapCellOverlay-Form-Color-R">G</label>
                    <input
                      id="MapCellOverlay-Form-Color-R"
                      onChange={({ target: { value } }) => selectColor(value, 'g')}
                      type="range"
                      min="0"
                      max="255"
                      value={g}
                    />
                    <input
                      id="MapCellOverlay-Form-Color-R"
                      onChange={({ target: { value } }) => selectColor(value, 'g')}
                      type="number"
                      min="0"
                      max="255"
                      value={g}
                    />
                  </div>
                  <div className="MapCellOverlay-Form-Color">
                    <label htmlFor="MapCellOverlay-Form-Color-R">B</label>
                    <input
                      id="MapCellOverlay-Form-Color-R"
                      onChange={({ target: { value } }) => selectColor(value, 'b')}
                      type="range"
                      min="0"
                      max="255"
                      value={b}
                    />
                    <input
                      id="MapCellOverlay-Form-Color-R"
                      onChange={({ target: { value } }) => selectColor(value, 'b')}
                      type="number"
                      min="0"
                      max="255"
                      value={b}
                    />
                  </div>
                </div>
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
