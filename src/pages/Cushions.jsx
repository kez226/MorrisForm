import React, { useEffect, useState } from 'react';

const Cushions = ({pname, name, address, email}) => {
    const [template, setTemplate] = useState('');
    const[units1, setUnits1] = useState('in');
    const[units2, setUnits2] = useState('in');
    const[units3, setUnits3] = useState('in');
    const [insert, setInsert] = useState('');
    const [edge, setEdge] = useState('');
    const [edgeOther, setEdgeOther] = useState('');
    const [com, setCom] = useState('');

    const handleInsert = (e) => {setInsert(e.target.value);}
    const handleEdge = (e) => {setEdge(e.target.value);}
    const handleEdgeOther = (e) => {setEdgeOther(e.target.value);}
    const handleUnits1 = (e) => {setUnits1(e.target.value);}

    const[mainrailroad, setMainRailroad] = useState('');
    const[contrastrailroad, setContrastRailroad] = useState('');
    const handleMainRailroad = (event) => {setMainRailroad(event.target.value);}
    const handleContrastRailroad = (event) => {setContrastRailroad(event.target.value);}
    const handleCom = (event) => {setCom(event.target.value);}


    const handleUnits2 = (event) => {setUnits2(event.target.value);}

    const [mainWidth, mainWidthChange] = useState('');
    const [mainVertical, mainVerticalChange] = useState('');
    const [mainHorizontal, mainHorizontalChange] = useState('');

    const handleMainWidth = (e) => {mainWidthChange(e.target.value);};
    const handleMainVertical = (e) => {mainVerticalChange(e.target.value);};
    const handleMainHorizontal = (e) => {mainHorizontalChange(e.target.value);};

    //Contrast fabric units
    const handleUnits3 = (event) => {setUnits3(event.target.value);}

    const [contrastWidth, contrastWidthChange] = useState('');
    const [contrastVertical, contrastVerticalChange] = useState('');
    const [contrastHorizontal, contrastHorizontalChange] = useState('');

    const handleContrastWidth = (e) => {contrastWidthChange(e.target.value);};
    const handleContrastVertical = (e) => {contrastVerticalChange(e.target.value);};
    const handleContrastHorizontal = (e) => {contrastHorizontalChange(e.target.value);};

    const fractions = [
        { label: '0', value: 0},
        { label: '1/8', value: '.125' },
        { label: '1/4', value: '.25' },
        { label: '3/8', value: '.375' },
        { label: '1/2', value: '.5' },
        { label: '5/8', value: '.625' },
        { label: '3/4', value: '.75' },
        { label: '7/8', value: '.875' }
    ];

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

    useEffect(() => {
        if(edge === 'Knife'){
            setEdgeOther('');
        }
    },[edge])

    const submitForm = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('Sheet', 'Cushions');
        let date = new Date(Date.now());
        formData.append('Date', date.toLocaleString());
        formData.append('PName', pname);
        formData.append('Name', name);
        formData.append('Address', address);
        formData.append('Email', email);

        formData.append('Template', template);
        formData.append('Units1', units1);
        formData.append('Width', document.getElementById('width').value);
        formData.append('Height', document.getElementById('height').value);
        formData.append('Depth', document.getElementById('depth').value);

        formData.append('Insert', insert);
        
        formData.append('Edge', edge + ' ' + edgeOther);
        
        
        formData.append('Com', com);

        formData.append('Units2', units2);
        formData.append('Mainvendor', document.getElementById('mainvendor').value);
        formData.append('Mainpattern', document.getElementById('mainpattern').value);

        let mainlink = document.getElementById('mainlink').value;
        if (mainlink == null || mainlink === ""){
            mainlink = document.getElementById('mainvendor').value + "+" + document.getElementById('mainpattern').value;
            mainlink = "https://www.google.com/search?q=" + mainlink.replace(/[^a-zA-Z0-9]+/g, '+')  // Replace non-alphanumeric characters with "+"
                    .replace(/^\+|(\++)/g, '+');
        }
        formData.append('Mainlink', mainlink);
        formData.append('Mainwidth', document.getElementById('mainwidth').value + mainWidth);
        formData.append('Mainvert', document.getElementById('mainvert').value + mainVertical);
        formData.append('Mainhorizontal', document.getElementById('mainhorizontal').value + mainHorizontal);
        formData.append('Mainrailroad', mainrailroad);

        formData.append('Units3', units3);
        formData.append('Contrastvendor', document.getElementById('contrastvendor').value);
        formData.append('Contrastpattern', document.getElementById('contrastpattern').value);
        let contrlink = document.getElementById('contrlink').value;
        if (contrlink == null || contrlink === ""){
            contrlink = document.getElementById('contrastvendor').value + '+' + document.getElementById('contrastpattern').value;
            contrlink = "https://www.google.com/search?q=" + contrlink.replace(/[^a-zA-Z0-9]+/g, '+')  // Replace non-alphanumeric characters with "+"
            .replace(/^\+|(\++)/g, '+');
        }
        formData.append('Contrastlink', contrlink);
        formData.append('Contrastwidth', document.getElementById('contrastwidth').value + contrastHorizontal);
        formData.append('Contrastvert', document.getElementById('contrastvert').value + contrastVertical);
        formData.append('Contrasthorizontal', document.getElementById('contrasthorizontal').value + contrastHorizontal);
        formData.append('Contrastrailroad', contrastrailroad);
        formData.append('Where', document.getElementById('where').value);

        // formData.forEach((value, key) => {
        //     console.log(key, value); // Logs each key-value pair
        //   });

        fetch("https://script.google.com/macros/s/AKfycbwlwY47vpYlfYv8YA43q9TFm0VYSJiVuKlPV4m5OGt15_SBQsKkWBVJ-B5vAi1yiTdizg/exec", {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            alert(data.msg);
        })
        .catch(err => console.log(err));
    }

    return(<>
    <div style={{border: 'grey solid 1px', padding:'5px'}}>
        <h1>Cushions</h1>

        Is a template required?
        <br></br><label>
            <input type='radio' name='template' style={{marginRight:'5px'}}
            onChange={() => {setTemplate(true)}}></input>
            Yes
        </label>
        <br></br><label>
            <input type='radio' name='template' style={{marginRight:'5px'}}
            onChange={() => {setTemplate(false)}}></input>
            No
        </label><br></br>

        <br></br>
        What units are the measurements in?
        <label>
            <input style={{marginLeft:'25px'}} value='cm' type='radio' name='units1' onChange={handleUnits1}></input> Centimeters
            <input value='in' type='radio' name='units1' onChange={handleUnits1}
                style={{marginLeft:'25px'}} checked={units1 === 'in'}></input> Inches
        </label>
        <br></br><label>
            Width:
            <input type='number' style={{marginLeft: '50px'}} id='width'></input>
        </label>
        <br></br><label>
            Height:
            <input type='number' style={{marginLeft: '45px'}} id='height'></input>
        </label>
        <br></br><label>
            Depth:
            <input type='number' style={{marginLeft: '49px'}} id='depth'></input>
        </label>
        <br></br><br></br>

        <div>
            Insert (please select one)
            <br></br>
            <label>
                <input type='radio' style={{marginRight:'5px'}} 
                value='Cover only' onClick={handleInsert} name='insert'></input>
                Cover only (no insert)
            </label>
            <br></br><label>
                <input type='radio' style={{marginRight:'5px'}}
                value='Dacron' onClick={handleInsert} name='insert'></input>
                Dacron (down alternative)
            </label>
            <br></br><label>
                <input type='radio' style={{marginRight:'5px'}}                
                value='Outdoor' onClick={handleInsert} name='insert'></input>
                Outdoor
            </label>
            <br></br><label>
                <input type='radio' style={{marginRight:'5px'}}
                value='50/50 Dacron' onClick={handleInsert} name='insert'></input>
                50 / 50 Down & Dacron
            </label>
            <br></br><label>
                <input type='radio' style={{marginRight:'5px'}}
                value='Down & Feather mix' onClick={handleInsert} name='insert'></input>
                Down & Feather Mix (please note prices increase with down count):
            </label>
            {insert !== '' && insert !== 'Cover only' && insert !== 'Dacron' && insert !== 'Outdoor' && insert !== '50/50 Dacron' &&
            <div><label style={{marginLeft:'25px'}}>
                    <input type='radio' style={{marginRight:'5px'}}
                    value='10/90' onClick={handleInsert} name='mix'></input>
                    10 / 90 Down & Feather mix
                </label>
                <br></br><label style={{marginLeft:'25px'}}>
                    <input type='radio' style={{marginRight:'5px'}}
                    value='25/75' onClick={handleInsert} name='mix'></input>
                    25 / 75 (Plaza Park standard)
                </label>
                <br></br><label style={{marginLeft:'25px'}}>
                    <input type='radio' style={{marginRight:'5px'}}
                    value='50/50 Feather' onClick={handleInsert} name='mix'></input>
                    50 / 50 Down & Feather mix
                </label>
                <br></br><label style={{marginLeft:'25px'}}>
                    <input type='radio' style={{marginRight:'5px'}}
                    value='80/20' onClick={handleInsert} name='mix'></input>
                    90 / 20 Down & Feather mix
                </label>
                <br></br><label style={{marginLeft:'25px'}}>
                    <input type='radio' style={{marginRight:'5px'}}
                    value='100% down' onClick={handleInsert} name='mix'></input>
                    100% down
                </label>
            </div>}
        </div><br></br>

        <div>
            Edge detail (please select one):
            <br></br><label>
                <input type='radio' name='edge' value={'Knife'}
                style={{marginRight: '5px'}} onChange={handleEdge}></input>
                Knife edge (no detail)
            </label>
            <br></br><label>
                <input type='radio' name='edge' value={'Welt'}
                style={{marginRight: '5px'}} onChange={handleEdge}></input>
                Welt
            </label>
            {edge === 'Welt' && 
            <>
                <br></br><label style={{marginLeft:'25px'}}>
                    <input type='radio' name='welt' value={'Self-welt'}
                    style={{marginRight: '5px'}} onChange={handleEdgeOther}></input>
                    Self-welt
                </label>
                <br></br><label style={{marginLeft:'25px'}}>
                    <input type='radio' name='welt' value={'Contrast Welt'}
                    style={{marginRight: '5px'}} onChange={handleEdgeOther}></input>
                    Contrast Welt
                </label>
                <br></br><label style={{marginLeft:'25px'}}>
                    <input type='radio' name='welt' value={'Cord/trim'}
                    style={{marginRight: '5px'}} onChange={handleEdgeOther}></input>
                    Cord / trim with lip
                </label>
            </>}
            <br></br><label>
                <input type='radio' name='edge' value={'Flange'}                
                style={{marginRight: '5px'}} onChange={handleEdge}></input>
                Flange
            </label>
            {edge === 'Flange' && 
            <>
                <br></br><label style={{marginLeft:'25px'}}>
                    <input type='radio' name='welt' value={'Self-flange'}
                    style={{marginRight: '5px'}} onChange={handleEdgeOther}></input>
                    Self-flange
                </label>
                <br></br><label style={{marginLeft:'25px'}}>
                    <input type='radio' name='welt' value={'Contrast flange'}
                    style={{marginRight: '5px'}} onChange={handleEdgeOther}></input>
                    Contrast flange
                </label>
            </>}
        </div>

        <br></br>
        Are you using COM material?
            <div>
                <label> 
                    <input type='radio' name='COM' style={{marginRight:'5px'}}
                    value={'yes'} onChange={handleCom}></input>
                    Yes
                </label> <br></br>
                <label>
                    <input type='radio' name='COM' style={{marginRight:'5px'}}
                    value={'no'} onChange={handleCom}></input>
                    No (you will purchase your material from Plaza Park Interiors)
                </label><br></br>
            </div><br></br>

            Main Fabric specifications:  Please note all yardage will be based on 54” wide, solid goods if specifications are not provided.
            <br></br>
            <div>
                What units are the measurements in?
                <label>
                    <input style = {{marginLeft:'25px'}} value='cm' type='radio' name='units2' onChange={handleUnits2}></input> Centimeters
                    <input value='in' type='radio' name='units2' onChange={handleUnits2}
                        style={{marginLeft:'25px'}} checked={units2 === 'in'}></input> Inches
                </label>
                <br></br><label>
                    Vendor:
                    <input type='text' id='mainvendor' style={{marginLeft:'135px'}}></input>
                </label>
                <br></br><label>
                    Pattern name & number:
                    <input type='text' id='mainpattern' style={{marginLeft:'15px'}}></input>
                </label>
                <br></br><label>
                    Link to fabric if available:
                    <input type='href' id='mainlink' placeholder=' ' style={{marginLeft:'13px'}}></input>
                </label><br></br><label>
                    Width:
                    <input type='number' id='mainwidth' style={{marginLeft:'144px'}}></input>
                </label>
                {units2 === 'in' && <>
                    <Dropdown
                        value = {mainWidth}
                        change = {handleMainWidth}
                    ></Dropdown>
                </>}
                <br></br><label>
                    Vertical repeat:
                    <input type='number' id='mainvert' style={{marginLeft:'81px'}}></input>
                </label>
                {units2 === 'in' && <>
                    <Dropdown
                        value = {mainVertical}
                        change = {handleMainVertical}
                    ></Dropdown>
                </>}
                <br></br><label>
                    Horizontal repeat:
                    <input type='number' id='mainhorizontal' style={{marginLeft:'61px'}}></input>
                </label>
                {units2 === 'in' && <>
                    <Dropdown
                        value = {mainHorizontal}
                        change = {handleMainHorizontal}
                    ></Dropdown>
                </>}
                <br></br>
                Are we railroaded?
                <br></br><label> 
                    <input type='radio' name='mainrailroad' style={{marginRight:'5px'}}
                    value={true} onChange={handleMainRailroad}></input>
                    Yes
                </label> <br></br>
                <label>
                    <input type='radio' name='mainrailroad' style={{marginRight:'5px'}}
                    value={false} onChange={handleMainRailroad}></input>
                    No
                </label><br></br>
            </div><br></br>

            Contrast Fabric specifications:
            <div>
                What units are the measurements in?
                <label>
                    <input style = {{marginLeft:'25px'}} value='cm' type='radio' name='units3' onChange={handleUnits3}></input> Centimeters
                    <input value='in' type='radio' name='units3' onChange={handleUnits3}
                        style={{marginLeft:'25px'}} checked={units3 === 'in'}></input> Inches
                </label>
                <br></br><label>
                    Vendor:
                    <input type='text' id='contrastvendor' style={{marginLeft:'135px'}}></input>
                </label>
                <br></br><label>
                    Pattern name & number:
                    <input type='text' id='contrastpattern' style={{marginLeft:'15px'}}></input>
                </label>
                <br></br><label>
                    Link to fabric if available:
                    <input type='href' id='contrlink' style={{marginLeft:'13px'}}></input>
                </label><br></br><label>
                    Width:
                    <input type='number' id='contrastwidth' style={{marginLeft:'144px'}}></input>
                </label>
                {units3 === 'in' && <>
                    <Dropdown
                        value = {contrastWidth}
                        change = {handleContrastWidth}
                    ></Dropdown>
                </>}
                <br></br><label>
                    Vertical repeat:
                    <input type='number' id='contrastvert' style={{marginLeft:'81px'}}></input>
                </label>
                {units3 === 'in' && <>
                    <Dropdown
                        value = {contrastVertical}
                        change = {handleContrastVertical}
                    ></Dropdown>
                </>}
                <br></br>
                <label>
                    Horizontal repeat:
                    <input type='number' id='contrasthorizontal' style={{marginLeft:'61px'}}></input>
                </label>
                {units3 === 'in' && <>
                    <Dropdown
                        value = {contrastHorizontal}
                        change = {handleContrastHorizontal}
                    ></Dropdown>
                </>}
                <br></br>
                Are we railroaded?
                <br></br><label> 
                    <input type='radio' name='contrastrailroad' style={{marginRight:'5px'}}
                    value={true} onChange={handleContrastRailroad}></input>
                    Yes
                </label> <br></br>
                <label>
                    <input type='radio' name='contrastrailroad' style={{marginRight:'5px'}}
                    value={false} onChange={handleContrastRailroad}></input>
                    No
                </label><br></br><br></br>
                Please specify where the contrast fabric will be used:
                <input id='where'></input>
            </div><br></br>

            <button onClick={submitForm}>Submit</button>
    </div>
    </>)
}

export default Cushions;