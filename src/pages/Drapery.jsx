import React, { useEffect, useState } from 'react';
//import .env;

const Drapery = ({pname, name, address, email, room, numWindow, uploads, estName}) => {
    const[windowImg, setWindowImg] = useState(null);
    const[stationary, setStationary] = useState(false);
    const[lined, setLined] = useState('');
    const[pleat, setPleat] = useState('');
    const[ripplePercent, setRipplePercent] = useState('');
    const[fullness, setFullness] = useState('');
    const[hardware, setHardware] = useState('');
    const[hardwareType, setHardwareType] = useState('');
    const[hardwareDecorativeType, setHardwareDecorativeType] = useState('');
    let ringType = '';
    const[hardwired, setHardwired] = useState('');
    const[homeAuto, setHomeAuto] = useState('');
    const[com, setCom] = useState('');
    const[mainrailroad, setMainRailroad] = useState('');
    const[contrastrailroad, setContrastRailroad] = useState('');
    const[units1, setUnits1] = useState('in');
    const[units2, setUnits2] = useState('in');
    const[units3, setUnits3] = useState('in');
    const[folderID, setFolderID] = useState(null);
    const[yardage, setYardage] = useState(null);
    const[panels, setPanels] = useState(null);


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
    const linings = {
        "Unlined": 145.0,
        "Sheer": 155.0,
        'Lightweight Light Filter': 175.0,
        'Light Filter': 175.0,
        'Blackout': 210.0,
        'Napped Sateen': 185.0,
        'Lined and IStandard interlined': 245.0,
        'Lined and Bump Interlined': 275.0,
        'Self-Lined': 165.0,
        'Self-Lined and Blackout': 255.0,
        'Self-Lined and Standard Interlined': 225.0,
        'Self-Lined and Bump Interlined': 265.0,
        'French Blackout': 285.0
    }

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
    const handleRipple = (event) => {setRipplePercent(event.target.value);}
    const handleStationaryChange = (event) => {setStationary(event.target.value);}
    const handleLinedChange = (event) => {setLined(event.target.value);}
    const handlePleatChange = (event) => {setPleat(event.target.value);
        if (event.target.value === 'ripple'){setRipplePercent('60%')}
    }
    const handleHardwareChange = (event) => {setHardware(event.target.value);
        if(event.target.value === 'true'){setHardwareType('non-decorative');}
    }
    const handleHardwareTypeChange = (event) => {setHardwareType(event.target.value);
        if(event.target.value === 'decorative'){setHardwareDecorativeType('track');}
    }
    const handleHardwareDecorativeTypeChange = (event) => {setHardwareDecorativeType(event.target.value);
        if(event.target.value === 'motorized'){setHardwired('false');}
    }
    const handleHardwiredChange = (event) => {setHardwired(event.target.value);
        if(event.target.value === 'motorized'){setHomeAuto('false');}
    }
    const handleHomeAuto = (event) => {setHomeAuto(event.target.value);}
    const handleCom = (event) => {setCom(event.target.value);}
    const handleMainRailroad = (event) => {setMainRailroad(event.target.value);}
    const handleContrastRailroad = (event) => {setContrastRailroad(event.target.value);}

    //Window units
    const handleUnits1 = (event) => {setUnits1(event.target.value);}

    const [f2fw, f2fwc] = useState('');
    const [f2fh, f2fhc] = useState('');
    const [abvf, abvfc] = useState('');
    const [bsill, bsillc] = useState('');
    const [mountabvf, mountabvfc] = useState('');

    const handlef2fw = (e) => {f2fwc(e.target.value);};
    const handlef2fh = (e) => {f2fhc(e.target.value);};
    const handleabvf = (e) => {abvfc(e.target.value);};
    const handlebsill = (e) => {bsillc(e.target.value);};
    const handlemountabvf = (e) => {mountabvfc(e.target.value);};

    //Main fabric units
    const handleUnits2 = (event) => {setUnits2(event.target.value);}

    const [mainWidth, mainWidthChange] = useState('');
    const [mainVertical, mainVerticalChange] = useState('');
    const [mainHorizontal, mainHorizontalChange] = useState('');

    const handleMainWidth = (e) => {mainWidthChange(e.target.value);};
    const handleMainVertical = (e) => {mainVerticalChange(e.target.value);};
    const handleMainHorizontal = (e) => {mainHorizontalChange(e.target.value);};

    //Contrast fabric units
    const [contr, setContr] = useState(null);
    const handleUnits3 = (event) => {setUnits3(event.target.value);}

    const [contrastWidth, contrastWidthChange] = useState('');
    const [contrastVertical, contrastVerticalChange] = useState('');
    const [contrastHorizontal, contrastHorizontalChange] = useState('');

    const handleContrastWidth = (e) => {contrastWidthChange(e.target.value);};
    const handleContrastVertical = (e) => {contrastVerticalChange(e.target.value);};
    const handleContrastHorizontal = (e) => {contrastHorizontalChange(e.target.value);};

    const submitForm = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('Sheet', 'Drapery');
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
        if (units1 !== 'in'){
            formData.append('F2fw', document.getElementById('f2fw').value);
            formData.append('F2fh', document.getElementById('f2fh').value);
            formData.append('Abvf', document.getElementById('abvf').value);
            formData.append('Bsill', document.getElementById('bsill').value);
            formData.append('Mountabvf', document.getElementById('mountabvf').value);
        }
        else{
            formData.append('F2fw', document.getElementById('f2fw').value + f2fw);
            formData.append('F2fh', document.getElementById('f2fh').value + f2fh);
            formData.append('Abvf', document.getElementById('abvf').value + abvf);
            formData.append('Bsill', document.getElementById('bsill').value + bsill);
            formData.append('Mountabvf', document.getElementById('mountabvf').value + mountabvf);
        }
        formData.append('Stationary', stationary);

        if (lined === ''){formData.append('Lining', 'no');}
        else{formData.append('Lining', lined);}

        if (pleat === 'ripple'){formData.append('Pleat', ripplePercent + ' ripple');}
        else if (pleat === 'other'){formData.append('Pleat', document.getElementById('pleat_other').value);}
        else{formData.append('Pleat', pleat);}

        if (hardware === 'false'){formData.append('Hardware', 'no');}
        else if(hardwareType === 'non-decorative'){formData.append('Hardware', 'non-decorative');}
        else if(hardwareDecorativeType === 'track'){formData.append('Hardware', 'track');}
        else if(hardwareDecorativeType === 'rings'){formData.append('Hardware', 'rings: ' + document.getElementById('rings').value);}
        else if(hardwired === 'false'){formData.append('Hardware', 'motorized');}
        else if(homeAuto === 'false'){formData.append('Hardware', 'hardwired, no home-auto');}
        else{formData.append('Hardware', 'hardwired with home-auto system: ' + document.getElementById('homeauto').value);}
        
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
            setFolderID(data.folderID);
            uploads(prev => prev + 1);
            alert(data.msg);
        })
        .catch(err => console.log(err));

        uploadAllFiles();
    }

    useEffect(() => {
        if (pleat !=='ripple'){
            setRipplePercent('');
        }
    },[pleat])

    const uploadFile = () => {
        for (const file of windowImg){
            const fr = new FileReader();
            fr.readAsArrayBuffer(file);
            fr.onload = f => {
                
                const url = "https://script.google.com/macros/s/AKfycbwlwY47vpYlfYv8YA43q9TFm0VYSJiVuKlPV4m5OGt15_SBQsKkWBVJ-B5vAi1yiTdizg/exec";
                
                const qs = new URLSearchParams({filename: file.name, mimeType: file.type});
                fetch(`${url}?${qs}`, {method: "POST", body: JSON.stringify([...new Int8Array(f.target.result)])})
                .then(res => res.json())
                .then(e => console.log(e))
                .catch(err => console.log(err));
            }
        }
        alert("Images uploaded");
    };

    async function uploadAllFiles() {
        if (windowImg == null){
            console.log("no images to upload");
            return;
        }
        const url = "https://script.google.com/macros/s/AKfycbzsVchSaJPQySfT4Qk2hcXMdikph2EVy3PsAzD5p1AM7hJ-oqJodhMwYguy5kQdFlIH6A/exec";
      
        const uploadPromises = Array.from(windowImg).map(file => {
          return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.readAsArrayBuffer(file);
      
            fr.onload = f => {
                const body = JSON.stringify([...new Int8Array(f.target.result)]);
                // const body = f.target.result;
                const qs = new URLSearchParams({FolderID: folderID, FolderName: pname + '_' + name + '_' + address, filename: file.name, mimeType: file.type});
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

    const calcYardage = () => {
        let yardage;
        if(pleat === 'ripple'){
            let fabWidth = Number(mainWidth) + Number(document.getElementById('mainwidth').value);
            if (fabWidth == 0){fabWidth = 54;}
            let rw = (Number(f2fw) +  Number(document.getElementById('f2fw').value));
            if (panels == 2){
                rw = rw / 2;
            }
            const pw = rw * Number(fullness) + 7; //change to be 7 for one panel, 14 for two panel
            const widths = Math.ceil(pw / fabWidth);
            const cl = 14.0 + (Number(document.getElementById('f2fh').value)+Number(f2fh));
            if(Number(document.getElementById('mainvert').value) === 0 && Number(mainVertical) === 0){
                let ypp = cl / 36;
                yardage = ypp * widths;
            }
            else{
                const repeats = Math.ceil((Number(document.getElementById('f2fh').value) + Number(f2fh) + 14.0) / (Number(mainVertical) + Number(document.getElementById('mainvert').value)));
                const cl = repeats * (Number(mainVertical) + Number(document.getElementById('mainvert').value));
                let cutYards = cl / 36;
                cutYards += 9 - (cutYards % 9);
                yardage = cutYards * widths;
            }
            if (panels == 2){
                yardage *= 2;
            }
            setYardage(yardage);
            return;
        }
        else{
            if (mainrailroad === 'false'){
                if (stationary === 'true'){
                    //up the bolt, stationary, no vertical repeat
                    if(Number(document.getElementById('mainvert').value) === 0 && Number(mainVertical) === 0){
                        if (!document.getElementById('wpp') 
                        || !document.getElementById('mainwidth') 
                        || !document.getElementById('f2fh') 
                        || !document.getElementById('f2fw') ){
                            alert("Please fill out all relevant fields");
                            return;
                        }
                        let fabWidth = Number(mainWidth) + Number(document.getElementById('mainwidth').value);
                        if (fabWidth == 0){
                            fabWidth = 54;
                        }
                        let cutYards = (20.0 + Number(f2fh) + Number(document.getElementById('f2fh').value)) / 36;
                        if (pleat === 'ripple'){cutYards = (14.0 + Number(f2fh) + Number(document.getElementById('f2fh').value)) / 36;}
                        cutYards += 18 - (cutYards % 18);
                        const widths = (Number(f2fw) + Number(document.getElementById('f2fw').value)) / fabWidth;
                        setYardage(Number(document.getElementById('wpp').value) * widths / cutYards);
                        return;
                    }
                    //up the bolt, stationary, with vertical repeat
                    else{
                        if (!document.getElementById('wpp') 
                        ||!document.getElementById('f2fh') 
                        || !document.getElementById('f2fw') 
                        || !document.getElementById('mainvert') 
                        || !document.getElementById('mainwidth') 
                        ){
                            alert("Please fill out all relevant fields");
                            return;
                        }
                        let repeats = Math.ceil((Number(f2fh) +  Number(document.getElementById('f2fh').value) + 20.0) / (Number(mainVertical) + Number(document.getElementById('mainvert').value)));
                        if (pleat === 'ripple'){repeats = Math.ceil((Number(f2fh) +  Number(document.getElementById('f2fh').value) + 14.0) / (Number(mainVertical) + Number(document.getElementById('mainvert').value)));}
                        const cl = repeats * (Number(mainVertical) + Number(document.getElementById('mainvert').value));
                        let cutYards = cl / 36;
                        cutYards += 9 - cutYards % 9;
                        let fw = (Number(mainWidth) + Number(document.getElementById('mainwidth').value));
                        if (fw == 0){
                            fw = 54;
                        }
                        const widths = (Number(f2fw) + Number(document.getElementById('f2fw').value)) / fw;
                        setYardage(Number(document.getElementById('wpp').value) * widths / cutYards);
                        return;
                    }
                }
                //up the bolt, functional
                else if (stationary === 'false') {
                    if (!document.getElementById('f2fh') 
                    || !document.getElementById('f2fw') 
                    || !document.getElementById('mainwidth') 
                    || !fullness 
                    ){
                        alert("Please fill out all relevant fields");
                        return;
                    }
                    let cw = 20.0 + (Number(document.getElementById('f2fw').value)+Number(f2fw)) * Number(fullness);
                    if (pleat === 'ripple'){cw = 14.0 + (Number(document.getElementById('f2fw').value)+Number(f2fw)) * Number(fullness);}
                    let widths = cw / (Number(mainWidth) + Number(document.getElementById('mainwidth').value));
                    widths = widths.toFixed(3);
                    if (widths % 1 <= .30){//round down to full width
                        widths = Math.floor(widths);
                    }
                    else{//round up to nearest full width
                        widths = Math.ceil(widths);
                    }
                    let cutYards;
                    //no vertical repeat
                    if(Number(document.getElementById('mainvert').value) === 0 && Number(mainVertical) === 0){
                        cutYards = (Number(f2fh) +  Number(document.getElementById('f2fh').value) + 20.0) / 36;
                    }
                    else{
                        const repeats = Math.ceil((Number(document.getElementById('f2fh').value) + Number(f2fh) + 20.0) / (Number(mainVertical) + Number(document.getElementById('mainvert').value)));
                        const cl = repeats * (Number(mainVertical) + Number(document.getElementById('mainvert').value));
                        cutYards += 9 - cutYards % 9;
                        cutYards = cl / 36;
                    }
                    setYardage(widths * cutYards);
                    return;
                }
            }
            //railroaded
            else{
                //functional
                if (stationary === 'false') {
                    if (!document.getElementById('f2fh')
                    || !document.getElementById('f2fw')
                    || !fullness
                    ){
                        alert("Please fill out all relevant fields");
                        return;
                    }
                    let cw = 20.0 + (Number(document.getElementById('f2fw').value)+ Number(f2fw)) * fullness;
                    if (pleat === 'ripple'){cw = 14.0 + (Number(document.getElementById('f2fw').value)+ Number(f2fw)) * fullness;}
                    cw += 9 - cw % 9;
                    yardage = cw / 36;
                    const check = Number(document.getElementById('f2fh').value) + Number(f2fh) + 20;
                    if (check > cw){alert("Height is too much by " + (check-cw));}
                    setYardage(yardage);
                    return;
                }
                //stationary
                else{
                    if (!document.getElementById('wpp').value
                    || !document.getElementById('mainwidth')
                    || !panels
                    ){
                        alert("Please fill out all relevant fields");
                        return;
                    }
                    let fabWidth = Number(mainWidth) + Number(document.getElementById('mainwidth').value);
                    const widths = Number(document.getElementById('wpp').value) / fabWidth;
                    const ypp = widths * 54 / 36;
                    setYardage(ypp * panels);
                }
            }
        }
    }

    const [price, setPrice] = useState(null);
    const calcPrice = () => {
        
    }

    return(<>
        <div style={{border: 'grey solid 1px', padding:'5px'}}>
            <h1>Drapery</h1>
            <label>
                Please load a photo of the window:
                <input type='file' onChange={handleImageUpload} style={{marginLeft:'15px'}} multiple></input>
            </label><br></br><br></br>

            
            What are the approximate dimensions of the following?<br></br>
            {/* What units are the measurements in?
            <label>
                <input style={{marginLeft:'25px'}} value='cm' type='radio' name='units1' onChange={handleUnits1}></input> Centimeters
                <input value='in' type='radio' name='units1' onChange={handleUnits1}
                    style={{marginLeft:'25px'}} checked={units1 === 'in'}></input> Inches
            </label> */}
            <div>
                <label>
                    Rod width: 
                    <input type='number' id='f2fw' style={{marginLeft:'100px'}}></input>
                </label>
                {units1 === 'in' && <>
                    <Dropdown
                        value = {f2fw}
                        change = {handlef2fw}
                    ></Dropdown>
                </>}<br></br>
                <label>
                    Drapery height:
                    <input type='number' id='f2fh' style={{marginLeft:'65px'}}></input><br></br>
                </label>
                {units1 === 'in' && <>
                    <Dropdown
                        value = {f2fh}
                        change = {handlef2fh}
                    ></Dropdown>
                </>}<br></br>
                {/* <label>
                    Above frame to ceiling:
                    <input type='number' id='abvf' style={{marginLeft:'68px'}}></input>
                </label>
                {units1 === 'in' && <>
                    <Dropdown
                        value = {abvf}
                        change = {handleabvf}
                    ></Dropdown>
                </>}<br></br>
                <label>
                    Below sill to floor:
                    <input type='number' id='bsill' style={{marginLeft:'107px'}}></input>
                </label>
                {units1 === 'in' && <>
                    <Dropdown
                        value = {bsill}
                        change = {handlebsill}
                    ></Dropdown>
                </>}<br></br> */}
            {/* How far above frame will hardware be mounted (if known)?
            <br></br><input type='number' id='mountabvf'></input>
            {units1 === 'in' && <>
                <Dropdown
                    value = {mountabvf}
                    change = {handlemountabvf}
                ></Dropdown>
            </>}<br></br> */}
            </div>

            <br></br>

            Number of panels:
            <div>
                <label> 
                    <input type='radio' name='panels' style={{marginRight:'5px'}}
                    onChange={(e) => {setPanels(1)}}></input>
                    1
                </label> <br></br>
                <label> 
                    <input type='radio' name='panels' style={{marginRight:'5px'}}
                    onChange={(e) => {setPanels(2)}}></input>
                    2
                </label> <br></br>
                {/* <label> 
                    <input type='radio' name='panels' style={{marginRight:'5px'}}
                    value={3} onChange={(e) => {setPanels(e)}}></input>
                    3
                </label> <br></br> */}
                <br></br>
            </div>

            Will the panels be stationary?
            <div>
                <label style={{marginRight:'25px'}}> 
                    <input type='radio' name='stationary' style={{marginRight:'5px'}}
                    value={'true'} onChange={handleStationaryChange}></input>
                    Yes
                </label>  
                {stationary === 'true' && <>
                    What is the width per panel?
                    <input type='number' id='wpp'></input> 
                </>}<br></br>
                <label>
                    <input type='radio' name='stationary' style={{marginRight:'5px'}}
                    value={'false'} onChange={handleStationaryChange}></input>
                    No (if no, they will be fully functioning)
                </label> <br />
                <br></br> 
            </div>

            Lining preference
            <div>
                <label>
                    <input type='radio' name='liningType' style={{marginRight:'5px'}}
                    value={'Unlined'} onChange={handleLinedChange}></input>
                    Unlined
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' defaultChecked={true} style={{marginRight:'5px'}}
                    value={'Sheer'} onChange={handleLinedChange}></input>
                    Sheer lining
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px'}}
                    value={'Lightweight Light Filter'} onChange={handleLinedChange}></input>
                    Light weight light filtering lining (Poly cotton)
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px'}}
                    value={'Light Filter'} onChange={handleLinedChange}></input>
                    Regular Light filtering lining (100% cotton)
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px'}}
                    value={'Blackout'} onChange={handleLinedChange}></input>
                    Blackout lining
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px'}}
                    value={'Napped Sateen'} onChange={handleLinedChange}></input>
                   Napped Sateen
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px'}}
                    value={'Lined and IStandard Interlined'} onChange={handleLinedChange}></input>
                   Lined and IStandard Interlined
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px'}}
                    value={'Lined and Bump Interlined'} onChange={handleLinedChange}></input>
                   Lined and Bump Interlined
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px'}}
                    value={'Self-Lined'} onChange={handleLinedChange}></input>
                   Self-Lined
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px'}}
                    value={'Self-Lined and Blackout'} onChange={handleLinedChange}></input>
                   Self-Lined and Blackout
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px'}}
                    value={'Self-Lined and Standard Interlined'} onChange={handleLinedChange}></input>
                   Self-Lined and Standard Interlined
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px'}}
                    value={'Self-Lined and Bump Interlined'} onChange={handleLinedChange}></input>
                   Self-Lined and Bump Interlined
                </label><br></br>
                <label> 
                    <input type='radio' name='liningType' style={{marginRight:'5px'}}
                    value={'French Blackout'} onChange={handleLinedChange}></input>
                   French Blackout = Face fabric + 3 layered linings
                </label><br></br>
                <br></br>
            </div>

            What style pleat would you like (please see images below):
            <div>
                <label>
                    <input type='radio' name='pleat' style={{marginRight:'5px'}}
                    value={'2top'} onChange={handlePleatChange}></input>
                    2 finger top tack (Recommended 2x fullness)
                </label><br></br>
                <label> 
                    <input type='radio' name='pleat' style={{marginRight:'5px'}}
                    value={'2bot'} onChange={handlePleatChange}></input>
                    2 finger botton tack (Recommended 2x fullness)
                </label><br></br>
                <label>
                    <input type='radio' name='pleat' style={{marginRight:'5px'}}
                    value={'3top'} onChange={handlePleatChange}></input>
                    3 finger top tack (Recommended 2.5x or 3x fullness)
                </label><br></br>
                <label> 
                    <input type='radio' name='pleat' style={{marginRight:'5px'}}
                    value={'3bot'} onChange={handlePleatChange}></input>
                    3 finger bottom tack (Recommended 2.5x or 3x fullness)
                </label><br></br>
                <label>
                    <input type='radio' name='pleat' style={{marginRight:'5px'}}
                    value={'ripple'} onChange={handlePleatChange}></input>
                    Ripplefold
                </label><br></br>
                {(pleat === 'ripple') && <div>
                    <label> 
                        <input defaultChecked={true} type='radio' name='ripple%' id='ripple%' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'60%'} onChange={() => {handleRipple(); setFullness(1.6*fullness);}}></input>
                        60%
                    </label><br></br>
                    <label> 
                        <input type='radio' name='ripple%' id='ripple%' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'80%'} onChange={() => {handleRipple(); setFullness(1.8*fullness);}}></input>
                        80%
                    </label><br></br>
                    <label> 
                        <input type='radio' name='ripple%' id='ripple%' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'100%'} onChange={() => {handleRipple(); setFullness(2*fullness);}}></input>
                        100%
                    </label><br></br>
                    <label> 
                        <input type='radio' name='ripple%' id='ripple%' style={{marginRight:'5px', marginLeft:'25px'}}
                        value={'120%'} onChange={() => {handleRipple(); setFullness(2.2*fullness);}}></input>
                        120%
                    </label><br></br>
                </div>}
                <label> 
                    <input type='radio' name='pleat' style={{marginRight:'5px'}}
                    value={'other'} onChange={handlePleatChange}></input>
                    Other (Grommet, Rod-pocket, Cartridge, Tab-top … ):
                    <input type='text' id='pleat_other' placeholder='Other'></input>
                </label><br></br>
                {(pleat !== 'ripple') &&<>
                    <br></br>What is the fullness?<br></br>
                    <label>
                        <input type='radio' name='fullness' onClick={() => setFullness(1.5)}></input> 1.5
                    </label><br></br>
                    <label>
                        <input type='radio' name='fullness' onClick={() => setFullness(2)}></input> 2
                    </label><br></br>
                    <label>
                        <input type='radio' name='fullness' onClick={() => setFullness(2.25)}></input> 2.25
                    </label><br></br>
                    <label>
                        <input type='radio' name='fullness' onClick={() => setFullness(2.5)}></input> 2.5
                    </label><br></br>
                    <label>
                        <input type='radio' name='fullness' onClick={() => setFullness(2.75)}></input> 2.75
                    </label><br></br>
                    <label>
                        <input type='radio' name='fullness' onClick={() => setFullness(3)}></input> 3
                    </label> <br />
                </>} <br />
            </div>

            {/* Do you need hardware?
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
                        <input type='radio' defaultChecked={true} name='hardwareType' style={{marginRight:'5px', marginLeft:'25px'}}
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
                            <input type='radio' defaultChecked={true} name='hardwareDecorativeType' style={{marginRight:'5px', marginLeft:'50px'}}
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
                                <input id='rings'></input>
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
                                <input type='radio' defaultChecked={true} name='hardwired' style={{marginRight:'5px', marginLeft:'25px'}}
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
                                    <input type='radio' defaultChecked={true} name='homeAuto' style={{marginRight:'5px', marginLeft:'25px'}}
                                    value={'false'} onChange={handleHomeAuto}></input>
                                    No
                                </label><br></br>
                                <label>
                                    <input type='radio' name='homeAuto' style={{marginRight:'5px', marginLeft:'25px'}}
                                    value={'true'} onChange={handleHomeAuto}></input>
                                    Yes (what is it)? 
                                    <input id='homeauto'></input>
                                </label><br></br>
                            </div>}
                        </div>}
                    </div>}
                </div>}
                <br></br>
            </div> */}

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
                    value={'false'} onChange={handleMainRailroad}></input>
                    Up the bolt
                </label> <br></br>
                <label>
                    <input type='radio' name='mainrailroad' style={{marginRight:'5px'}}
                    value={'true'} onChange={handleMainRailroad}></input>
                    Railroading
                </label><br></br>
            </div><br></br>

            Are we using contrast fabric?
            <div>
                <label>
                    <input type="radio" name="contrast" style={{marginRight:'5px'}} onClick={() => {setContr("yes")}}/>
                    Yes
                </label> <br />
                <label>
                    <input type="radio" name="contrast" style={{marginRight:'5px'}} onClick={() => {setContr(null)}}/>
                    No
                </label>
            </div>
            {contr === "yes" && <div> <br />
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
            </div>}
            {yardage}<br></br>
            <button onClick={() =>  {calcYardage()}}>Calculate yardage</button>
            {/* <button onClick={submitForm}>Submit</button> */}
        </div>
    </>)
}

export default Drapery;