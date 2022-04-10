import "./App.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "./Spinner";
import Button from "@mui/material/Button";
import { fetchMetaData } from "./service/MusicBrainzAPI";

function App() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ edlFile: {} });
  const [cueSheet, setCueSheet] = useState();
  const { edlFile } = formData;
  const iswcArray = [];

  const onMutate = (e) => {
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        edlFile: e.target.files,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (edlFile.length > 5) {
      setLoading(false);
      //toast.error("5 Files max");
      return;
    }

    const preview = document.getElementById("show-text");
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const file = e.target.result;
      const regexSplit = /\r\n|\n/;
      const regexFilter = /-|\./gm;
      const regexMatch = /(?<=@)[T|t]\d+/gm;
      let lines = file.replace(regexFilter, "");
      lines = lines.split(regexSplit);

      for (const line of lines) {
        if (line.match(regexMatch)) {
          iswcArray.push(line.match(regexMatch));
        }
      }
      preview.innerHTML = iswcArray;
    };

    reader.readAsText(file);
    setLoading(false);
    //toast.success("Successfully Converted!");

    for (const iswc in iswcArray) {
      //delay(2000).then(() => console.log("ran after 2 seconds passed"));
      fetchMetaData(iswc[0])
        .then(setCueSheet)
        .catch((error) => {
          alert(error);
        });
      setLoading(false);
    }
  };

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Welcome to the Cue Sheet Generator</h1>
      <form onSubmit={onSubmit}>
        <p>Upload EDL File (max 5).</p>
        <input
          className="formInputFile"
          type="file"
          id="edlFile"
          onChange={onMutate}
          max="5"
          accept=".txt"
          multiple
          required
        />
        <button variant="contained" type="submit">
          Generate Cue Sheet
        </button>
      </form>

      <div id="show-text">Text Preview</div>
    </>
  );
}

export default App;
