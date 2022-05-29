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

export interface MinimalPGNTag {
  event?: string;
  site?: string;
  date?: string;
  round?: string;
  white: string;
  black: string;
  result?: string;
}

export interface MinimalPGNObject {
  tags: Partial<MinimalPGNTag>;
  moves: Array<[number, string, string?]>;
}
