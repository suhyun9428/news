import { Routes, Route } from "react-router-dom";
import NewsLayout from "./components/Layout/NewsLayout";
import SignupSection from "./components/Section/SignUpSection";
import LoginSection from "./components/Section/LoginSection";
import ShowInterested from "./components/Contents/ShowInterested";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<NewsLayout />} />
        <Route path="/signup" element={<SignupSection />} />
        <Route path="/login" element={<LoginSection />} />
        <Route path="/interest" element={<ShowInterested />} />
      </Routes>
    </>
  );
}

export default App;
