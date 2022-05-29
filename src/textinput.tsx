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

import React from "react";
import parse_pgn from "./parser/parser";

function getScoresheet(pgn: string, canAnnotate: boolean = false): void {
  parse_pgn(pgn, canAnnotate);
}

class PGNTextInput extends React.Component {
  annotate: boolean;
  value: string;

  constructor(props?: any) {
    super(props);
    this.annotate = false;
    this.value = "";
  }

  onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    this.value = e.currentTarget.value;
  };

  onSubmit = (): string => {
    getScoresheet(this.value);
    return this.value;
  };

  onSubmitAnnotate = (): string => {
    getScoresheet(this.value, true);
    return this.value;
  };

  componentWillMount() {
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div>
        <textarea
          name="target_pgn"
          id="target_pgn"
          onChange={this.onChange}
        ></textarea>
        <button className="check-text" onClick={() => this.onSubmit()}>
          GENERATE SCORESHEET
        </button>
        <button className="check-text" onClick={() => this.onSubmitAnnotate()}>
          GENERATE ANNOTATED SCORESHEET
        </button>
      </div>
    );
  }
}

export default PGNTextInput;
