import React, { useEffect, useState } from 'react';

const Cushions = ({pname, name, address, email, estName}) => {
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
        if (!document.getElementById('length').value || !document.getElementById('depth').value){
            alert("Please fill out length and depth");
            setYardage(null)
            return;
        }
        let yardage = 0;
        let cutLength = length + Number(document.getElementById('length').value) + 1;
        let cutWidth = depth + Number(document.getElementById('depth').value) + 1;
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
            yardage += 9 - (yardage % 9)
            yardage = yardage / 36.0
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
            }
        }

        let cutHeight = thickness + Number(document.getElementById('thickness').value) + 1;
        let boxLength = 2 * (cutLength + cutWidth) + 2;
        let numBoxStrips = Math.ceil(boxLength / fabWidth)

        //no fabric repeat
        if (!document.getElementById('mainvert').value){
            //multiply the number of strips by the cut height and add to final yardage
            let add = numBoxStrips * cutHeight
            console.log("boxing: " + add)
            yardage += add
            yardage = yardage / 36.0
            if (yardage % 0.25 !== 0){yardage += 0.25 - (yardage % 0.25)}
        }
        //with vertical fabric repeat so we need to make sure we have enough
        //repeats with the pattern
        else{
            let add = repeats * cutHeight
            console.log("box: " + add)
            console.log("repeats: " + repeats)
            console.log("cutHeight: " + cutHeight)
            yardage += add
            yardage = yardage / 36.0
            if (yardage % 0.25 !== 0){yardage += 0.25 - (yardage % 0.25)}

            // //check if we have enough excess fabric for other boxing panels
            // let useYardage =(2 * (cutLength * cutWidth) + cutHeight * boxLength) / 1296
            // console.log("used yardage: " + useYardage)
            // console.log("yardage: " + yardage)

            // //if we don't have enough fabric, set to amount we use
            // if (useYardage > yardage){
            //     yardage = useYardage;
            //     if (yardage % 0.25 != 0){yardage += 0.25 - (yardage % 0.25)}
            // }
        }
        
        if (edge === 'Welt' && edgeOther ==='Self-welt'){
            yardage += 0.5; 
            console.log("welt: " + 0.5)
        }

        setYardage(yardage)
    }

    return(<>
    <div style={{border: 'grey solid 1px', padding:'5px'}}>
        <h1>Cushions</h1>
        <label>
            Please load a photo of the window:
            <input type='file' onChange={handleImageUpload} style={{marginLeft:'15px'}} multiple></input>
        </label><br></br><br></br>

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
            Length:
            <input type='number' style={{marginLeft: '50px'}} id='length'></input>
            <Dropdown
                value = {length}
                change = {handleLength}
            ></Dropdown>
        </label>
        <br></br><label>
            Depth:
            <input type='number' style={{marginLeft: '56px'}} id='depth'></input>
            <Dropdown
                value = {depth}
                change = {handleDepth}
            ></Dropdown>
        </label>
        <br></br><label>
            Thickness:
            <input type='number' style={{marginLeft: '27px'}} id='thickness'></input>
            <Dropdown
                value = {thickness}
                change = {handleThickness}
            ></Dropdown>
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
                How are we running the fabric?
                <br></br><label> 
                    <input type='radio' name='mainrailroad' style={{marginRight:'5px'}}
                    value={"utb"} onChange={handleMainRailroad} defaultChecked={true}></input>
                    Up the bolt
                </label> <br></br>
                <label>
                    <input type='radio' name='mainrailroad' style={{marginRight:'5px'}}
                    value={"rr"} onChange={handleMainRailroad}></input>
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
                </div>
            </>}


            <br /><button onClick={calcYardage}>Calculate Yardage</button>
            {yardage}

            <br /><button onClick={submitForm}>Submit</button>
    </div>
    </>)
}

export default Cushions;