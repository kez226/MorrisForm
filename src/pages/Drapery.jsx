import React, { useEffect, useState } from 'react';

const Drapery = () => {
    const[windowImg, setWindowImg] = useState(null);
    const[stationary, setStationary] = useState(false);
    const[lined, setLined] = useState('');
    const[pleat, setPleat] = useState('');
    const[ripplePercent, setRipplePercent] = useState('');
    let pleatOther; //document.getElementById('pleat_other')
    const[hardware, setHardware] = useState('');
    const[hardwareType, setHardwareType] = useState('');
    const[hardwareDecorativeType, setHardwareDecorativeType] = useState('');
    let ringType = '';
    const[hardwired, setHardwired] = useState('');
    const[homeAuto, setHomeAuto] = useState('');
    const[com, setCom] = useState('');
    const[railroad, setRailroad] = useState('');

    const handleImageUpload = (event) => {
        setWindowImg(event.target.files[0]);
    }

    const handleRipple = (event) => {
        setRipplePercent(event.target.value);
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

    const handleHardwareChange = (event) => {
        setHardware(event.target.value);
    }

    const handleHardwareTypeChange = (event) => {
        setHardwareType(event.target.value);
    }

    const handleHardwareDecorativeTypeChange = (event) => {
        setHardwareDecorativeType(event.target.value);
    }

    const handleHardwiredChange = (event) => {
        setHardwired(event.target.value);
    }

    const handleHomeAuto = (event) => {
        setHomeAuto(event.target.value);
    }

    const handleCom = (event) => {
        setCom(event.target.value);
    }

    const handleRailroad = (event) => {
        setRailroad(event.target.value);
    }

    useEffect(() => {
        if (pleat !=='ripple'){
            setRipplePercent('');
        }
    },[pleat])

    //still need to implement some form handling with the box input values


    return(<>
        <div style={{border: 'grey solid 1px', padding:'5px'}}>
            <h1>Drapery</h1>
            <label>
                Please load a photo of the window:
                <input type='file' onChange={handleImageUpload} style={{marginLeft:'15px'}}></input>
            </label><br></br><br></br>

            What are the approximate dimensions of the following?
            <div>
                <label>
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
            </div>

            How far above frame will hardware be mounted (if known)?
            <br></br><input type='text'></input><br></br><br></br>

            Will the panels be stationary?
            <div>
                <label> 
                    <input type='radio' name='stationary' style={{marginRight:'5px'}}
                    value={true} onChange={handleStationaryChange}></input>
                    Yes
                </label> <br></br>
                <label>
                    <input type='radio' name='stationary' style={{marginRight:'5px'}}
                    value={false} onChange={handleStationaryChange}></input>
                    No (if no, they will be fully functioning)
                </label><br></br><br></br>
            </div>

            Will the panels be lined?
            <div>
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
            </div>

            What style pleat would you like (please see images below):
            <div>
                <label>
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
                {(pleat === 'ripple') && <div>
                    <label> 
                        <input type='radio' name='ripple%' id='ripple%' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'60%'} onChange={handleRipple}></input>
                        60%
                    </label><br></br>
                    <label> 
                        <input type='radio' name='ripple%' id='ripple%' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'80%'} onChange={handleRipple}></input>
                        80%
                    </label><br></br>
                    <label> 
                        <input type='radio' name='ripple%' id='ripple%' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'100%'} onChange={handleRipple}></input>
                        100%
                    </label><br></br>
                    <label> 
                        <input type='radio' name='ripple%' id='ripple%' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'120%'} onChange={handleRipple}></input>
                        120%
                    </label><br></br>
                </div>}
                <label> 
                    <input type='radio' name='pleat' style={{marginRight:'5px'}}
                    value={'other'} onChange={handlePleatChange}></input>
                    Other (Grommet, Rod-pocket, Cartridge, Tab-top … ):
                    <input type='text' id='pleat_other' placeholder='Other'></input>
                </label><br></br><br></br>
            </div>

            Do you need hardware?
            <div>
                <label> 
                    <input type='radio' name='hardware' style={{marginRight:'5px'}}
                    value={'false'} onChange={handleHardwareChange}></input>
                    No
                </label> <br></br>
                <label>
                    <input type='radio' name='hardware' style={{marginRight:'5px'}}
                    value={'true'} onChange={handleHardwareChange}></input>
                    Yes
                </label><br></br>
                {hardware === 'true' && <div>
                    <label> 
                        <input type='radio' name='hardwareType' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'non-decorative'} onChange={handleHardwareTypeChange}></input>
                        Non-decorative
                    </label> <br></br>
                    <label>
                        <input type='radio' name='hardwareType' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'decorative'} onChange={handleHardwareTypeChange}></input>
                        Decorative (pick one):
                    </label><br></br>
                    {hardwareType === 'decorative' && <div>
                        <label> 
                            <input type='radio' name='hardwareDecorativeType' style={{marginRight:'5px', marginLeft:'50px'}}
                            value={'track'} onChange={handleHardwareDecorativeTypeChange}></input>
                            Track / mechanical
                        </label> <br></br>
                        <label>
                            <input type='radio' name='hardwareDecorativeType' style={{marginRight:'5px', marginLeft:'50px'}}
                            value={'rings'} onChange={handleHardwareDecorativeTypeChange}></input>
                            Pole with rings
                        </label><br></br>
                        {hardwareDecorativeType === 'rings' && <div>
                            <label style={{marginRight:'5px', marginLeft:'50px'}}>
                                Please provide details:  (wood, metal, diameter, color, finial ….): 
                                <input></input>
                            </label>
                        </div>}
                        <label>
                            <input type='radio' name='hardwareDecorativeType' style={{marginRight:'5px', marginLeft:'50px'}}
                            value={'motorized'} onChange={handleHardwareDecorativeTypeChange}></input>
                            Motorized hardware?
                        </label><br></br>
                        {hardwareDecorativeType === 'motorized' && <div style={{marginRight:'5px', marginLeft:'50px'}}>
                            Will it be hardwired?
                            <br></br><label>
                                <input type='radio' name='hardwired' style={{marginRight:'5px', marginLeft:'25px'}}
                                value={'false'} onChange={handleHardwiredChange}></input>
                                No
                            </label><br></br>
                            <label>
                                <input type='radio' name='hardwired' style={{marginRight:'5px', marginLeft:'25px'}}
                                value={'true'} onChange={handleHardwiredChange}></input>
                                Yes
                            </label><br></br>
                            {hardwired === 'true' && <div style={{marginRight:'5px', marginLeft:'25px'}}>
                                Is there an existing home-automation system?
                                <br></br><label>
                                    <input type='radio' name='homeAuto' style={{marginRight:'5px', marginLeft:'25px'}}
                                    value={false} onChange={handleHomeAuto}></input>
                                    No
                                </label><br></br>
                                <label>
                                    <input type='radio' name='homeAuto' style={{marginRight:'5px', marginLeft:'25px'}}
                                    value={true} onChange={handleHomeAuto}></input>
                                    Yes (what is it)? 
                                    <input></input>
                                </label><br></br>
                            </div>}
                        </div>}
                    </div>}
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
                <br></br><label>
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
                <br></br><label>
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
    </>)
}

export default Drapery;