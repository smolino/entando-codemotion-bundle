import React from 'react';
import './UserUiConfig.css';

class UserUiConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerColor: '',
    };
  }

  handleChangeHeaderColor(value) {
    this.setState(prevState => ({
      ...prevState,
      headerColor: value,
    }));
  }
  render() {
    const { headerColor } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h2>User MFE Config</h2>
        </header>
        <br/>
          <div><label htmlFor="headerColor">Header Color:</label>
            <select id="headerColor" name="headerColor" onChange={e => this.handleChangeHeaderColor(e.target.value)} defaultValue={headerColor} >
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
            </select>
          </div>
      </div>
    );
  }
}

export default UserUiConfig;
