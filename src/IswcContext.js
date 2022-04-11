import { createContext, useState, useEffect } from "react";
import { fetchMetaData } from "./service/MusicBrainzAPI";

const IswcContext = createContext();

export const IswcProvider = ({ children }) => {
  const [cueSheet, setCueSheet] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeCodeArray = [];
  const finalResponse = [];
  const [counter, setCounter] = useState(0);

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

  useEffect(() => {
    console.log("cueSheet length: ", cueSheet.length);
    console.log("Counter: ", counter);
    if (cueSheet.length === 1) {
      setLoading(false);
      console.log("Set Loading to false");
    }
  }, [cueSheet, counter]);

  return (
    <IswcContext.Provider
      value={{
        cueSheet,
        setCueSheet,
        fetchISWC,
        timeCodeArray,
        loading,
        setLoading,
      }}
    >
      {children}
    </IswcContext.Provider>
  );
};

export default IswcContext;
