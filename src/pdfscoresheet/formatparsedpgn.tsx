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


import { MinimalPGNObject } from "../parser/parserInterfaces";

function print_pgn(pgn: MinimalPGNObject) {
  let parsedMoves: Array<
    Array<[string, string, string, string, string, string]>
  > = [[]];
  let moveRow: [string, string, string, string, string, string] = [
    "0",
    "",
    "",
    "0",
    "",
    "",
  ];
  let game_pgn = pgn.moves;
  const maxFirstPageRows = 20;
  const maxSubsequentPageRows = 30;
  const maxPages = Math.floor(
    (game_pgn.length + 2 * (maxSubsequentPageRows - maxFirstPageRows)) /
      (2 * maxSubsequentPageRows)
  );
  for (var i = 0; i < maxPages; i++) {
    parsedMoves.push([]);
  }
  for (var i = 0; i < maxFirstPageRows; i++) {
    moveRow = ["0", "   ", "   ", "0", "   ", "   "];
    moveRow[0] = String(i + 1);
    moveRow[3] = String(i + 1 + maxFirstPageRows);
    if (typeof game_pgn[i] !== "undefined") {
      if (game_pgn[i].length === 3) {
        moveRow[1] = String(game_pgn[i][1]);
        moveRow[2] = String(game_pgn[i][2]);
      }
    }
    if (typeof game_pgn[i + maxFirstPageRows] !== "undefined") {
      if (game_pgn[i + maxFirstPageRows].length === 3) {
        moveRow[4] = String(game_pgn[i + maxFirstPageRows][1]);
        moveRow[5] = String(game_pgn[i + maxFirstPageRows][2]);
      }
    }
    parsedMoves[0].push(moveRow);
  }
  if (maxPages > 0) {
    for (var j = 1; j <= maxPages; j++) {
      var sindex = 2 * maxFirstPageRows + 2 * (j - 1) * maxSubsequentPageRows;
      for (var i = 0; i < maxSubsequentPageRows; i++) {
        moveRow = ["0", "   ", "   ", "0", "   ", "   "];
        moveRow[0] = String(i + 1 + sindex);
        moveRow[3] = String(i + 1 + sindex + maxSubsequentPageRows);
        if (typeof game_pgn[i + sindex] !== "undefined") {
          if (game_pgn[i + sindex].length === 3) {
            moveRow[1] = String(game_pgn[i + sindex][1]);
            moveRow[2] = String(game_pgn[i + sindex][2]);
          }
        }
        if (
          typeof game_pgn[i + sindex + maxSubsequentPageRows] !== "undefined"
        ) {
          if (game_pgn[i + sindex + maxSubsequentPageRows].length === 3) {
            moveRow[4] = String(
              game_pgn[i + sindex + maxSubsequentPageRows][1]
            );
            moveRow[5] = String(
              game_pgn[i + sindex + maxSubsequentPageRows][2]
            );
          }
        }
        parsedMoves[j].push(moveRow);
      }
    }
  }
  return parsedMoves;
}

export default print_pgn;
