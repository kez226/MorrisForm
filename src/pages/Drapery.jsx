import React, { useState } from 'react';

const Drapery = () => {
    const[windowImg, setWindowImg] = useState(null);
    const[stationary, setStationary] = useState(false);
    const[lined, setLined] = useState('');
    const[pleat, setPleat] = useState('');

    const handleImageUpload = (event) => {
        setWindowImg(event.target.files[0]);
    }

    const handleStationaryChange = (event) => {
        setStationary(event.target.value);
    }

    const handleLinedChange = (event) => {
        setLined(event.target.value);
    }

    const handlePleatChange = (event) => {
        setPleat(event.target.value);
    }

    return(<>
        <div style={{border: 'grey solid 1px', padding:'5px'}}>
            <h1>Drapery</h1>
            <label>
                Please load a photo of the window:
                <input type='file' onChange={handleImageUpload} style={{marginLeft:'15px'}}></input>
            </label><br></br><br></br>

            What are the approximate dimensions of the following?
            <br></br><label>
                Frame to frame width: 
                <input type='text' style={{marginLeft:'75px'}}></input>
            </label><br></br>
            <label>
                Frame-to-frame height (to sill):
                <input type='text' style={{marginLeft:'10px'}}></input><br></br>
            </label><br></br>
            <label>
                Above frame to ceiling:
                <input type='text' style={{marginLeft:'68px'}}></input>
            </label><br></br>
            <label>
                Below sill to floor:
                <input type='text' style={{marginLeft:'107px'}}></input>
            </label><br></br><br></br>

            How far above frame will hardware be mounted (if known)?
            <br></br><input type='text'></input><br></br><br></br>

            Will the panels be stationary?
            <br></br><label> 
                <input type='radio' name='stationary' style={{marginRight:'5px'}}
                value={true} onChange={handleStationaryChange}></input>
                Yes
            </label> <br></br>
            <label>
                <input type='radio' name='stationary' style={{marginRight:'5px'}}
                value={false} onChange={handleStationaryChange}></input>
                No (if no, they will be fully functioning)
            </label><br></br><br></br>

            Will the panels be lined?
            <br></br>
            <label>
                <input type='radio' name='lined' style={{marginRight:'5px'}}
                value={''} onChange={handleLinedChange}></input>
                No
            </label><br></br>
            <label> 
                <input type='radio' name='lined' style={{marginRight:'5px'}}
                value={'yes'} onChange={handleLinedChange}></input>
                Yes
            </label><br></br>
            {(lined !== '') && <div>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px', marginLeft:'25px'}}
                    value={'sheer'} onChange={handleLinedChange}></input>
                    Sheer lining
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px', marginLeft:'25px'}}
                    value={'lightFilter'} onChange={handleLinedChange}></input>
                    Light filtering lining
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px', marginLeft:'25px'}}
                    value={'blackout'} onChange={handleLinedChange}></input>
                    Blackout lining
                </label><br></br>
            </div>}
            <br></br>

            What style pleat would you like (please see images below):
            <br></br><label>
                <input type='radio' name='pleat' style={{marginRight:'5px'}}
                value={'2top'} onChange={handlePleatChange}></input>
                2 finger top tack
            </label><br></br>
            <label> 
                <input type='radio' name='pleat' style={{marginRight:'5px'}}
                value={'2bot'} onChange={handlePleatChange}></input>
                2 finger botton tack
            </label><br></br>
            <label>
                <input type='radio' name='pleat' style={{marginRight:'5px'}}
                value={'3top'} onChange={handlePleatChange}></input>
                3 finger top tack
            </label><br></br>
            <label> 
                <input type='radio' name='pleat' style={{marginRight:'5px'}}
                value={'3bot'} onChange={handlePleatChange}></input>
                3 finger bottom tack
            </label><br></br>
            <label>
                <input type='radio' name='pleat' style={{marginRight:'5px'}}
                value={'ripple'} onChange={handlePleatChange}></input>
                Ripplefold
            </label><br></br>
            <label> 
                <input type='radio' name='pleat' style={{marginRight:'5px'}}
                value={document.getElementById('pleat_other')} onChange={handlePleatChange}></input>
                Other (Grommet, Rod-pocket, Cartridge, Tab-top … ):
                <input type='text' id='pleat_other' placeholder='Other' onChange={handlePleatChange}></input>
            </label><br></br>

            <h1>{pleat}</h1>

        </div>
    </>)
}

export default Drapery;