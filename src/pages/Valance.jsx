import React, { useState } from 'react';

const Valance = ({pname, name, address, email, room, numWindow, uploads, estName, formSection, handleFormSection}) => {
    const[windowImg, setWindowImg] = useState(null);
    const[inspoImg, setInspoImg] = useState(null);
    const[mount, setMount] = useState('outside');
    const[lined, setLined] = useState('No');
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
        let date = new Date(Date.now());
        formData.append('Date', date.toLocaleString());
        formData.append('PName', pname);
        formData.append('EstName', estName);
        formData.append('Name', name);
        formData.append('Address', address);
        formData.append('Email', email);
        formData.append('Room', room);
        formData.append('Windows', numWindow);
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

        fetch("https://script.google.com/macros/s/AKfycbzsVchSaJPQySfT4Qk2hcXMdikph2EVy3PsAzD5p1AM7hJ-oqJodhMwYguy5kQdFlIH6A/exec", {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            alert(data.msg);
            uploads(prev => prev + 1);
            // uploadAllFiles();
            uploadFiles();
        })
        .catch(err => console.log(err));
    }

    const uploadFiles = () => {
        console.log('uploading window image:');
        console.log(windowImg);
        let fr = new FileReader();
        fr.readAsArrayBuffer(windowImg);
        fr.onload = f => {
            
            const url = "https://script.google.com/macros/s/AKfycbzsVchSaJPQySfT4Qk2hcXMdikph2EVy3PsAzD5p1AM7hJ-oqJodhMwYguy5kQdFlIH6A/exec";
            
            let qs = new URLSearchParams({FolderName: pname + '_' + name + '_' + address,filename: windowImg.name, mimeType: windowImg.type});
            fetch(`${url}?${qs}`, {method: "POST", body: JSON.stringify([...new Int8Array(f.target.result)])})
            .then(res => res.json())
            .then(e => {
                console.log(e);
                console.log('uploading inspo image:');
                console.log(inspoImg);
                fr.readAsArrayBuffer(inspoImg);
                fr.onload = f => {
                    qs = new URLSearchParams({FolderName: pname + '_' + name + '_' + address,filename: inspoImg.name, mimeType: inspoImg.type});
                    fetch(`${url}?${qs}`, {method: "POST", body: JSON.stringify([...new Int8Array(f.target.result)])})
                    .then(res => res.json())
                    .then(e => {
                        console.log(e);
                        alert("Images uploaded");
                    }
                    )
                    .catch(err => console.log(err));
                }
            }
            )
            .catch(err => console.log(err));
        }
    };

    async function uploadAllFiles() {
        console.log("Uploading:", {
            pname, name, address, windowImg
          });
        const url = "https://script.google.com/macros/s/AKfycbzsVchSaJPQySfT4Qk2hcXMdikph2EVy3PsAzD5p1AM7hJ-oqJodhMwYguy5kQdFlIH6A/exec";
      
        const uploadPromises = Array.from(windowImg).map(file => {
          return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.readAsArrayBuffer(file);
      
            fr.onload = f => {
                const body = JSON.stringify([...new Int8Array(f.target.result)]);
                const qs = new URLSearchParams({ FolderName: pname + '_' + name + '_' + address, filename: file.name, mimeType: file.type});
                // const qs = new URLSearchParams({ filename: file.name, mimeType: file.type, FolderID: FolderID });
      
              fetch(`${url}?${qs}`, {
                method: "POST",
                body: body
              })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
            };
      
            fr.onerror = err => reject(err);
          });
        });
      
        try {
          const results = await Promise.all(uploadPromises);
          console.log("All uploads complete", results);
          alert("All files uploaded successfully!");
        } catch (error) {
          console.error("One or more uploads failed", error);
          alert("There was an error uploading the files.");
        }
      }

    const [yardage, setYardage] = useState(null);
    function calcYardage() {
        // ------------------------------
        // BASE FACE FABRIC CALCULATION
        // ------------------------------
        let faceYards;

        const fabricWidth = document.getElementById('mainWidth')?.value || 54 ; // in inches
        const widthInches = parseFloat(document.getElementById('of2fw').value) + parseFloat(f2fw) || 0;
        const heightInches = parseFloat(document.getElementById('of2fh').value) + parseFloat(f2fh) || 0;
        const railroaded = mainrailroad === 'true' ? true : false;
        const isLined = lined === 'Yes' ? true : false;
        const liningType = lining.toLowerCase();

        console.log(fabricWidth,widthInches, heightInches, railroaded, isLined, liningType);
        if (fabricWidth <= 0 || widthInches <= 0 || heightInches <= 0) {
            alert('Please enter valid dimensions to calculate yardage.');
            return;
        }

        if (railroaded) {
            faceYards = widthInches / 36;
        } else {
            const cutsAcross = Math.ceil(widthInches / fabricWidth);
            const cutLengthYards = heightInches / 36;
            faceYards = cutsAcross * cutLengthYards;
        }

        faceYards = Math.ceil(faceYards * 100) / 100;

        // ------------------------------
        // LINING CALCULATION
        // ------------------------------
        let liningYards = 0;

        if (isLined && liningType) {
            // Lining is treated as same yardage as face (straight flat valance)
            liningYards = faceYards;

            // Sheer uses less because it's often 118" wide
            if (liningType === 'sheer') {
            liningYards = Math.ceil((heightInches / 36) * 100) / 100;
            }

            // Blackout sometimes requires additional allowance
            if (liningType === 'blackout') {
            liningYards += 0.25; // add 1/4 yard for bulk allowance
            }
        }

        setYardage(faceYards + liningYards);
    }

