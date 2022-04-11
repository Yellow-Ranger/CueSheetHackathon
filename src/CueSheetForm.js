import { Button, Form, Table } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import IswcContext from "./IswcContext";

function CueSheetForm() {
  const { cueSheet, setCueSheet, timeCodeArray } = useContext(IswcContext);
  const [counter, setCounter] = useState();
  const [formData, setFormData] = useState({
    music_title: "Shape of You",
    time_in: "00:59:59",
    time_out: "01:00:00",
    music_duration: "00:00:01",
    iswc: "T-920.464.955-8",
    artists:
      "Tameka “Tiny” Cottle, Kevin “She’kspere” Briggs, Kandi, Steve Mac, Johnny McDaid, Ed Sheeran",
  });
  //   const [formData2, setFormData2] = useState({
  //     music_title2: "",
  //     time_in2: 0,
  //     time_out2: 0,
  //     music_duration2: 0,
  //     iswc2: "",
  //     artists2: "",
  //   });
  //   const [formData3, setFormData3] = useState({
  //     music_title3: "",
  //     time_in3: 0,
  //     time_out3: 0,
  //     music_duration3: 0,
  //     iswc3: "",
  //     artists3: "",
  //   });

  const { music_title, time_in, time_out, music_duration, iswc, artists } =
    formData;
  //   const {
  //     music_title2,
  //     time_in2,
  //     time_out2,
  //     music_duration2,
  //     iswc2,
  //     artists2,
  //   } = formData2;
  //   const {
  //     music_title3,
  //     time_in3,
  //     time_out3,
  //     music_duration3,
  //     iswc3,
  //     artists3,
  //   } = formData3;

  const artistArray = [];

  const handleChange = (e) => {
    const nextFormData = { ...formData };
    let nextValue = e.target.value;
    if (e.target.type === "number") {
      nextValue = parseInt(nextValue, 10);
      if (isNaN(nextValue)) {
        nextValue = e.target.value;
      }
    }
    nextFormData[e.target.name] = nextValue;
    setFormData(nextFormData);
    console.log(e);
  };

  useEffect(() => {
    try {
      if (cueSheet) {
        setCounter(cueSheet.length);
        for (let i = 0; i < cueSheet.length; i++) {
          for (let j = 0; j < cueSheet[i].works[0].relations.length; j++) {
            if (cueSheet[i].works[0].relations[j].type === "writer") {
              artistArray.push(cueSheet[0].works[0].relations[j].artist.name);
            }
          }
        }
        console.log("cueSheet[0].works[0].title: ", cueSheet[0].works[0].title);
        setFormData({
          //music_title: cueSheet[0].works[0].title,
          music_title: "Shape of You",
          time_in: "00:59:59",
          time_out: "01:00:00",
          music_duration: "00:00:01",
          //iswc: cueSheet[0].works[0].iswcs,
          iswc: "T-920.464.955-8",
          //artists: artistArray,
          artists:
            "Tameka “Tiny” Cottle, Kevin “She’kspere” Briggs, Kandi, Steve Mac, Johnny McDaid, Ed Sheeran",
        });
        console.log("CueSheet: ", cueSheet);
        console.log("CueSheet.works: ", cueSheet.works);
      }
    } catch (error) {
      console.log(error, "Big Error");
    }
  }, [cueSheet]);

  //   const updateTable = () => {
  //     setFormData2({
  //       music_title2: cueSheet.works[0].title,
  //       time_in2: timeCodeArray.shift(),
  //       time_out2: timeCodeArray.shift(),
  //       music_duration2: timeCodeArray.shift(),
  //       iswc2: cueSheet.works[0].iswcs,
  //       artists2: artistArray,
  //     });
  //     setFormData3({
  //       music_title3: cueSheet.works[0].title,
  //       time_in3: timeCodeArray.shift(),
  //       time_out3: timeCodeArray.shift(),
  //       music_duration3: timeCodeArray.shift(),
  //       iswc3: cueSheet.works[0].iswcs,
  //       artists3: artistArray,
  //     });
  //   };

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Sending form to Socan!");
  };

  return (
    <div className="cueSheetForm">
      {console.log("CueSheet: ", cueSheet)}
      <h4>Cue Sheet Form</h4>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Music Title:</Form.Label>
          <Form.Control
            type="text"
            id="music_title"
            value={music_title}
            placeholder="-music title-"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Time In:</Form.Label>
          <Form.Control
            type="text"
            id="time_in"
            value={time_in}
            placeholder="-time in-"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Time Out:</Form.Label>
          <Form.Control
            type="text"
            id="time_out"
            value={time_out}
            placeholder="-time out-"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Music Duration:</Form.Label>
          <Form.Control
            type="text"
            id="music_duration"
            value={music_duration}
            placeholder="-music duration-"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ISWC:</Form.Label>
          <Form.Control
            type="text"
            id="iswc"
            value={iswc}
            placeholder="-iswc-"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Music Interested Party:</Form.Label>
          <Form.Control
            type="text"
            id="artists"
            value={artists}
            onChange={handleChange}
            placeholder="-artists-"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="socan-button">
          Click here to submit form
        </Button>
      </Form>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Music Title</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Music Duration</th>
            <th>ISWC</th>
            <th>Artists</th>
          </tr>
        </thead>
        <tbody>
          {cueSheet && (
            <>
              {/* {counter.map((index) => {
                <tr>
                <td>{index}</td>
                <td>{formData.music_title}</td>
                <td>00:59:59</td>
                <td>01:00:00</td>
                <td>00:00:01</td>
                <td>{formData.iswc}</td>
                <td>{formData.artists}</td>
              </tr>
              })} */}
              <tr>
                <td>1</td>
                <td>{formData.music_title}</td>
                <td>00:59:59</td>
                <td>01:00:00</td>
                <td>00:00:01</td>
                <td>{formData.iswc}</td>
                <td>{formData.artists}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jumpman</td>
                <td>01:02:02</td>
                <td>01:02:05</td>
                <td>00:00:03</td>
                <td>T-917.699.970-5</td>
                <td>DrakeFutureMetro Boomin</td>
              </tr>
              <tr>
                <td>3</td>
                <td>OLD TOWN ROAD</td>
                <td>01:00:00</td>
                <td>01:02:04</td>
                <td>00:02:04</td>
                <td>T-929.043.710-4</td>
                <td>
                  ROSS ATTICUS MATTHEW, HILL MONTERO LAMAR, REZNOR TRENT,
                  ROUKEMA KIOWA
                </td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default CueSheetForm;
