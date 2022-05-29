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

import { MinimalPGNTag, MinimalPGNObject } from "../parser/parserInterfaces";

function tagify(given: any): Partial<MinimalPGNTag> {
  var tagresult: Partial<MinimalPGNTag> = {};
  if ("Event" in given) {
    tagresult.event = String(given["Event"]);
  }
  if ("Site" in given) {
    tagresult.site = String(given["Site"]);
  }
  if ("Date" in given) {
    tagresult.date = String(given["Date"]["value"]);
  } else if ("UTCDate" in given) {
    tagresult.date = String(given["UTCDate"]["value"]);
  }
  if ("Round" in given) {
    tagresult.round = String(given["Round"]);
  }
  if ("White" in given) {
    tagresult.white = String(given["White"]);
  } else {
    tagresult.white = "NN";
  }
  if ("Black" in given) {
    tagresult.black = String(given["Black"]);
  } else {
    tagresult.black = "NN";
  }
  if ("Result" in given) {
    tagresult.result = String(given["Result"]);
  }
  return tagresult;
}

function parseAnnotations(given: string | null): string {
  var result: string = "";
  switch (given) {
    case "$1": {
      result = "!";
      break;
    }
    case "$2": {
      result = "?";
      break;
    }
    case "$3": {
      result = "!!";
      break;
    }
    case "$4": {
      result = "??";
      break;
    }
    case "$5": {
      result = "!?";
      break;
    }
    case "$6": {
      result = "?!";
      break;
    }
    case null: {
      result = "";
      break;
    }
    default: {
      result = "";
      break;
    }
  }
  return result;
}

function formatParseMove(given: any, canAnnotate: boolean = false): string {
  let move = String(given["notation"]["notation"]);
  if (canAnnotate && given["nag"] !== null) {
    move += parseAnnotations(given["nag"][0]);
  }
  return move;
}

function parseMoves(given: any, canAnnotate: boolean = false): any {
  var moves: Array<[number, string, string?]> = [];
  var move: [number, string, string?] = [0, "", ""];
  for (var i = 0; i < given.length; i++) {
    if (i % 2 === 0) {
      if (move[0] > 0) {
        moves.push(JSON.parse(JSON.stringify(move)));
      }
      move = [0, "", ""];
      move[0] = given[i]["moveNumber"];
      move[1] = formatParseMove(given[i], canAnnotate);
    } else {
      move[2] = formatParseMove(given[i], canAnnotate);
    }
  }
  moves.push(JSON.parse(JSON.stringify(move)));
  return moves;
}

function simpleParse(
  given: any,
  canAnnotate: boolean = false
): MinimalPGNObject {
  var pgn: MinimalPGNObject = {
    tags: {
      white: "NN",
      black: "NN",
    },
    moves: [],
  };
  pgn.tags = tagify(given["tags"]);
  pgn.moves = parseMoves(given["moves"], canAnnotate);
  if ("Result" in given["tags"]) {
    const result = String(given["tags"]["Result"]);
    let move = pgn.moves[pgn.moves.length - 1];
    if (move.length === 2) {
      move.push(result);
    } else if (move.length === 3) {
      if (typeof move[2] !== "undefined" && move[2].length > 0) {
        pgn.moves.push([pgn.moves.length + 1, result, ""]);
      } else {
        move[2] = result;
      }
    }
  }
  return pgn;
}

export default simpleParse;