// Example usage:
// calculateFlatValanceYardage({ widthInches: 90, heightInches: 18, railroaded: false });


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

    const checkNum = (e) => {if (!e.target.validity.valid) e.target.value = '';}

    return(
        <div className='container'>
            {formSection === 1 && <div className='form-group-indent'>
                <h1>Valances / Cornices Dimensions</h1>
                <div className='form-section'> <br />
                    <label> 
                        <input type='checkbox' name='mount' style={{marginLeft:'5px'}} onChange={handleMount}></input>
                        If you will have an inside mount installation please check this box. &emsp; (Valances / cornices are traditionally outside mounts.)

                    </label> <br /> <br />
                    <div className='row dimensions-section'>
                        <h4>Window Measurements</h4>
                        <div className='column'>
                            Frame-to-frame width:
                            <input id='of2fw' className='fixed-width-input' min="0" onInput={checkNum} type='number'></input>
                            {units1 === 'in' && <>
                                <Dropdown
                                    value = {f2fw}
                                    change = {handlef2fw}
                                ></Dropdown>
                            </>}<br></br>
                        </div>
                        <div className='column'>
                            Frame-to-frame height:
                            <input id='of2fh' className='fixed-width-input' min="0" onInput={checkNum} type='number'></input>
                            {units1 === 'in' && <>
                                <Dropdown
                                    value = {f2fh}
                                    change = {handlef2fh}
                                ></Dropdown>
                            </>}<br></br>
                        </div>
                        <div className='column'>
                            Above frame to ceiling:
                            <input id='abvc' className='fixed-width-input' min="0" onInput={checkNum} type='number'></input>
                            {units1 === 'in' && <>
                                <Dropdown
                                    value = {abvc}
                                    change = {handleabvc}
                                ></Dropdown>
                            </>}<br></br>
                        </div>
                        <div className='column'>
                            Mount above frame:
                            <input id='abvf' className='fixed-width-input' min="0" onInput={checkNum} type='number'></input>
                            {units1 === 'in' && <>
                                <Dropdown
                                    value = {abvf}
                                    change = {handleabvf}
                                ></Dropdown>
                            </>}<br></br>
                        </div>
                        
                    </div>
                </div>
        
                <div className="form-section">
                    <h4>Main Fabric specifications: <small>Please note all yardage will be based on 54” wide, solid goods if specifications are not provided.</small></h4>
                    
                    {/* <label>What units are the measurements in?</label>
                    <label className="radio-label">
                        <input value='cm' type='radio' name='units2' onChange={handleUnits2}></input> Centimeters
                    </label>
                    <label className="radio-label">
                        <input value='in' type='radio' name='units2' onChange={handleUnits2}
                        checked={units2 === 'in'}></input> Inches
                    </label> 
                    <br />
                    */}
                    <div className='row dimensions-section'>
                        <div className='column'>
                            <label>
                                Width:
                                <br />
                                <input type='number' id='mainwidth' className='fixed-width-input' min="0" onInput={checkNum}></input>
                            </label>
                            {units2 === 'in' && <>
                                <Dropdown
                                value={mainWidth}
                                change={handleMainWidth}
                                ></Dropdown>
                            </>}
                        </div><br />
                        <div className='column'>
                            <label>
                                Vertical repeat:
                                <br />
                                <input type='number' id='mainvert' className='fixed-width-input' min="0" onInput={checkNum}></input>
                            </label>
                            {units2 === 'in' && <>
                                <Dropdown
                                value={mainVertical}
                                change={handleMainVertical}
                                ></Dropdown>
                            </>}
                        </div><br />
                        <div className='column'>
                            <label>
                                Horizontal repeat:
                                <br />
                                <input type='number' id='mainhorizontal' className='fixed-width-input' min="0" onInput={checkNum}></input>
                            </label>
                            {units2 === 'in' && <>
                                <Dropdown
                                value={mainHorizontal}
                                change={handleMainHorizontal}
                                ></Dropdown>
                            </>}
                        </div>
                    </div>
                    <div className='row dimensions-section'>
                        <div className='column'>
                            <h4>How are we running the fabric?</h4>
                            <label className="radio-label">
                                <input type='radio' name='mainrailroad'
                                value={'false'} onChange={handleMainRailroad}></input>
                                Up the bolt
                            </label>
                            <label className="radio-label">
                                <input type='radio' name='mainrailroad'
                                value={'true'} onChange={handleMainRailroad}></input>
                                Railroading
                            </label><br />
                        </div>
                        {/* <div className='column'>
                            <button className='button-other' onClick={() => {calcYardage()}}>Calculate yardage</button>
                            {yardage} <br />
                        </div> */}
                        <div className='column'>
                            <h4>Will the valance / cornice be lined?</h4>
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
                            <label>
                                <input type='radio' name='lined' defaultChecked={true}
                                value={'No'} onChange={handleLined}></input>
                                No
                            </label><br></br>
                            <br></br>
                        </div>
                        <div className='column'>
                            <button className='button-other' onClick={() => {calcYardage()}}>Calculate yardage</button>
                            {yardage} <br />
                        </div>
                    </div>
                </div>
                <button className="next-button" onClick={() => handleFormSection(prev => prev + 1)}>Next</button>
                <button className="back-button" onClick={() => handleFormSection(prev => prev - 1)}>Back</button>
            </div>}

            {formSection === 2 && <div className='form-group-indent'>
                <h1>Valance / Cornice Details</h1>
                <div className='form-section'>
                    <div className='row dimensions-section'>
                        <div className='column'>
                            <h4>Nails:</h4>
                            <label> 
                                <input type='radio' name='nails' style={{marginRight:'5px'}}
                                value={'Yes'} onChange={handleNails}></input>
                                Yes
                            </label> <br></br>
                            {nails === 'Yes' && <div>
                                <label style={{marginLeft:'25px'}}>
                                    Please include requested color and size:
                                </label> <br />
                                <input type='text' id='nail-color' className='fixed-width-input' style={{marginLeft:'25px'}}></input> <br />
                                <label style={{marginLeft:'25px'}}>
                                    Please indicate location of nails:
                                </label> <br />
                                <input type='text' id='nail-location' className='fixed-width-input' style={{marginLeft:'25px'}}></input>
                            </div>}
                            <label>
                                <input type='radio' name='nails'  defaultChecked={true}
                                    value={'No'} onChange={handleNails}></input>
                                    No
                            </label><br></br>
                            
                        </div>
                    </div>
                </div>
                <button className="next-button" onClick={() => handleFormSection(prev => prev + 1)}>Next</button>
                <button className="back-button" onClick={() => handleFormSection(prev => prev - 1)}>Back</button>
            </div>}
            
            {formSection === 3 && <div className='form-group-indent'>
                <h1>Review & Submit</h1><br />
                <button className="back-button" onClick={() => handleFormSection(prev => prev - 1)}>Back</button>
            </div> }

        </div>
    )
}

export default Valance;