import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import Drapery from './Drapery';
import Roman from './Roman';
import Valance from './Valence';
import HardTreatments from './HardTreatments';
import React, { useState } from 'react';

const Window = () => {
  const [existingTreatment, setExistingTreatment] = useState(false);
  const [drapery, setDrapery] = useState(false);
  const [roman, setRoman] = useState(false);
  const [valence, setValence] = useState(false);
  const [hard, setHard] = useState(false);

  const handleExistingChange = (event) => {
    setExistingTreatment(event.target.value);
  };

  const handleDraperyChange = (event) => {
    setDrapery(event.target.checked);
  };

  const handleRomanChange = (event) => {
    setRoman(event.target.checked);
  };

  const handleValenceChange = (event) => {
    setValence(event.target.checked);
  };

  const handleHardChange = (event) => {
    setHard(event.target.checked);
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
        <form name="windowTreatment">
          <label>Room: </label><br></br>
          <input type='text' id='room' style={{width: '200px'}}></input><br></br><br></br>
          <label>Number of windows: </label><br></br>
          <input type='number' id='windowNum' style={{width: '200px'}}></input> <br></br><br></br>

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
        </form> 
        

        {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton> */}
      </div>
    </div></div>

      {drapery && <div style={{padding:'5px'}}><Drapery></Drapery></div>}
      {roman && <div style={{padding:'5px'}}><Roman></Roman></div>}
      {valence && <div style={{padding:'5px'}}><Valance></Valance></div>}
      {hard && <div style={{padding:'5px'}}><HardTreatments></HardTreatments></div>}
  </>)
}

export default Window;