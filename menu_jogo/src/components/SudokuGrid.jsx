import React from "react";

const SudokuGrid = ({ board, onChange }) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(9, 40px)",
    gap: "4px",
    justifyContent: "center"
  };

  const inputStyle = {
    width: "40px",
    height: "40px",
    textAlign: "center",
    fontSize: "18px",
    border: "1px solid #ccc",
    borderRadius: "4px"
  };

  return (
    <div style={gridStyle}>
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="number"
            min="1"
            max="9"
            value={value === 0 ? "" : value}
            onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
            style={inputStyle}
          />
        ))
      )}
    </div>
  );
};

export default SudokuGrid;
