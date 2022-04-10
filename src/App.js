import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CueSheetForm from "./CueSheetForm";
import { IswcProvider } from "./IswcContext";

function App() {
  return (
    <>
      <IswcProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cue-sheet" element={<CueSheetForm />} />
          </Routes>
        </Router>
      </IswcProvider>
    </>
  );
}

export default App;
