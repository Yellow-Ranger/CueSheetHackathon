import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "./Spinner";
import Button from "@mui/material/Button";
import { fetchMetaData } from "./service/MusicBrainzAPI";
import { useNavigate } from "react-router-dom";
import IswcContext from "./IswcContext";

function Home() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ edlFile: {} });
  const { fetchISWC, timeCodeArray, data, dispatch } = useContext(IswcContext);
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
    const preview = document.getElementById("show-text");
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
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
      dispatch({ type: "SET_LOADING" });
      const data = await fetchISWC(iswcArray);
      dispatch({ type: "GET_FORM_DATA", payload: data });
      navigate("/cue-sheet");
    };

    reader.readAsText(file);
    //toast.success("Successfully Converted!");
  };

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
