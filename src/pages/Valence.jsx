import React, { useState } from 'react';

const Valance = () => {
    const[windowImg, setWindowImg] = useState(null);
    const[inspoImg, setInspoImg] = useState(null);
    const[mount, setMount] = useState('outside');
    const[lined, setLined] = useState('');
    const[lining, setLining] = useState('');
    const[com, setCom] = useState('');
    const[nails, setNails] = useState('');
    const[mainrailroad, setMainRailroad] = useState('');
    const[contrastrailroad, setContrastRailroad] = useState('');

    const[units1, setUnits1] = useState('in');
    const[units2, setUnits2] = useState('in');
    const[units3, setUnits3] = useState('in');

    const [f2fw, f2fwc] = useState('');
    const [f2fh, f2fhc] = useState('');
    const [abvc, abvcc] = useState('');
    const [abvf, abvfc] = useState('');
    const handlef2fw = (e) => {f2fwc(e.target.value);};
    const handlef2fh = (e) => {f2fhc(e.target.value);};
    const handleabvc = (e) => {abvcc(e.target.value);};
    const handleabvf = (e) => {abvfc(e.target.value);};

    const handleImageUpload = (event) => {setWindowImg(event.target.files[0]);}
    const handleInspoUpload = (event) => {setInspoImg(event.target.files[0]);}
    const handleMount = () => {
        if (mount === 'outside'){
            setMount('inside');
        }else{
            setMount('outside');
        }
    }
    const handleLined = (event) => {setLined(event.target.value);}
    const handleLining = (event) => {setLining(event.target.value);}
    const handleNails = (event) => {setNails(event.target.value);}
    const handleCom = (event) => {setCom(event.target.value);}
    const handleMainRailroad = (event) => {setMainRailroad(event.target.value);}
    const handleContrastRailroad = (event) => {setContrastRailroad(event.target.value);}

    const handleUnits1 = (event) => {setUnits1(event.target.value);}


    //Main fabric units
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
        formData.append('Sheet', 'Valence');
        //formData.append('Img', windowImg);
        let date = new Date(Date.now());
        formData.append('Date', date.toLocaleString());
        formData.append('Units1', units1);
        formData.append('Location', mount);

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


        if (lined === 'No'){formData.append('Lining', 'no');}
        else{formData.append('Lining', lining);}

        if(nails === 'No'){formData.append('Nails', 'no');}
        else{formData.append('Nails', document.getElementById('nail-color').value + ', ' + document.getElementById('nail-location').value);}

        formData.append('Com', com);

        formData.append('Units2', units2);
        formData.append('Mainvendor', document.getElementById('mainvendor').value);
        formData.append('Mainpattern', document.getElementById('mainpattern').value);
        formData.append('Mainwidth', document.getElementById('mainwidth').value + mainWidth);
        formData.append('Mainvert', document.getElementById('mainvert').value + mainVertical);
        formData.append('Mainhorizontal', document.getElementById('mainhorizontal').value + mainHorizontal);
        formData.append('Mainrailroad', mainrailroad);
        let mainlink = document.getElementById('mainlink').value;
        if (mainlink == null || mainlink === ""){
            mainlink = document.getElementById('mainvendor').value + "+" + document.getElementById('mainpattern').value;
            mainlink = "https://www.google.com/search?q=" + mainlink.replace(/[^a-zA-Z0-9]+/g, '+')  // Replace non-alphanumeric characters with "+"
                    .replace(/^\+|(\++)/g, '+');
        }
        formData.append('Mainlink', mainlink);

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
            <h1>Valances / Cornices</h1>
            <label>
                Please load a photo of the window:
                <input type='file' onChange={handleImageUpload} style={{marginLeft:'15px'}}></input>
            </label><br></br>
            <label>
                Please load an inspiration photo if possible:
                <input type='file' onChange={handleInspoUpload} style={{marginLeft:'15px'}}></input>
            </label><br></br><br></br>
            <label> 
                    Valances / cornices are traditionally outside mounts.  If you will have an inside mount installation please check this box.
                    <input type='checkbox' name='mount' style={{marginLeft:'5px'}} onChange={handleMount}></input>
                </label> <br></br>
            What units are the measurements in?
            <label>
                <input style={{marginLeft:'25px'}} value='cm' type='radio' name='units1' onChange={handleUnits1}></input> Centimeters
                <input value='in' type='radio' name='units1' onChange={handleUnits1}
                    style={{marginLeft:'25px'}} checked={units1 === 'in'}></input> Inches
            </label><br></br>
            <div>
                <div>
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
                        How far above frame are we mounting?
                        <input id='abvf' style={{marginLeft:'172px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {abvf}
                            change = {handleabvf}
                        ></Dropdown>
                    </>}
                    <br></br><br></br>
                </div>
            </div>


            Will the valance / cornice be lined?
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

            Nails:
            <div>
            <label>
                <input type='radio' name='nails' style={{marginRight:'5px'}}
                    value={'No'} onChange={handleNails}></input>
                    No
                </label><br></br>
                <label> 
                    <input type='radio' name='nails' style={{marginRight:'5px'}}
                    value={'Yes'} onChange={handleNails}></input>
                    Yes
                </label> <br></br>
                {nails === 'Yes' && <div>
                    <label style={{marginLeft:'25px'}}>
                        Please include requested color and size:
                        <input type='text' id='nail-color' style={{marginLeft:'15px'}}></input>
                    </label>  <br></br>
                    <label style={{marginLeft:'25px'}}>
                        Please indicate location of nails:
                        <input type='text' id='nail-location' style={{marginLeft:'75px'}}></input>
                    </label> 
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
                </label><br></br><label>
                    Link to fabric if available:
                    <input type='href' id='mainlink' placeholder=' ' style={{marginLeft:'13px'}}></input>
                </label>
                <br></br><label>
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
                        style={{marginLeft:'25px'}} checked={units2 === 'in'}></input> Inches
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
                    <input type='href' id='contrlink' placeholder=' ' style={{marginLeft:'13px'}}></input>
                </label>
                <br></br><label>
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
    )
}

export default Valance;