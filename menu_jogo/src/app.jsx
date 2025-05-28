import React, { useState } from "react";
import SudokuGrid from "./components/SudokuGrid";

const App = () => {
  const [board, setBoard] = useState(
    Array(9).fill(0).map(() => Array(9).fill(0))
  );

  const handleChange = (row, col, value) => {
    const updated = board.map((r) => [...r]);
    updated[row][col] = value === "" ? 0 : Math.max(1, Math.min(9, parseInt(value)));
    setBoard(updated);
  };

  const solveSudoku = async () => {
    try {
      const response = await fetch("http://localhost:8080/solver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board })
      });
      const data = await response.json();
      if (data.success) {
        setBoard(data.board);
      } else {
        alert("Não foi possível resolver o Sudoku!");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Resolvedor de Sudoku</h1>
      <div style={{ marginTop: "20px" }}>
        <SudokuGrid board={board} onChange={handleChange} />
      </div>
      <button
        onClick={solveSudoku}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#1e40af",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Resolver
      </button>
    </div>
  );
};

export default App;
