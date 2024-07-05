import { PureComponent } from "react";

import './MapCellOverlay.styles.scss';

export class MapCellOverlayComponent extends PureComponent {
  state = {
    isImageChanged: false,
  };

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
    } = this.props;
    const { isImageChanged } = this.state;

    return (
      <div className="MapCellOverlay">
        <div className="MapCellOverlay-Tabs">
          <button onClick={() => toggleColorTab(true)} className="MapCellOverlay-ColorTab">Color</button>
          <button onClick={() => toggleColorTab(false)} className="MapCellOverlay-ImageTab">Image</button>
        </div>
        <div className="MapCellOverlay-Forms">
          {isColorTabOpened ? (
            <form onSubmit={(e) => handleSubmit(e, 'color')} className="MapCellOverlay-ColorForm">
              <div className="MapCellOverlay-ColorForm-Wrapper">
                <div
                  className="MapCellOverlay-ColorForm-ColorResult"
                  style={{ backgroundColor: `rgb(${r},${g},${b})` }}
                />
                <div className="MapCellOverlay-ColorForm-Colors">
                  <div className="MapCellOverlay-ColorForm-Color">
                    <label htmlFor="MapCellOverlay-ColorForm-Color-R">R</label>
                    <input
                      id="MapCellOverlay-ColorForm-Color-R"
                      onChange={({ target: { value } }) => selectColor(value, 'r')}
                      type="range"
                      min="0"
                      max="255"
                      value={r}
                    />
                    <input
                      id="MapCellOverlay-ColorForm-Color-R"
                      onChange={({ target: { value } }) => selectColor(value, 'r')}
                      type="number"
                      min="0"
                      max="255"
                      value={r}
                    />
                  </div>
                  <div className="MapCellOverlay-ColorForm-Color">
                    <label htmlFor="MapCellOverlay-ColorForm-Color-G">G</label>
                    <input
                      id="MapCellOverlay-ColorForm-Color-G"
                      onChange={({ target: { value } }) => selectColor(value, 'g')}
                      type="range"
                      min="0"
                      max="255"
                      value={g}
                    />
                    <input
                      id="MapCellOverlay-ColorForm-Color-G"
                      onChange={({ target: { value } }) => selectColor(value, 'g')}
                      type="number"
                      min="0"
                      max="255"
                      value={g}
                    />
                  </div>
                  <div className="MapCellOverlay-ColorForm-Color">
                    <label htmlFor="MapCellOverlay-ColorForm-Color-B">B</label>
                    <input
                      id="MapCellOverlay-ColorForm-Color-B"
                      onChange={({ target: { value } }) => selectColor(value, 'b')}
                      type="range"
                      min="0"
                      max="255"
                      value={b}
                    />
                    <input
                      id="MapCellOverlay-ColorForm-Color-B"
                      onChange={({ target: { value } }) => selectColor(value, 'b')}
                      type="number"
                      min="0"
                      max="255"
                      value={b}
                    />
                  </div>
                </div>
              </div>
              <div className="MapCellOverlay-ColorForm-Buttons">
                <button onClick={closeFunction} className="MapCellOverlay-ColorForm-ButtonCancel">Cancel</button>
                <button className="MapCellOverlay-ColorForm-ButtonSave">Save</button>
              </div>
            </form>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, 'image')} className="MapCellOverlay-ImageForm">
              <input
                className="MapCellOverlay-ImageForm-FileInput"
                onChange={() => this.setState({ isImageChanged: true })}
                type="file"
              />
              <div className="MapCellOverlay-ImageForm-Buttons">
                <button onClick={closeFunction} className="MapCellOverlay-ImageForm-ButtonCancel">Cancel</button>
                <button className="MapCellOverlay-ImageForm-ButtonSave" data-lesch-changed={isImageChanged}>Save</button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default MapCellOverlayComponent;
