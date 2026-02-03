import React, { useState, useEffect } from 'react';

const Roman = ({pname, name, address, email, room, numWindow, uploads, estName, formSection, handleFormSection, linings}) => {
    const[mount, setMount] = useState('Inside');
    const[opFunction, setOpFunction] = useState('Cordless');
    const[motorType, setMotorType] = useState('battery'); // Value isn't used but included for completeness
    const[homeAuto, setHomeAuto] = useState('');
    const[lined, setLined] = useState('Unlined');
    const[com, setCom] = useState('yes');
    const[mainrailroad, setMainRailroad] = useState('false');
    
    const [f2fw, f2fwc] = useState(0);
    const [f2fh, f2fhc] = useState(0);
    const [f2fwFrac, f2fwC] = useState(0);
    const [f2fhFrac, f2fhC] = useState(0);
    const handlef2fw = (e) => {f2fwc(e.target.value);};
    const handlef2fh = (e) => {f2fhc(e.target.value);};
    const handlef2fwFrac = (e) => {f2fwC(e.target.value);};
    const handlef2fhFrac = (e) => {f2fhC(e.target.value);};

    const [abvf, abvfc] = useState(0);
    const [abvfFrac, abvfC] = useState(0);
    const handleabvf = (e) => {abvfc(e.target.value);};
    const handleabvfFrac = (e) => {abvfC(e.target.value);};

    const handleMount = (event) => {setMount(event.target.value);}
    const [type, setType] = useState('Flat');
    const handleType = (event) => {setType(event.target.value);}
    const handleOpFunction = (event) => {
        setOpFunction(event.target.value);
        if (event.target.value === 'Motorized'){setMotorType('battery')}
    }
    const handleMotorChange = (event) => {
        setMotorType(event.target.value);
        if (event.target.value === 'hardwired'){setHomeAuto('no')}
    }
    const handleHomeAuto = (event) => {setHomeAuto(event.target.value);}
    const handleLinedChange = (event) => {setLined(event.target.value);}
    const handleCom = (event) => {setCom(event.target.value);}
    const handleMainRailroad = (event) => {setMainRailroad(event.target.value);}
    
    const [mainWidth, mainWidthChange] = useState(54);
    const [mainVertical, mainVerticalChange] = useState(0);
    const [mainHorizontal, mainHorizontalChange] = useState(0);
    const [mainWidthFrac, mainWidthFracChange] = useState(0);
    const [mainVerticalFrac, mainVerticalFracChange] = useState(0);
    const [mainHorizontalFrac, mainHorizontalFracChange] = useState(0);

    const handleMainWidth = (e) => {
        if (e.target.value === '') mainWidthChange(54);
        else mainWidthChange(e.target.value);
    };
    const handleMainVertical = (e) => {mainVerticalChange(e.target.value);};
    const handleMainHorizontal = (e) => {mainHorizontalChange(e.target.value);};
    const handleMainWidthFrac = (e) => {mainWidthFracChange(e.target.value);};
    const handleMainVerticalFrac = (e) => {mainVerticalFracChange(e.target.value);};
    const handleMainHorizontalFrac = (e) => {mainHorizontalFracChange(e.target.value);};

    const [banding, setBanding] = useState(false);
    // This represents the types of trim selected
    const [trim, setTrim] = useState([]);
    // This function adds or removes the value of each trim checkbox to the trim array
    const handleTrim = (event) => {
        if (event.target.checked){
            setTrim([...trim, event.target.value]);
        } else {
            setTrim(trim.filter(item => item !== event.target.value));
        }
    }

    // Bead option only for Lift, doesn't affect price or yardage but included for completeness
    const [bead, setBead] = useState("Steel");
    useEffect(() => {if (opFunction !== "Lift") setBead(null);},[opFunction])

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

    const getLiningPrice = (lining) => {
        if (lining in linings){ return linings[lining]; }
        else if (lining.includes("Light") || lining ==='Napped Sateen'){ return linings['Light Filtering']; }
        else {return linings['Other'];}
    }

    // Helper function to calculate the hobbled fabric addition
    const calculateHobbledAddition = (shadeHeight) => {
        if (type !== "Hobbled") {
            return shadeHeight;
        }
        // Add 5 inches for every 8 inches of height (shade height only)
        return Math.ceil(shadeHeight / 8) * 5;
    };

    // Yardage calculation constants
    const panelHeightAdditionLondon = 24.0; // for London
    const panelHeightAdditionStandard = 20.0; // for standard
    const cutWidthAddition = 6.0; // for standard and London
    const cutWidthAdditionOutside = 4.0;

    const [yardage, setYardage] = useState(null);
    const calcYardage = () => {
        if (mainrailroad === "true") {
            if (!f2fw ||!f2fh) {
                alert("Please fill out all relevant fields");
                return;
            }
            if (mount === "Outside" && !abvf) {
                alert("Please fill out all relevant fields");
                return;
            }

            // --- Railroaded Fabrics ---
            if (type === "London") {
                let panelHeight =
                    panelHeightAdditionLondon + Number(f2fhFrac) + Number(f2fh);
                if (mount === "Outside") {
                    panelHeight += Number(abvfFrac) + Number(abvf);
                }

                let check = Number(mainWidth) + Number(mainWidthFrac);
                if (panelHeight > check) {
                    alert("Height is too much by " + (panelHeight - check));
                    return;
                }

                // Width + pleats for London
                let cutWidth = cutWidthAddition + Number(f2fwFrac) + Number(f2fw);
                let pleats = Number(document.getElementById("London-pleats").value);
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
                    panelHeightAdditionStandard + Number(f2fhFrac) + Number(f2fh);
                if (mount === "Outside") {
                    panelHeight += Number(abvfFrac) + Number(abvf);
                }

                let check;
                if (mainWidth === "") {
                    check = 54;
                } else {
                    check = Number(mainWidthFrac) + Number(mainWidth);
                }
                if (panelHeight > check) {
                    alert("Height is too much by " + (panelHeight - check));
                    return;
                }

                let cutWidth = cutWidthAddition + Number(f2fwFrac) + Number(f2fw);
                if (cutWidth % 18 !== 0) {
                    cutWidth += 18 - (cutWidth % 18);
                }
                cutWidth = cutWidth / 36;
                setYardage(cutWidth);
                return;
            }
        }

        // --- SOLID FABRIC (no vertical repeat) ---
        if (Number(mainVertical) === 0) {
            // Inside mount
            if (mount === "Inside") {
                if (!f2fw || !f2fh) {
                    alert("Please fill out all relevant fields");
                    return;
                }

                // --- Width + Pleats ---
                let cutWidth = (Number(f2fwFrac) + Number(f2fw)) * 0.75 + 3;
                if (type === "London"){
                    let pleats = Number(document.getElementById("London-pleats").value);
                    if (!pleats || pleats <= 0) pleats = 1;
                    cutWidth += 12 * pleats;
                }

                let check = Number(mainWidthFrac) + Number(mainWidth);
                const widths = Math.ceil(cutWidth / check);

                // --- Height ---
                const baseAdd = type === "London" ? panelHeightAdditionLondon : panelHeightAdditionStandard;
                let cutLength = baseAdd + Number(f2fhFrac) + Number(f2fh);

                const yardDiff = cutLength % 9;
                if (yardDiff !== 0) cutLength += 9 - yardDiff;

                calculateHobbledAddition(cutLength);
                cutLength = (cutLength / 36).toFixed(2);
                setYardage(widths * cutLength);
                return;
            }

            // Outside mount
            else {
                if (!f2fw || !abvf || !f2fh) {
                    alert("Please fill out all relevant fields");
                    return;
                }

                let check = Number(mainWidthFrac) + Number(mainWidth);

                // --- Width + Pleats ---
                let cutWidth =
                    cutWidthAdditionOutside + Number(document.getElementById("f2fw").value) + Number(f2fw);
                if (type === "London"){
                    let pleats = Number(document.getElementById("London-pleats").value);
                    if (!pleats || pleats <= 0) pleats = 1;
                    cutWidth += 12 * pleats;
                }

                const widths = Math.ceil(cutWidth / check);

                // --- Height ---
                const baseAdd = type === "London" ? 24.0 : 20.0;
                const obHeight = Number(abvfFrac) + Number(abvf) + Number(f2fhFrac) + Number(f2fh);
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
            if ( !f2fh || !f2fw || !mainVertical) {
                alert("Please fill out all relevant fields");
                return;
            }
            if (mount === "Outside" && abvf === 0) {
                alert("Please fill out all relevant fields");
                return;
            }

            // --- Repeats calculation ---
            const baseAdd = type === "London" ? panelHeightAdditionLondon : panelHeightAdditionStandard;
            let repeats;
            if (mount === "Outside") {
                repeats = Math.ceil(
                    (baseAdd + Number(f2fhFrac) + Number(f2fh) 
                    + Number(abvfFrac) + Number(abvf))
                    / (Number(mainVerticalFrac) + Number(mainVertical))
                );
            } else {
                repeats = Math.ceil(
                    (baseAdd + Number(f2fhFrac) + Number(f2fh)) 
                    / (Number(mainVerticalFrac) + Number(mainVertical))
                );
            }

            const cutLength =
                repeats *
                (Number(mainVerticalFrac) + Number(mainVertical));

            const yardDiff = cutLength % 9;
            let cutYards = cutLength;
            if (yardDiff !== 0) cutYards += 9 - yardDiff;

            calculateHobbledAddition(cutYards);
            cutYards = (cutYards / 36).toFixed(2);

            // --- Width + Pleats ---
            let cutWidth = Number(f2fwFrac) + Number(f2fw);
            if (type === "London"){
                let pleats = Number(document.getElementById("London-pleats").value);
                if (!pleats || pleats <= 0) pleats = 1;
                cutWidth += 12 * pleats;
            }

            let check = Number(mainWidthFrac) + Number(mainWidth);
            const widths = Math.ceil(cutWidth / check);

            setYardage(widths * cutYards);
            return;
        }
    };

    // Automatically calculate yardage when the relevant inputs are filled.
    useEffect(() => {
        let doCalc = true;

        // Basic requirement: f2fw and f2fh must have values for most calculations
        if (!f2fw || !f2fh || f2fw === 0 || f2fh === 0){
            doCalc = false;
        }

        // All minimal checks passed -> calculate yardage and pricing after a delay. This delay helps ensure yardage is set before price calculation
        // Else, reset yardage and price to 0
        if (doCalc) {
            calcYardage();
            setTimeout(calcPrice, 100);
        }else{
            setYardage(0);
            setPrice(0);
        }
    }, [
        mainrailroad, type, mount,
        f2fw, f2fh, abvf,
        f2fwFrac, f2fhFrac, abvfFrac,
        mainWidth, mainVertical, mainHorizontal,
        mainHorizontalFrac, mainWidthFrac, mainVerticalFrac
    ]);

    // Pricing constants
    const stabilizerAddon = 4.0; // per sq ft
    const cordlessAddon = 30.0; // per ft
    const motorizedBase = 650.0; // base price
    const motorizedExtra = 45.0; // per ft over 72"
    const bandingCostPerYard = 13; // Cost per yard of banding
    const bandingHeightAllowance = 10; // Extra height added to inside/outside banding for hems

    const [price, setPrice] = useState(null);
    const [stabilizer, setStabilizer] = useState("yes");
    const calcPrice = () => {
        if (!f2fh || !f2fw
        || !opFunction || !lined){
            alert("Please fill out all relevant fields");
            return;
        }
        const width = getTotal(f2fw, f2fwFrac);
        let height = getTotal(f2fh, f2fhFrac);
        if (mount === "Outside"){//Outside
            if (!abvf || !abvfFrac){
                alert("Please fill out all relevant fields");
                return;
            }
            height += getTotal(abvf, abvfFrac);
        }
        let sqFootage = width * height;
        sqFootage = Math.ceil(sqFootage / 144);
        const basePrice = sqFootage * getLiningPrice(lined);

        let addPrice = 0;
        if (opFunction === "Cordlock" || opFunction === "Lift"){
            if (!stabilizer){
                alert("Please fill out all relevant fields");
                return;
            }
            if (stabilizer === "yes"){
                addPrice = stabilizerAddon * sqFootage;
            }
        }
        else if (opFunction === "Cordless"){
            addPrice = cordlessAddon * (width) / 12;
        }
        else{//this is for Motorized
            addPrice = motorizedBase;
            const extraFeet = Math.ceil(((width) - 72) / 12);
            if (extraFeet > 2)
                addPrice += (extraFeet - 2) * motorizedExtra;
        }
        let bandingPrice = 0;
        if (banding){
            if (trim.includes("Bottom")){
                bandingPrice += Math.ceil(width / 12);
            }
            if (trim.includes("Top")){
                bandingPrice += Math.ceil(width / 12);
            }
            if (trim.includes("Inside")){
                bandingPrice += 2 * Math.ceil((height + bandingHeightAllowance) / 12);
            }
            if (trim.includes("Outside")){
                bandingPrice += 2 * Math.ceil((height + bandingHeightAllowance) / 12);
            }
            bandingPrice *= bandingCostPerYard;
        }
        setPrice(basePrice + " for yardage + " + addPrice + " for operating function + " + bandingPrice + " for banding = " + (bandingPrice + basePrice + addPrice));
    }

    // This is triggered when items that affect price but not yardage are changed -> recalculate price only
    useEffect(() => {
        let doCalc = true;
        // If yardage hasn't been calculated yet, skip price calculation
        if (yardage === 0 || !yardage){
            doCalc = false;
        }
        if (doCalc) calcPrice();
    }, [trim, banding, opFunction, stabilizer, lined]);

    // Helper function to ensure only valid numbers are entered
    const checkNum = (e) => {if (!e.target.validity.valid) e.target.value = '';}
    // Helper function to display total
    const getTotal = (num1, frac1) => { return Number(num1) + Number(frac1);}
    // Helper function to shorten a number to two decimal places
    const short = (value) => {return Number(value).toFixed(2);}
    // Helper function to round a value up to the nearest quarter yard
    const round = (value) => {return value - (value % 0.25) + 0.25}

    // 
    // Unused states and handlers
    // 
    
    /* const[windowImg, setWindowImg] = useState(null);
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
    }*/
    
    /* const[stationary,setStationary] = useState('');
    const handleStationary = (event) =>{setStationary(event.target.value);} */

    // const[hardwired, setHardwired] = useState('');

    /* const [abvc, abvcc] = useState('');
    const handleabvc = (e) => {abvcc(e.target.value);}; */

    /* const[contrastrailroad, setContrastRailroad] = useState('');
    const handleContrastRailroad = (event) => {setContrastRailroad(event.target.value);} */

    /*
    // const[units1, setUnits1] = useState('in');
    // const[units2, setUnits2] = useState('in');
    // const[units3, setUnits3] = useState('in');
    // const handleUnits1 = (event) => {setUnits1(event.target.value);}
    // const handleUnits2 = (event) => {setUnits2(event.target.value);}
    // const handleUnits3 = (event) => {setUnits3(event.target.value);}*/

    /*
    // Contrast fabric units
    // const [contr, setContr] = useState(null);

    // const [contrastWidth, contrastWidthChange] = useState('');
    // const [contrastVertical, contrastVerticalChange] = useState('');
    // const [contrastHorizontal, contrastHorizontalChange] = useState('');
    // const handleContrastWidth = (e) => {contrastWidthChange(e.target.value);};
    // const handleContrastVertical = (e) => {contrastVerticalChange(e.target.value);};
    // const handleContrastHorizontal = (e) => {contrastHorizontalChange(e.target.value);}; */

    // const [bandingType, setBandingType] = useState(null);

    /*useEffect(() => {
        if (!banding){
            setBandingType(null);
        }
    },[banding])*/

    /*const submitForm = (e) => {
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

        if (mount === 'Inside'){
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

        if(opFunction === 'Lift'){formData.append('OpFunc', opFunction + document.getElementById('lift-color').value);}
        else if (opFunction === 'Motorized'){
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

        fetch(process.env.REACT_APP_FORM_SUBMISSION_API, {
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

        
    }*/

    /*async function uploadAllFiles() {
        console.log("Uploading:", {
            pname, name, address, windowImg
          });
        const url = process.env.REACT_APP_FORM_SUBMISSION_API;
      
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
      } */

    return(
        <div className="container container-row">
            <div className='container left'>
            {formSection === 1 && <div className='form-group-indent'>
                <h1>Roman Shade Dimensions</h1>
                <>
                {/* <label>
                    Please load a photo of the window:
                    <input type='file' onChange={handleImageUpload} style={{marginLeft:'15px'}} multiple></input>
                </label><br></br><br></br> */}

                {/* What units are the measurements in?
                <label>
                    <input style={{marginLeft:'25px'}} value='cm' type='radio' name='units1' onChange={handleUnits1}></input> Centimeters
                    <input value='in' type='radio' name='units1' onChange={handleUnits1}
                        style={{marginLeft:'25px'}} checked={units1 === 'in'}></input> Inches
                </label><br></br> */}
                </>
                    <div className="form-section">
                        <div className='row dimensions-section'>
                            <div className='column'>
                                <h4>What kind of Roman is this?</h4>
                                <div>
                                    <label>
                                        <input type='radio' name='type' style={{marginRight:'5px'}}
                                        onChange={handleType} value={'Flat'} defaultChecked={true}>
                                        </input>
                                        Flat
                                    </label> <br />
                                    <label>
                                        <input type='radio' name='type' style={{marginRight:'5px'}}
                                        onChange={handleType} value={'Relaxed'} >
                                        </input>
                                        Relaxed
                                    </label> <br />
                                    <label>
                                        <input type='radio' name='type' style={{marginRight:'5px'}}
                                        onChange={handleType} value={'Hobbled'} >
                                        </input>
                                        Hobbled
                                    </label> <br />
                                    <label>
                                        <input type='radio' name='type' style={{marginRight:'5px'}}
                                        onChange={handleType} value={'London'} >
                                        </input>
                                        London
                                    </label> <br />
                                    {type === 'London' && <div>
                                        <label style={{marginLeft:'25px'}}>
                                            How many pleats do you want? <br />
                                            <input type="number" className='fixed-width-input' 
                                            name='London-pleats' onInput={checkNum}></input>
                                        </label>
                                    </div>} <br />
                                </div>
                            </div>
                            <div className='column'>
                                <h4>Where are we mounting?</h4>
                                <div>
                                    <label className="radio-label"> 
                                        <input type='radio' name='mount' defaultChecked={true}
                                        value={'Inside'} onChange={handleMount}></input>
                                        Inside
                                    </label>
                                    <label className="radio-label">
                                        <input type='radio' name='mount'
                                        value={'Outside'} onChange={handleMount}></input>
                                        Outside
                                    </label>
                                </div>
                            </div>
                            <div className='column'>
                                <div>
                                    <label className='dimension-label'>
                                        Frame-to-frame width:
                                    </label><br />
                                    <input type='number' className='fixed-width-input' min="0" placeholder={f2fw || 0}
                                    onInput={checkNum} id='f2fw' onChange={handlef2fw}></input>
                                    {<>
                                        <Dropdown
                                            value = {f2fwFrac}
                                            change = {handlef2fwFrac}
                                        ></Dropdown>
                                    </>}<br></br>
                                    <label className='dimension-label'>
                                        Frame-to-frame height (to sill): 
                                    </label> <br />
                                    <input id='f2fh' type='number' className='fixed-width-input' min="0" placeholder={f2fh || 0}
                                    onInput={checkNum} onChange={handlef2fh} ></input>
                                    {<>
                                        <Dropdown
                                            value = {f2fhFrac}
                                            change = {handlef2fhFrac}
                                        ></Dropdown>
                                    </>}
                                </div>

                                {mount === 'Outside' && <div >
                                    <>
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
                                    </>
                                    <label className='dimension-label'>
                                        How far above frame:
                                    </label><br />
                                    <input id='abvf' type='number' className='fixed-width-input' min="0" placeholder={abvf || 0}
                                    onInput={checkNum} onChange={handleabvf}></input>
                                    {<>
                                        <Dropdown
                                            value = {abvfFrac}
                                            change = {handleabvfFrac}
                                        ></Dropdown>
                                    </>}
                                    <br></br><br></br>
                                </div>}
                            </div>
                        </div>
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
                        <>
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
                        </>
                        <div className='row dimensions-section'>
                        <div className='column'>
                            <label>
                                Width:
                                <br />
                                <input type='number' id='mainwidth' className='fixed-width-input' min="0" 
                                onInput={checkNum} onChange={handleMainWidth} placeholder={mainWidth || 0}></input>
                            </label>
                            {<>
                                <Dropdown
                                value={mainWidthFrac}
                                change={handleMainWidthFrac}
                                ></Dropdown>
                            </>}
                        </div><br />
                        <div className='column'>
                            <label>
                                Vertical repeat:
                                <br />
                                <input type='number' id='mainvert' className='fixed-width-input' min="0" 
                                onInput={checkNum} onChange={handleMainVertical} placeholder={mainVertical || 0}></input>
                            </label>
                            {<>
                                <Dropdown
                                value={mainVerticalFrac}
                                change={handleMainVerticalFrac}
                                ></Dropdown>
                            </>}
                        </div><br />
                        <div className='column'>
                            <label>
                                Horizontal repeat:
                                <br />
                                <input type='number' id='mainhorizontal' className='fixed-width-input' min="0" 
                                onInput={checkNum} onChange={handleMainHorizontal} placeholder={mainHorizontal || 0}></input>
                            </label>
                            {<>
                                <Dropdown
                                value={mainHorizontalFrac}
                                change={handleMainHorizontalFrac}
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
                                        <input type="checkbox" onChange={() => {setBanding(!banding);  setTrim([])}}/>
                                        Ready to use banding/trim
                                    </label>
                                    {banding && <div className="sub-option-indent">
                                        <label className="checkbox-label">
                                            <input type="checkbox" name="banding-type" id='Bottom' value='Bottom'
                                            onChange={handleTrim} defaultChecked={trim.includes('Bottom')}/>
                                            Bottom
                                        </label>
                                        <label className="checkbox-label">
                                            <input type="checkbox" name="banding-type" id='Inside' value='Inside'
                                            onChange={handleTrim} defaultChecked={trim.includes('Inside')}/>
                                            Inside Edge
                                        </label>
                                        <label className="checkbox-label">
                                            <input type="checkbox" name="banding-type" id='Outside' value='Outside'
                                            onChange={handleTrim} defaultChecked={trim.includes('Outside')}/>
                                            Outside Edge
                                        </label>
                                        <label className="checkbox-label">
                                            <input type="checkbox" name="banding-type" id='Top' value='Top'
                                            onChange={handleTrim} defaultChecked={trim.includes('Top')}/>
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
                        </div>
                    </div>
                    <button className="next-button" onClick={() => handleFormSection(prev => prev + 1)}>Next</button>
                    <button className="back-button" onClick={() => handleFormSection(prev => prev - 1)}>Back</button>
                </div>
            }
        
            {formSection === 2 && <div className="form-group-indent">
                <h1>Roman Shade Materials</h1>
                <div className='form-section'> 
                    <div className='row dimensions-section'>
                        <div className='column'>
                            <h4>Operating Function</h4>
                            <div className="form-section">
                                <label> 
                                    <input type='radio' name='opFunction' style={{marginRight:'5px'}} defaultChecked={true}
                                    value={'Cordless'} onChange={handleOpFunction}></input>
                                    Cordless
                                </label> <br></br>
                                <label> 
                                    <input type='radio' name='opFunction' style={{marginRight:'5px'}} 
                                    value={'Cordlock'} onChange={handleOpFunction}></input>
                                    Cordlock
                                </label> <br></br>
                                <label> 
                                    <input type='radio' name='opFunction' style={{marginRight:'5px'}}
                                    value={'Lift'} onChange={handleOpFunction}></input>
                                    Clutch Lift
                                </label> <br></br>
                                <label> 
                                    <input type='radio' name='opFunction' style={{marginRight:'5px'}}
                                    value={'Motorized'} onChange={handleOpFunction}></input>
                                    Motorized (pick 1):
                                </label> <br></br>
                                <br></br>
                            </div>
                        </div>
                        <div className='column'>
                            {opFunction === 'Lift' && <div>
                                <h4>Lift Options</h4>
                                <label>
                                    <input name='lift-color' defaultChecked={true} type='radio' style={{marginRight:'5px'}} onClick={() => {setBead("Steel")}}></input>
                                    Stainless Steel (standard)
                                </label> <br />
                                <label>
                                    <input name='lift-color' type='radio' style={{marginRight:'5px'}} onClick={() => {setBead("Antique")}}></input>
                                    Antique Brass
                                </label> <br />
                                <label>
                                    <input name='lift-color' type='radio' style={{marginRight:'5px'}} onClick={() => {setBead("Polished")}}></input>
                                    Polished Brass
                                </label> <br />
                                <label>
                                    <input name='lift-color' type='radio' style={{marginRight:'5px'}} onClick={() => {setBead("Black")}}></input>
                                    Black
                                </label> <br />
                                <label>
                                    <input name='lift-color' type='radio' style={{marginRight:'5px'}} onClick={() => {setBead("White")}}></input>
                                    White
                                </label> <br />

                            </div>}
                            {opFunction === "Motorized" &&  <div>
                                <h4>Motorized Options</h4>
                                <label> 
                                    <input type='radio' defaultChecked = {true} name='motorType'
                                    value={'battery'} onChange={handleMotorChange}></input>
                                    Rechargeable battery
                                </label> <br></br>
                                <label> 
                                    <input type='radio' name='motorType'
                                    value={'plug in'} onChange={handleMotorChange}></input>
                                    Plug in
                                </label> <br></br><br></br>
                            </div>}
                            {(opFunction === "Cordlock") && <div>
                                <h4>Stabilizer Bars</h4>
                                <label><input type="radio" defaultChecked={true} name='stablizer' onChange={() => setStabilizer("yes")}/> Yes</label>
                                <br /><label><input type="radio" name='stablizer' onChange={() => setStabilizer("no")}/> No</label>
                            </div>}
                        </div>
                        <div className='column'>
                            {(opFunction === "Lift") && <div>
                                <h4>Stabilizer Bars</h4>
                                <label><input type="radio" defaultChecked={true} name='stablizer' onChange={() => setStabilizer("yes")}/> Yes</label>
                                <br /><label><input type="radio" name='stablizer' onChange={() => setStabilizer("no")}/> No</label>
                            </div>}
                            {opFunction === "Motorized" && <div>
                                <h4>Existing Home Automation</h4>
                                <label>
                                    <input type='radio' name='homeAuto' 
                                    value={'yes'} onChange={handleHomeAuto}></input>
                                    Yes (what is it)?
                                    {homeAuto === 'yes' && <>
                                        <input className='fixed-width-input' id='homeauto'></input>
                                    </>}
                                </label><br />
                                <label> 
                                    <input type='radio' defaultChecked={true} name='homeAuto'
                                    value={'no'} onChange={handleHomeAuto}></input>
                                    No
                                </label> <br />
                            </div>}
                        </div>
                    </div>
                </div>
                
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
                    </div>
                </div> <br />
                
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
                            {mount === 'Outside' && <>
                                How far above frame: {getTotal(abvf, abvfFrac)} <br />
                            </>}
                            Mounting type: {mount}<br />
                            Type of Roman: {type}<br />
                            Fabric running: {mainrailroad ==='true' ? 'Railroaded' : 'Up the bolt'}<br />
                        </div>
                        <div className='column'>
                            COM material: {com ==='yes' ? 'Yes' : 'No'}<br />
                            Main fabric width: {getTotal(mainWidth, mainWidthFrac)}  <br />
                            Main fabric vertical repeat: {getTotal(mainVertical, mainVerticalFrac)}  <br />
                            Main fabric horizontal repeat: {getTotal(mainHorizontal, mainHorizontalFrac)} <br />
                            Lining type: {lined} <br />
                            Embellishments: {banding ? trim.length > 0 ? trim.join(', ') : 'None' : 'None'}<br />
                        </div>
                        <div className='column'>
                            Yardage required: {yardage} yards<br />
                            Price estimate: {price}<br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Roman;