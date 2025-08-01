import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from "./components/Header";
import HotKeywords from "./components/HotKeywords";
import BreakingNews from "./components/BreakingNews";
import MainNews from "./components/MainNews";
import dummyData from "./dummyData/dummyData";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <HotKeywords data={dummyData.HotKeywords} />
      <BreakingNews data={dummyData.BreakingNews} />
      <MainNews data={dummyData.MainNews} />
    </>
  );
}

export default App;
