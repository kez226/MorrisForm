import React, { useEffect, useState } from 'react';
import '../styles.css'
//import .env;

const Drapery = ({pname, name, address, email, room, numWindow, uploads, estName, formSection, handleFormSection}) => {
    const[windowImg, setWindowImg] = useState(null);
    const[stationary, setStationary] = useState('false');
    const[lined, setLined] = useState('');
    const[pleat, setPleat] = useState('2top');
    const[ripplePercent, setRipplePercent] = useState('');
    const[fullness, setFullness] = useState(2);
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

    const [linings, setLinings] = useState();
    useEffect(() => {
        fetch('https://script.google.com/macros/s/AKfycbxPB_2UsBjeXSeMmpmraXDAmu5Q1lJ6GX_vB6eoeqjrPflKnsLhN6VxF4wkJlBYUPRL1w/exec', {method: "GET"})
        .then(response => response.json()).then(
            data => {
                console.log(data);
                console.log(typeof data.msg, data.msg);
                console.log(typeof data.msg[0], data.msg[0]);
                setLinings({
                    'Unlined': data.msg[0][1],
                    'Self-Lined': data.msg[0][2],
                    'Light Filtering': data.msg[0][3],
                    'Sheer': data.msg[0][4],
                    'Blackout': data.msg[0][5],
                    'Lined & Standard Interlined': data.msg[0][6],
                    'Other': data.msg[0][7], //Lined and bump, and all self-lined with other options
                    'French Blackout': data.msg[0][8],
                })
            });
    }, []);

    const getLiningPrice = (lining) => {
        if (lining in linings){ return linings[lining]; }
        else if (lining.includes("Light") || lining ==='Napped Sateen'){ return linings['Light Filtering']; }
        else {return linings['Other'];}
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
    const [f2fwTotal, setF2fwTotal] = useState(null);
    const [f2fhTotal, setF2fhTotal] = useState(null);
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
        if (document.getElementById('f2fh').value && document.getElementById('f2fw').value){
            setF2fhTotal(Number(document.getElementById('f2fh').value) + Number(f2fh));
            setF2fwTotal(Number(document.getElementById('f2fw').value) + Number(f2fw));
            console.log('setTotals')
        }
        if(pleat === 'ripple'){
            if ( !document.getElementById('f2fh')
            || !document.getElementById('f2fw') ){
                alert("Please fill rod width and height fields");
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
                        if (!document.getElementById('wpp')
                        || !document.getElementById('f2fh')
                        || !document.getElementById('f2fw')){
                            alert("Please fill rod width, height, and panel width fields");
                            return;
                        }
                        let fabWidth = Number(mainWidth) + Number(document.getElementById('mainwidth').value);
                        if (fabWidth == 0){fabWidth = 54;}
                        let cutYards = (20.0 + Number(f2fh) + Number(document.getElementById('f2fh').value)) / 36;
                        cutYards += 18 - (cutYards % 18);
                        const widths = (Number(f2fw) + Number(document.getElementById('f2fw').value)) / fabWidth;
                        setYardage(Number(document.getElementById('wpp').value) * widths * Number(fullness) / cutYards);
                        return;
                    }
                    //up the bolt, stationary, with vertical repeat
                    else{
                        if (!document.getElementById('wpp')
                        ||!document.getElementById('f2fh')
                        || !document.getElementById('f2fw')
                        || !document.getElementById('mainvert')
                        ){
                            alert("Please fill rod width, height, vertical repeat and panel width fields");
                            return;
                        }
                        const repeats = Math.ceil((Number(f2fh) +  Number(document.getElementById('f2fh').value) + 20.0) / (Number(mainVertical) + Number(document.getElementById('mainvert').value)));
                        const cl = repeats * (Number(mainVertical) + Number(document.getElementById('mainvert').value));
                        let cutYards = cl / 36;
                        cutYards += 9 - cutYards % 9;
                        let fw = (Number(mainWidth) + Number(document.getElementById('mainwidth').value));
                        if (fw == 0){fw = 54;}
                        const widths = (Number(f2fw) + Number(document.getElementById('f2fw').value)) / fw;
                        setYardage(Number(document.getElementById('wpp').value) * widths * Number(fullness) / cutYards);
                        return;
                    }
                }
                //up the bolt, functional
                else if (stationary === 'false') {
                    if (!document.getElementById('f2fh')
                    || !document.getElementById('f2fw')
                    || !fullness 
                    ){
                        alert("Please fill rod width and height fields");
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
                    if (!document.getElementById('f2fh')
                    || !document.getElementById('f2fw')
                    || !fullness
                    ){
                        alert("Please fill rod width and height fields");
                        return;
                    }
                    let cw = 14.0 + (Number(document.getElementById('f2fw').value)+ Number(f2fw)) * Number(fullness);
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
                    if (!document.getElementById('wpp')
                    || !document.getElementById('f2fh')
                    || !panels
                    ){
                        alert("Please fill width per panel and height fields");
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

    // // Automatically calculate yardage when the relevant inputs are filled.
    // useEffect(() => {
    //     // Grab DOM inputs used by calcYardage
    //     const f2fwEl = document.getElementById('f2fw');
    //     const f2fhEl = document.getElementById('f2fh');
    //     const wppEl = document.getElementById('wpp');
    //     const mainvertEl = document.getElementById('mainvert');

    //     // If required DOM elements are not yet mounted, do nothing
    //     if (!f2fwEl || !f2fhEl) return;

    //     const f2fwVal = f2fwEl.value;
    //     const f2fhVal = f2fhEl.value;

    //     // Basic requirement: f2fw and f2fh must have values for most calculations
    //     if (!f2fwVal || !f2fhVal) return;

    //     if (mainrailroad === '') return;

    //     // Additional required checks for some branches:
    //     // - stationary up-the-bolt case needs wpp
    //     if (pleat !== 'ripple' && mainrailroad === 'false' && stationary === 'true') {
    //         if (!wppEl || !wppEl.value) return;
    //     }

    //     // - vertical repeat related calculations can require mainvert when specified;
    //     //   avoid auto-calc until user supplies a value if a repeat is expected
    //     // if (mainvertEl && mainvertEl.value === '' && mainVertical && Number(mainVertical) > 0) {
    //     //     return;
    //     // }

    //     // All minimal checks passed -> calculate
    //     calcYardage();
    // }, [
    //     pleat,
    //     f2fw, f2fh,          // fraction state
    //     panels,
    //     stationary,
    //     fullness,
    //     mainWidth, mainVertical, mainHorizontal,
    //     mainrailroad
    // ]);

    const [banding, setBanding] = useState(false);
    const [bandingType, setBandingType] = useState(null);

    useEffect(() => {
        if (!banding){
            setBandingType(null);
        }
    },[banding])

    const [price, setPrice] = useState(null);
    const calcPrice = () => {

        if (!fullness) {
        console.log("Missing: fullness");
        }

        if (!f2fwTotal) {
        console.log("Missing: width (f2fw)");
        }

        if (!f2fhTotal) {
        console.log("Missing: height (f2fh)");
        }

        if (!lined) {
        console.log("Missing: lining selection");
        }

        if (!pleat) {
        console.log("Missing: pleat selection");
        }
        if (!fullness || !f2fhTotal || !f2fwTotal
        || !lined || !pleat){
            alert("Please fill out all relevant fields");
            return;
        }
        const width = f2fwTotal;
        let height = f2fhTotal;
        const widths = Math.ceil((width) * fullness / 54.0);
        let costPerWidth = getLiningPrice(lined);
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

    const checkNum = (e) => {if (!e.target.validity.valid) e.target.value = '';}

    return(<>
        <div className="container">
            {formSection === 1 && <div className="form-group-indent">
                {/* <label className="file-upload-label">
                    Please load a photo of the window:
                    <input type='file' onChange={handleImageUpload} multiple></input>
                </label><br></br><br></br> */}

                <h1>Drapery Dimensions</h1>

                <div className="form-section">
                    {/* <h4>What are the approximate dimensions of the following?</h4> */}
                    <div className='row dimensions-section'>
                        <div className='column'>
                            <h4>Rod width:</h4>
                            <input className='fixed-width-input' type='number' id='f2fw' min="0" onInput={checkNum}></input>
                            {units1 ==='in' && <>
                            <Dropdown
                                value={f2fw}
                                change={handlef2fw}
                            ></Dropdown>
                            </>}<br></br>
                        </div>
                        <div className='column'>
                            <h4>Drapery height:</h4>
                            <input className='fixed-width-input' type='number' id='f2fh' min="0" onInput={checkNum}></input>
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
                    <div className='row dimensions-section'>
                        <div className='column'>
                            <h4>Number of panels:</h4>
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
                        <div className='column'>
                            <h4>Will the panels be stationary?</h4>
                            <label className="radio-label">
                                <input type='radio' name='stationary'
                                value={'true'} onChange={handleStationaryChange}></input>
                                Yes
                            </label>
                            {stationary === 'true' && <div className="sub-option-indent">
                                <label>
                                What is the width per panel?
                                <input type='number' id='wpp' className='fixed-width-input' min="0" onInput={checkNum}></input>
                                </label>
                            </div>}
                            <label className="radio-label">
                                <input type='radio' name='stationary' defaultChecked={true}
                                value={'false'} onChange={handleStationaryChange}></input>
                                No (if no, they will be fully functioning)
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-section"> <div className="row dimensions-section">
                    <div className="column">
                        <h4>What style pleat would you like:</h4>
                        <label className="radio-label">
                            <input type='radio' name='pleat' defaultChecked={true}
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
                        <label className="radio-label">
                            <input type='radio' name='pleat'
                            value={'other'} onChange={handlePleatChange}></input>
                            Other (Grommet, Rod-pocket, Cartridge, Tab-top … ):
                            <input type='text' id='pleat_other' placeholder='Other' className='fixed-width-input'></input>
                        </label>
                    </div>
                    {(pleat === 'ripple') && <div className='column'>
                        <h4>Ripplefold percentage</h4>
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
                    {(pleat !== 'ripple') &&<div className='column'>
                        <h4>What is the fullness?</h4>
                        <label className="radio-label">
                            <input type='radio' name='fullness' onClick={() => setFullness(1.5)}></input> 1.5
                        </label>
                        <label className="radio-label">
                            <input defaultChecked={true} type='radio' name='fullness' onClick={() => setFullness(2)}></input> 2
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
                    </div>}
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
                    </div><br />
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
                    <div className='row dimensions-section'>
                        <div className='column'>
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
                            <br />{yardage}
                        </div>
                    </div>
                </div><br />

                <button className="next-button" onClick={() => handleFormSection(prev => prev + 1)}>Next</button>
                <button className="back-button" onClick={() => handleFormSection(prev => prev - 1)}>Back</button>
            </div> }
            
            {formSection === 2 && <div className='form-group-indent'>
                <h1>Drapery Material</h1> 

                <div className="form-section">
                    <div className='row dimensions-section'> 
                        <div className='column'>
                            <h4 >What type of lining would you like?</h4>
                            <label>
                                <input type='radio' name='liningType' defaultChecked={true} style={{marginRight:'5px'}}
                                value={'Unlined'} onChange={handleLinedChange}></input>
                                Unlined
                            </label><br></br>
                            <label> 
                                <input type='radio' name='liningType'  style={{marginRight:'5px'}}
                                value={'Sheer'} onChange={handleLinedChange}></input>
                                Sheer Lining
                            </label><br></br>
                            <label> 
                                <input type='radio' name='liningType' style={{marginRight:'5px'}}
                                value={'Lightweight Light Filter'} onChange={handleLinedChange}></input>
                                Light Weight Light Filtering Lining (Poly Cotton)
                            </label><br></br>
                            <label> 
                                <input type='radio' name='liningType' style={{marginRight:'5px'}}
                                value={'Light Filter'} onChange={handleLinedChange}></input>
                                Regular Light Filtering Lining (100% Cotton)
                            </label><br></br>
                            <label> 
                                <input type='radio' name='liningType' style={{marginRight:'5px'}}
                                value={'Blackout'} onChange={handleLinedChange}></input>
                                Blackout Lining
                            </label><br></br>
                            <label> 
                                <input type='radio' name='liningType' style={{marginRight:'5px'}}
                                value={'Napped Sateen'} onChange={handleLinedChange}></input>
                            Napped Sateen
                            </label><br></br>
                            <label> 
                                <input type='radio' name='liningType' style={{marginRight:'5px'}}
                                value={'Lined and Standard Interlined'} onChange={handleLinedChange}></input>
                            Lined and Standard Interlined
                            </label>
                        </div>
                        <div className='column'> <br /> <br />
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
                            </label>
                        </div>
                        <div className='column'>
                            <button className='button-other' onClick={() => {calcPrice()}}>Calculate Price</button>
                            <br />{price}
                        </div>
                    </div>
                    
                    
                    <br></br>
                </div>

                <button className="next-button" onClick={() => handleFormSection(prev => prev + 1)}>Next</button>
                <button className="back-button" onClick={() => handleFormSection(prev => prev - 1)}>Back</button>
            </div>}

            {formSection === 3 && <div className='form-group-indent'>
                <h1>Review & Submit</h1><br />

                <div className="form-section">
                    <div className='row dimensions-section'>
                        <div className='column'>
                            Frame to frame width: {f2fwTotal}  <br />
                            Frame to frame height: {f2fhTotal}  <br />
                            Number of panels: {panels}<br />
                            Stationary: {stationary ==='true' ? 'Yes' : 'No'}<br />
                            Pleat style: {pleat ==='other' ? document.getElementById('pleat_other').value : pleat}<br />
                            Fullness: {fullness}<br />
                        </div>
                        <div className='column'>
                            COM material: {com ==='yes' ? 'Yes' : 'No'}<br />
                            Main fabric width: {mainWidth || 54}  <br />
                            Main fabric vertical repeat: {mainVertical || 0}  <br />
                            Main fabric horizontal repeat: {mainHorizontal || 0} <br />
                            Lining type: {lined}<br />
                            
                        </div>
                    </div>
                </div>
                <div className='form-section'>
                    <div className='row dimensions-section'>
                        <div className='column'>
                            Yardage required: {yardage} yards<br />

                        </div>
                        <div className='column'>
                            Price estimate: {price}<br />
                        </div>
                    </div>
                </div>
                <button className="back-button" onClick={() => handleFormSection(prev => prev - 1)}>Back</button>
            </div> 

            }
            
            
        </div>

    </>)
}

export default Drapery;