import '../App.css';

import Drapery from './Drapery';
import Roman from './Roman';
import Valance from './Valence';
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
  const [existingTreatment, setExistingTreatment] = useState(false);
  const [drapery, setDrapery] = useState(false);
  const [roman, setRoman] = useState(false);
  const [valence, setValence] = useState(false);
  const [hard, setHard] = useState(false);
  const [pillows, setPillow] = useState(false);
  const [cushions, setCushion] = useState(false);

  const [uploads, setUploads] = useState(0);

  const handleNameChange = (event) => {setName(event.target.value);};
  const handleEstNameChange = (event) => {setEstName(event.target.value);};
  const handlePName = (event) => {setPName(event.target.value);};
  const handleAddress= (event) => {setAddress(event.target.value);};
  const handleContactChange = (event) => {setContact(event.target.value);};
  const handleRoom = (event) => {setRoom(event.target.value);};
  const handleWindows = (event) => {setWindows(event.target.value);};
  const handleExistingChange = (event) => {setExistingTreatment(event.target.value);};
  const handleDraperyChange = (event) => {
    if(name !== '' && contact !== '' && pname !== '' && address !== '' && windows !== '' && room !== ''){
      setDrapery(event.target.checked);
    }else{
      alert('Please fill out all fields about your project');
    }
  };
  const handleRomanChange = (event) => {
    if(name !== '' && contact !== '' && pname !== '' && address !== '' && windows !== '' && room !== ''){
      setRoman(event.target.checked);
    }else{
      alert('Please fill out all fields about your project');
    }
  };
  const handleValenceChange = (event) => {
    if(name !== '' && contact !== '' && pname !== '' && address !== '' && windows !== '' && room !== ''){
      setValence(event.target.checked);
    }else{
      alert('Please fill out all fields about your project');
    }
  };
  const handleHardChange = (event) => {
    if(name !== '' && contact !== '' && pname !== '' && address !== '' && windows !== '' && room !== ''){
      setHard(event.target.checked);
    }else{
      alert('Please fill out all fields about your project');
    }
  };
  const handlePillow = (event) => {
    if(name !== '' && contact !== '' && pname !== '' && address !== ''){
      setPillow(event.target.checked);
    }else{
      alert('Please fill out all fields about your project');
    }
  };
  const handleCushion = (event) => {
    if(name !== '' && contact !== '' && pname !== '' && address !== ''){
      setCushion(event.target.checked);
    }else{
      alert('Please fill out all fields about your project');
    }
  };

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

  return(<>
    <div style={{padding:'5px'}}> <div style={{border: 'grey solid 1px', padding:'5px'}}>
      <h1>Window Treatments</h1>

      <h3 style={{padding: '10px'}}>
        Pricing is based on the information provided.  Plaza Park Interiors must take accurate on-site 
        field measurements before manufacturing window treatments.  Prices are subject to change accordingly. 
      </h3>
      <h3 style={{padding: '10px'}}>
        Please note typical soft window treatments timelines are 4-6 weeks from receipt of fabric,
        hardware and deposit <br></br>(if completion is needed sooner a rush fee may apply). 
      </h3>

      <div style={{marginLeft: '20px', paddingBottom: '20px'}}>
        <div className="row">
          <div className='column'>
            <label>Project Name: </label><br></br>
            <input type='text' id='pname' style={{width: '200px'}} onChange={handlePName}></input>
          </div>
          <div className='column'>
            <label>Estimator Name: </label><br></br>
            <input type='text' id='estname' style={{width: '200px'}} onChange={handleEstNameChange}></input>
          </div>
          <div className='column'>
            <label>Customer Name: </label><br></br>
            <input type='text' id='name' style={{width: '200px'}} onChange={handleNameChange}></input>
          </div>
          <div className='column'>
            <label>Address: </label><br></br>
            <input type='text' id='address' style={{width: '200px'}} onChange={handleAddress}></input>
          </div>
          <div className='column'>
            <label>Email: </label><br></br>
            <input type='email' id='contact' style={{width: '200px'}} onChange={handleContactChange}></input>
          </div>
          <br></br><br></br><br></br>
          <div className='column'>
            <label>Room: </label><br></br>
            <input type='text' id='room' style={{width: '200px'}} onChange={handleRoom} value={room}></input>
          </div>
          <div className='column'>
            <label>Number of windows: </label><br></br>
            <input type='number' id='windowNum' style={{width: '200px'}} onChange={handleWindows} value={windows}></input>
          </div>
          <div className='column'></div>
        </div>
        <br></br>

          {/* Are there existing window treatments Plaza Park needs to take down / dispose of?
          <br></br><label> 
            <input type='radio' name='existingTreatment' style={{marginRight:'5px'}}
            value={true} onChange={handleExistingChange}></input>
            Yes
          </label> <br></br>
          <label>
            <input type='radio' name='existingTreatment' style={{marginRight:'5px'}}
            value={false} onChange={handleExistingChange}></input>
            No
          </label><br></br><br></br> */}

          What type of treatment are you interested in:
          <br></br>
          <div>
            Window treatments:
            <br></br>
            <label>
              <input type='checkbox' style={{marginRight:'5px'}}
              checked={drapery} onChange={handleDraperyChange}></input>
              Drapery
            </label>
            <br></br>
            <label>
              <input type='checkbox' style={{marginRight:'5px'}}
              checked={roman} onChange={handleRomanChange}></input>
              Roman shades
            </label><br></br>
            <label>
              <input type='checkbox' style={{marginRight:'5px'}}
              checked={valence} onChange={handleValenceChange}></input>
              Valance / cornice
            </label><br></br>
            {/* <label>
              <input type='checkbox' style={{marginRight:'5px'}}
              checked={hard} onChange={handleHardChange}></input>
              Hard treatments (roller shades, woven woods, wood blinds, honeycomb shade, sheer shade)
            </label> */}
          </div><br></br>

          <div>
            Pillows/cushions:
            <br></br>
            <label>
              <input type='checkbox' style={{marginRight:'5px'}}
              checked={pillows} onChange={handlePillow}></input>
              Pillows
            </label><br></br>
            <label>
              <input type='checkbox' style={{marginRight:'5px'}}
              checked={cushions} onChange={handleCushion}></input>
              Cushions
            </label>
          </div>
      </div>
    </div></div>

    <button onClick={testFolder}>button</button>

      {drapery && <div style={{padding:'5px'}}><Drapery 
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
      name={name} pname={pname} address={address} email={contact} estName={estName}></Cushions></div>}
  </>)
}

export default Window;