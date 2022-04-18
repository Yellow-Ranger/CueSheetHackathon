import { createContext, useState, useReducer } from "react";
import { fetchMetaData } from "./service/MusicBrainzAPI";
import formReducer from "./FormReducer";

const IswcContext = createContext();

export const IswcProvider = ({ children }) => {
  const [cueSheet, setCueSheet] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeCodeArray = [];
  const initialState = {
    loading: false,
    data: []
  };

  //fetch iswc
  const fetchISWC = async (iswcArray) => {
    setCounter(iswcArray.length);
    console.log("iswcArray.length: ", iswcArray.length);
    console.log("Counter length: ", counter);
    for (let i = 0; i < iswcArray.length; i++) {
      console.log("iswcArray: ", iswcArray);
      console.log("iswc is: ", iswcArray[i][0]);
      delay(1000).then(() =>
        console.log("1 second pause to prevent server rejection")
      );

      try {
        const response = await fetchMetaData(iswcArray[i][0]);
        finalResponse.push(response.json());
        console.log("Final Response: ", finalResponse);
        setCueSheet(finalResponse);
      } catch (e) {
        console.log(e, " Big Error");
      }
    }
  };

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <IswcContext.Provider
      value={{
        cueSheet,
        setCueSheet,
        fetchISWC,
        timeCodeArray,
        state,
        dispatch,
      }}
    >
      {children}
    </IswcContext.Provider>
  );
};

export default IswcContext;
