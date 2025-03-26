import React, { useState } from 'react';

const HardTreatments = () => {
    const[windowImg, setWindowImg] = useState(null);
    const[mount, setMount] = useState('');
    const[opFunction, setOpFunction] = useState('');
    const[motorType, setMotorType] = useState('');
    const[homeAuto, setHomeAuto] = useState('');
    const[treatment,setTreatment] = useState('');
    const[fabric,setFabric] = useState('');

    const[units1, setUnits1] = useState('in');

    const [f2fw, f2fwc] = useState('');
    const [f2fh, f2fhc] = useState('');
    const [abvc, abvcc] = useState('');
    const [abvf, abvfc] = useState('');
    const handlef2fw = (e) => {f2fwc(e.target.value);};
    const handlef2fh = (e) => {f2fhc(e.target.value);};
    const handleabvc = (e) => {abvcc(e.target.value);};
    const handleabvf = (e) => {abvfc(e.target.value);};

    const handleImageUpload = (event) => {setWindowImg(event.target.files[0]);}
    const handleMount = (event) => {setMount(event.target.value);}
    const handleOpFunction = (event) => {setOpFunction(event.target.value);}
    const handleMotorChange = (event) => {setMotorType(event.target.value);}
    const handleHomeAuto = (event) => {setHomeAuto(event.target.value);}
    const handleTreatment = (event) => {setTreatment(event.target.value);}
    const handleFabric = (event) => {setFabric(event.target.value);}

    const handleUnits1 = (event) => {setUnits1(event.target.value);}

    const fractions = [
        { label: '0', value: 0},
        { label: '1/8', value: '.125' },
        { label: '2/8', value: '.25' },
        { label: '3/8', value: '.375' },
        { label: '4/8', value: '.5' },
        { label: '5/8', value: '.625' },
        { label: '6/8', value: '.75' },
        { label: '7/8', value: '.875' }
    ];

    const submitForm = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('Sheet', 'Hard');
        //formData.append('Img', windowImg);
        let date = new Date(Date.now());
        formData.append('Date', date.toLocaleString());
        formData.append('Treatment', treatment);
        formData.append('Fabric', fabric);
        formData.append('Units1', units1);
        formData.append('Location', mount);

        if (mount === 'inside'){
            if (units1 !== 'in'){
                formData.append('F2fw', document.getElementById('f2fw').value);
                formData.append('F2fh', document.getElementById('f2fh').value);
            }
            else{
                formData.append('F2fw', document.getElementById('f2fw').value + f2fw);
                formData.append('F2fh', document.getElementById('f2fh').value + f2fh);
            }
        }
        else{
            if (units1 !== 'in'){
                formData.append('F2fw', document.getElementById('of2fw').value);
                formData.append('F2fh', document.getElementById('of2fh').value);
                formData.append('Abvc', document.getElementById('abvc').value);
                formData.append('Abvf', document.getElementById('abvf').value);
            }
            else{
                formData.append('F2fw', document.getElementById('of2fw').value + f2fw);
                formData.append('F2fh', document.getElementById('of2fh').value + f2fh);
                formData.append('Abvc', document.getElementById('abvc').value + abvc);
                formData.append('Abvf', document.getElementById('abvf').value + abvf);
            }
        }

        if(opFunction === 'lift'){formData.append('OpFunc', opFunction + ', ' + document.getElementById('lift-color').value + ' beads');}
        else if (opFunction === 'motorized'){
            if(motorType === 'hardwired'){
                if(homeAuto === 'no') {formData.append('OpFunc', opFunction + ', ' + motorType + ', no existing home auto');}
                formData.append('OpFunc', opFunction + ', ' + motorType + ', existing home auto: ' + document.getElementById('homeauto').value);
            }
            else{formData.append('OpFunc', opFunction + ' ' + motorType);}
        }
        else{formData.append('OpFunc', opFunction);}

        // formData.forEach((value, key) => {
        //     console.log(key, value); // Logs each key-value pair
        //   });

        fetch("https://script.google.com/macros/s/AKfycby5yAFqA-cl6Q7YTWA-XLZSYWPyAt-ji-2G7kbx4U7EZ9iic4SP-eZeHEA0K0FP95iMrw/exec", {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            alert(data.msg);
        })
        .catch(err => console.log(err));
    }

    const Dropdown =({ value, change}) => { 
        return( 
            <>
                <select value={value} onChange={(e) => change(e)} style={{width: '50px'}}>
                    {fractions.map((fraction) => (
                    <option key={fraction.value} value={fraction.value}
                    >
                        {fraction.label}
                    </option>
                    ))}
                </select>
            </> 
        )}

    return(
        <div style={{border: 'grey solid 1px', padding:'5px'}}>
            <h1>Hard Treatments</h1>
            <div>
                Please select one of the following
                <br></br><label> 
                    <input type='radio' name='treatment' style={{marginRight:'5px'}}
                    value={'Roller shades'} onChange={handleTreatment}></input>
                    Roller shades
                </label> <br></br>
                <label> 
                    <input type='radio' name='treatment' style={{marginRight:'5px'}}
                    value={'Woven woods'} onChange={handleTreatment}></input>
                    Woven woods
                </label> <br></br>
                <label> 
                    <input type='radio' name='treatment' style={{marginRight:'5px'}}
                    value={'Wood blinds'} onChange={handleTreatment}></input>
                    Wood blinds
                </label> <br></br>
                <label> 
                    <input type='radio' name='treatment' style={{marginRight:'5px'}}
                    value={'Honeycomb shades'} onChange={handleTreatment}></input>
                    Honeycomb shades
                </label> <br></br>
                <label> 
                    <input type='radio' name='treatment' style={{marginRight:'5px'}}
                    value={'Sheer shade'} onChange={handleTreatment}></input>
                    Sheer shade
                </label> <br></br><br></br>
            </div>

            <label>
                Please load a photo of the window:
                <input type='file' onChange={handleImageUpload} style={{marginLeft:'15px'}}></input>
            </label><br></br><br></br>

            <div>
                Is there a specific vendor / fabric already selected?
                <br></br><label> 
                    <input type='radio' name='fabric' style={{marginRight:'5px'}}
                        value={'no'} onChange={handleFabric}></input>
                        No (You will need to make an appointment to look at options at Plaza Park.)
                </label> <br></br>
                <label>
                    <input type='radio' name='fabric' style={{marginRight:'5px'}}
                    value={'yes'} onChange={handleFabric}></input>
                    Yes
                        <input id='style-details' placeholder='Please indicate details' style={{marginLeft: '5px'}}></input>
                </label><br></br><br></br>
            </div>

            What units are the measurements in?
            <label>
                <input style={{marginLeft:'25px'}} value='cm' type='radio' name='units1' onChange={handleUnits1}></input> Centimeters
                <input value='in' type='radio' name='units1' onChange={handleUnits1}
                    style={{marginLeft:'25px'}} checked={units1 === 'in'}></input> Inches
            </label><br></br>
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
                        <input id='f2fw' style={{marginLeft:'78px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {f2fw}
                            change = {handlef2fw}
                        ></Dropdown>
                    </>}<br></br>
                    <label >
                        Frame-to-frame height (to sill): 
                        <input id='f2fh' style={{marginLeft:'19px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {f2fh}
                            change = {handlef2fh}
                        ></Dropdown>
                    </>}<br></br><br></br>
                </div>}

                {mount === 'outside' && <div>
                    What are the approx. following dimensions for outside mounts: 
                    <br></br><label>
                        Frame-to-frame width:
                        <input id='of2fw' style={{marginLeft:'291px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {f2fw}
                            change = {handlef2fw}
                        ></Dropdown>
                    </>}<br></br>
                    <label >
                        Frame-to-frame height (to sill): 
                        <input id='of2fh' style={{marginLeft:'232px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {f2fh}
                            change = {handlef2fh}
                        ></Dropdown>
                    </>}<br></br>
                    <label >
                        Above frame to ceiling:
                        <input id='abvc' style={{marginLeft:'289px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {abvc}
                            change = {handleabvc}
                        ></Dropdown>
                    </>}<br></br>
                    <label >
                        How far above frame will unit be mounted for outside mounts:
                        <input id='abvf' style={{marginLeft:'10px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {abvf}
                            change = {handleabvf}
                        ></Dropdown>
                    </>}
                    <br></br><br></br>
                </div>}
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
                    <label style={{marginLeft:'25px'}}>
                        What color bead chain would you like?
                        <input id='lift-color'></input>
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
                    {motorType === 'hardwired' && <div style={{marginLeft:'50px'}}>
                        Is there an existing home-automation system?
                        <br></br><label> 
                            <input type='radio' name='homeAuto' style={{marginRight:'5px'}}
                            value={'no'} onChange={handleHomeAuto}></input>
                            No
                        </label> <br></br>
                        <label>
                            <input type='radio' name='homeAuto' style={{marginRight:'5px'}}
                            value={'yes'} onChange={handleHomeAuto}></input>
                            Yes (what is it)?
                                <input id='homeauto'></input>
                        </label><br></br>
                    </div>}
                </div>}
                <br></br>
            </div>

            <button onClick={submitForm}>Submit</button>
        </div>
    )
}

export default HardTreatments;