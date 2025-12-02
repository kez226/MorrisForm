import React, { useEffect, useState } from 'react';

const Pillows = ({pname, name, address, email, estName, formSection, handleFormSection}) => {
    const[windowImg, setWindowImg] = useState(null);
    const [pillowType, setPillowType] = useState('');
    const[units1, setUnits1] = useState('in');
    const[units2, setUnits2] = useState('in');
    const[units3, setUnits3] = useState('in');
    const [insert, setInsert] = useState('');
    const [edge, setEdge] = useState('');
    const [edgeOther, setEdgeOther] = useState('');
    const[com, setCom] = useState('');
    const [contrast, setContrast] = useState(false);
    const [yardage, setYardage] = useState(null);

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
    const handlePillow = (e) => {setPillowType(e.target.value);}
    const handleInsert = (e) => {setInsert(e.target.value);}
    const handleEdge = (e) => {setEdge(e.target.value);
        if (e.target.value === "Welt"){setEdgeOther("Self-welt")}
        if (e.target.value === "Flange"){setEdgeOther("Self-flange")}
    }
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
        formData.append('Sheet', 'Pillows');
        let date = new Date(Date.now());
        formData.append('Date', date.toLocaleString());
        formData.append('PName', pname);
        formData.append('EstName', estName);
        formData.append('Name', name);
        formData.append('Address', address);
        formData.append('Email', email);

        formData.append('Pillow', pillowType);
        formData.append('Units1', units1);
        formData.append('Size', document.getElementById('size').value);
        formData.append('Quantity', document.getElementById('quantity').value);

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

    const calcYardageOld = () => {
        if (!document.getElementById('length').value || !document.getElementById('depth').value){
            alert("Please fill out length and depth");
            setYardage(null)
            return;
        }
        let yardage = 0;
        let cutLength =  Number(document.getElementById('length').value) + 1;
        let cutWidth =  Number(document.getElementById('depth').value) + 1;
        let fabWidth = mainWidth + Number(document.getElementById('mainwidth').value);
        if (fabWidth == 0) {fabWidth = 54.0;}

        let repeats = null;
        let widths = 2;
        if (mainrailroad === "rr"){
            console.log("railroad")
            //if both panels fit side by side in one fabric width
            // you only need one width of fabric
            if (cutWidth * 2 <= fabWidth){
                widths--;
            }
            //panel too wide to fit in one piece
            //top to bottom seem needed, and maybe pattern matching (not added yet)
            else if (cutWidth > fabWidth){
                //adding in the seam allowance and set number of widths to 2
                cutWidth++;
                if ((cutWidth - fabWidth) * 2 <= fabWidth){
                    //only need one extra width of fabric for extra strip for both panels
                    //no need to add allowance bc alr added to cutlength
                    widths++;
                }
                else{
                    //you need two extra widths of fabric for the two strips
                    widths += 2;
                }
            }
            yardage = (widths * cutLength)
            console.log("widths = " + widths)
            console.log("cutLength = " + cutLength)
            console.log("yardage: " + yardage)
        }
        //this is up the bolt
        else{
            //if both panels fit side by side in one fabric width
            // you only need one width of fabric
            if (cutLength * 2 <= fabWidth){
                widths--;
            }
            //panel too wide to fit in one piece
            //top to bottom seem needed, and maybe pattern matching (not added yet)
            else if (cutLength > fabWidth){
                //adding in the seam allowance and set number of widths to 2
                cutLength++;
                if ((cutLength - fabWidth) * 2 <= fabWidth){
                    //only need one extra width of fabric for extra strip for both panels
                    //no need to add allowance bc alr added to cutlength
                    widths++;
                }
                else{
                    //you need two extra widths of fabric for the two strips
                    widths += 2;
                }
            }
            //if mainvert is empty (there is no vertical repeat)
            if (!document.getElementById('mainvert').value){
                yardage = (widths * cutWidth)
                // setYardage(yardage);
                console.log("widths = " + widths)
                console.log("cutWidth = " + cutWidth)
                console.log("yardage: " + yardage)
            }
            else{
                repeats = Math.ceil(cutWidth / (Number(document.getElementById('mainvert').value) + mainVertical));
                yardage = (widths * cutWidth * repeats)
                // setYardage(yardage);
                console.log("widths = " + widths)
                console.log("cutWidth = " + cutWidth)
                console.log("repeats = " + repeats)
                console.log("yardage: " + yardage)
                console.log("main width: " + fabWidth)
            }
        }

        yardage = yardage / 36.0
        if (yardage % 0.25 !== 0){yardage += 0.25 - (yardage % 0.25)}
        
        if (edge === 'Welt' && edgeOther ==='Self-welt'){
            yardage += 0.5; 
            console.log("welt: " + 0.5)
        }

        setYardage(yardage)
    }

    function calcYardage() {
        if (pillowType === 'Square') {
            // --- Input Validation and Setup ---
            if (!document.getElementById('length').value || !document.getElementById('depth').value){
                alert("Please fill out length and depth");
                setYardage(null)
                return;
            }

            // Convert inputs to numbers
            let W_FABRIC = Number(mainWidth) + Number(document.getElementById('mainwidth').value);
            if (W_FABRIC == 0) {W_FABRIC = 54.0;}
            const R_VERT = Number(mainVertical) + Number(document.getElementById("mainvert")) || 0;

            let cutLength =  Number(document.getElementById('length').value) + 1;
            let cutWidth =  Number(document.getElementById('depth').value) + 1;

            // --- Panel Sizing ---
            // Based on the observed website output (e.g., 18x18 pillow on 54" fabric -> 0.5 yards),
            // the calculator uses the pillow form dimensions (A and B) as the cut dimensions for the main panel.
            const panelCutWidth = cutLength;
            const panelCutLength = cutWidth;

            // Total number of panels needed (2 per pillow: Front and Back)
            const totalPanelsNeeded = 2;

            // --- Layout Optimization (Nesting) ---
            let totalFabricLengthNeeded = 0;

            // The logic is to fit as many panels as possible side-by-side across the fabric width (W_FABRIC).
            // We check both orientations (A across W_FABRIC, or B across W_FABRIC) for optimal yield.

            let piecesAcross = 0;
            let pieceLength = 0;

            // 1. Try laying the panel width (A) across the fabric width (W_FABRIC)
            const piecesAcross_A = Math.floor(W_FABRIC / panelCutWidth);
            const lengthPerCut_A = panelCutLength;

            // 2. Try laying the panel length (B) across the fabric width (W_FABRIC)
            const piecesAcross_B = Math.floor(W_FABRIC / panelCutLength);
            const lengthPerCut_B = panelCutWidth;

            // Choose the orientation that yields more pieces across the width
            if (piecesAcross_A >= piecesAcross_B) {
                piecesAcross = piecesAcross_A;
                pieceLength = lengthPerCut_A;
            } else {
                // This means the pillow is rotated 90 degrees for the cut
                piecesAcross = piecesAcross_B;
                pieceLength = lengthPerCut_B;
            }

            if (piecesAcross === 0) {
                console.error("Pillow is too large to fit on the fabric width.");
                return null;
            }

            // Calculate the number of "cuts" (lengths) needed from the fabric roll
            const cutsNeeded = Math.ceil(totalPanelsNeeded / piecesAcross);

            // Total fabric length is the number of cuts multiplied by the length of each cut
            totalFabricLengthNeeded = cutsNeeded * pieceLength;

            // --- Pattern Matching Consideration ---
            if (R_VERT > 0) {
                // Round up the total length needed to the nearest multiple of the vertical repeat
                totalFabricLengthNeeded = Math.ceil(totalFabricLengthNeeded / R_VERT) * R_VERT;
            }

            // --- Final Yardage Calculation ---
            // Convert total length in inches to yards
            let calculatedYardage = totalFabricLengthNeeded / 36.0;

            // Round up to the nearest 0.25 yard (as seen in the box cushion code)
            calculatedYardage = Math.ceil(calculatedYardage * 4) / 4;

            setYardage(calculatedYardage);
        }else{
            // --- Input Validation and Setup ---
            if (!document.getElementById('length').value || !document.getElementById('depth').value){
                alert("Please fill out length and depth");
                setYardage(null)
                return;
            }

            const D = Number(document.getElementById('depth').value) + 1;
            const L = Number(document.getElementById('length').value) + 1;
            let W_FABRIC = Number(mainWidth) + Number(document.getElementById('mainwidth').value);
            if (W_FABRIC == 0) {W_FABRIC = 54.0;}
            const R_VERT = Number(mainVertical) + Number(document.getElementById("mainvert")) || 0;
            const PI = Math.PI;

            // --- Piece Sizing (Based on Sewing Logic) ---
            // 1. End Circles (Cut as a square/rectangle for nesting purposes)
            // D_cut = Diameter + 0.5 inches (for seam allowance)
            const D_CUT = D + 0.5;
            const circleCutSize = D_CUT;

            // 2. Barrel Piece (a rectangle)
            // L_barrel = Length + 0.5 inches (for seam allowance on the two ends)
            const L_BARREL = L + 0.5;
            // W_barrel = Circumference + Closure Overlap (2 inches, as stated on the webpage)
            const W_BARREL = (PI * D) + 2.0;

            // --- Total Pieces Needed ---
            const barrelPiecesNeeded = 1;
            const circlePiecesNeeded = 2;

            // --- Layout Optimization (Nesting) ---
            let totalFabricLength = 0;
            let currentWidth = 0;
            let maxRowLen = 0;

            // Helper to add a piece (length, width)
            const addPieceToLayout = (len, wid, count) => {
                for (let i = 0; i < count; i++) {
                    // Check if piece fits in the current row
                    if (currentWidth + wid <= W_FABRIC) {
                        currentWidth += wid;
                        maxRowLen = Math.max(maxRowLen, len);
                    } else {
                        // Start a new row
                        totalFabricLength += maxRowLen;
                        currentWidth = wid;
                        maxRowLen = len;
                    }
                }
            };

            // 1. Barrel Pieces (Q pieces) - Choose the best orientation for the barrel piece
            // Orientation 1: L_BARREL along warp (length), W_BARREL across fabric (width)
            const barrelLen1 = L_BARREL;
            const barrelWid1 = W_BARREL;
            const piecesAcross1 = Math.floor(W_FABRIC / barrelWid1);

            // Orientation 2: W_BARREL along warp (length), L_BARREL across fabric (width)
            const barrelLen2 = W_BARREL;
            const barrelWid2 = L_BARREL;
            const piecesAcross2 = Math.floor(W_FABRIC / barrelWid2);

            // Choose the orientation that allows more pieces across or has a shorter length if pieces across are equal
            // This is a robust nesting heuristic.
            if (piecesAcross1 * barrelLen1 <= piecesAcross2 * barrelLen2) {
                addPieceToLayout(barrelLen1, barrelWid1, barrelPiecesNeeded);
            } else {
                addPieceToLayout(barrelLen2, barrelWid2, barrelPiecesNeeded);
            }

            // 2. End Circles (2*Q pieces) - Treat as squares
            addPieceToLayout(circleCutSize, circleCutSize, circlePiecesNeeded);

            // Add the length of the last row
            totalFabricLength += maxRowLen;

            // --- Pattern Matching Consideration ---
            if (R_VERT > 0) {
                // Round up the total length needed to the nearest multiple of the vertical repeat
                totalFabricLength = Math.ceil(totalFabricLength / R_VERT) * R_VERT;
            }

            // --- Final Yardage Calculation ---
            // Convert total length in inches to yards
            let calculatedYardage = totalFabricLength / 36.0;

            // Round up to the nearest 0.25 yard
            calculatedYardage = Math.ceil(calculatedYardage * 4) / 4;

            return calculatedYardage;
        }
    }

    const checkNum = (e) => {if (!e.target.validity.valid) e.target.value = '';}
    
    return(<>
    <div style={{border: 'grey solid 1px', padding:'5px'}}>
        <h1>Pillows</h1>
        <label>
            Please load a photo of the window:
            <input type='file' onChange={handleImageUpload} style={{marginLeft:'15px'}} multiple></input>
        </label><br></br><br></br>
        
        Please select one:
        <br></br><label>
            <input type='radio' name='pillow type' style={{marginRight:'5px'}}
            value={'Square'} onChange={handlePillow}></input>
            Square
        </label>
        {/* <br></br><label>
            <input type='radio' name='pillow type' style={{marginRight:'5px'}}
            value={'Rectangular'} onChange={handlePillow}></input>
            Rectangular lumbars
        </label> */}
        <br></br><label>
            <input type='radio' name='pillow type' style={{marginRight:'5px'}}
            value={'Round'} onChange={handlePillow}></input>
            Round
        </label><br></br>

        <br></br>
        What units are the measurements in?
        <label>
            <input style={{marginLeft:'25px'}} value='cm' type='radio' name='units1' onChange={handleUnits1}></input> Centimeters
            <input value='in' type='radio' name='units1' onChange={handleUnits1}
                style={{marginLeft:'25px'}} checked={units1 === 'in'}></input> Inches
        </label>
        <br></br><label>
            Length:
            <input type='number' style={{marginLeft: '48px'}} id='length'></input>
        </label>
        <br></br><label>
            Depth:
            <input type='number' style={{marginLeft: '54px'}} id='depth'></input>
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
                value='25/75 Down Feather' onClick={handleInsert} name='insert'></input>
                Down & Feather Mix (please note prices increase with down count):
            </label>
            {insert !== '' && insert !== 'Cover only' && insert !== 'Dacron' && insert !== 'Outdoor' && insert !== '50/50 Dacron' &&
            <div><label style={{marginLeft:'25px'}}>
                    <input type='radio' style={{marginRight:'5px'}}
                    value='10/90 Down Feather' onClick={handleInsert} name='mix'></input>
                    10 / 90 Down & Feather mix
                </label>
                <br></br><label style={{marginLeft:'25px'}}>
                    <input type='radio' style={{marginRight:'5px'}} defaultChecked={true}
                    value='25/75 Down Feather' onClick={handleInsert} name='mix'></input>
                    25 / 75 (Plaza Park standard)
                </label>
                <br></br><label style={{marginLeft:'25px'}}>
                    <input type='radio' style={{marginRight:'5px'}}
                    value='50/50 Down Feather' onClick={handleInsert} name='mix'></input>
                    50 / 50 Down & Feather mix
                </label>
                <br></br><label style={{marginLeft:'25px'}}>
                    <input type='radio' style={{marginRight:'5px'}}
                    value='80/20 Down Feather' onClick={handleInsert} name='mix'></input>
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
                    <input type='radio' name='welt' value={'Self-welt'} defaultChecked={true}
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
                    <input type='radio' name='welt' value={'Self-flange'} defaultChecked={true}
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
                How are we running the fabric
                <br></br><label> 
                    <input type='radio' name='mainrailroad' style={{marginRight:'5px'}}
                    value={'utb'} onChange={handleMainRailroad}></input>
                    Up the bolt
                </label> <br></br>
                <label>
                    <input type='radio' name='mainrailroad' style={{marginRight:'5px'}}
                    value={'rr'} onChange={handleMainRailroad}></input>
                    Railroaded
                </label><br></br>
            </div><br></br>

            Are we using contrast fabric?
            <div>
                <label>
                    <input type="radio" name="contrast" style={{marginRight:'5px'}} onClick={() => {setContrast(true)}}/>
                    Yes
                </label> <br />
                <label>
                    <input type="radio" name="contrast" style={{marginRight:'5px'}} onClick={() => {setContrast(false)}}/>
                    No
                </label>
            </div>
            {contrast && <>
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
            </>}
            
            <br /><button onClick={calcYardage}>Calculate Yardage</button>
            {yardage}
            <button onClick={submitForm}>Submit</button>
    </div>
    </>)
}

export default Pillows;