import { CellAddress, ExcelDataType, utils, WorkSheet } from "xlsx";

type CellType = CellAddress | string;
function rangeAddCell(range: string, cell: CellType) {
  const rng = utils.decode_range(range);
  const c = typeof cell === "string" ? utils.decode_cell(cell) : cell;

  if (rng.s.r > c.r) rng.s.r = c.r;
  if (rng.s.c > c.c) rng.s.c = c.c;

  if (rng.e.r < c.r) rng.e.r = c.r;
  if (rng.e.c < c.c) rng.e.c = c.c;

  return utils.encode_range(rng);
}

/*
 * The Excel data type for a cell.
 * b Boolean, n Number, e error, s String, d Date, z Stub
 */
export function addToSheet(
  sheet: WorkSheet,
  cell: CellType,
  type: ExcelDataType,
  raw: string
) {
  try {
    sheet["!ref"] = rangeAddCell(sheet["!ref"], cell);
    sheet[typeof cell === "string" ? cell : utils.encode_cell(cell)] = {
      t: type,
      v: raw,
    };
  } catch (e) {
    console.error(e);
  }
}
