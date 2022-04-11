import { useContext, useEffect, useState } from "react";
import Spinner from "./Spinner";
import { fetchMetaData } from "./service/MusicBrainzAPI";
import { useNavigate } from "react-router-dom";
import IswcContext from "./IswcContext";

function Home() {
  const [formData, setFormData] = useState({ edlFile: {} });
  const {
    fetchISWC,
    timeCodeArray,
    loading,
    setLoading,
    cueSheet,
    setCueSheet,
  } = useContext(IswcContext);
  const navigate = useNavigate();
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
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const file = e.target.result;
      const regexSplit = /\r\n|\n/;
      const regexMatch = /(?<=@)[T|t].\S+/gm;
      const regexTimeMatch = /\d{2}:\d{2}:\d{2}/gm;
      const lines = file.split(regexSplit);

      for (const line of lines) {
        if (line.match(regexMatch)) {
          iswcArray.push(line.match(regexMatch));
          //   timeCodeArray.push(line.match(regexTimeMatch));
          //   timeCodeArray.push(line.match(regexTimeMatch));
          //   timeCodeArray.push(line.match(regexTimeMatch));
        }
      }
      fetchISWC(iswcArray);
    };
    //setLoading(true);
    reader.readAsText(file);
  };

  useEffect(() => {
    if (cueSheet.length > 0) {
      if (cueSheet.length === 1) {
        navigate("/cue-sheet");
      }
    }
  }, [cueSheet]);

  // useEffect(() => {
  //   setLoading(loading);
  // }, [loading]);

  return (
    <div className="homePage">
      <h1>Welcome to the Cue Sheet Generator</h1>
      <form onSubmit={onSubmit}>
        <p>Upload EDL File</p>
        <input
          className="formInputFile"
          type="file"
          id="edlFile"
          onChange={onMutate}
          max="1"
          accept=".txt"
          multiple
          required
        />
        <button variant="contained" type="submit">
          Generate Cue Sheet
        </button>
      </form>
      {loading ? <Spinner /> : <div></div>}
    </div>
  );
}

export default Home;
