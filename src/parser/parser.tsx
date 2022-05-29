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

import { parse } from "@mliebelt/pgn-parser";
import simpleParse from "../parser/simpleparser";
import renderMobilePage from "../pdfscoresheet/mobilescoresheet";

function parse_pgn(pgn: string, canAnnotate: boolean = false) {
  let game = parse(pgn, { startRule: "game" });
  let game_parsed: any = JSON.parse(JSON.stringify(game));
  let game_simple_parsed: any = simpleParse(game_parsed, canAnnotate);
  renderMobilePage(game_simple_parsed);
}

export default parse_pgn;
