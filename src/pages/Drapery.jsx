import React, { useEffect, useState } from 'react';
import '../styles.css'
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
        'Lined and Standard Interlined': 245.0,
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
            return;
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

        if (!yardage || ! price){
            alert("Please calculate yardage and price first");
            return;
        }
        formData.append("Yardage", yardage);
        formData.append("Price", price);
        formData.append("Embellishments", bandingType);

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
                <select value={value} onChange={(e) => change(e)} className="select-input fixed-width-input">
                    {fractions.map((fraction) => (
                    <option key={fraction.value} value={fraction.value}>
                        {fraction.label}
                    </option>
                    ))}
                </select>
            </>
        )
    }

    const calcYardage = () => {
        let yardage;
        if(pleat === 'ripple'){
            if ( !document.getElementById('f2fh').value
            || !document.getElementById('f2fw').value ){
                alert("Please fill out all relevant fields");
                return;
            }
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
                        if (!document.getElementById('wpp').value
                        || !document.getElementById('f2fh').value
                        || !document.getElementById('f2fw').value){
                            alert("Please fill out all relevant fields");
                            return;
                        }
                        let fabWidth = Number(mainWidth) + Number(document.getElementById('mainwidth').value);
                        if (fabWidth == 0){fabWidth = 54;}
                        let cutYards = (20.0 + Number(f2fh) + Number(document.getElementById('f2fh').value)) / 36;
                        cutYards += 18 - (cutYards % 18);
                        const widths = (Number(f2fw) + Number(document.getElementById('f2fw').value)) / fabWidth;
                        setYardage(Number(document.getElementById('wpp').value) * widths / cutYards);
                        return;
                    }
                    //up the bolt, stationary, with vertical repeat
                    else{
                        if (!document.getElementById('wpp').value
                        ||!document.getElementById('f2fh').value
                        || !document.getElementById('f2fw').value
                        || !document.getElementById('mainvert').value
                        ){
                            alert("Please fill out all relevant fields");
                            return;
                        }
                        const repeats = Math.ceil((Number(f2fh) +  Number(document.getElementById('f2fh').value) + 20.0) / (Number(mainVertical) + Number(document.getElementById('mainvert').value)));
                        const cl = repeats * (Number(mainVertical) + Number(document.getElementById('mainvert').value));
                        let cutYards = cl / 36;
                        cutYards += 9 - cutYards % 9;
                        let fw = (Number(mainWidth) + Number(document.getElementById('mainwidth').value));
                        if (fw == 0){fw = 54;}
                        const widths = (Number(f2fw) + Number(document.getElementById('f2fw').value)) / fw;
                        setYardage(Number(document.getElementById('wpp').value) * widths / cutYards);
                        return;
                    }
                }
                //up the bolt, functional
                else if (stationary === 'false') {
                    if (!document.getElementById('f2fh').value
                    || !document.getElementById('f2fw').value
                    || !fullness 
                    ){
                        alert("Please fill out all relevant fields");
                        return;
                    }
                    const cw = 14.0 + (Number(document.getElementById('f2fw').value)+Number(f2fw)) * Number(fullness);
                    let width = Number(mainWidth) + Number(document.getElementById('mainwidth').value)
                    if (width === 0){width = 54;}
                    let widths = cw / width;
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
                    if (!document.getElementById('f2fh').value
                    || !document.getElementById('f2fw').value
                    || !fullness
                    ){
                        alert("Please fill out all relevant fields");
                        return;
                    }
                    let cw = 14.0 + (Number(document.getElementById('f2fw').value)+ Number(f2fw)) * fullness;
                    cw += 9 - cw % 9;
                    yardage = cw / 36;
                    let check = Number(document.getElementById('f2fh').value) + Number(f2fh);
                    if (pleat === "ripple"){check += 14}
                    else{check += 20}
                    let fabWidth = Number(mainWidth) + Number(document.getElementById('mainwidth').value);
                    if (fabWidth === 0) {fabWidth = 54}
                    if (check > fabWidth){alert("Height is too much by " + (check-fabWidth)); return;}
                    setYardage(yardage);
                    return;
                }
                //stationary
                else{
                    if (!document.getElementById('wpp').value
                    || !document.getElementById('f2fh').value
                    || !panels
                    ){
                        alert("Please fill out all relevant fields");
                        return;
                    }
                    let fabWidth = Number(mainWidth) + Number(document.getElementById('mainwidth').value);
                    if (fabWidth === 0) {fabWidth = 54}
                    const widths = Number(document.getElementById('wpp').value) / fabWidth;
                    const ypp = widths * 54 / 36;
                    let check = Number(document.getElementById('f2fh').value) + Number(f2fh);
                    if (pleat === "ripple"){check += 14}
                    else{check += 20}
                    if (check > fabWidth){alert("Height is too much by " + (check-fabWidth)); return;}
                    setYardage(ypp * panels);
                }
            }
        }
    }

    const [banding, setBanding] = useState(false);
    const [bandingType, setBandingType] = useState(null);

    useEffect(() => {
        if (!banding){
            setBandingType(null);
        }
    },[banding])

    const [price, setPrice] = useState(null);
    const calcPrice = () => {
        if (!fullness || !document.getElementById("f2fw").value || !document.getElementById("f2fh").value
        || !lined || !pleat){
            alert("Please fill out all relevant fields");
            return;
        }
        const width = Number(document.getElementById('f2fw').value) + Number(f2fw);
        let height = Number(document.getElementById('f2fh').value) + Number(f2fh);
        const widths = Math.ceil((width) * fullness / 54.0);
        let costPerWidth = linings[lined];
        if (pleat === "ripple") {costPerWidth += 15;}
        const basePrice = widths * costPerWidth;
        let bandingPrice = 0;
        if (banding){
            if (document.getElementById("banding bottom").checked){
                bandingPrice += Math.ceil(width * fullness / 12);
            }
            if (document.getElementById("banding top").checked){
                bandingPrice += Math.ceil(width * fullness / 12);
            }
            if (document.getElementById("banding inside").checked){
                bandingPrice += 2 * Math.ceil((height + 10) / 12);
            }
            if (document.getElementById("banding outside").checked){
                bandingPrice += 2 * Math.ceil((height + 10) / 12);
            }
            bandingPrice *= 13;
        }
        setPrice(basePrice + " for yardage + " + bandingPrice + " for banding = " + (basePrice + bandingPrice));
    }

    return(<>
        <div className="container">
            <h1>Drapery</h1>
            <label className="file-upload-label">
                Please load a photo of the window:
                <input type='file' onChange={handleImageUpload} multiple></input>
            </label><br></br><br></br>

            <div className="form-section">
                <h4>What are the approximate dimensions of the following?</h4>
                <div className='row dimensions-section'>
                <div className='column'>
                    <label>
                    Rod width:
                    <input className='fixed-width-input' type='number' id='f2fw'></input>
                    </label>
                    {units1 ==='in' && <>
                    <Dropdown
                        value={f2fw}
                        change={handlef2fw}
                    ></Dropdown>
                    </>}<br></br>
                </div>
                <div className='column'>
                    <label>
                    Drapery height:
                    <input className='fixed-width-input' type='number' id='f2fh'></input><br></br>
                    </label>
                    {units1 ==='in' && <>
                    <Dropdown
                        value={f2fh}
                        change={handlef2fh}
                    ></Dropdown>
                    </>}
                </div>
                </div>
            </div>

            <div className="form-section">
                <h4>Number of panels:</h4>
                <div>
                <label className="radio-label">
                    <input type='radio' name='panels'
                    onChange={(e) => {setPanels(1)}}></input>
                    1
                </label>
                <label className="radio-label">
                    <input type='radio' name='panels'
                    onChange={(e) => {setPanels(2)}}></input>
                    2
                </label>
                </div>
            </div>

            <div className="form-section">
                <h4>Will the panels be stationary?</h4>
                <div>
                <label className="radio-label">
                    <input type='radio' name='stationary'
                    value={'true'} onChange={handleStationaryChange}></input>
                    Yes
                </label>
                {stationary === 'true' && <div className="sub-option-indent">
                    <label>
                    What is the width per panel?
                    <input type='number' id='wpp' className='fixed-width-input'></input>
                    </label>
                </div>}
                <label className="radio-label">
                    <input type='radio' name='stationary'
                    value={'false'} onChange={handleStationaryChange}></input>
                    No (if no, they will be fully functioning)
                </label>
                </div>
            </div>

            <div className="form-section">
                <h4>Lining preference</h4>
                <div>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'Unlined'} onChange={handleLinedChange}></input>
                    Unlined
                </label>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'Sheer'} onChange={handleLinedChange}></input>
                    Sheer lining
                </label>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'Lightweight Light Filter'} onChange={handleLinedChange}></input>
                    Light weight light filtering lining (Poly cotton)
                </label>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'Light Filter'} onChange={handleLinedChange}></input>
                    Regular Light filtering lining (100% cotton)
                </label>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'Blackout'} onChange={handleLinedChange}></input>
                    Blackout lining
                </label>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'Napped Sateen'} onChange={handleLinedChange}></input>
                    Napped Sateen
                </label>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'Lined and Standard Interlined'} onChange={handleLinedChange}></input>
                    Lined and IStandard interlined
                </label>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'Lined and Bump Interlined'} onChange={handleLinedChange}></input>
                    Lined and Bump Interlined
                </label>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'Self-Lined'} onChange={handleLinedChange}></input>
                    Self-Lined
                </label>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'Self-Lined and Blackout'} onChange={handleLinedChange}></input>
                    Self-Lined and Blackout
                </label>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'Self-Lined and Standard Interlined'} onChange={handleLinedChange}></input>
                    Self-Lined and standard Interlined
                </label>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'Self-Lined and Bump Interlined'} onChange={handleLinedChange}></input>
                    Self-Lined and Bump Interlined
                </label>
                <label className="radio-label">
                    <input type='radio' name='liningType'
                    value={'French Blackout'} onChange={handleLinedChange}></input>
                    French Blackout = Face fabric + 3 layered linings
                </label>
                </div>
            </div>

            <div className="form-section">
                <h4>What style pleat would you like (please see images below):</h4>
                <div>
                <label className="radio-label">
                    <input type='radio' name='pleat'
                    value={'2top'} onChange={handlePleatChange}></input>
                    2 finger top tack (Recommended 2x fullness)
                </label>
                <label className="radio-label">
                    <input type='radio' name='pleat'
                    value={'2bot'} onChange={handlePleatChange}></input>
                    2 finger botton tack (Recommended 2x fullness)
                </label>
                <label className="radio-label">
                    <input type='radio' name='pleat'
                    value={'3top'} onChange={handlePleatChange}></input>
                    3 finger top tack (Recommended 2.5x or 3x fullness)
                </label>
                <label className="radio-label">
                    <input type='radio' name='pleat'
                    value={'3bot'} onChange={handlePleatChange}></input>
                    3 finger bottom tack (Recommended 2.5x or 3x fullness)
                </label>
                <label className="radio-label">
                    <input type='radio' name='pleat'
                    value={'ripple'} onChange={handlePleatChange}></input>
                    Ripplefold
                </label>
                {(pleat === 'ripple') && <div className="sub-option-indent">
                    <label className="radio-label">
                    <input defaultChecked={true} type='radio' name='ripple%'
                    value={'60%'} onChange={(e) => {handleRipple(e); setFullness(1.6);}}></input>
                    60%
                    </label>
                    <label className="radio-label">
                    <input type='radio' name='ripple%'
                    value={'80%'} onChange={(e) => {handleRipple(e); setFullness(1.8);}}></input>
                    80%
                    </label>
                    <label className="radio-label">
                    <input type='radio' name='ripple%'
                    value={'100%'} onChange={(e) => {handleRipple(e); setFullness(2);}}></input>
                    100%
                    </label>
                    <label className="radio-label">
                    <input type='radio' name='ripple%'
                    value={'120%'} onChange={(e) => {handleRipple(e); setFullness(2.2);}}></input>
                    120%
                    </label>
                </div>}
                <label className="radio-label">
                    <input type='radio' name='pleat'
                    value={'other'} onChange={handlePleatChange}></input>
                    Other (Grommet, Rod-pocket, Cartridge, Tab-top … ):
                    <input type='text' id='pleat_other' placeholder='Other' className='fixed-width-input'></input>
                </label>
                {(pleat !== 'ripple') &&<>
                    <br></br><h4>What is the fullness?</h4>
                    <label className="radio-label">
                    <input type='radio' name='fullness' onClick={() => setFullness(1.5)}></input> 1.5
                    </label>
                    <label className="radio-label">
                    <input type='radio' name='fullness' onClick={() => setFullness(2)}></input> 2
                    </label>
                    <label className="radio-label">
                    <input type='radio' name='fullness' onClick={() => setFullness(2.25)}></input> 2.25
                    </label>
                    <label className="radio-label">
                    <input type='radio' name='fullness' onClick={() => setFullness(2.5)}></input> 2.5
                    </label>
                    <label className="radio-label">
                    <input type='radio' name='fullness' onClick={() => setFullness(2.75)}></input> 2.75
                    </label>
                    <label className="radio-label">
                    <input type='radio' name='fullness' onClick={() => setFullness(3)}></input> 3
                    </label>
                </>} <br />
                </div>
            </div>

            <div className="form-section">
                <h4>Are you using COM material?</h4>
                <div>
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
            </div>

            <div className="form-section">
                <h4>Main Fabric specifications: <small>Please note all yardage will be based on 54” wide, solid goods if specifications are not provided.</small></h4>
                <div>
                <label>What units are the measurements in?</label>
                <label className="radio-label sub-option-indent">
                    <input value='cm' type='radio' name='units2' onChange={handleUnits2}></input> Centimeters
                </label>
                <label className="radio-label sub-option-indent">
                    <input value='in' type='radio' name='units2' onChange={handleUnits2}
                    checked={units2 === 'in'}></input> Inches
                </label>
                <br></br>
                <label>
                    Vendor:
                    <br />
                    <input type='text' id='mainvendor' className='fixed-width-input'></input>
                </label>
                <br></br>
                <label>
                    Pattern name & number:
                    <br />
                    <input type='text' id='mainpattern' className='fixed-width-input'></input>
                </label>
                <br></br>
                <label>
                    Link to fabric if available:
                    <br />
                    <input type='href' id='mainlink' placeholder=' ' className='fixed-width-input'></input>
                </label><br></br>
                <label>
                    Width:
                    <br />
                    <input type='number' id='mainwidth' className='fixed-width-input'></input>
                </label>
                {units2 === 'in' && <>
                    <Dropdown
                    value={mainWidth}
                    change={handleMainWidth}
                    ></Dropdown>
                </>}
                <br></br>
                <label>
                    Vertical repeat:
                    <br />
                    <input type='number' id='mainvert' className='fixed-width-input'></input>
                </label>
                {units2 === 'in' && <>
                    <Dropdown
                    value={mainVertical}
                    change={handleMainVertical}
                    ></Dropdown>
                </>}
                <br></br>
                <label>
                    Horizontal repeat:
                    <br />
                    <input type='number' id='mainhorizontal' className='fixed-width-input'></input>
                </label>
                {units2 === 'in' && <>
                    <Dropdown
                    value={mainHorizontal}
                    change={handleMainHorizontal}
                    ></Dropdown>
                </>}
                <br></br>
                <label>How are we running the fabric?</label>
                <label className="radio-label">
                    <input type='radio' name='mainrailroad'
                    value={'false'} onChange={handleMainRailroad}></input>
                    Up the bolt
                </label>
                <label className="radio-label">
                    <input type='radio' name='mainrailroad'
                    value={'true'} onChange={handleMainRailroad}></input>
                    Railroading
                </label>
                </div>
            </div>

            <div className="form-section">
                <h4>Embellishments</h4>
                <div>
                <label className="checkbox-label">
                    <input type="checkbox" onChange={() => {setBanding(!banding)}}/>
                    Ready to use banding/trim
                </label>
                {banding && <div className="sub-option-indent">
                    <label className="checkbox-label">
                    <input type="checkbox" name="banding-type" id='banding bottom'/>
                    Bottom
                    </label>
                    <label className="checkbox-label">
                    <input type="checkbox" name="banding-type" id='banding inside'/>
                    Inside Edge
                    </label>
                    <label className="checkbox-label">
                    <input type="checkbox" name="banding-type" id='banding outside'/>
                    Outside Edge
                    </label>
                    <label className="checkbox-label">
                    <input type="checkbox" name="banding-type" id='banding top'/>
                    Top
                    </label>
                </div>}
                </div>
            </div>

            <div className="form-section">
                <h4>Are we using contrast fabric?</h4>
                <div>
                <label className="radio-label">
                    <input type="radio" name="contrast" onClick={() => {setContr("yes")}}/>
                    Yes
                </label>
                <label className="radio-label">
                    <input type="radio" name="contrast" onClick={() => {setContr(null)}}/>
                    No
                </label>
                </div>
                {contr === "yes" && <div className="sub-option-indent">
                <h4>Contrast Fabric specifications:</h4>
                <div>
                    <label>What units are the measurements in?</label>
                    <label className="radio-label sub-option-indent">
                    <input value='cm' type='radio' name='units3' onChange={handleUnits3}></input> Centimeters
                    </label>
                    <label className="radio-label sub-option-indent">
                    <input value='in' type='radio' name='units3' onChange={handleUnits3}
                    checked={units3 === 'in'}></input> Inches
                    </label>
                    <br></br>
                    <label>
                    Vendor:
                    <input type='text' id='contrastvendor' className='fixed-width-input'></input>
                    </label>
                    <br></br>
                    <label>
                    Pattern name & number:
                    <input type='text' id='contrastpattern' className='fixed-width-input'></input>
                    </label>
                    <br></br>
                    <label>
                    Link to fabric if available:
                    <input type='href' id='contrlink' className='full-width-input'></input>
                    </label><br></br>
                    <label>
                    Width:
                    <input type='number' id='contrastwidth' className='fixed-width-input'></input>
                    </label>
                    {units3 === 'in' && <>
                    <Dropdown
                        value={contrastWidth}
                        change={handleContrastWidth}
                    ></Dropdown>
                    </>}
                    <br></br>
                    <label>
                    Vertical repeat:
                    <input type='number' id='contrastvert' className='fixed-width-input'></input>
                    </label>
                    {units3 === 'in' && <>
                    <Dropdown
                        value={contrastVertical}
                        change={handleContrastVertical}
                    ></Dropdown>
                    </>}
                    <br></br>
                    <label>
                    Horizontal repeat:
                    <input type='number' id='contrasthorizontal' className='fixed-width-input'></input>
                    </label>
                    {units3 === 'in' && <>
                    <Dropdown
                        value={contrastHorizontal}
                        change={handleContrastHorizontal}
                    ></Dropdown>
                    </>}
                    <br></br>
                    <label>Are we railroaded?</label>
                    <label className="radio-label">
                    <input type='radio' name='contrastrailroad'
                    value={true} onChange={handleContrastRailroad}></input>
                    Yes
                    </label>
                    <label className="radio-label">
                    <input type='radio' name='contrastrailroad'
                    value={false} onChange={handleContrastRailroad}></input>
                    No
                    </label><br></br><br></br>
                    <label>
                    Please specify where the contrast fabric will be used:
                    <input id='where' className='full-width-input'></input>
                    </label>
                </div>
                </div>}
            </div>

            <div className="button-group">
                <button onClick={() => {calcYardage()}}>Calculate yardage</button>
                {yardage}<br></br>
                <button onClick={() => {calcPrice()}}>Calculate price</button>
                {price}<br></br>
            </div>
            </div>


    </>)
}

export default Drapery;