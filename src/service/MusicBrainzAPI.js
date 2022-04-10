const url = "https://beta.musicbrainz.org/ws/2/work/?query=iswc:";

export async function fetchMetaData(iswc) {
  const headers = {
    Accept: "application/json",
  };
  const response = await fetch(assembleQueryURL(iswc), { headers });
  if (response.status === 404) {
    throw new Error(response.statusText);
  }
  if (response.status !== 200) {
    return Promise.reject("Could not fetch metadata");
  }
  return response;
}

function assembleQueryURL(iswc) {
  console.log("In AssembleQueryURL function. ISWC is: ", iswc);
  return `${url}${iswc}`;
}
