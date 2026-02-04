import { useEffect, useState } from 'react';
import '../styles.css'

const Drapery = ({pname, name, address, email, room, numWindow, uploads, estName, formSection, handleFormSection, linings}) => {
    const[stationary, setStationary] = useState('false');
    const[ripplePercent, setRipplePercent] = useState('60%');
    const handleRipple = (event) => {setRipplePercent(event.target.value);}
    const handleStationaryChange = (event) => {setStationary(event.target.value);}

    // No handle function, the set functions are called directly
    const[yardage, setYardage] = useState(0);
    const[panels, setPanels] = useState(1);


    const[fullness, setFullness] = useState(2);
    const handleFullnessChange = (event) => {
        if (event.target.value < 1.0 || event.target.value > 4.0){
            alert("Fullness must be between 1 and 4");
            setFullness(2);
            event.target.value = ""
        }
        else setFullness(event.target.value);
    }
    
    const [widths, setWidths] = useState(0);

    const[pleat, setPleat] = useState('2 Finger Top Tack');
    const handlePleatChange = (event) => {
        // If we switch from ripplefold to another option, reset the fullness back to the default of 2
        if(pleat === 'Ripplefold' && event.target.value !== 'Ripplefold'){
            setFullness(2);
        }
        // If we switch to ripplefold, set the fullness to ripple default of 1.6 and ripple percent to 60%
        else if (pleat !== 'Ripplefold' && event.target.value === 'Ripplefold'){
            setFullness(1.6);
            setRipplePercent('60%');
        }
        setPleat(event.target.value);
    }

    const[lined, setLined] = useState('Unlined');
    const handleLinedChange = (event) => {setLined(event.target.value);}

    const[com, setCom] = useState('yes');
    const[mainrailroad, setMainRailroad] = useState('false');
    const handleCom = (event) => {setCom(event.target.value);}
    const handleMainRailroad = (event) => {setMainRailroad(event.target.value);}

    // These are actually the fractional states but the names were not updated to reflect that
    const [mainWidth, mainWidthChange] = useState(0);
    const [mainVertical, mainVerticalChange] = useState(0);
    const [mainHorizontal, mainHorizontalChange] = useState(0);

    // This is the actual input for the main values
    const [mainWidth2, mainWidthChange2] = useState(54);
    const [mainVertical2, mainVerticalChange2] = useState(0);
    const [mainHorizontal2, mainHorizontalChange2] = useState(0);

    const handleMainWidth = (e) => {mainWidthChange(e.target.value);};
    const handleMainVertical = (e) => {mainVerticalChange(e.target.value);};
    const handleMainHorizontal = (e) => {mainHorizontalChange(e.target.value);};
    // Defaults to 54 if empty as to not mess up yardage calculations
    const handleMainWidth2 = (e) => {if(e.target.value !== '')mainWidthChange2(e.target.value); else mainWidthChange2(54);};
    const handleMainVertical2 = (e) => {mainVerticalChange2(e.target.value);};
    const handleMainHorizontal2 = (e) => {mainHorizontalChange2(e.target.value);};

    // Widths per panel
    const [wpp, setWpp] = useState(0);
    const handleWppChange = (event) => {setWpp(event.target.value);}


    // These are the fractions used for fractional inputs for different values
    // They are passed to the below dropdown component to render and update the fraction states
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
        return(<>
            <select value={value} onChange={(e) => change(e)} className="select-input fixed-width-input">
                {fractions.map((fraction) => (
                <option key={fraction.value} value={fraction.value}>
                    {fraction.label}
                </option>
                ))}
            </select>
        </>)
    }

    // This function gets the pricing for the selected lining
    const getLiningPrice = (lining) => {
        // Check if the exact lining name exists in the fetched linings
        if (lining in linings){ return linings[lining]; }
        // If it's a light lining or Napped Sateen, return Light Filtering price
        else if (lining.includes("Light") || lining ==='Napped Sateen'){ return linings['Light Filtering']; }
        // Anything else, return Other price
        // This price represents Lined and bump, interlined, and all self-lined with other options
        else {return linings['Other'];}
    }

    
    // These are named and used properly in the calculation functions (Frac means fraction, represents fractional states)
    const [f2fw, f2fwc] = useState(0);
    const [f2fh, f2fhc] = useState(0);
    const [f2fwFrac, f2fwFracC] = useState(0);
    const [f2fhFrac, f2fhFracC] = useState(0);
    const handlef2fw = (e) => {f2fwc(e.target.value);};
    const handlef2fh = (e) => {f2fhc(e.target.value);};
    const handlef2fwFrac = (e) => {f2fwFracC(e.target.value);};
    const handlef2fhFrac = (e) => {f2fhFracC(e.target.value);};


    // Yardage calculation constants
    const panelAddition = 7.0;
    const cutLengthAdditionOther= 14.0;
    const cutLengthAddition = 20.0;


    const calcYardage = () => {
        let yardage;
        if(pleat === 'Ripplefold'){
            if ( f2fw === 0 && f2fh === 0){
                alert("Please fill rod width and height fields");
                return;
            }
            let fabWidth = Number(mainWidth) + Number(mainWidth2);
            let rw = Number(f2fw) + Number(f2fwFrac);
            if (panels === 2){
                rw = rw / 2;
            }
            let pw = rw * Number(fullness) + panelAddition; //change to be 7 for one panel, 14 for two panel
            if (panels === 2) pw += panelAddition;
            const widths = Math.ceil(pw / fabWidth);
            const cl = cutLengthAdditionOther + Number(f2fh) + Number(f2fhFrac);
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
            if (panels === 2){
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
                        if (fabWidth === 0){fabWidth = 54;}
                        let cutYards = (cutLengthAddition + Number(f2fh) + Number(f2fh)) / 36;
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
                        const repeats = Math.ceil((Number(f2fh) + Number(f2fhFrac) + cutLengthAddition) / (Number(mainVertical) + Number(mainVertical2)));
                        const cl = repeats * (Number(mainVertical) + Number(mainVertical2));
                        let cutYards = cl / 36;
                        cutYards += 9 - cutYards % 9;
                        let fw = (Number(mainWidth) + Number(mainWidth2));
                        if (fw === 0){fw = 54;}
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
                    const cw = cutLengthAdditionOther + (Number(f2fw) + Number(f2fwFrac)) * Number(fullness);
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
                        cutYards = (Number(f2fh) + Number(f2fhFrac) + cutLengthAddition) / 36;
                    }
                    else{
                        const repeats = Math.ceil((Number(f2fh) + Number(f2fhFrac) + cutLengthAddition) / (Number(mainVertical) + Number(mainVertical2)));
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
                    let cw = cutLengthAdditionOther + (Number(f2fw) + Number(f2fwFrac)) * Number(fullness);
                    cw += 9 - cw % 9;
                    yardage = cw / 36;
                    let check = Number(f2fh) + Number(f2fhFrac);
                    if (pleat === "Ripplefold"){check += cutLengthAdditionOther}
                    else{check += cutLengthAddition}
                    let fabWidth = Number(mainWidth) + Number(mainWidth2);
                    if (fabWidth === 0) {fabWidth = 54}
                    if (check > fabWidth){alert("Height is too much by " + (check-fabWidth)); 
                        setMainRailroad('false');
                        return;}
                    setYardage(yardage);
                    setWidths("Railroaded so not applicable");
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
                    if (pleat === "Ripplefold"){check += cutLengthAdditionOther}
                    else{check += cutLengthAddition}
                    if (check > fabWidth){alert("Height is too much by " + (check-fabWidth)); return;}
                    setYardage(ypp * panels);
                    setWidths("Railroaded so not applicable");
                }
            }
        }
    }

    // Helper function to display total
    const getTotal = (num1, frac1) => { return Number(num1) + Number(frac1);}
    // Unused helper function to round a value up to the nearest quarter yard
    const round = (value) => {return value - (value % 0.25) + 0.25}
    // Helper function to shorten a number to two decimal places
    const short = (value) => {return Number(value).toFixed(2);}

    // Automatically calculate yardage when the relevant inputs are filled.
    useEffect(() => {
        let doCalc = true;

        // Basic requirement: f2fw and f2fh must have values for most calculations
        if (!f2fw || !f2fh || f2fw === 0 || f2fh === 0){
            doCalc = false;
        }

        // Additional required checks for some branches:
        // - stationary up-the-bolt case needs wpp
        if (pleat !== 'Ripplefold' && mainrailroad === 'false' && stationary === 'true') {
            if (!wpp) {
                doCalc = false;
            }
        }

        // All minimal checks passed -> calculate yardage and pricing after a delay. This delay helps ensure yardage is set before price calculation
        // Else, reset yardage and price to 0
        if (doCalc) {
            calcYardage();
            setTimeout(calcPrice, 100);
        }else{
            setYardage(0);
            setPrice(0);
            setWidths(0);
        }
    }, [
        pleat,mainrailroad, panels,stationary,fullness,
        f2fw, f2fh,
        f2fwFrac, f2fhFrac,          // fraction state
        mainWidth, mainVertical, mainHorizontal, //Fraction state
        mainHorizontal2, mainWidth2, mainVertical2
    ]);

    // This is embellishment option, no handle function
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

    // Pricing constants
    const addCostPerWidth = 15; // Additional cost per width for ripplefold pleat
    const bandingCostPerYard = 13; // Cost per yard of banding
    const bandingHeightAllowance = 10; // Extra height added to inside/outside banding for hems

    const [price, setPrice] = useState(0);
    const calcPrice = () => {
        // If the fetch for lining prices hasn't completed yet, alert and return because we dont have pricing info
        if (!linings){alert("No pricing info fetched, cannot calculate price. Please wait a moment and try again."); return;}
        if (!fullness || !f2fh || !f2fw
        || !lined || !pleat){
            alert("Please fill out all relevant fields");
            return;
        }
        const width = f2fwFrac + f2fw;
        let height = f2fhFrac + f2fh;
        let widths = Math.ceil((width) * fullness / (Number(mainWidth) + Number(mainWidth2)));
        // No widths for railroaded so only set when we are not railroaded
        if(mainrailroad !== 'true')setWidths(short((width) * fullness / (Number(mainWidth) + Number(mainWidth2))));
        if (panels === 2 && widths % 2 !== 0) widths += 1;
        let costPerWidth = getLiningPrice(lined);
        if (pleat === "Ripplefold") {costPerWidth += addCostPerWidth;}
        const basePrice = widths * costPerWidth;
        let bandingPrice = 0;
        if (banding){
            if (trim.includes("bottom")){
                bandingPrice += Math.ceil(width * fullness / 12);
            }
            if (trim.includes("top")){
                bandingPrice += Math.ceil(width * fullness / 12);
            }
            if (trim.includes("inside")){
                bandingPrice += 2 * Math.ceil((Number(height) + bandingHeightAllowance) / 12);
            }
            if (trim.includes("outside")){
                bandingPrice += 2 * Math.ceil((Number(height) + bandingHeightAllowance) / 12);
            }
            bandingPrice *= bandingCostPerYard;
        }
        setPrice("$" + basePrice + " for yardage + $" + bandingPrice + " for banding = $" + (basePrice + bandingPrice));
    }

    // This is triggered when items that affect price but not yardage are changed -> recalculate price only
    useEffect(() => {
        let doCalc = true;
        // If yardage hasn't been calculated yet, skip price calculation
        if (yardage === 0 || !yardage){
            doCalc = false;
        }
        if (doCalc) calcPrice();
    }, [trim, lined, banding]);

    // Helper function to make sure only valid numbers are input
    const checkNum = (e) => {if (!e.target.validity.valid) e.target.value = "";}

    // 
    // None of these are currently being used but were part of the original Drapery form
    // 

    /*const[windowImg, setWindowImg] = useState(null);
    const[folderID, setFolderID] = useState(null);
    const[hardware, setHardware] = useState('');
    const[hardwareType, setHardwareType] = useState('');
    const[hardwareDecorativeType, setHardwareDecorativeType] = useState('');
    let ringType = '';
    const[hardwired, setHardwired] = useState('');
    const[homeAuto, setHomeAuto] = useState('');
    const[contrastrailroad, setContrastRailroad] = useState('');
    const[units1, setUnits1] = useState('in');
    const[units2, setUnits2] = useState('in');
    const[units3, setUnits3] = useState('in');
    const [otherPleat, setOtherPleat] = useState('Other');
    const handleOtherPleatChange = (event) => {setOtherPleat(event.target.value);} */
    
    /*const handleImageUpload = (event) => {
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
    } */
    
    /*const handleHardwareChange = (event) => {setHardware(event.target.value);
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
    const handleContrastRailroad = (event) => {setContrastRailroad(event.target.value);}

    //Window units
    const handleUnits1 = (event) => {setUnits1(event.target.value);}

    const [abvf, abvfc] = useState('');
    const [bsill, bsillc] = useState('');
    const [mountabvf, mountabvfc] = useState('');

    const handleabvf = (e) => {abvfc(e.target.value);};
    const handlebsill = (e) => {bsillc(e.target.value);};
    const handlemountabvf = (e) => {mountabvfc(e.target.value);};

    //Main fabric units
    const handleUnits2 = (event) => {setUnits2(event.target.value);}

    //Contrast fabric units
    const [contr, setContr] = useState(null);
    const handleUnits3 = (event) => {setUnits3(event.target.value);}

    const [contrastWidth, contrastWidthChange] = useState('');
    const [contrastVertical, contrastVerticalChange] = useState('');
    const [contrastHorizontal, contrastHorizontalChange] = useState('');

    const handleContrastWidth = (e) => {contrastWidthChange(e.target.value);};
    const handleContrastVertical = (e) => {contrastVerticalChange(e.target.value);};
    const handleContrastHorizontal = (e) => {contrastHorizontalChange(e.target.value);}; */

    /*const submitForm = (e) => {
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

        fetch("process.env.REACT_APP_FORM_SUBMISSION_API", {
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
    }*/

    /*const uploadFile = () => {
        for (const file of windowImg){
            const fr = new FileReader();
            fr.readAsArrayBuffer(file);
            fr.onload = f => {

                const url = process.env.REACT_APP_FILE_UPLOAD_API;

                const qs = new URLSearchParams({filename: file.name, mimeType: file.type});
                fetch(`${url}?${qs}`, {method: "POST", body: JSON.stringify([...new Int8Array(f.target.result)])})
                .then(res => res.json())
                .then(e => console.log(e))
                .catch(err => console.log(err));
            }
        }
        alert("Images uploaded");
    }; */

    /*async function uploadAllFiles() {
        if (windowImg == null){
            console.log("no images to upload");
            return;
        }
        const url = "process.env.REACT_APP_FORM_SUBMISSION_API";
      
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
      }*/

    return(<>
        <div className="container container-row">
            <div className="container left">
                
                {formSection === 1 && <div className="form-group-indent">
                    {/* Unused image upload functionality */}

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
                                <Dropdown
                                    value={f2fwFrac}
                                    change={handlef2fwFrac}
                                ></Dropdown>
                                <br></br>
                            </div>
                            <div className='column'>
                                <h4>Drapery height:</h4>
                                <input className='fixed-width-input' type='number' id='f2fh' min="0" onInput={checkNum}
                                placeholder={f2fh || 0}
                                onChange={(handlef2fh)}></input>
                                <Dropdown
                                    value={f2fhFrac}
                                    change={handlef2fhFrac}
                                ></Dropdown>
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
                            <input type="number" step="0.01" onInput={checkNum} placeholder={fullness} onBlur={handleFullnessChange}/>
                            {/* <label className="radio-label">
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
                            </label> */}
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
                        
                        {/* Unused unit selection */}

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
                                    <Dropdown
                                    value={mainWidth}
                                    change={handleMainWidth}
                                    ></Dropdown>
                            </div><br />
                            <div className='column'>
                                <label>
                                    Vertical repeat:
                                    <br />
                                    <input type='number' id='mainvert' className='fixed-width-input' min="0" onInput={checkNum}
                                    placeholder={mainVertical2 || 0} onChange={handleMainVertical2}></input>
                                </label>
                                    <Dropdown
                                    value={mainVertical}
                                    change={handleMainVertical}
                                    ></Dropdown>
                            </div><br />
                            <div className='column'>
                                <label>
                                    Horizontal repeat:
                                    <br />
                                    <input type='number' id='mainhorizontal' className='fixed-width-input' min="0" onInput={checkNum}
                                    placeholder={mainHorizontal2 || 0} onChange={handleMainHorizontal2}></input>
                                </label>
                                    <Dropdown
                                    value={mainHorizontal}
                                    change={handleMainHorizontal}
                                    ></Dropdown>
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
                                            onChange={handleTrim} defaultChecked={trim.includes('bottom')}
                                            id='banding bottom' value='bottom'/>
                                            Bottom
                                        </label>
                                        <label className="checkbox-label">
                                            <input type="checkbox" name="banding-type" 
                                            onChange={handleTrim} defaultChecked={trim.includes('inside')}
                                            id='banding inside' value='inside'/>
                                            Inside Edge
                                        </label>
                                        <label className="checkbox-label">
                                            <input type="checkbox" name="banding-type" 
                                            onChange={handleTrim} defaultChecked={trim.includes('outside')}
                                            id='banding outside' value='outside'/>
                                            Outside Edge
                                        </label>
                                        <label className="checkbox-label">
                                            <input type="checkbox" name="banding-type" 
                                            onChange={handleTrim} defaultChecked={trim.includes('top')}
                                            id='banding top' value='top'/>
                                            Top
                                        </label>
                                    </div>}
                                </div>
                            </div>
                            
                            <div className='column'>
                                <h4>How are we running the fabric?</h4>
                                <label className="radio-label">
                                    <input type='radio' name='mainrailroad' checked={mainrailroad === 'false'}
                                    value={'false'} onChange={handleMainRailroad}></input>
                                    Up the bolt
                                </label>
                                <label className="radio-label">
                                    <input type='radio' name='mainrailroad' checked={mainrailroad === 'true'}
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
                            Fabric running: {mainrailroad ==='true' ? 'Railroaded' : 'Up the bolt'}<br />
                        </div>
                        <div className='column'>
                            COM material: {com ==='yes' ? 'Yes' : 'No'}<br />
                            Main fabric width: {getTotal(mainWidth, mainWidth2)}  <br />
                            Main fabric vertical repeat: {getTotal(mainVertical2, mainVertical)}  <br />
                            Main fabric horizontal repeat: {getTotal(mainHorizontal2, mainHorizontal)} <br />
                            Lining type: {lined}<br />
                            Embellishments: {banding ? trim.length > 0 ? trim.join(', ') : 'None' : 'None'}<br />
                        </div>
                        <div className='column'>
                            Number of widths: {widths || 0}<br />
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