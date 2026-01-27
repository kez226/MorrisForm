import React, { use, useEffect, useState } from 'react';
import '../styles.css'
//import .env;

const Drapery = ({pname, name, address, email, room, numWindow, uploads, estName, formSection, handleFormSection}) => {
    const[windowImg, setWindowImg] = useState(null);
    const[stationary, setStationary] = useState('false');
    const[lined, setLined] = useState('Unlined');
    const[pleat, setPleat] = useState('2 Finger Top Tack');
    const[ripplePercent, setRipplePercent] = useState('60%');
    const[fullness, setFullness] = useState(2);
    const[hardware, setHardware] = useState('');
    const[hardwareType, setHardwareType] = useState('');
    const[hardwareDecorativeType, setHardwareDecorativeType] = useState('');
    let ringType = '';
    const[hardwired, setHardwired] = useState('');
    const[homeAuto, setHomeAuto] = useState('');
    const[com, setCom] = useState('yes');
    const[mainrailroad, setMainRailroad] = useState('false');
    const[contrastrailroad, setContrastRailroad] = useState('');
    const[units1, setUnits1] = useState('in');
    const[units2, setUnits2] = useState('in');
    const[units3, setUnits3] = useState('in');
    const[folderID, setFolderID] = useState(null);
    const[yardage, setYardage] = useState(0);
    const[panels, setPanels] = useState(1);

    const [otherPleat, setOtherPleat] = useState('Other');
    const handleOtherPleatChange = (event) => {
        setOtherPleat(event.target.value);
    }
    
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

    const [linings, setLinings] = useState(null);

    useEffect(() => {
        fetch('https://script.google.com/macros/s/AKfycbxPB_2UsBjeXSeMmpmraXDAmu5Q1lJ6GX_vB6eoeqjrPflKnsLhN6VxF4wkJlBYUPRL1w/exec', {method: "GET"})
        .then(response => response.json()).then(
            data => {
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

    

    // const handleImageUpload = (event) => {
    //     if (event.target.files.length > 5){
    //         setWindowImg(null);
    //         alert("Please select no more than five files");
    //         return;
    //     }
    //     else{
    //         for (const file of event.target.files){
    //             if (file.size > 10 * 1024 * 1024){
    //                 alert(file.name + " is too big to upload");
    //                 return;
    //             }
    //         }
    //         setWindowImg(event.target.files);
    //     }
    // }
    const handleRipple = (event) => {setRipplePercent(event.target.value);}
    const handleStationaryChange = (event) => {setStationary(event.target.value);}
    const [wpp, setWpp] = useState(0);
    const handleWppChange = (event) => {setWpp(event.target.value);}
    const handleLinedChange = (event) => {setLined(event.target.value);}
    const handlePleatChange = (event) => {
        if(pleat === 'Ripplefold' && event.target.value !== 'Ripplefold'){
            setFullness(2);
        }
        else if (pleat !== 'Ripplefold' && event.target.value === 'Ripplefold'){
            setFullness(1.6);
            setRipplePercent('60%');
        }
        setPleat(event.target.value);
    }
    // const handleHardwareChange = (event) => {setHardware(event.target.value);
    //     if(event.target.value === 'true'){setHardwareType('non-decorative');}
    // }
    // const handleHardwareTypeChange = (event) => {setHardwareType(event.target.value);
    //     if(event.target.value === 'decorative'){setHardwareDecorativeType('track');}
    // }
    // const handleHardwareDecorativeTypeChange = (event) => {setHardwareDecorativeType(event.target.value);
    //     if(event.target.value === 'motorized'){setHardwired('false');}
    // }
    // const handleHardwiredChange = (event) => {setHardwired(event.target.value);
    //     if(event.target.value === 'motorized'){setHomeAuto('false');}
    // }
    // const handleHomeAuto = (event) => {setHomeAuto(event.target.value);}
    const handleCom = (event) => {setCom(event.target.value);}
    const handleMainRailroad = (event) => {setMainRailroad(event.target.value);}
    // const handleContrastRailroad = (event) => {setContrastRailroad(event.target.value);}

    // //Window units
    // const handleUnits1 = (event) => {setUnits1(event.target.value);}

    const [f2fw, f2fwc] = useState(0);
    const [f2fh, f2fhc] = useState(0);
    const [f2fwFrac, f2fwFracC] = useState(0);
    const [f2fhFrac, f2fhFracC] = useState(0);
    // const [f2fwTotal, setF2fwTotal] = useState(null);
    // const [f2fhTotal, setF2fhTotal] = useState(null);

    const handlef2fw = (e) => {f2fwc(e.target.value);};
    const handlef2fh = (e) => {f2fhc(e.target.value);};
    const handlef2fwFrac = (e) => {f2fwFracC(e.target.value);};
    const handlef2fhFrac = (e) => {f2fhFracC(e.target.value);};

    // const [abvf, abvfc] = useState('');
    // const [bsill, bsillc] = useState('');
    // const [mountabvf, mountabvfc] = useState('');

    // const handleabvf = (e) => {abvfc(e.target.value);};
    // const handlebsill = (e) => {bsillc(e.target.value);};
    // const handlemountabvf = (e) => {mountabvfc(e.target.value);};

    // //Main fabric units
    // const handleUnits2 = (event) => {setUnits2(event.target.value);}

    const [mainWidth, mainWidthChange] = useState(0);
    const [mainVertical, mainVerticalChange] = useState(0);
    const [mainHorizontal, mainHorizontalChange] = useState(0);

    const handleMainWidth = (e) => {mainWidthChange(e.target.value);};
    const handleMainVertical = (e) => {mainVerticalChange(e.target.value);};
    const handleMainHorizontal = (e) => {mainHorizontalChange(e.target.value);};

    const [mainWidth2, mainWidthChange2] = useState(54);
    const [mainVertical2, mainVerticalChange2] = useState(0);
    const [mainHorizontal2, mainHorizontalChange2] = useState(0);

    const handleMainWidth2 = (e) => {mainWidthChange2(e.target.value);};
    const handleMainVertical2 = (e) => {mainVerticalChange2(e.target.value);};
    const handleMainHorizontal2 = (e) => {mainHorizontalChange2(e.target.value);};



    // //Contrast fabric units
    // const [contr, setContr] = useState(null);
    // const handleUnits3 = (event) => {setUnits3(event.target.value);}

    // const [contrastWidth, contrastWidthChange] = useState('');
    // const [contrastVertical, contrastVerticalChange] = useState('');
    // const [contrastHorizontal, contrastHorizontalChange] = useState('');

    // const handleContrastWidth = (e) => {contrastWidthChange(e.target.value);};
    // const handleContrastVertical = (e) => {contrastVerticalChange(e.target.value);};
    // const handleContrastHorizontal = (e) => {contrastHorizontalChange(e.target.value);};

    // const submitForm = (e) => {
    //     e.preventDefault();

    //     let formData = new FormData();
    //     formData.append('Sheet', 'Drapery');
    //     let date = new Date(Date.now());
    //     formData.append('Date', date.toLocaleString());
    //     formData.append('PName', pname);
    //     formData.append('EstName', estName);
    //     formData.append('Name', name);
    //     formData.append('Address', address);
    //     formData.append('Email', email);
    //     formData.append('Room', room);
    //     formData.append('Windows', numWindow);
    //     formData.append('Units1', units1);
    //     if (units1 !== 'in'){
    //         formData.append('F2fw', document.getElementById('f2fw').value);
    //         formData.append('F2fh', document.getElementById('f2fh').value);
    //         formData.append('Abvf', document.getElementById('abvf').value);
    //         formData.append('Bsill', document.getElementById('bsill').value);
    //         formData.append('Mountabvf', document.getElementById('mountabvf').value);
    //     }
    //     else{
    //         formData.append('F2fw', document.getElementById('f2fw').value + f2fw);
    //         formData.append('F2fh', document.getElementById('f2fh').value + f2fh);
    //         formData.append('Abvf', document.getElementById('abvf').value + abvf);
    //         formData.append('Bsill', document.getElementById('bsill').value + bsill);
    //         formData.append('Mountabvf', document.getElementById('mountabvf').value + mountabvf);
    //     }
    //     formData.append('Stationary', stationary);

    //     if (lined === ''){formData.append('Lining', 'no');}
    //     else{formData.append('Lining', lined);}

    //     if (pleat === 'ripple'){formData.append('Pleat', ripplePercent + ' ripple');}
    //     else if (pleat === 'other'){formData.append('Pleat', document.getElementById('pleat_other').value);}
    //     else{formData.append('Pleat', pleat);}

    //     if (hardware === 'false'){formData.append('Hardware', 'no');}
    //     else if(hardwareType === 'non-decorative'){formData.append('Hardware', 'non-decorative');}
    //     else if(hardwareDecorativeType === 'track'){formData.append('Hardware', 'track');}
    //     else if(hardwareDecorativeType === 'rings'){formData.append('Hardware', 'rings: ' + document.getElementById('rings').value);}
    //     else if(hardwired === 'false'){formData.append('Hardware', 'motorized');}
    //     else if(homeAuto === 'false'){formData.append('Hardware', 'hardwired, no home-auto');}
    //     else{formData.append('Hardware', 'hardwired with home-auto system: ' + document.getElementById('homeauto').value);}
        
    //     formData.append('Com', com);


    //     formData.append('Units2', units2);
    //     formData.append('Mainvendor', document.getElementById('mainvendor').value);
    //     formData.append('Mainpattern', document.getElementById('mainpattern').value);

    //     let mainlink = document.getElementById('mainlink').value;
    //     if (mainlink == null || mainlink === ""){
    //         mainlink = document.getElementById('mainvendor').value + "+" + document.getElementById('mainpattern').value;
    //         mainlink = "https://www.google.com/search?q=" + mainlink.replace(/[^a-zA-Z0-9]+/g, '+')  // Replace non-alphanumeric characters with "+"
    //                 .replace(/^\+|(\++)/g, '+');
    //     }
    //     formData.append('Mainlink', mainlink);
    //     formData.append('Mainwidth', document.getElementById('mainwidth').value + mainWidth);
    //     formData.append('Mainvert', document.getElementById('mainvert').value + mainVertical);
    //     formData.append('Mainhorizontal', document.getElementById('mainhorizontal').value + mainHorizontal);
    //     formData.append('Mainrailroad', mainrailroad);

    //     if (!yardage || ! price){
    //         alert("Please calculate yardage and price first");
    //         return;
    //     }
    //     formData.append("Yardage", yardage);
    //     formData.append("Price", price);
    //     formData.append("Embellishments", bandingType);

    //     formData.append('Units3', units3);
    //     formData.append('Contrastvendor', document.getElementById('contrastvendor').value);
    //     formData.append('Contrastpattern', document.getElementById('contrastpattern').value);
    //     let contrlink = document.getElementById('contrlink').value;
    //     if (contrlink == null || contrlink === ""){
    //         contrlink = document.getElementById('contrastvendor').value + '+' + document.getElementById('contrastpattern').value;
    //         contrlink = "https://www.google.com/search?q=" + contrlink.replace(/[^a-zA-Z0-9]+/g, '+')  // Replace non-alphanumeric characters with "+"
    //         .replace(/^\+|(\++)/g, '+');
    //     }
    //     formData.append('Contrastlink', contrlink);
    //     formData.append('Contrastwidth', document.getElementById('contrastwidth').value + contrastHorizontal);
    //     formData.append('Contrastvert', document.getElementById('contrastvert').value + contrastVertical);
    //     formData.append('Contrasthorizontal', document.getElementById('contrasthorizontal').value + contrastHorizontal);
    //     formData.append('Contrastrailroad', contrastrailroad);
    //     formData.append('Where', document.getElementById('where').value);

    //     // formData.forEach((value, key) => {
    //     //     console.log(key, value); // Logs each key-value pair
    //     //   });

    //     fetch("https://script.google.com/macros/s/AKfycbzsVchSaJPQySfT4Qk2hcXMdikph2EVy3PsAzD5p1AM7hJ-oqJodhMwYguy5kQdFlIH6A/exec", {
    //         method: 'POST',
    //         body: formData,
    //     }).then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         setFolderID(data.folderID);
    //         uploads(prev => prev + 1);
    //         alert(data.msg);
    //     })
    //     .catch(err => console.log(err));

    //     uploadAllFiles();
    // }

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
        if(pleat === 'Ripplefold'){
            if ( f2fw === 0 && f2fh === 0){
                alert("Please fill rod width and height fields");
                return;
            }
            let fabWidth = Number(mainWidth) + Number(mainWidth2);
            let rw = Number(f2fw) + Number(f2fwFrac);
            if (panels == 2){
                rw = rw / 2;
            }
            let pw = rw * Number(fullness) + 7; //change to be 7 for one panel, 14 for two panel
            if (panels == 2) pw += 7;
            const widths = Math.ceil(pw / fabWidth);
            const cl = 14.0 + Number(f2fh) + Number(f2fhFrac);
            if(Number(mainVertical2) === 0 && Number(mainVertical) === 0){
                let ypp = cl / 36;
                yardage = ypp * widths;
            }
            else{
                const repeats = Math.ceil((Number(f2fh) + Number(f2fhFrac) + 14.0) / (Number(mainVertical) + Number(mainVertical2)));
                const cl = repeats * (Number(mainVertical) + Number(mainVertical2));
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
                    if((Number(mainVertical2)) === 0 && Number(mainVertical) === 0){
                        if (wpp !== 0
                        || Number(f2fw) === 0
                        || Number(f2fh) === 0){
                            alert("Please fill rod width, height, and panel width fields");
                            return;
                        }
                        let fabWidth = Number(mainWidth) + (Number(mainWidth2));
                        if (fabWidth == 0){fabWidth = 54;}
                        let cutYards = (20.0 + Number(f2fh) + Number(f2fh)) / 36;
                        cutYards += 18 - (cutYards % 18);
                        const widths = (Number(f2fw) + Number(f2fwFrac)) / fabWidth;
                        setYardage(Number(wpp) * widths * Number(fullness) / cutYards);
                        return;
                    }
                    //up the bolt, stationary, with vertical repeat
                    else{
                        if (wpp !== 0
                        || Number(f2fw) === 0
                        || Number(f2fh) === 0
                        || !document.getElementById('mainvert')
                        ){
                            alert("Please fill rod width, height, vertical repeat and panel width fields");
                            return;
                        }
                        const repeats = Math.ceil((Number(f2fh) + Number(f2fhFrac) + 20.0) / (Number(mainVertical) + Number(mainVertical2)));
                        const cl = repeats * (Number(mainVertical) + Number(mainVertical2));
                        let cutYards = cl / 36;
                        cutYards += 9 - cutYards % 9;
                        let fw = (Number(mainWidth) + Number(mainWidth2));
                        if (fw == 0){fw = 54;}
                        const widths = (Number(f2fw) + Number(f2fwFrac)) / fw;
                        setYardage(Number(wpp) * widths * Number(fullness) / cutYards);
                        return;
                    }
                }
                //up the bolt, functional
                else if (stationary === 'false') {
                    if (Number(f2fw) === 0
                    || Number(f2fh) === 0
                    || !fullness 
                    ){
                        alert("Please fill rod width and height fields");
                        return;
                    }
                    const cw = 14.0 + (Number(f2fw) + Number(f2fwFrac)) * Number(fullness);
                    let width = Number(mainWidth) + Number(mainWidth2)
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
                    if(Number(mainVertical2) === 0 && Number(mainVertical) === 0){
                        cutYards = (Number(f2fh) + Number(f2fhFrac) + 20.0) / 36;
                    }
                    else{
                        const repeats = Math.ceil((Number(f2fh) + Number(f2fhFrac) + 20.0) / (Number(mainVertical) + Number(mainVertical2)));
                        const cl = repeats * (Number(mainVertical) + Number(mainVertical2));
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
                    if (Number(f2fw) === 0
                    || Number(f2fh) === 0
                    || !fullness
                    ){
                        alert("Please fill rod width and height fields");
                        return;
                    }
                    let cw = 14.0 + (Number(f2fw) + Number(f2fwFrac)) * Number(fullness);
                    cw += 9 - cw % 9;
                    yardage = cw / 36;
                    let check = Number(f2fh) + Number(f2fhFrac);
                    if (pleat === "Ripplefold"){check += 14}
                    else{check += 20}
                    let fabWidth = Number(mainWidth) + Number(mainWidth2);
                    if (fabWidth === 0) {fabWidth = 54}
                    if (check > fabWidth){alert("Height is too much by " + (check-fabWidth)); 
                        setYardage(0);
                        return;}
                    setYardage(yardage);
                    return;
                }
                //stationary
                else{
                    if (wpp !== 0
                    || Number(f2fh) === 0
                    || !panels
                    ){
                        alert("Please fill width per panel and height fields");
                        return;
                    }
                    let fabWidth = Number(mainWidth) + Number(mainWidth2);
                    if (fabWidth === 0) {fabWidth = 54}
                    const widths = Number(wpp) / fabWidth;
                    const ypp = widths * 54 / 36;
                    let check = Number(f2fh) + Number(f2fhFrac);
                    if (pleat === "Ripplefold"){check += 14}
                    else{check += 20}
                    if (check > fabWidth){alert("Height is too much by " + (check-fabWidth)); return;}
                    setYardage(ypp * panels);
                }
            }
        }
    }
    const getTotal = (num1, frac1) => { 
        return Number(num1) + Number(frac1);
    }
    const round = (value) => {
        return value - (value % 0.25) + 0.25
    }
    const short = (value) => {
        return Number(value).toFixed(2);
    }

    // Automatically calculate yardage when the relevant inputs are filled.
    useEffect(() => {
        let doCalc = true;
        // Grab DOM inputs used by calcYardage

        // Basic requirement: f2fw and f2fh must have values for most calculations
        if (!f2fw || !f2fh || f2fw === 0 || f2fh === 0){
            doCalc = false;
        }

        if (mainrailroad === '') {
            doCalc = false;
        }

        // Additional required checks for some branches:
        // - stationary up-the-bolt case needs wpp
        if (pleat !== 'Ripplefold' && mainrailroad === 'false' && stationary === 'true') {
            if (!wpp) {
                doCalc = false;
            }
        }

        // All minimal checks passed -> calculate
        if (doCalc) {
            calcYardage();
            setTimeout(calcPrice, 100);
        }else{
            setYardage(0);
            setPrice(0);
        }
    }, [
        pleat,
        f2fw, f2fh,
        f2fwFrac, f2fhFrac,          // fraction state
        panels,
        stationary,
        fullness,
        mainWidth, mainVertical, mainHorizontal, //Fraction state
        mainHorizontal2, mainWidth2, mainVertical2,
        mainrailroad
    ]);

    const [banding, setBanding] = useState(false);
    const [trim, setTrim] = useState([]);
    const handleTrim = (event) => {
        if (event.target.checked){
            setTrim([...trim, event.target.value]);
        } else {
            setTrim(trim.filter(item => item !== event.target.value));
        }
    }

    const [price, setPrice] = useState(0);
    const calcPrice = () => {
        if (!linings){alert("No pricing info fetched, cannot calculate price. Please wait a moment and try again."); return;}
        if (!fullness || !f2fh || !f2fw
        || !lined || !pleat){
            alert("Please fill out all relevant fields");
            return;
        }
        const width = f2fwFrac + f2fw;
        let height = f2fhFrac + f2fh;
        const widths = Math.ceil((width) * fullness / 54.0);
        let costPerWidth = getLiningPrice(lined);
        if (pleat === "Ripplefold") {costPerWidth += 15;}
        const basePrice = widths * costPerWidth;
        let bandingPrice = 0;
        if (banding){
            if (trim.includes("banding bottom")){
                bandingPrice += Math.ceil(width * fullness / 12);
            }
            if (trim.includes("banding top")){
                bandingPrice += Math.ceil(width * fullness / 12);
            }
            if (trim.includes("banding inside")){
                bandingPrice += 2 * Math.ceil((Number(height) + 10) / 12);
            }
            if (trim.includes("banding outside")){
                bandingPrice += 2 * Math.ceil((Number(height) + 10) / 12);
            }
            bandingPrice *= 13;
        }
        setPrice("$" + basePrice + " for yardage + $" + bandingPrice + " for banding = $" + (basePrice + bandingPrice));
    }

    useEffect(() => {
        let doCalc = true;
        if (yardage === 0 || !yardage){
            doCalc = false;
        }
        if (doCalc) calcPrice();
    }, [trim, lined, banding]);

    const checkNum = (e) => {if (!e.target.validity.valid) e.target.value = "";}

    return(<>
        
        <div className="container container-row">
            <div className="container left">
                
                {formSection === 1 && <div className="form-group-indent">
                    {/* <label className="file-upload-label">
                        Please load a photo of the window:
                        <input type='file' onChange={handleImageUpload} multiple></input>
                    </label><br></br><br></br> */}

                    <h1>Drapery Dimensions</h1>

                    <div className="form-section">
                        <div className='row dimensions-section'>
                            <div className='column'>
                                <h4>Rod width:</h4>
                                <input className='fixed-width-input' type='number' id='f2fw' min="0" onInput={checkNum} 
                                placeholder={f2fw || 0}
                                onChange={(handlef2fw)}></input>
                                {units1 ==='in' && <>
                                <Dropdown
                                    value={f2fwFrac}
                                    change={handlef2fwFrac}
                                ></Dropdown>
                                </>}<br></br>
                            </div>
                            <div className='column'>
                                <h4>Drapery height:</h4>
                                <input className='fixed-width-input' type='number' id='f2fh' min="0" onInput={checkNum}
                                placeholder={f2fh || 0}
                                onChange={(handlef2fh)}></input>
                                {units1 ==='in' && <>
                                <Dropdown
                                    value={f2fhFrac}
                                    change={handlef2fhFrac}
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
                                    <input type='radio' name='panels' defaultChecked={panels === 1}
                                    onChange={(e) => {setPanels(1)}}></input>
                                    1
                                </label>
                                <label className="radio-label">
                                    <input type='radio' name='panels' defaultChecked={panels === 2}
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
                                    <input type='number' id='wpp' className='fixed-width-input' min="0" onInput={checkNum}
                                    placeholder={wpp || 0} onChange={handleWppChange}></input>
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
                                value={'2 Finger Top Tack'} onChange={handlePleatChange}></input>
                                2 finger top tack (Recommended 2x fullness)
                            </label>
                            <label className="radio-label">
                                <input type='radio' name='pleat'
                                value={'2 Finger Bottom Tack'} onChange={handlePleatChange}></input>
                                2 finger bottom tack (Recommended 2x fullness)
                            </label>
                            <label className="radio-label">
                                <input type='radio' name='pleat'
                                value={'3 Finger Top Tack'} onChange={handlePleatChange}></input>
                                3 finger top tack (Recommended 2.5x or 3x fullness)
                            </label>
                            <label className="radio-label">
                                <input type='radio' name='pleat'
                                value={'3 Finger Bottom Tack'} onChange={handlePleatChange}></input>
                                3 finger bottom tack (Recommended 2.5x or 3x fullness)
                            </label>
                            <label className="radio-label">
                                <input type='radio' name='pleat'
                                value={'Ripplefold'} onChange={handlePleatChange}></input>
                                Ripplefold
                            </label>
                            {/* <label className="radio-label">
                                <input type='radio' name='pleat'
                                value={'other'} onChange={handlePleatChange}></input>
                                Other (Grommet, Rod-pocket, Cartridge, Tab-top … ):
                                <input type='text' id='pleat_other' placeholder='Other'
                                onChange={handleOtherPleatChange} className='fixed-width-input'></input>
                            </label> */}
                        </div>
                        {(pleat === 'Ripplefold') && <div className='column'>
                            <h4>Ripplefold percentage</h4>
                            <label className="radio-label">
                                <input defaultChecked={ripplePercent === '60%'} type='radio' name='ripple%'
                                value={'60%'} onChange={(e) => {handleRipple(e); setFullness(1.6);}}></input>
                                60%
                            </label>
                            <label className="radio-label">
                                <input type='radio' name='ripple%' defaultChecked={ripplePercent === '80%'} 
                                value={'80%'} onChange={(e) => {handleRipple(e); setFullness(1.8);}}></input>
                                80%
                            </label>
                            <label className="radio-label">
                                <input type='radio' name='ripple%' defaultChecked={ripplePercent === '100%'}
                                value={'100%'} onChange={(e) => {handleRipple(e); setFullness(2);}}></input>
                                100%
                            </label>
                            <label className="radio-label">
                                <input type='radio' name='ripple%' defaultChecked={ripplePercent === '120%'}
                                value={'120%'} onChange={(e) => {handleRipple(e); setFullness(2.2);}}></input>
                                120%
                            </label>
                        </div>}
                        {(pleat !== 'Ripplefold') &&<div className='column'>
                            <h4>What is the fullness?</h4>
                            <label className="radio-label">
                                <input defaultChecked={fullness === 1.5} type='radio' name='fullness' onClick={() => setFullness(1.5)}></input> 1.5
                            </label>
                            <label className="radio-label">
                                <input defaultChecked={fullness === 2} type='radio' name='fullness' onClick={() => setFullness(2)}></input> 2
                            </label>
                            <label className="radio-label">
                                <input defaultChecked={fullness === 2.25} type='radio' name='fullness' onClick={() => setFullness(2.25)}></input> 2.25
                            </label>
                            <label className="radio-label">
                                <input defaultChecked={fullness === 2.5} type='radio' name='fullness' onClick={() => setFullness(2.5)}></input> 2.5
                            </label>
                            <label className="radio-label">
                                <input defaultChecked={fullness === 2.75} type='radio' name='fullness' onClick={() => setFullness(2.75)}></input> 2.75
                            </label>
                            <label className="radio-label">
                                <input defaultChecked={fullness === 3} type='radio' name='fullness' onClick={() => setFullness(3)}></input> 3
                            </label>
                        </div>}
                        </div>
                    </div>

                    <div className="form-section">
                        <h4>Are you using COM material?</h4>
                        <div>
                            <label className="radio-label">
                                <input type='radio' name='COM' defaultChecked={com === 'yes'}
                                value={'yes'} onChange={handleCom}></input>
                                Yes
                            </label>
                            <label className="radio-label">
                                <input type='radio' name='COM' defaultChecked={com === 'no'}
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
                                    <input type='number' id='mainwidth' className='fixed-width-input' min="0" onInput={checkNum}
                                    placeholder={mainWidth2 || 0} onChange={handleMainWidth2}></input>
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
                                    <input type='number' id='mainvert' className='fixed-width-input' min="0" onInput={checkNum}
                                    placeholder={mainVertical2 || 0} onChange={handleMainVertical2}></input>
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
                                    <input type='number' id='mainhorizontal' className='fixed-width-input' min="0" onInput={checkNum}
                                    placeholder={mainHorizontal2 || 0} onChange={handleMainHorizontal2}></input>
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
                                        <input type="checkbox" defaultChecked={banding} onChange={() => {setBanding(!banding); setTrim([])}}/>
                                        Ready to use banding/trim
                                    </label>
                                    {banding && <div className="sub-option-indent">
                                        <label className="checkbox-label">
                                            <input type="checkbox" name="banding-type" 
                                            onChange={handleTrim} defaultChecked={trim.includes('banding bottom')}
                                            id='banding bottom' value='banding bottom'/>
                                            Bottom
                                        </label>
                                        <label className="checkbox-label">
                                            <input type="checkbox" name="banding-type" 
                                            onChange={handleTrim} defaultChecked={trim.includes('banding inside')}
                                            id='banding inside' value='banding inside'/>
                                            Inside Edge
                                        </label>
                                        <label className="checkbox-label">
                                            <input type="checkbox" name="banding-type" 
                                            onChange={handleTrim} defaultChecked={trim.includes('banding outside')}
                                            id='banding outside' value='banding outside'/>
                                            Outside Edge
                                        </label>
                                        <label className="checkbox-label">
                                            <input type="checkbox" name="banding-type" 
                                            onChange={handleTrim} defaultChecked={trim.includes('banding top')}
                                            id='banding top' value='banding top'/>
                                            Top
                                        </label>
                                    </div>}
                                </div>
                            </div>
                            
                            <div className='column'>
                                <h4>How are we running the fabric?</h4>
                                <label className="radio-label">
                                    <input type='radio' name='mainrailroad' defaultChecked={mainrailroad === 'false'}
                                    value={'false'} onChange={handleMainRailroad}></input>
                                    Up the bolt
                                </label>
                                <label className="radio-label">
                                    <input type='radio' name='mainrailroad' defaultChecked={mainrailroad === 'true'}
                                    value={'true'} onChange={handleMainRailroad}></input>
                                    Railroading
                                </label><br />
                            </div>
                            <div className='column'></div>
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
                            <div className='column'></div>
                        </div>
                        <br></br>
                    </div>

                    <button className="back-button" onClick={() => handleFormSection(prev => prev - 1)}>Back</button>
                </div>}
                
            </div>
            <div className="container right">
                <h1>Review</h1>
                <div className="form-section">
                    <div className='row dimensions-section'>
                        <div className='column'>
                            Frame to frame width: {getTotal(f2fw, f2fwFrac)}  <br />
                            Frame to frame height: {getTotal(f2fh, f2fhFrac)}  <br />
                            Number of panels: {panels}<br />
                            Stationary: {stationary ==='true' ? 'Yes' : 'No'}<br />
                            {stationary ==='true' && <>Width per panel: {wpp || 0}<br /></>}
                            Pleat style: {pleat}<br />
                            Fullness: {fullness}<br />
                        </div>
                        <div className='column'>
                            COM material: {com ==='yes' ? 'Yes' : 'No'}<br />
                            Main fabric width: {getTotal(mainWidth, mainWidth2)}  <br />
                            Main fabric vertical repeat: {getTotal(mainVertical2, mainVertical)}  <br />
                            Main fabric horizontal repeat: {getTotal(mainHorizontal2, mainHorizontal)} <br />
                            Lining type: {lined}<br />
                        </div>
                        <div className='column'>
                            Yardage required: {short(yardage) || 0} yards<br />
                            Price estimate: {price || "$0"}<br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Drapery;