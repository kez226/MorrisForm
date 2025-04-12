import '../App.css';

import Drapery from './Drapery';
import Roman from './Roman';
import Valance from './Valence';
import HardTreatments from './HardTreatments';
import React, { useState } from 'react';

const Window = () => {
  const [pname,setPName] = useState('');
  const [address,setAddress] = useState('');
  const [name,setName] = useState('');
  const [contact,setContact] = useState('');
  const [existingTreatment, setExistingTreatment] = useState(false);
  const [drapery, setDrapery] = useState(false);
  const [roman, setRoman] = useState(false);
  const [valence, setValence] = useState(false);
  const [hard, setHard] = useState(false);

  const handleNameChange = (event) => {setName(event.target.value);};
  const handlePName = (event) => {setPName(event.target.value);};
  const handleAddress= (event) => {setAddress(event.target.value);};
  const handleContactChange = (event) => {setContact(event.target.value);};
  const handleExistingChange = (event) => {setExistingTreatment(event.target.value);};
  const handleDraperyChange = (event) => {
    if(name !== '' && contact !== '' && pname !== '' && address !== ''){
      setDrapery(event.target.checked);
    }else{
      alert('Please enter your name and email');
    }
  };
  const handleRomanChange = (event) => {
    if(name !== '' && contact !== '' && pname !== '' && address !== ''){
      setRoman(event.target.checked);
    }else{
      alert('Please enter your name and email');
    }
  };
  const handleValenceChange = (event) => {
    if(name !== '' && contact !== '' && pname !== '' && address !== ''){
      setValence(event.target.checked);
    }else{
      alert('Please enter your name and email');
    }
  };
  const handleHardChange = (event) => {
    if(name !== '' && contact !== '' && pname !== '' && address !== ''){
      setHard(event.target.checked);
    }else{
      alert('Please enter your name and email');
    }
  };

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
            <label>Name: </label><br></br>
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
            <input type='text' id='room' style={{width: '200px'}}></input>
          </div>
          <div className='column'>
            <label>Number of windows: </label><br></br>
            <input type='number' id='windowNum' style={{width: '200px'}}></input>
          </div>
          <div className='column'></div>
          <div className='column'></div>
        </div>
        <br></br>

          Are there existing window treatments Plaza Park needs to take down / dispose of?
          <br></br><label> 
            <input type='radio' name='existingTreatment' style={{marginRight:'5px'}}
            value={true} onChange={handleExistingChange}></input>
            Yes
          </label> <br></br>
          <label>
            <input type='radio' name='existingTreatment' style={{marginRight:'5px'}}
            value={false} onChange={handleExistingChange}></input>
            No
          </label><br></br><br></br>

          What type of treatment are you interested in:
          <br></br><label>
            <input type='checkbox' style={{marginRight:'5px'}}
            checked={drapery} onChange={handleDraperyChange}></input>
            Drapery
          </label><br></br>
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
          <label>
            <input type='checkbox' style={{marginRight:'5px'}}
            checked={hard} onChange={handleHardChange}></input>
            Hard treatments (roller shades, woven woods, wood blinds, honeycomb shade, sheer shade)
          </label>
      </div>
    </div></div>

      {drapery && <div style={{padding:'5px'}}><Drapery 
      name={name} pname={pname} address={address} email={contact}
      room={document.getElementById('room').value}
      numWindow={document.getElementById('windowNum').value}
      ></Drapery></div>}
      {roman && <div style={{padding:'5px'}}><Roman></Roman></div>}
      {valence && <div style={{padding:'5px'}}><Valance></Valance></div>}
      {hard && <div style={{padding:'5px'}}><HardTreatments></HardTreatments></div>}
  </>)
}

export default Window;