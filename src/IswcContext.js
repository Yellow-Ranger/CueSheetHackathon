import { createContext, useState, useEffect } from "react";
import { fetchMetaData } from "./service/MusicBrainzAPI";

const IswcContext = createContext();

export const IswcProvider = ({ children }) => {
  const [cueSheet, setCueSheet] = useState();
  const timeCodeArray = [];

  //fetch iswc
  const fetchISWC = async (iswcArray) => {
    for (let i = 0; i < iswcArray.length; i++) {
      console.log("iswcArray: ", iswcArray);
      console.log("iswc is: ", iswcArray[i][0]);
      delay(1000).then(() =>
        console.log("1 second pause to prevent server rejection")
      );

      try {
        const response = await fetchMetaData(iswcArray[i][0]);
        var finalResponse = await response.json();
      } catch (e) {
        console.log(e);
      } finally {
        setCueSheet(finalResponse);
      }
    }
  };

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  return (
    <IswcContext.Provider
      value={{
        cueSheet,
        setCueSheet,
        fetchISWC,
        timeCodeArray,
      }}
    >
      {children}
    </IswcContext.Provider>
  );
};

export default IswcContext;
