/**
 *  This file is part of pgn_printable_scoresheet.

    pgn_printable_scoresheet is free software: you can redistribute it 
    and/or modify it under the terms of the GNU General Public License 
    as published by the Free Software Foundation, either version 3 
    of the License, or (at your option) any later version.

    pgn_printable_scoresheet is distributed in the hope that it will be 
    useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
    of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
    See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along 
    with pgn_printable_scoresheet. If not, see <https://www.gnu.org/licenses/>.
 */

import "./App.css";
import PGNTextInput from "./textinput";

function App() {
  const showSource = () => {
    window.open(
      "https://github.com/BurraAbhishek/pgn_printable_scoresheet#source-code-and-privacy-policy"
    );
  };

  const textareaelement = new PGNTextInput().render();

  return (
    <div className="App">
      <div className="App-header">
        <div className="paper" id="input_page">
          <h2>Enter PGN Text:</h2>
          {textareaelement}
          <button className="check-text" onClick={showSource}>
            SOURCE CODE AND PRIVACY
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
