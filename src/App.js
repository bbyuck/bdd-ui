import { Backdrop, CircularProgress } from "@mui/material";
import "./App.css";
import Main from "./page/Main";
import { useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const { loading } = useSelector((state) => state.clientInfo);

  return (
    <div className="App">
      <Main />

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
