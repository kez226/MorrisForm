import React, { useState } from 'react';

const Roman = () => {
    const[railroad, setRailroad] = useState('');
    const[windowImg, setWindowImg] = useState(null);
    const[mount, setMount] = useState('');
    const[stationary,setStationary] = useState('');
    const[opFunction, setOpFunction] = useState('');
    const[motorType, setMotorType] = useState('');
    const[hardwired, setHardwired] = useState('');
    const[homeAuto, setHomeAuto] = useState('');
    const[lined, setLined] = useState('');
    const[lining, setLining] = useState('');
    const[com, setCom] = useState('');

    const handleRailroad = (event) => {
        setRailroad(event.target.value);
    }

    const handleImageUpload = (event) => {
        setWindowImg(event.target.files[0]);
    }

    const handleMount = (event) => {
        setMount(event.target.value);
    }

    const handleStationary = (event) =>{
        setStationary(event.target.value);
    }

    const handleOpFunction = (event) => {
        setOpFunction(event.target.value);
    }

    const handleMotorChange = (event) => {
        setMotorType(event.target.value);
    }

    const handleHardwired = (event) => {
        setHardwired(event.target.value);
    }

    const handleHomeAuto = (event) => {
        setHomeAuto(event.target.value);
    }

    const handleLined = (event) => {
        setLined(event.target.value);
    }

    const handleLining = (event) => {
        setLining(event.target.value);
    }

    const handleCom = (event) => {
        setCom(event.target.value);
    }

    return(
        <div style={{border: 'grey solid 1px', padding:'5px'}}>
            <h1>Roman Shades</h1>
            <label>
                Please load a photo of the window:
                <input type='file' onChange={handleImageUpload} style={{marginLeft:'15px'}}></input>
            </label><br></br><br></br>

            Where are we mounting?
            <div>
                <label> 
                    <input type='radio' name='mount' style={{marginRight:'5px'}}
                    value={'inside'} onChange={handleMount}></input>
                    Inside
                </label> <br></br>
                <label>
                    <input type='radio' name='mount' style={{marginRight:'5px'}}
                    value={'outside'} onChange={handleMount}></input>
                    Outside
                </label><br></br><br></br>
                {mount === 'inside' && <div>
                    What are the approx. following dimensions for inside mounts: 
                    <br></br><label>
                        Frame-to-frame width:
                        <input style={{marginLeft:'78px'}}></input>
                    </label><br></br>
                    <label >
                        Frame-to-frame height (to sill): 
                        <input style={{marginLeft:'19px'}}></input>
                    </label><br></br><br></br>
                </div>}

                {mount === 'outside' && <div>
                    What are the approx. following dimensions for outside mounts: 
                    <br></br><label>
                        Frame-to-frame width:
                        <input style={{marginLeft:'291px'}}></input>
                    </label><br></br>
                    <label >
                        Frame-to-frame height (to sill): 
                        <input style={{marginLeft:'232px'}}></input>
                    </label><br></br>
                    <label >
                        Above frame to ceiling:
                        <input style={{marginLeft:'289px'}}></input>
                    </label><br></br>
                    <label >
                        How far above frame will unit be mounted for outside mounts:
                        <input style={{marginLeft:'10px'}}></input>
                    </label><br></br><br></br>
                </div>}
            </div>

            Will this be a stationary Roman?
            <div>
                <label> 
                    <input type='radio' name='stationary' style={{marginRight:'5px'}}
                    value={'Yes'} onChange={handleStationary}></input>
                    Yes
                </label> <br></br>
                <label>
                    <input type='radio' name='stationary' style={{marginRight:'5px'}}
                    value={'No'} onChange={handleStationary}></input>
                    No
                </label><br></br><br></br>
            </div>

            Please select the operating function (pick 1):
            <div>
            <label> 
                    <input type='radio' name='opFunction' style={{marginRight:'5px'}}
                    value={'cordlock'} onChange={handleOpFunction}></input>
                    Cordlock
                </label> <br></br>
                <label> 
                    <input type='radio' name='opFunction' style={{marginRight:'5px'}}
                    value={'cordless'} onChange={handleOpFunction}></input>
                    Cordless
                </label> <br></br>
                <label> 
                    <input type='radio' name='opFunction' style={{marginRight:'5px'}}
                    value={'lift'} onChange={handleOpFunction}></input>
                    Clutch Lift
                </label> <br></br>
                {opFunction === 'lift' && <div>
                    <label>
                        What color bead chain would you like?
                        <input></input>
                    </label>
                </div>}
                <label> 
                    <input type='radio' name='opFunction' style={{marginRight:'5px'}}
                    value={'motorized'} onChange={handleOpFunction}></input>
                    Motorized (pick 1):
                </label> <br></br>
                {opFunction === 'motorized' && <div>
                    <label> 
                        <input type='radio' name='motorType' style={{marginRight:'5px', marginLeft:"25px"}}
                        value={'battery'} onChange={handleMotorChange}></input>
                        Rechargeable battery
                    </label> <br></br>
                    <label> 
                        <input type='radio' name='motorType' style={{marginRight:'5px', marginLeft:"25px"}}
                        value={'hardwired'} onChange={handleMotorChange}></input>
                        Hardwired
                    </label> <br></br>
                    {motorType === 'hardwired' && <div>
                        <label> 
                            <input type='radio' name='hardwired' style={{marginRight:'5px', marginLeft:"50px"}}
                            value={'no'} onChange={handleHardwired}></input>
                            No
                        </label> <br></br>
                        <label>
                            <input type='radio' name='hardwired' style={{marginRight:'5px', marginLeft:"50px"}}
                            value={'yes'} onChange={handleHardwired}></input>
                            Yes
                        </label>
                        {hardwired === 'yes' && <div style={{marginRight:'5px', marginLeft:"50px"}}>
                            Is there an existing home-automation system?
                            <br></br><label> 
                                <input type='radio' name='homeAuto' style={{marginRight:'5px', marginLeft:"25px"}}
                                value={'no'} onChange={handleHomeAuto}></input>
                                No
                            </label> <br></br>
                            <label>
                                <input type='radio' name='homeAuto' style={{marginRight:'5px', marginLeft:"25px"}}
                                value={'yes'} onChange={handleHomeAuto}></input>
                                Yes (what is it)?
                                    <input></input>
                            </label><br></br><br></br>
                        </div>}
                    </div>}
                </div>}
                <br></br>
            </div>

            Will the Roman be lined?
            <div>
                <label>
                    <input type='radio' name='lined' style={{marginRight:'5px'}}
                    value={'No'} onChange={handleLined}></input>
                    No
                </label><br></br>
                <label> 
                    <input type='radio' name='lined' style={{marginRight:'5px'}}
                    value={'Yes'} onChange={handleLined}></input>
                    Yes
                </label> <br></br>
                {lined === 'Yes' && <div>
                    <label>
                        <input type='radio' name='lining' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'Sheer'} onChange={handleLining}></input>
                        Sheer lining
                    </label><br></br>
                    <label> 
                        <input type='radio' name='lining' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'Light'} onChange={handleLining}></input>
                        Light filtering lining
                    </label> <br></br>
                    <label> 
                        <input type='radio' name='lining' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'Blackout'} onChange={handleLining}></input>
                        Blackout lining
                    </label> <br></br>
                </div>}
                <br></br>
            </div>

            Are you using COM material?
            <div>
                <label> 
                    <input type='radio' name='COM' style={{marginRight:'5px'}}
                    value={true} onChange={handleCom}></input>
                    Yes
                </label> <br></br>
                <label>
                    <input type='radio' name='COM' style={{marginRight:'5px'}}
                    value={false} onChange={handleCom}></input>
                    No (you will purchase your material from Plaza Park Interiors)
                </label><br></br>
            </div><br></br>

            Main Fabric specifications:  Please note all yardage will be based on 54” wide, solid goods if specifications are not provided.
            <div>
                <label>
                    Vendor:
                    <input style={{marginLeft:'135px'}}></input>
                </label>
                <br></br><label>
                    Pattern name & number:
                    <input style={{marginLeft:'15px'}}></input>
                </label>
                <br></br><label>
                    Width:
                    <input style={{marginLeft:'144px'}}></input>
                </label>
                <br></br><label>
                    Vertical repeat:
                    <input style={{marginLeft:'81px'}}></input>
                </label>
                <br></br><label>
                    Horizontal repeat:
                    <input style={{marginLeft:'61px'}}></input>
                </label><br></br>
                Are we railroaded?
                <br></br><label> 
                    <input type='radio' name='railroad' style={{marginRight:'5px'}}
                    value={true} onChange={handleRailroad}></input>
                    Yes
                </label> <br></br>
                <label>
                    <input type='radio' name='railroad' style={{marginRight:'5px'}}
                    value={false} onChange={handleRailroad}></input>
                    No
                </label><br></br>
            </div><br></br>

            Contrast Fabric specifications:
            <div>
                <label>
                    Vendor:
                    <input style={{marginLeft:'135px'}}></input>
                </label>
                <br></br><label>
                    Pattern name & number:
                    <input style={{marginLeft:'15px'}}></input>
                </label>
                <br></br><label>
                    Width:
                    <input style={{marginLeft:'144px'}}></input>
                </label>
                <br></br><label>
                    Vertical repeat:
                    <input style={{marginLeft:'81px'}}></input>
                </label>
                <br></br><label>
                    Horizontal repeat:
                    <input style={{marginLeft:'61px'}}></input>
                </label><br></br>
                Are we railroaded?
                <br></br><label> 
                    <input type='radio' name='railroad' style={{marginRight:'5px'}}
                    value={true} onChange={handleRailroad}></input>
                    Yes
                </label> <br></br>
                <label>
                    <input type='radio' name='railroad' style={{marginRight:'5px'}}
                    value={false} onChange={handleRailroad}></input>
                    No
                </label><br></br>
                Please specify where the contrast fabric will be used:
                <input></input>
            </div><br></br>
        </div>
    )
}

export default Roman;