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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import print_pgn from "./formatparsedpgn";

function renderMobilePage(pgn: MinimalPGNObject) {
  let pdf = new jsPDF();
  let tagRow: Array<[string, string]> = [];
  if (typeof pgn.tags.event !== "undefined") {
    tagRow.push(["Event:", pgn.tags.event]);
  }
  if (typeof pgn.tags.site !== "undefined") {
    tagRow.push(["Site:", pgn.tags.site]);
  }
  if (typeof pgn.tags.round !== "undefined") {
    tagRow.push(["Round:", pgn.tags.round]);
  }
  if (typeof pgn.tags.date !== "undefined") {
    tagRow.push(["Date:", pgn.tags.date]);
  }
  if (typeof pgn.tags.white !== "undefined") {
    tagRow.push(["White:", pgn.tags.white]);
  }
  if (typeof pgn.tags.black !== "undefined") {
    tagRow.push(["Black:", pgn.tags.black]);
  }
  if (typeof pgn.tags.result !== "undefined") {
    tagRow.push(["Result:", pgn.tags.result]);
  }
  autoTable(pdf, {
    body: [
      [
        {
          content: "Score Sheet",
          styles: {
            fillColor: "white",
            textColor: "black",
            fontSize: 32,
          },
        },
      ],
    ],
  });
  pdf.setDrawColor("#d59020");
  pdf.line(14, 30, 196, 30);
  autoTable(pdf, {
    body: tagRow,
    theme: "grid",
    columnStyles: { 0: { fontStyle: "bold" } },
  });
  const moves_pgn = print_pgn(pgn);
  autoTable(pdf, {
    body: moves_pgn[0],
    theme: "grid",
    columnStyles: {
      0: { cellWidth: 30, fontStyle: "bold" },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 30, fontStyle: "bold" },
      4: { cellWidth: 30 },
      5: { cellWidth: 30 },
    },
  });
  if (moves_pgn.length > 1) {
    for (var i = 1; i < moves_pgn.length; i++) {
      pdf.addPage();
      autoTable(pdf, {
        body: moves_pgn[i],
        theme: "grid",
        columnStyles: {
          0: { cellWidth: 30, fontStyle: "bold" },
          1: { cellWidth: 30 },
          2: { cellWidth: 30 },
          3: { cellWidth: 30, fontStyle: "bold" },
          4: { cellWidth: 30 },
          5: { cellWidth: 30 },
        },
      });
    }
  }
  pdf.save("generated.pdf");
}

export default renderMobilePage;
