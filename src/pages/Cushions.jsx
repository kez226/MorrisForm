import React, { useEffect, useState } from 'react';

const Cushions = ({pname, name, address, email, estName, formSection, handleFormSection}) => {
    const[windowImg, setWindowImg] = useState(null);
    const [template, setTemplate] = useState('');
    const[units1, setUnits1] = useState('in');
    const[length, setLength] = useState(0);
    const handleLength = (e) => {setLength(e.target.value);}
    const[depth, setDepth] = useState(0);
    const handleDepth = (e) => {setDepth(e.target.value);}
    const[thickness, setThickness] = useState(0);
    const handleThickness = (e) => {setThickness(e.target.value);}
    const[units2, setUnits2] = useState('in');
    const[units3, setUnits3] = useState('in');
    const [insert, setInsert] = useState('');
    const [edge, setEdge] = useState('');
    const [edgeOther, setEdgeOther] = useState('');
    const [com, setCom] = useState('');
    const [yardage, setYardage] = useState(null);
    const [contrast, setContrast] = useState(false);

    const handleImageUpload = (event) => {
        if (event.target.files.length > 5){
            setWindowImg(null);
            alert("Please select no more than five files");
        }
        else{
            for (const file of event.target.files){
                if (file.size > 10 * 1024 * 1024){
                    alert(file.name + " is too big to upload");
                    return;
                }
            }
            setWindowImg(event.target.files);
        }
    }
    const handleInsert = (e) => {setInsert(e.target.value);}
    const handleEdge = (e) => {setEdge(e.target.value);
        if (e.target.value === "Welt"){setEdgeOther("Self-welt")}
        if (e.target.value === "Flange"){setEdgeOther("Self-flange")}
    }
    const handleEdgeOther = (e) => {setEdgeOther(e.target.value);}
    const handleUnits1 = (e) => {setUnits1(e.target.value);}

    const[mainrailroad, setMainRailroad] = useState("utb");
    const[contrastrailroad, setContrastRailroad] = useState('');
    const handleMainRailroad = (event) => {setMainRailroad(event.target.value);}
    const handleContrastRailroad = (event) => {setContrastRailroad(event.target.value);}
    const handleCom = (event) => {setCom(event.target.value);}


    const handleUnits2 = (event) => {setUnits2(event.target.value);}

    const [mainWidth, mainWidthChange] = useState(null);
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
        { label: '1/8', value: .125 },
        { label: '1/4', value: .25 },
        { label: '3/8', value: .375 },
        { label: '1/2', value: .5 },
        { label: '5/8', value: .625 },
        { label: '3/4', value: .75 },
        { label: '7/8', value: .875 }
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
        formData.append('EstName', estName);
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

        fetch("https://script.google.com/macros/s/AKfycbzsVchSaJPQySfT4Qk2hcXMdikph2EVy3PsAzD5p1AM7hJ-oqJodhMwYguy5kQdFlIH6A/exec", {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            alert(data.msg);
            uploadAllFiles();
        })
        .catch(err => console.log(err));
    }

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

    
    const calcYardage = () => {
        // Input validation
        if (!document.getElementById('length').value || !document.getElementById('depth').value){
            alert("Please fill out length and depth");
            setYardage(null)
            return;
        }

        // Convert inputs to numbers
        let lengthCalc = length + Number(document.getElementById('length').value);
        let depthCalc = depth + Number(document.getElementById('depth').value);
        let thicknessCalc = thickness + Number(document.getElementById('thickness').value);
        let mainvertCalc = Number(document.getElementById('mainvert').value) + mainVertical;

        // Default fabric width if not provided or zero
        let fabWidth = mainWidth + Number(document.getElementById('mainwidth').value);
        if (fabWidth === 0) { fabWidth = 54.0; }

        // --- Panel Sizing Formulas (based on PDF) ---
        const seamAllowance = 0.5;
        // const roundingReduction = 0.25; // 0.25 inches per edge - accounted for in plate/boxing additions

        // Plate Panels (Top and Bottom)
        // Formula: Finished cushion dimension + 0.5 inches per side
        // This 0.5" includes 0.25" rounding reduction + 0.25" seam allowance per edge
        const plateCutLength = lengthCalc + seamAllowance; // Length + 0.5"
        const plateCutWidth = depthCalc + seamAllowance;   // Depth + 0.5"

        // Boxing Panels (Side Strips)
        // Boxing width formula: Thickness + 0.5 inches
        const boxingCutWidth = thicknessCalc + seamAllowance; // Thickness + 0.5"

        // Continuous Boxing Configuration (Left, Front, Right sides)
        // Boxing length formula: Left side + Front side + Right side + 4 extra inches
        // Using plateCutLength and plateCutWidth for side dimensions as per PDF example (24.5" for 24" cushion)
        const continuousBoxingCutLength = plateCutLength + plateCutWidth + plateCutLength + 4;

        // Zipper Plaque Panel (Back side)
        // Plaque width formula: Thickness + 1.75 inches
        const plaqueCutWidth = thicknessCalc + 1.75;
        // Plaque length formula: Back side dimension + 4 inches
        const plaqueCutLength = plateCutWidth + 4; // Assuming 'depth' is the back side, so plateCutWidth is its dimension

        // --- Simplified Fabric Yardage Calculation (Approximation of Nesting) ---
        // The PDF describes an interactive nesting process, which is complex to replicate programmatically.
        // This implementation will use a simplified approach to estimate yardage by considering the total area
        // and then trying to fit pieces within the fabric width, similar to the original function's intent.
        // It will prioritize fitting pieces side-by-side or stacking them to minimize waste.

        let totalFabricLengthNeeded = 0; // This will accumulate the total length of fabric required on the roll in inches
        let currentFabricWidthUsed = 0; // Tracks how much of the fabric width is currently occupied
        let maxRowHeight = 0; // Tracks the height of the current row of pieces

        // Helper function to add a piece to the layout
        const addPiece = (pieceLength, pieceWidth) => {
            // If the piece can fit in the current row (side-by-side)
            if (currentFabricWidthUsed + pieceWidth <= fabWidth) {
                currentFabricWidthUsed += pieceWidth;
                maxRowHeight = Math.max(maxRowHeight, pieceLength);
            } else {
                // If it doesn't fit, start a new row
                totalFabricLengthNeeded += maxRowHeight; // Add the height of the completed row
                currentFabricWidthUsed = pieceWidth; // Start new row with this piece
                maxRowHeight = pieceLength;
            }
        };

        // Determine orientation based on mainrailroad
        if (mainrailroad === "rr") {
            // Railroaded: Fabric pattern runs across the width.
            // Pieces are rotated 90 degrees conceptually for layout.
            // plateCutLength becomes width, plateCutWidth becomes length for layout purposes.

            // Two plates
            addPiece(plateCutWidth, plateCutLength); // Piece 1: (length, width) -> (plateCutWidth, plateCutLength)
            addPiece(plateCutWidth, plateCutLength); // Piece 2

            // Continuous Boxing Strip
            addPiece(boxingCutWidth, continuousBoxingCutLength); // (length, width) -> (boxingCutWidth, continuousBoxingCutLength)

            // Zipper Plaque
            addPiece(plaqueCutWidth, plaqueCutLength); // (length, width) -> (plaqueCutWidth, plaqueCutLength)

        } else {
            // Up the bolt: Fabric pattern runs along the length.
            // Pieces are laid out as is.

            // Two plates
            addPiece(plateCutLength, plateCutWidth); // Piece 1: (length, width) -> (plateCutLength, plateCutWidth)
            addPiece(plateCutLength, plateCutWidth); // Piece 2

            // Continuous Boxing Strip
            addPiece(continuousBoxingCutLength, boxingCutWidth); // (length, width) -> (continuousBoxingCutLength, boxingCutWidth)

            // Zipper Plaque
            addPiece(plaqueCutLength, plaqueCutWidth); // (length, width) -> (plaqueCutLength, plaqueCutWidth)
        }

        // Add the height of the last row
        totalFabricLengthNeeded += maxRowHeight;


        // --- Pattern Matching Considerations (Simplified) ---
        // The PDF mentions vertical pattern match (along fabric length) and horizontal pattern match (across fabric width).
        // For simplicity, if a vertical repeat (mainvert) is provided, we'll round up the total length needed
        // to the nearest multiple of the repeat, ensuring pattern alignment.
        if (mainvertCalc > 0) {
            const repeatValue = mainvertCalc; // Assuming mainvert is the vertical repeat in inches
            totalFabricLengthNeeded = Math.ceil(totalFabricLengthNeeded / repeatValue) * repeatValue;
        }

        // Convert total length in inches to yards
        let calculatedYardage = totalFabricLengthNeeded / 36.0;

        // Round up to the nearest 0.25 yard as per common practice in fabric calculation
        // The original code had `if (yardage % 0.25 !== 0){yardage += 0.25 - (yardage % 0.25)}`
        calculatedYardage = Math.ceil(calculatedYardage * 4) / 4; // Rounds up to nearest 0.25

        // Add extra for 'Welt' and 'Self-welt' as in original code
        if (edge === 'Welt' && edgeOther === 'Self-welt') {
            calculatedYardage += 0.5;
        }

        setYardage(calculatedYardage);
        console.log("Calculated Yardage:", calculatedYardage);
    };

    const checkNum = (e) => {if (!e.target.validity.valid) e.target.value = '';}

    return(<>
    <div className='container'>
        {formSection === 1 && <div className='form-group-indent'>
            <h1>Cushion Dimensions</h1>
            <div className='form-section'>
                {/* Is a template required?
                <br /><label>
                    <input type='radio' name='template'
                    onChange={() => {setTemplate(true)}}></input>
                    Yes
                </label>
                <br /><label>
                    <input type='radio' name='template'
                    onChange={() => {setTemplate(false)}}></input>
                    No
                </label><br /> <br /> */}
                <div className='row dimensions-section'>
                    <h4>Cushion measurements</h4>
                    <div className='column'>
                        Length: <br />
                        <input type='number' id='length'
                        className='fixed-width-input' min="0" onInput={checkNum}></input>
                        <Dropdown
                            value = {length}
                            change = {handleLength}
                        ></Dropdown>
                    </div>
                    <div className='column'>
                        <label>
                            Depth: <br />
                            <input type='number' id='depth'
                            className='fixed-width-input' min="0" onInput={checkNum}></input>
                            <Dropdown
                                value = {depth}
                                change = {handleDepth}
                            ></Dropdown>
                        </label>
                    </div>
                    <div className='column'>
                        <label>
                            Thickness: <br />
                            <input type='number' id='thickness'
                            className='fixed-width-input' min="0" onInput={checkNum}></input>
                            <Dropdown
                                value = {thickness}
                                change = {handleThickness}
                            ></Dropdown>
                        </label>
                    </div>
                </div> <br />
            </div>

            <div className='form-section'>
                <div className='row dimensions-section'>
                    <h4>Main Fabric specifications: <small>Please note all yardage will be based on 54” wide, solid goods if specifications are not provided.</small></h4>

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
                    <div className='column'>
                        Edge detail (please select one):
                        <br /><label>
                            <input type='radio' name='edge' value={'Knife'}
                            style={{marginRight: '5px'}} onChange={handleEdge}></input>
                            Knife edge (no detail)
                        </label>
                        <br /><label>
                            <input type='radio' name='edge' value={'Welt'}
                            style={{marginRight: '5px'}} onChange={handleEdge}></input>
                            Welt
                        </label>
                        {edge === 'Welt' && 
                        <>
                            <br /><label style={{marginLeft:'25px'}}>
                                <input type='radio' name='welt' value={'Self-welt'} defaultChecked={true}
                                style={{marginRight: '5px'}} onChange={handleEdgeOther}></input>
                                Self-welt
                            </label>
                            <br /><label style={{marginLeft:'25px'}}>
                                <input type='radio' name='welt' value={'Contrast Welt'}
                                style={{marginRight: '5px'}} onChange={handleEdgeOther}></input>
                                Contrast Welt
                            </label>
                            <br /><label style={{marginLeft:'25px'}}>
                                <input type='radio' name='welt' value={'Cord/trim'}
                                style={{marginRight: '5px'}} onChange={handleEdgeOther}></input>
                                Cord / trim with lip
                            </label>
                        </>}
                    </div>
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
            <h1>Cushion Materials</h1>
            <div className="form-section">
                <div className='row dimensions-section'>
                    <div className='column'>
                        <h4>Are you using COM material?</h4>
                        <label className="radio-label">
                            <input type='radio' name='COM'
                            value={'yes'} onChange={handleCom}></input>
                            Yes
                        </label>
                        <label className="radio-label">
                            <input type='radio' name='COM'
                            value={'no'} onChange={handleCom}></input>
                            No (you will purchase your material from Plaza Park Interiors)
                        </label>
                    </div>
                    <div className='column'>
                        <div>
                            Insert (please select one)
                            <br />
                            <label>
                                <input type='radio' style={{marginRight:'5px'}} 
                                value='Cover only' onClick={handleInsert} name='insert'></input>
                                Cover only (no insert)
                            </label>
                            <br /><label>
                                <input type='radio' style={{marginRight:'5px'}}
                                value='Dacron' onClick={handleInsert} name='insert'></input>
                                Dacron (down alternative)
                            </label>
                            <br /><label>
                                <input type='radio' style={{marginRight:'5px'}}                
                                value='Outdoor' onClick={handleInsert} name='insert'></input>
                                Outdoor
                            </label>
                            <br /><label>
                                <input type='radio' style={{marginRight:'5px'}}
                                value='50/50 Dacron' onClick={handleInsert} name='insert'></input>
                                50 / 50 Down & Dacron
                            </label>
                            <br /><label>
                                <input type='radio' style={{marginRight:'5px'}}
                                value='25/75 Down Feather' onClick={handleInsert} name='insert'></input>
                                Down & Feather Mix (please note prices increase with down count):
                            </label>
                            {insert !== '' && insert !== 'Cover only' && insert !== 'Dacron' && insert !== 'Outdoor' && insert !== '50/50 Dacron' &&
                            <div><label style={{marginLeft:'25px'}}>
                                    <input type='radio' style={{marginRight:'5px'}}
                                    value='10/90 Down Feather' onClick={handleInsert} name='mix'></input>
                                    10 / 90 Down & Feather mix
                                </label>
                                <br /><label style={{marginLeft:'25px'}}>
                                    <input type='radio' style={{marginRight:'5px'}} defaultChecked={true}
                                    value='25/75 Down Feather' onClick={handleInsert} name='mix'></input>
                                    25 / 75 (Plaza Park standard)
                                </label>
                                <br /><label style={{marginLeft:'25px'}}>
                                    <input type='radio' style={{marginRight:'5px'}}
                                    value='50/50 Down Feather' onClick={handleInsert} name='mix'></input>
                                    50 / 50 Down & Feather mix
                                </label>
                                <br /><label style={{marginLeft:'25px'}}>
                                    <input type='radio' style={{marginRight:'5px'}}
                                    value='80/20 Down Feather' onClick={handleInsert} name='mix'></input>
                                    90 / 20 Down & Feather mix
                                </label>
                                <br /><label style={{marginLeft:'25px'}}>
                                    <input type='radio' style={{marginRight:'5px'}}
                                    value='100% down' onClick={handleInsert} name='mix'></input>
                                    100% down
                                </label>
                            </div>}
                        </div><br />
                    </div>
                </div>
                
                <div className='row dimensions-section'>
                    <div className='column'> 
                    <label>
                        Vendor:
                        <br />
                        <input type='text' id='mainvendor' className='fixed-width-input'></input>
                    </label>
                    <br />
                    </div>
                    <div className='column'> 
                        <label>
                            Pattern name & number:
                            <br />
                            <input type='text' id='mainpattern' className='fixed-width-input'></input>
                        </label>
                    </div>
                    <br />
                    <div className='column'> 
                        <label>
                            Link to fabric if available:
                            <br />
                            <input type='href' id='mainlink' placeholder=' ' className='fixed-width-input'></input>
                        </label>
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
        
        {/* <label>
            Please load a photo of the window:
            <input type='file' onChange={handleImageUpload} style={{marginLeft:'15px'}} multiple></input>
        </label><br /><br /> */}
    </div>
    </>)
}

export default Cushions;