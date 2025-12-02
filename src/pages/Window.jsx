import '../App.css';
import '../styles.css'

import Drapery from './Drapery';
import Roman from './Roman';
import Valance from './Valance';
import HardTreatments from './HardTreatments';
import Pillows from './Pillows';
import Cushions from './Cushions';
import React, { useEffect, useState } from 'react';

const Window = () => {
  const [pname,setPName] = useState('');
  const [address,setAddress] = useState('');
  const [name,setName] = useState('');
  const [estName,setEstName] = useState('');
  const [contact,setContact] = useState('');
  const [room,setRoom] = useState('');
  const [windows,setWindows] = useState('');
  // const [existingTreatment, setExistingTreatment] = useState(false);
  // const [drapery, setDrapery] = useState(false);
  // const [roman, setRoman] = useState(false);
  // const [valence, setValence] = useState(false);
  // const [hard, setHard] = useState(false);
  // const [pillows, setPillow] = useState(false);
  // const [cushions, setCushion] = useState(false);

  const [formSection, setFormSection] = useState(0);
  const handleFormSection = (str) => {
    if (treatmentType === '') {
      alert('Please select a treatment type before proceeding.');
      return;
    }
    if(str === 'next'){setFormSection(formSection + 1);} 
    else {
      setFormSection(formSection - 1);
      setTreatmentType('');
    }};
  const [treatmentType, setTreatmentType] = useState('');
  const handleTreatmentType = (event) => {setTreatmentType(event.target.value);};

  const [uploads, setUploads] = useState(0);

  const handleNameChange = (event) => {setName(event.target.value);};
  const handleEstNameChange = (event) => {setEstName(event.target.value);};
  const handlePName = (event) => {setPName(event.target.value);};
  const handleAddress= (event) => {setAddress(event.target.value);};
  const handleContactChange = (event) => {setContact(event.target.value);};
  const handleRoom = (event) => {setRoom(event.target.value);};
  const handleWindows = (event) => {setWindows(event.target.value);};
  // const handleExistingChange = (event) => {setExistingTreatment(event.target.value);};
  // const handleDraperyChange = (event) => {
  //     setDrapery(event.target.checked);
  //   // if(name !== '' && contact !== '' && pname !== '' && address !== '' && windows !== '' && room !== ''){
  //   //   setDrapery(event.target.checked);
  //   // }else{
  //   //   alert('Please fill out all fields about your project');
  //   // }
  // };
  // const handleRomanChange = (event) => {
  //   // if(name !== '' && contact !== '' && pname !== '' && address !== '' && windows !== '' && room !== ''){
  //   //   setRoman(event.target.checked);
  //   // }else{
  //   //   alert('Please fill out all fields about your project');
  //   // }
  //     setRoman(event.target.checked);

  // };
  // const handleValenceChange = (event) => {
  //   // if(name !== '' && contact !== '' && pname !== '' && address !== '' && windows !== '' && room !== ''){
  //   //   setValence(event.target.checked);
  //   // }else{
  //   //   alert('Please fill out all fields about your project');
  //   // }
  //     setValence(event.target.checked);

  // };
  // const handleHardChange = (event) => {
  //   if(name !== '' && contact !== '' && pname !== '' && address !== '' && windows !== '' && room !== ''){
  //     setHard(event.target.checked);
  //   }else{
  //     alert('Please fill out all fields about your project');
  //   }
  // };
  // const handlePillow = (event) => {
  //   // if(name !== '' && contact !== '' && pname !== '' && address !== ''){
  //   //   setPillow(event.target.checked);
  //   // }else{
  //   //   alert('Please fill out all fields about your project');
  //   // }
  //     setPillow(event.target.checked);

  // };
  // const handleCushion = (event) => {
  //   // if(name !== '' && contact !== '' && pname !== '' && address !== ''){
  //   //   setCushion(event.target.checked);
  //   // }else{
  //   //   alert('Please fill out all fields about your project');
  //   // }
  //     setCushion(event.target.checked);

  // };

  useEffect(() => {
    setWindows('');
    setRoom('');
  },[uploads])

  async function testFolder() {
    const url = "https://script.google.com/macros/s/AKfycbzsVchSaJPQySfT4Qk2hcXMdikph2EVy3PsAzD5p1AM7hJ-oqJodhMwYguy5kQdFlIH6A/exec";
  
    console.log("testing folder creation");
    fetch(url, {
      method: 'POST',
      body: new URLSearchParams({
        FolderName: "Test_Ken_Address"
      })
    }).then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err));
  }

  return(<><div>

      {formSection == 0 && 
        <div className="main-content-wrapper">
          <div className="container">
            <h1>Window Treatments and Pillows</h1>

            <h3 className="info-text">
              Pricing is based on the information provided. Plaza Park Interiors must take accurate on-site
              field measurements before manufacturing window treatments. Prices are subject to change accordingly.
            </h3>
            <h3 className="info-text">
              Please note typical soft window treatments timelines are 4-6 weeks from receipt of fabric,
              hardware and deposit <br></br>(if completion is needed sooner a rush fee may apply).
            </h3>

            <div className="form-group-indent">
              <div className="row">
                <div className='column'>
                  <label>Project Name: </label><br></br>
                  <input type='text' id='pname' className='fixed-width-input full-width-input' onChange={handlePName}></input>
                </div>
                <div className='column'>
                  <label>Estimator Name: </label><br></br>
                  <input type='text' id='estname' className='fixed-width-input full-width-input' onChange={handleEstNameChange}></input>
                </div>
                <div className='column'>
                  <label>Customer Name: </label><br></br>
                  <input type='text' id='name' className='fixed-width-input full-width-input' onChange={handleNameChange}></input>
                </div>
                <div className='column'>
                  <label>Address: </label><br></br>
                  <input type='text' id='address' className='fixed-width-input full-width-input' onChange={handleAddress}></input>
                </div>
                <div className='column'>
                  <label>Email: </label><br></br>
                  <input type='email' id='contact' className='fixed-width-input full-width-input' onChange={handleContactChange}></input>
                </div>
                <br></br><br></br><br></br>
                <div className='column'>
                  <label>Room: </label><br></br>
                  <input type='text' id='room' className='fixed-width-input full-width-input' onChange={handleRoom} value={room}></input>
                </div>
                <div className='column'>
                  <label>Number of windows: </label><br></br>
                  <input type='number' id='windowNum' className='fixed-width-input full-width-input' onChange={handleWindows} value={windows}></input>
                </div>
                <div className='column'></div>
              </div>
              <br></br>

              <br></br>
              <div className="form-section">
                <div className="row">
                  <div className='column'>
                    <h4>Window treatments:</h4>
                    <label className="checkbox-label">
                      <input type='radio' name="treatment-type" value="drapery" onChange={handleTreatmentType}></input>
                      Drapery
                    </label>
                    <label className="checkbox-label">
                      <input type='radio' name="treatment-type" value="roman" onChange={handleTreatmentType}></input>
                      Roman shades
                    </label>
                    <label className="checkbox-label">
                      <input type='radio' name="treatment-type"  value="valence" onChange={handleTreatmentType}></input>
                      Valance / cornice
                    </label>
                  </div>
                  <div className='column'>
                    <h4>Pillows/cushions:</h4>
                    <label className="checkbox-label">
                      <input type='radio' name="treatment-type"  value="pillows" onChange={handleTreatmentType}></input>
                      Pillows
                    </label>
                    <label className="checkbox-label">
                      <input type='radio' name="treatment-type" value="cushions" onChange={handleTreatmentType}></input>
                      Cushions
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button className="next-button" onClick={() => handleFormSection("next")}>Next</button>

          </div>
        </div>
      }

      {formSection > 0 && 
          <div>
            {treatmentType === 'drapery' && <Drapery 
              name={name} pname={pname} address={address} email={contact} estName={estName}
              room={room}
              numWindow={windows}
              uploads={setUploads} formSection={formSection} handleFormSection={setFormSection}
            ></Drapery>}
            {treatmentType === 'roman' && <Roman 
              name={name} pname={pname} address={address} email={contact} estName={estName}
              room={room}
              numWindow={windows}
              uploads={setUploads} formSection={formSection} handleFormSection={setFormSection}
            ></Roman>}
            {treatmentType === 'valence' && <Valance 
              name={name} pname={pname} address={address} email={contact} estName={estName}
              room={room}
              numWindow={windows}
              uploads={setUploads} formSection={formSection} handleFormSection={setFormSection}
            ></Valance>}
            {treatmentType === 'pillows' && <Pillows 
              name={name} pname={pname} address={address} email={contact} estName={estName}
              room={room}
              numWindow={windows}
              uploads={setUploads} formSection={formSection} handleFormSection={setFormSection}
            ></Pillows>}
            {treatmentType === 'cushions' && <Cushions 
              name={name} pname={pname} address={address} email={contact} estName={estName}
              room={room}
              numWindow={windows}
              uploads={setUploads} formSection={formSection} handleFormSection={setFormSection}
            ></Cushions>}
            {/* <button className="next-button" onClick={() => handleFormSection("next")}>Next</button>
            <button className="back-button" onClick={() => handleFormSection("back")}>Back</button> */}
          </div>
        
      }

    </div>

    {/* <button onClick={testFolder}>button</button> */}

      {/* {drapery && <div style={{padding:'5px'}}><Drapery 
      name={name} pname={pname} address={address} email={contact} estName={estName}
      room={document.getElementById('room').value}
      numWindow={document.getElementById('windowNum').value}
      uploads={setUploads}
      ></Drapery></div>}
      
      {roman && <div style={{padding:'5px'}}><Roman
      name={name} pname={pname} address={address} email={contact} estName={estName}
      room={document.getElementById('room').value}
      numWindow={document.getElementById('windowNum').value}
      uploads={setUploads}></Roman></div>}

      {valence && <div style={{padding:'5px'}}><Valance
      name={name} pname={pname} address={address} email={contact} estName={estName}
      room={document.getElementById('room').value}
      numWindow={document.getElementById('windowNum').value}
      uploads={setUploads}
      ></Valance></div>}
      {hard && <div style={{padding:'5px'}}><HardTreatments></HardTreatments></div>}
      {pillows && <div style={{padding:'5px'}}><Pillows
      name={name} pname={pname} address={address} email={contact} estName={estName}></Pillows></div>}
      {cushions && <div style={{padding:'5px'}}><Cushions
      name={name} pname={pname} address={address} email={contact} estName={estName}></Cushions></div>} */}
  </>)
}

export default Window;