import React, { useState, useEffect } from 'react';

const Roman = ({pname, name, address, email, room, numWindow, uploads, estName}) => {
    const[windowImg, setWindowImg] = useState(null);
    const[mount, setMount] = useState('');
    const[stationary,setStationary] = useState('');
    const[opFunction, setOpFunction] = useState('cordlock');
    const[motorType, setMotorType] = useState('');
    // const[hardwired, setHardwired] = useState('');
    const[homeAuto, setHomeAuto] = useState('');
    const[lined, setLined] = useState('Unlined');
    const[com, setCom] = useState('');
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
    const handleMount = (event) => {setMount(event.target.value);}
    const [type, setType] = useState('flat');
    const handleType = (event) => {setType(event.target.value);}
    const handleStationary = (event) =>{setStationary(event.target.value);}
    const handleOpFunction = (event) => {setOpFunction(event.target.value);
        if (event.target.value === 'motorized'){setMotorType('battery')}
    }
    const handleMotorChange = (event) => {setMotorType(event.target.value);
        if (event.target.value === 'hardwired'){setHomeAuto('no')}
    }
    const handleHomeAuto = (event) => {setHomeAuto(event.target.value);}
    const handleLinedChange = (event) => {setLined(event.target.value);}
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
    const [contr, setContr] = useState(null);
    const handleUnits3 = (event) => {setUnits3(event.target.value);}

    const [contrastWidth, contrastWidthChange] = useState('');
    const [contrastVertical, contrastVerticalChange] = useState('');
    const [contrastHorizontal, contrastHorizontalChange] = useState('');

    const handleContrastWidth = (e) => {contrastWidthChange(e.target.value);};
    const handleContrastVertical = (e) => {contrastVerticalChange(e.target.value);};
    const handleContrastHorizontal = (e) => {contrastHorizontalChange(e.target.value);};

    const [banding, setBanding] = useState(false);
    const [bandingType, setBandingType] = useState(null);

    useEffect(() => {
        if (!banding){
            setBandingType(null);
        }
    },[banding])

    const [bead, setBead] = useState(null);

    useEffect(() => {
        if (opFunction !== "lift"){
            setBead(null);
        }
    },[opFunction])

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
        "Unlined": 24.0,
        "Sheer": 26.0,
        'Lightweight Light Filter': 28.0,
        'Light Filter': 28.0,
        'Blackout': 32.0,
        'Napped Sateen': 28.0,
        'Lined and IStandard interlined': 35.0,
        'Lined and Bump Interlined': 38.0,
        'Self-Lined': 27.0,
        'Self-Lined and Blackout': 32.0,
        'Self-Lined and Standard Interlined': 35.0,
        'Self-Lined and Bump Interlined': 38.0,
        'French Blackout': 40.0
    }

    const submitForm = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('Sheet', 'Roman');
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

        if (mount === 'inside'){
            formData.append('F2fw', document.getElementById('f2fw').value + f2fw);
            formData.append('F2fh', document.getElementById('f2fh').value + f2fh);
        }
        else{
            formData.append('F2fw', document.getElementById('f2fw').value + f2fw);
            formData.append('F2fh', document.getElementById('f2fh').value + f2fh);
            formData.append('Abvc', document.getElementById('abvc').value + abvc);
            formData.append('Abvf', document.getElementById('abvf').value + abvf);
        }

        formData.append('Stationary', stationary);

        if(opFunction === 'lift'){formData.append('OpFunc', opFunction + document.getElementById('lift-color').value);}
        else if (opFunction === 'motorized'){
            if(motorType === 'hardwired'){
                if(homeAuto === 'no') {formData.append('OpFunc', opFunction + ' ' + motorType + ' no existing home auto');}
                else{formData.append('OpFunc', opFunction + ' ' + motorType + ' existing home auto: ' + document.getElementById('homeauto').value);}
            }
            else{formData.append('OpFunc', opFunction + motorType);}
        }
        else{formData.append('OpFunc', opFunction);}


        if (lined === 'No'){formData.append('Lining', 'no');}
        else{formData.append('Lining', lined);}

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
            uploads(prev => prev + 1);
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

    // Helper function to calculate the hobbled fabric addition
    const calculateHobbledAddition = (shadeHeight) => {
        if (type !== "hobbled") {
            return shadeHeight;
        }
        // Add 5 inches for every 8 inches of height (shade height only)
        return Math.ceil(shadeHeight / 8) * 5;
    };

    const [yardage, setYardage] = useState(null);
    const calcYardageOld = () => {
        if (mainrailroad === "railroad"){
            if (document.getElementById('f2fw').value == 0 
            || document.getElementById('f2fh').value == 0
            ){
                alert("Please fill out all relevant fields");
                return;
            }
            if (mount === "outside" && document.getElementById('abvf').value == 0){
                alert("Please fill out all relevant fields");
                return;
            }
            if (type === "london"){
                let panelHeight = 20.0 + Number(document.getElementById('f2fh').value) + Number(f2fh);
                if (mount === "outside"){
                    panelHeight =+ Number(document.getElementById('abvf').value) + Number(abvf);
                }
                let check;
                if (mainWidth === '') {check = 54;}
                else {check = (Number(document.getElementById('mainwidth').value) + Number(mainWidth));}
                if (panelHeight > check){
                    alert("Height is too much by " + (panelHeight - check));
                    return;
                }
                let cutWidth = 6.0 + Number(document.getElementById('f2fw').value) + Number(f2fw);
                if(cutWidth % 18 !== 0){
                    cutWidth += 18 - (cutWidth % 18);
                }
                calculateHobbledAddition(cutWidth);
                cutWidth = (cutWidth / 36);
                setYardage(cutWidth);
                return;
            }
            else{
                let panelHeight = 24.0 + Number(document.getElementById('f2fh').value) + Number(f2fh);
                if (mount === "outside"){
                    panelHeight =+ Number(document.getElementById('abvf').value) + Number(abvf);
                }
                let check;
                if (mainWidth === '') {check = 54;}
                else {check = (Number(document.getElementById('mainwidth').value) + Number(mainWidth));}
                if (panelHeight > check){
                    alert("Height is too much by " + (panelHeight - check));
                    return;
                }

                // do i still need the +6 for london hear?
                let cutWidth = 6.0 + Number(document.getElementById('f2fw').value) + Number(f2fw);
                let pleats = Number(document.getElementById('london-pleats').value);
                if (!pleats || pleats <= 0){pleats = 1;}
                cutWidth += 12 * pleats;
                if(cutWidth % 18 !== 0){
                    cutWidth += 18 - (cutWidth % 18);
                }
                cutWidth = (cutWidth / 36);
                setYardage(cutWidth);
                return;
            }
        }
        //this is for solid fabric (no vertical repeat)
        if (Number(document.getElementById('mainvert').value) === 0 && Number(mainVertical) === 0){
            console.log("no vertical repeat");
            //inside mounting
            if (mount === 'inside'){
                console.log('inside');
                if (document.getElementById('f2fw').value == 0 
                || document.getElementById('f2fh').value == 0
                ){
                    alert("Please fill out all relevant fields");
                    return;
                }
                const cutWidth = (Number(document.getElementById('f2fw').value) + Number(f2fw)) * 0.75 + 3;
                let check;
                if (mainWidth === '') {check = 54;}
                else {check = (Number(document.getElementById('mainwidth').value) + Number(mainWidth));}
                const widths = Math.ceil(cutWidth /check);
                if (type != "london"){
                    const cutLength = 20.0 + Number(document.getElementById('f2fh').value) + Number(f2fh);
                    const yardDiff = cutLength % 9;
                    let cutYards = cutLength;
                    if (yardDiff !== 0){
                        cutYards += (9 - yardDiff);
                    }    
                    calculateHobbledAddition(cutYards);
                    cutYards = (cutYards / 36).toFixed(2); 
                    setYardage(widths * cutYards);
                    return;
                } else{
                    const cutLength = 24.0 + Number(document.getElementById('f2fh').value) + Number(f2fh);
                    const yardDiff = cutLength % 9;
                    let cutYards = cutLength;
                    if (yardDiff !== 0){
                        cutYards += (9 - yardDiff);
                    }    
                    cutYards = (cutYards / 36).toFixed(2); 
                    setYardage(widths * cutYards);
                    return;
                }
            }
            //outside mounting
            else{
                console.log("outside");
                if (document.getElementById('f2fw').value == 0 
                || document.getElementById('abvf').value == 0 
                || document.getElementById('f2fh').value == 0
                ){
                    alert("Please fill out all relevant fields");
                    return;
                }
                let check;
                if (mainWidth === '') {check = 54;}
                else {check = (Number(document.getElementById('mainwidth').value) + Number(mainWidth));}
                const widths = Math.ceil(4.0 + Number(document.getElementById('f2fw').value) + Number(f2fw)) / check;
                const obHeight = Number(document.getElementById('abvf').value) + Number(abvf) + Number(document.getElementById('f2fh').value) + Number(f2fh);
                let cutYards = 20.0 + obHeight;
                const yardDiff = cutYards % 9;
                if (yardDiff !== 0){
                    cutYards += (9 - yardDiff);
                }    
                calculateHobbledAddition(cutYards);
                cutYards = (cutYards / 36).toFixed(2); 
                setYardage(widths * cutYards);
                return;
            }
        }
        //fabrics with repeat
        else{
            if (document.getElementById('f2fw').value == 0 
                || document.getElementById('mainvert').value == 0 
                || document.getElementById('f2fh').value == 0
                ){
                    alert("Please fill out all relevant fields");
                    return;
                }
            if (mount === "outside" && document.getElementById('abvf').value == 0){
                alert("Please fill out all relevant fields");
                return;
            }
            let repeats;
            if (mount === "outside"){repeats = Math.ceil((20.0 + Number(document.getElementById('f2fh').value) + Number(f2fh) + Number(document.getElementById('abvf').value) + Number(abvf)) / (Number(document.getElementById('mainvert').value) + Number(mainVertical)));}
            else{repeats = Math.ceil((20.0 + Number(document.getElementById('f2fh').value) + Number(f2fh)) / (Number(document.getElementById('mainvert').value) + Number(mainVertical)));}
            const cutLength = repeats * (Number(document.getElementById('mainvert').value) + Number(mainVertical)); 
            const yardDiff = cutLength % 9;
            let cutYards = cutLength;
            if (yardDiff !== 0){
                cutYards += (9 - yardDiff);
            }    
            calculateHobbledAddition(cutYards);
            cutYards = (cutYards / 36).toFixed(2); 
            let check;
            if (mainWidth === '') {check = 54;}
            else {check = (Number(document.getElementById('mainwidth').value) + Number(mainWidth));}
            const widths = Math.ceil((Number(document.getElementById('f2fw').value) + Number(f2fw)) / check);
            setYardage(widths * cutYards);
            return;
        }
    }
    const calcYardage = () => {
        if (mainrailroad === "railroad") {
            if (
                document.getElementById("f2fw").value == 0 ||
                document.getElementById("f2fh").value == 0
            ) {
                alert("Please fill out all relevant fields");
                return;
            }
            if (mount === "outside" && document.getElementById("abvf").value == 0) {
                alert("Please fill out all relevant fields");
                return;
            }

            // --- Railroaded Fabrics ---
            if (type === "london") {
                let panelHeight =
                    24.0 + Number(document.getElementById("f2fh").value) + Number(f2fh);
                if (mount === "outside") {
                    panelHeight += Number(document.getElementById("abvf").value) + Number(abvf);
                }

                let check;
                if (mainWidth === "") {
                    check = 54;
                } else {
                    check = Number(document.getElementById("mainwidth").value) + Number(mainWidth);
                }
                if (panelHeight > check) {
                    alert("Height is too much by " + (panelHeight - check));
                    return;
                }

                // Width + pleats for London
                let cutWidth = 6.0 + Number(document.getElementById("f2fw").value) + Number(f2fw);
                let pleats = Number(document.getElementById("london-pleats").value);
                if (!pleats || pleats <= 0) pleats = 1;
                cutWidth += 12 * pleats;

                if (cutWidth % 18 !== 0) {
                    cutWidth += 18 - (cutWidth % 18);
                }

                cutWidth = cutWidth / 36;
                setYardage(cutWidth);
                return;
            } else {
                // Non-London (standard) railroaded
                let panelHeight =
                    20.0 + Number(document.getElementById("f2fh").value) + Number(f2fh);
                if (mount === "outside") {
                    panelHeight += Number(document.getElementById("abvf").value) + Number(abvf);
                }

                let check;
                if (mainWidth === "") {
                    check = 54;
                } else {
                    check = Number(document.getElementById("mainwidth").value) + Number(mainWidth);
                }
                if (panelHeight > check) {
                    alert("Height is too much by " + (panelHeight - check));
                    return;
                }

                let cutWidth = 6.0 + Number(document.getElementById("f2fw").value) + Number(f2fw);
                if (cutWidth % 18 !== 0) {
                    cutWidth += 18 - (cutWidth % 18);
                }
                cutWidth = cutWidth / 36;
                setYardage(cutWidth);
                return;
            }
        }

        // --- SOLID FABRIC (no vertical repeat) ---
        if (
            Number(document.getElementById("mainvert").value) === 0 &&
            Number(mainVertical) === 0
        ) {
            console.log("no vertical repeat");

            // Inside mount
            if (mount === "inside") {
                console.log("inside");
                if (
                    document.getElementById("f2fw").value == 0 ||
                    document.getElementById("f2fh").value == 0
                ) {
                    alert("Please fill out all relevant fields");
                    return;
                }

                // --- Width + Pleats ---
                let cutWidth = (Number(document.getElementById("f2fw").value) + Number(f2fw)) * 0.75 + 3;
                if (type === "london"){
                    let pleats = Number(document.getElementById("london-pleats").value);
                    if (!pleats || pleats <= 0) pleats = 1;
                    cutWidth += 12 * pleats;
                }

                let check;
                if (mainWidth === "") {
                    check = 54;
                } else {
                    check = Number(document.getElementById("mainwidth").value) + Number(mainWidth);
                }
                const widths = Math.ceil(cutWidth / check);

                // --- Height ---
                const baseAdd = type === "london" ? 24.0 : 20.0;
                let cutLength = baseAdd + Number(document.getElementById("f2fh").value) + Number(f2fh);

                const yardDiff = cutLength % 9;
                if (yardDiff !== 0) cutLength += 9 - yardDiff;

                calculateHobbledAddition(cutLength);
                cutLength = (cutLength / 36).toFixed(2);
                setYardage(widths * cutLength);
                return;
            }

            // Outside mount
            else {
                console.log("outside");
                if (
                    document.getElementById("f2fw").value == 0 ||
                    document.getElementById("abvf").value == 0 ||
                    document.getElementById("f2fh").value == 0
                ) {
                    alert("Please fill out all relevant fields");
                    return;
                }

                let check;
                if (mainWidth === "") {
                    check = 54;
                } else {
                    check = Number(document.getElementById("mainwidth").value) + Number(mainWidth);
                }

                // --- Width + Pleats ---
                let cutWidth =
                    4.0 + Number(document.getElementById("f2fw").value) + Number(f2fw);
                if (type === "london"){
                    let pleats = Number(document.getElementById("london-pleats").value);
                    if (!pleats || pleats <= 0) pleats = 1;
                    cutWidth += 12 * pleats;
                }

                const widths = Math.ceil(cutWidth / check);

                // --- Height ---
                const baseAdd = type === "london" ? 24.0 : 20.0;
                const obHeight =
                    Number(document.getElementById("abvf").value) +
                    Number(abvf) +
                    Number(document.getElementById("f2fh").value) +
                    Number(f2fh);
                let cutYards = baseAdd + obHeight;

                const yardDiff = cutYards % 9;
                if (yardDiff !== 0) cutYards += 9 - yardDiff;

                calculateHobbledAddition(cutYards);
                cutYards = (cutYards / 36).toFixed(2);
                setYardage(widths * cutYards);
                return;
            }
        }

        // --- FABRICS WITH REPEAT ---
        else {
            if (
                document.getElementById("f2fw").value == 0 ||
                document.getElementById("mainvert").value == 0 ||
                document.getElementById("f2fh").value == 0
            ) {
                alert("Please fill out all relevant fields");
                return;
            }
            if (mount === "outside" && document.getElementById("abvf").value == 0) {
                alert("Please fill out all relevant fields");
                return;
            }

            // --- Repeats calculation ---
            const baseAdd = type === "london" ? 24.0 : 20.0;
            let repeats;
            if (mount === "outside") {
                repeats = Math.ceil(
                    (baseAdd +
                        Number(document.getElementById("f2fh").value) +
                        Number(f2fh) +
                        Number(document.getElementById("abvf").value) +
                        Number(abvf)) /
                        (Number(document.getElementById("mainvert").value) + Number(mainVertical))
                );
            } else {
                repeats = Math.ceil(
                    (baseAdd +
                        Number(document.getElementById("f2fh").value) +
                        Number(f2fh)) /
                        (Number(document.getElementById("mainvert").value) + Number(mainVertical))
                );
            }

            const cutLength =
                repeats *
                (Number(document.getElementById("mainvert").value) + Number(mainVertical));

            const yardDiff = cutLength % 9;
            let cutYards = cutLength;
            if (yardDiff !== 0) cutYards += 9 - yardDiff;

            calculateHobbledAddition(cutYards);
            cutYards = (cutYards / 36).toFixed(2);

            // --- Width + Pleats ---
            let cutWidth = Number(document.getElementById("f2fw").value) + Number(f2fw);
            if (type === "london"){
                let pleats = Number(document.getElementById("london-pleats").value);
                if (!pleats || pleats <= 0) pleats = 1;
                cutWidth += 12 * pleats;
            }

            let check;
            if (mainWidth === "") {
                check = 54;
            } else {
                check = Number(document.getElementById("mainwidth").value) + Number(mainWidth);
            }
            const widths = Math.ceil(cutWidth / check);

            setYardage(widths * cutYards);
            return;
        }
    };


    const [price, setPrice] = useState(null);
    const [stabilizer, setStabilizer] = useState(null);
    const calcPrice = () => {
        if (!document.getElementById('f2fw').value
        || !document.getElementById('f2fh').value
        || !opFunction || !lined){
            alert("Please fill out all relevant fields");
            return;
        }
        const width = Number(document.getElementById('f2fw').value) + Number(f2fw);
        let height = Number(document.getElementById('f2fh').value) + Number(f2fh);
        if (mount === "outside"){//outside
            if (!document.getElementById('abvf').value){
                alert("Please fill out all relevant fields");
                return;
            }
            height += Number(document.getElementById('abvf').value) + Number(abvf);
        }
        let sqFootage = width * height;
        
        sqFootage = Math.ceil(sqFootage / 144);
        const basePrice = sqFootage * Number(linings[lined]);
        let addPrice = 0;
        if (opFunction === "cordlock" || opFunction === "lift"){
            if (!stabilizer){
                alert("Please fill out all relevant fields");
                return;
            }
            if (stabilizer === "yes"){
                addPrice = 4.0 * sqFootage;
            }
        }
        else if (opFunction === "cordless"){
            addPrice = 30.0 * (width) / 12;
        }
        else{//this is for motorized
            addPrice = 650.0;
            const extraFeet = Math.ceil(((width) - 72) / 12);
            if (extraFeet > 2)
                addPrice += (extraFeet - 2) * 45.0;
        }
        let bandingPrice = 0;
        if (banding){
            if (document.getElementById("banding bottom").checked){
                bandingPrice += Math.ceil(width / 12);
            }
            if (document.getElementById("banding top").checked){
                bandingPrice += Math.ceil(width / 12);
            }
            if (document.getElementById("banding inside").checked){
                bandingPrice += 2 * Math.ceil((height + 10) / 12);
            }
            if (document.getElementById("banding outside").checked){
                bandingPrice += 2 * Math.ceil((height + 10) / 12);
            }
            bandingPrice *= 13;
        }
        console.log(basePrice);
        console.log(addPrice);
        console.log(bandingPrice);
        setPrice(basePrice + " for yardage + " + addPrice + " for operating function + " + bandingPrice + " for banding = " + (bandingPrice + basePrice + addPrice));
    }

    return(
        <div style={{border: 'grey solid 1px', padding:'5px'}}>
            <h1>Roman Shades</h1>
            <label>
                Please load a photo of the window:
                <input type='file' onChange={handleImageUpload} style={{marginLeft:'15px'}} multiple></input>
            </label><br></br><br></br>

            {/* What units are the measurements in?
            <label>
                <input style={{marginLeft:'25px'}} value='cm' type='radio' name='units1' onChange={handleUnits1}></input> Centimeters
                <input value='in' type='radio' name='units1' onChange={handleUnits1}
                    style={{marginLeft:'25px'}} checked={units1 === 'in'}></input> Inches
            </label><br></br> */}

            What kind of Roman is this?
            <div>
                <label>
                    <input type='radio' name='type' style={{marginRight:'5px'}}
                    onChange={handleType} value={'flat'} defaultChecked={true}>
                    </input>
                    Flat
                </label> <br />
                <label>
                    <input type='radio' name='type' style={{marginRight:'5px'}}
                    onChange={handleType} value={'relaxed'} >
                    </input>
                    Relaxed
                </label> <br />
                <label>
                    <input type='radio' name='type' style={{marginRight:'5px'}}
                    onChange={handleType} value={'hobbled'} >
                    </input>
                    Hobbled
                </label> <br />
                <label>
                    <input type='radio' name='type' style={{marginRight:'5px'}}
                    onChange={handleType} value={'london'} >
                    </input>
                    London
                </label> <br />
                {type === 'london' && <div>
                    <label style={{marginLeft:'25px'}}>
                        How many pleats do you want? <br />
                        <input type="text" name='london-pleats' ></input>
                    </label> <br />
                </div>} <br />
            </div>



            Where are we mounting?
            <div>
                <label> 
                    <input type='radio' name='mount' style={{marginRight:'5px'}}
                    value={'inside'} onChange={handleMount}></input>
                    Inside
                </label> <br></br>
                <label>
                    <input type='radio' name='mount' style={{marginRight:'5px'}}
                    value={'outside'} onChange={handleMount}></input>
                    Outside
                </label><br></br><br></br>
                {mount === 'inside' && <div>
                    What are the approx. following dimensions for inside mounts: 
                    <br></br><label>
                        *Frame-to-frame width:
                        <input id='f2fw' style={{marginLeft:'78px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {f2fw}
                            change = {handlef2fw}
                        ></Dropdown>
                    </>}<br></br>
                    <label >
                        *Frame-to-frame height (to sill): 
                        <input id='f2fh' style={{marginLeft:'19px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {f2fh}
                            change = {handlef2fh}
                        ></Dropdown>
                    </>}<br></br><br></br>
                </div>}

                {mount === 'outside' && <div>
                    What are the approx. following dimensions for outside mounts: 
                    <br></br><label>
                        *Frame-to-frame width:
                        <input id='f2fw' style={{marginLeft:'291px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {f2fw}
                            change = {handlef2fw}
                        ></Dropdown>
                    </>}<br></br>
                    <label >
                        *Frame-to-frame height (to sill): 
                        <input id='f2fh' style={{marginLeft:'232px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {f2fh}
                            change = {handlef2fh}
                        ></Dropdown>
                    </>}<br></br>
                    {/* <label >
                        Above frame to ceiling:
                        <input id='abvc' style={{marginLeft:'289px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {abvc}
                            change = {handleabvc}
                        ></Dropdown>
                    </>}<br></br> */}
                    <label >
                        *How far above frame will unit be mounted for outside mounts:
                        <input id='abvf' style={{marginLeft:'11px'}}></input>
                    </label>
                    {units1 === 'in' && <>
                        <Dropdown
                            value = {abvf}
                            change = {handleabvf}
                        ></Dropdown>
                    </>}
                    <br></br><br></br>
                </div>}
            </div>

            <>
            {/* Will this be a stationary Roman?
            <div>
                <label> 
                    <input type='radio' name='stationary' style={{marginRight:'5px'}}
                    value={'Yes'} onChange={handleStationary}></input>
                    Yes
                </label> <br></br>
                <label>
                    <input type='radio' name='stationary' style={{marginRight:'5px'}}
                    value={'No'} onChange={handleStationary}></input>
                    No
                </label><br></br><br></br>
            </div> */}
            </>

            Please select the operating function (pick 1):
            <div>
                <label> 
                    <input type='radio' name='opFunction' style={{marginRight:'5px'}} defaultChecked={true}
                    value={'cordlock'} onChange={handleOpFunction}></input>
                    Cordlock
                </label> <br></br>
                <label> 
                    <input type='radio' name='opFunction' style={{marginRight:'5px'}}
                    value={'cordless'} onChange={handleOpFunction}></input>
                    Cordless
                </label> <br></br>
                <label> 
                    <input type='radio' name='opFunction' style={{marginRight:'5px'}}
                    value={'lift'} onChange={handleOpFunction}></input>
                    Clutch Lift
                </label> <br></br>
                {opFunction === 'lift' && <div>
                    What color bead chain would you like? <br />
                    <label style={{marginLeft:'25px'}}>
                        <input name='lift-color' type='radio' style={{marginRight:'5px'}} onClick={() => {setBead("Steel")}}></input>
                        Stainless Steel (standard)
                    </label> <br />
                    <label style={{marginLeft:'25px'}}>
                        <input name='lift-color' type='radio' style={{marginRight:'5px'}} onClick={() => {setBead("Antique")}}></input>
                        Antique Brass
                    </label> <br />
                    <label style={{marginLeft:'25px'}}>
                        <input name='lift-color' type='radio' style={{marginRight:'5px'}} onClick={() => {setBead("Polished")}}></input>
                        Polished Brass
                    </label> <br />
                    <label style={{marginLeft:'25px'}}>
                        <input name='lift-color' type='radio' style={{marginRight:'5px'}} onClick={() => {setBead("Black")}}></input>
                        Black
                    </label> <br />
                    <label style={{marginLeft:'25px'}}>
                        <input name='lift-color' type='radio' style={{marginRight:'5px'}} onClick={() => {setBead("White")}}></input>
                        White
                    </label>
                </div>}
                <label> 
                    <input type='radio' name='opFunction' style={{marginRight:'5px'}}
                    value={'motorized'} onChange={handleOpFunction}></input>
                    Motorized (pick 1):
                </label> <br></br>
                {opFunction === "motorized" &&  <div>
                    <label> 
                        <input type='radio' defaultChecked = {true} name='motorType' style={{marginRight:'5px', marginLeft:"25px"}}
                        value={'battery'} onChange={handleMotorChange}></input>
                        Rechargeable battery
                    </label> <br></br>
                    <label> 
                        <input type='radio' name='motorType' style={{marginRight:'5px', marginLeft:"25px"}}
                        value={'plug in'} onChange={handleMotorChange}></input>
                        Plug in
                    </label> <br></br><br></br>
                    {/* {motorType === 'hardwired' && <div style={{marginLeft:'50px'}}> */}
                        Is there an existing home-automation system?
                        <br></br><label> 
                            <input type='radio' defaultChecked={true} name='homeAuto' style={{marginRight:'5px'}}
                            value={'no'} onChange={handleHomeAuto}></input>
                            No
                        </label> <br></br>
                        <label>
                            <input type='radio' name='homeAuto' style={{marginRight:'5px'}}
                            value={'yes'} onChange={handleHomeAuto}></input>
                            Yes (what is it)?
                                <input id='homeauto'></input>
                        </label><br></br>
                    {/* </div>} */}
                </div>}
                {(opFunction === "cordlock" || opFunction === "lift") && <div>
                    <br />Do you want to add stabilizer bars for structure?
                    <br /><label><input type="radio" name='stablizer' onChange={() => setStabilizer("yes")}/> Yes</label>
                    <br /><label><input type="radio" name='stablizer' onChange={() => setStabilizer("no")}/> No</label>
                </div>}
                <br></br>
            </div>

            Roman Shade Lining Preference:
            <div>
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
                How are we running the fabric?
                <br></br><label> 
                    <input type='radio' name='mainrailroad' style={{marginRight:'5px'}} defaultChecked
                    value={'up the bolt'} onChange={handleMainRailroad}></input>
                    Up the bolt
                </label> <br></br>
                <label>
                    <input type='radio' name='mainrailroad' style={{marginRight:'5px'}}
                    value={'railroad'} onChange={handleMainRailroad}/>
                    Railroading
                </label><br/>
            </div><br />

            Embellishments
            <div>
                <label>
                    <input type="checkbox" style={{marginRight:'5px'}} onChange={() => {setBanding(!banding)}}/>
                    Ready to use banding/trim
                </label>
                {banding && <div>
                    <label style={{marginLeft:'25px'}}>
                        <input type="checkbox" name="banding-type" style={{marginRight:'5px'}} id='banding bottom'/>
                    Bottom</label><br />
                    <label style={{marginLeft:'25px'}}>
                        <input type="checkbox" name="banding-type" style={{marginRight:'5px'}} id='banding inside'/>
                    Inside Edge</label><br />
                    <label style={{marginLeft:'25px'}}>
                        <input type="checkbox" name="banding-type" style={{marginRight:'5px'}} id='banding outside'/>
                    Outside Edge</label><br />
                    <label style={{marginLeft:'25px'}}>
                        <input type="checkbox" name="banding-type" style={{marginRight:'5px'}} id='banding top'/>
                    Top</label><br />
                </div>}
            </div> <br />

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
                Contrast Fabric specifications: <br />
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
                How are we running the fabric?
                <br></br><label> 
                    <input type='radio' name='contrastrailroad' style={{marginRight:'5px'}}
                    value={false} onChange={handleContrastRailroad}></input>
                    Up the bolt
                </label> <br></br>
                <label>
                    <input type='radio' name='contrastrailroad' style={{marginRight:'5px'}}
                    value={true} onChange={handleContrastRailroad}></input>
                    Railroading
                </label><br></br><br></br>
                Please specify where the contrast fabric will be used:
                <input id='where'></input>
            </div>} <br />
            {/* <div className='row'>
                <div className='column'>
                    <button onClick={calcYardage}>Calculate yardage</button> <br />
                    {yardage}
                </div>
                <div className='column'>
                    <button onClick={calcPrice}>Calculate pricing</button> <br />
                    {price}
                </div>
                <div className='column'>
                    <button onClick={submitForm}>Submit</button> 
                </div>
            </div> */}

            <div className='column'>
                <button onClick={calcYardage} style={{marginRight: '5px'}}>Calculate yardage</button> 
                {yardage} <br />
            </div>
            <div className='column'>
                <button onClick={calcPrice} style={{marginRight: '5px'}}>Calculate pricing</button> 
                {price} <br />
            </div>
        </div>
    )
}

export default Roman;