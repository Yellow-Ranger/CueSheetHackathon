const url = "https://beta.musicbrainz.org/ws/2/work/?query=iswc:";

export async function fetchMetaData(iswc) {
  const headers = {
    Accept: "application/json",
  };
  console.log("In api call. ISWC is: ", iswc);
  const initialResponse = await fetch(assembleQueryURL(iswc), { headers });
  const response = await initialResponse.json;
  if (response.status === 404) {
    throw new Error(response.statusText);
  }
  if (response.status !== 200) {
    return Promise.reject("Could not fetch metadata");
  }
  return await response.json();
}

function assembleQueryURL(iswc) {
  console.log("In AssembleQueryURL function. ISWC is: ", iswc);
  return `${url}${iswc}`;
}
