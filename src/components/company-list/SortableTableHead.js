import { useEffect, useState } from "react";
import { BiSort, BiSortDown, BiSortUp } from "react-icons/bi";

export default function SortableTableHead({ columns, sortDataBy }) {
  const [sortType, setSortType] = useState("");

  return (
    <thead className="table-borderless">
      <tr>
        {columns.map((column, colIndex) =>
          column.sortable ? (
            <SortableColumn
              key={colIndex}
              column={column}
              setToInitial={sortType != column.type}
              setSortType={setSortType}
              sortDataBy={sortDataBy}
            />
          ) : (
            <th key={colIndex}>{column.name}</th>
          )
        )}
      </tr>
    </thead>
  );
}

const SortableColumn = ({ column, setToInitial, setSortType, sortDataBy }) => {
  const [sortDir, setSortDir] = useState("");

  useEffect(() => {
    if (setToInitial) setSortDir("");
  }, [setToInitial]);

  const clickHandler = () => {
    setSortType(column.type);
    if (sortDir == "") setSortDir("desc");
    else if (sortDir == "desc") setSortDir("asc");
    else if (sortDir == "asc") setSortDir("desc");
    sortDataBy(column.type, column.integer, sortDir);
  };

  return (
    <th key={column.type} style={{ cursor: "pointer", minWidth: "fit-content" }} onClick={() => clickHandler()}>
      <span>{column.name}</span>
      &nbsp;
      <span>
        {sortDir == "" ? (
          <BiSort style={{ transform: "translateY(-1px)" }} />
        ) : sortDir == "asc" ? (
          <BiSortUp style={{ transform: "translateY(-1px)" }} />
        ) : (
          <BiSortDown style={{ transform: "translateY(-1px)" }} />
        )}
      </span>
    </th>
  );
};
