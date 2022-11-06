const firebaseConfig = {
    apiKey: "AIzaSyC-dbyJSfbAvkj4harwUXoY7pXhoEpg6ao",
    authDomain: "tj-books-calculator.firebaseapp.com",
    databaseURL: "https://tj-books-calculator-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tj-books-calculator",
    storageBucket: "tj-books-calculator.appspot.com",
    messagingSenderId: "853342169453",
    appId: "1:853342169453:web:3a52ff46263eff3a11d264",
    measurementId: "G-8M9R61YMJ4"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); 

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
            document.querySelector(".sign-in").style.display = "flex"
            document.querySelector(".calculator").classList.add("password-protected")  
      var uid = user.uid;
    } else {
        document.querySelector(".sign-in").style.display = "none"
        document.querySelector(".calculator").classList.remove("password-protected")
    }
  });

const login = () => {
    let email = document.querySelector("#name").value
    let password = document.querySelector("#password").value
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(()=> {
        firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    var user = userCredential.user;
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}



/*const login = () => {
    let email = document.querySelector("#name").value
    let password = document.querySelector("#password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    console.log("signed in")
    document.querySelector(".sign-in").style.display = "none"
    document.querySelector(".calculator").classList.remove("password-protected")
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}
*/



//STOCK OPTIONS
let bindOptions = {
    "litho": ["Notched", "Sewn"],
    "digital": ["P/Bound"],
    "IX": ["PUR", "Sewn", "Saddle-Stitched"]
};
let paperOptions = {
    "litho": [
        ["Munken Premium Cream", 80, 90], 
        ["Munken Premium White", 80, 90],
        ["TJ Mechanical Cream", 60, 70],
        ["TJ Uncoated", 70, 80, 90, 100, 120],
        ["TJ Gloss", 90, 115, 130, 150],
        ["TJ Matt", 70, 80, 90, 115, 130],
        ["TJ Silk", 90, 100, 115, 130, 150, 170],
        ["Munken Pure", 80, 100, 120, 150],
        ["TJ Mechanical White", 70],
        ["Munken Lynx", 120, 150]
    ],
    "digital": [
        ["Munken Premium Cream", 80, 90], 
        ["Munken Premium White", 80, 90],
        ["TJ Matt", 115],
        ["TJ Mechanical Cream", 60, 70],
        ["TJ Silk", 90],
        ["TJ Uncoated", 70, 80, 100],
        ["Munken Pure", 80]
    ],
    "IX": [
        ["TJ Gloss", 90, 115, 130, 150],
        ["TJ Matt", 80, 90, 115, 130],
        ["TJ Silk", 90, 100, 115, 130, 150, 170],
        ["TJ Uncoated", 80, 90, 100, 120],
        ["Munken Premium Cream", 80, 90], 
        ["Munken Premium White", 80, 90],
        ["Munken Lynx", 120, 150],
        ["Munken Pure", 80, 100, 120, 150],
    ],
    "plates": [
        ["TJ Gloss", 90, 115, 130, 150],
        ["TJ Matt", 70, 80, 90, 115, 130],
        ["TJ Silk", 90, 100, 115, 130, 150, 170],
    ]
}
let volumes = {
    "Munken Premium Cream": 17.5,
    "Munken Premium White": 17.5,
    "TJ Mechanical Cream": 20,
    "TJ Uncoated": 13,
    "TJ Gloss": 7.4,
    "TJ Matt": 9.8,
    "TJ Silk" : 10,
    "Munken Pure" : 11.3,
    "TJ Mechanical White": 20,
    "Munken Lynx" : 11.3,
}
const greyBoardStock = {
    "190": {
        "204 x 125": "E19005",
        "222 x 134": "E19009",
        "216 x 144": "E190011",
        "234 x 148": "E190013",
        "235 x 152": "E190013",
        "240 x 152": "E190014",
        "252 x 185": "E190017",
        "222 x 131": "E190018",
        "250 x 166": "E190019",
        "259 x 173": "E190020",
        "303 x 206": "E190028",
        "252 x 170": "S190020",
        "240 x 150": "S190070",
        "760 x 1020": "2mm E190029",
    },
    "225": {
        "760 x 1020": "E225029"
    },
    "250": {
        "222 x 134": "E250018",
        "240 x 152": "E250019",
        "760 x 1020": "E250016"
    },
    "275": {
        "240 x 152": "E27506",
        "760 x 1020": "E275010"
    }
}
let lithoSheets = {
    "mono": [ {
        height: 816,
        width: 1080
    }, {
        height: 888,
        width: 1128
    }, {
        height: 960,
        width: 1272
    }, {
        height: 1018,
        width: 1416
    }, {
        height: 1020,
        width: 1212
    }],
    "colour": [{
        height: 720,
        width: 1020
    }, {
        height: 640,
        width: 900
    }]
}

//Show input areas when certain options are selected
let showMore = (objectSelected, inputArea)=> {
    document.querySelector(`${objectSelected}`).addEventListener("click", ()=> {
    document.querySelector(`${inputArea}`).classList.toggle("hidden")
    })
}
showMore("#pantone", "#pantone-coverage")
showMore("#spot-uv", "#spot-uv-bleeds")
showMore("#text-pantone", "#text-pantone-coverage")
showMore("#foil", "#foil-coverage")
showMore("#emboss", "#embossArea")

let createNewOption = (arr, newParent, originalHTML, needsIterating, firstElement, selectedPaper)=> {
    if (!document.querySelector(`${newParent}`)) {
        return
    } else {
        let parent = document.querySelector(`${newParent}`)
        parent.innerHTML = `<option selected disabled>${originalHTML}</option>`
        if (needsIterating === true) {
            let newArr = []
            for (let item of arr) {
                if (firstElement) {
                    newArr.push(item[0])
                } else if (item.indexOf(selectedPaper)===0){
                    for (let i=1; i<item.length; i++) {
                        newArr.push(item[i])
                    }
                }
            }
            createNewOption(newArr, newParent, originalHTML, false, false, false)
            return                  
        } else {
            for (let item of arr) {
                let newOption = document.createElement("option")
                newOption.value = item
                newOption.innerHTML = item
                parent.appendChild(newOption)
            }
            return
        }
    }    
}

//Select Print Method- Update Options for Bind Method and Paper Type
document.querySelector("#print-method").addEventListener("change", (e)=> {
    createNewOption(bindOptions[document.querySelector("#print-method").value], "#bind-method", "Bind Method", false, false, false)
    createNewOption(paperOptions[document.querySelector("#print-method").value], "#paper-type", "Paper Type", true, true, false)
    document.querySelector("#text-pantone").disabled = document.querySelector("#print-method").value==="litho" ? false : true 
})

//Select Paper type- Update Options for Grammage
document.querySelector("#paper-type").addEventListener("click", (e)=> {
    let selectedPaper = document.querySelector("#paper-type").value
    createNewOption(paperOptions[document.querySelector("#print-method").value], "#grammage", "Grammage", true, false, selectedPaper)
})

//Select Plates- Update Options for Plate Paper
document.querySelector("#plates").addEventListener("click", ()=> {
    document.querySelector(".plate-extent").style.display = document.querySelector("#plates").value !== "yes" ? "none" : "inline"
    createNewOption(paperOptions["plates"], "#plate-paper", "Plate Paper Type", true, true, false)
})

//Select Plate Paper- Update Options for Grammage
document.querySelector("#plate-paper").addEventListener("click", (e)=> {
    let selectedPaper = document.querySelector("#plate-paper").value
    createNewOption(paperOptions["plates"], "#plate-grammage", "Grammage", true, false, selectedPaper)
})

//Select Case Type- Update Options Available for Plates, Case Finishes etc.
document.querySelector("#case-style").addEventListener("click", (e)=> {
    let value = document.querySelector("#case-style").value
    document.querySelector(".plate-option").style.display = value === "none"? "none" : "inline"
    document.querySelector(".plate-extent").style.display = document.querySelector("#plates").value === "yes" ? "inline" : "none"
    document.querySelector(".cased-options").style.display = value === "fourPage" || value === "eightPage" || value === "none" ? "none" : "inline"
    document.querySelector("#jackets").value = value === "Cloth" ? "yes" : "no"
    document.querySelector("#ribbon").disabled = value==="fourPage" || value==="eightPage" || value === "none" ? true: false
    document.querySelector("#head-tail").disabled = value==="fourPage" || value==="eightPage" || value === "none" ? true: false
    document.querySelector("#twoPageEndPapers").disabled =  value==="Cloth" || value==="PPC" || value==="none" ? true: false  
    document.querySelector("#twoPageEndPapers").checked = false;
    document.querySelector("#head-tail").checked = false;
    document.querySelector("#ribbon").checked = false;
    document.querySelector(".foilingOptions").innerHTML = value==="none" ? "" 
    : value === "Cloth" ? `<input id="foil-coverage" name="foilCoverage" class="hidden form-control form-control-sm input-field" type="number" placeholder="Artwork Width"></input>`
    : `<select name="foilCoverage" id="foil-coverage" class="hidden form-select form-select-sm input-field">
            <option selected value="front">Front Only</option>
            <option value="frontSpine">Front And Spine</option>
            <option value="frontSpineBack">Front, Spine And Back</option>
            <option value="frontSpineBackFlaps">Front, Spine, Back And Flaps</option>
        </select>`
})

let notApplicable = `<span class="n-a">N/A</span>`

let sheetCalc = (part, press)=> {
    let basicWidth = finalValues.trimWidth*2+ calcSpineWidth()
    return press === "KBA 3" ? "720 x 1020"
    : press === "Outwork" || !press ? notApplicable 
    : basicWidth+40+parseInt(finalValues.spineStyle) <=417 && part === "PPC" || basicWidth <=402 && part === "fourPage" && !fourson480? "320 x 450"
    : basicWidth+200 <=492 && part === "Jacket" || basicWidth+40+parseInt(finalValues.spineStyle) <=536 && part === "PPC" || basicWidth+209 <=546 && part === "eightPage" || basicWidth <= 512 && part === "fourPage" || fourson480 ? "320 x 560"
    : basicWidth+200 <=597 && part === "Jacket" ? "320 x 660"
    : basicWidth+ 200 > 597 && part === "Jacket" ? "320 x 700"
    : "Seek Advice"
} 

let checkCoverPress = (maxQty) => {
    return finalValues.spotUV && finalValues.spotUVBleeds === "with-bleeds" || finalValues.foil && finalValues.caseOption !== "Cloth" || finalValues.emboss ? "Outwork" 
    : finalValues.pantone || finalValues.quantity >= maxQty ? "KBA 3"
    : finalValues.caseOption === "fourPage" && finalValues.printMethod === "digital" && !finalValues.spotUV && finalValues.platesValue === "no" ? "Ricoh 9210"
    : "Ricoh 9200"
}

let textSpine;
let calcSpineWidth = ()=> {   
    textSpine = finalValues.plates>0 && finalValues.platesValue === "yes" ? (((volumes[finalValues.paper] * finalValues.grammage) * finalValues.extent )/20000)+ 0.6 + (((volumes[finalValues.platePaper] * finalValues.plateGrammage) * finalValues.plates)/20000) : (((volumes[finalValues.paper] * finalValues.grammage) * finalValues.extent )/20000)+ 0.6
    return finalValues.caseOption === "fourPage" || finalValues.caseOption === "eightPage" ? Math.round(textSpine) : Math.round(textSpine + (parseInt(finalValues.greyboardThickness)/100)*2)
}

let calculateCoverNumSheets = (percent, makeReady, numUp)=> {
    return Math.floor(((finalValues.quantity*percent)/numUp)+makeReady)
}

let options = {
    "Jacket": {
        sheets: ["720 x 1020", "640 x 900"],
        part: function () {return "Jacket"},
        press: function () {return checkCoverPress(3001)},   
        ink: function () {return this.press()==="Outwork" && finalValues.pantone ? `5/0 </p><i class="fa-solid fa-circle-plus inkadjust mb-3 ms-3"></i>` 
        : this.press()==="Outwork" ? `4/0 </p><i class="fa-solid fa-circle-plus inkadjust mb-3 ms-3"></i>`
        : finalValues.pantone ? "5/0" : "4/0"},
        spine: function () {return calcSpineWidth()},
        size: function () {return `${parseInt(finalValues.trimHeight) + 18}mm x ${(finalValues.trimWidth*2)+ this.spine() +192}mm`},
        sheetSize: function () {return sheetCalc("Jacket", this.press())},
        numUp: function () { 
            return this.press() === "Ricoh 9200" ? 1
            : this.press() === "KBA 3" && finalValues.softTouch ? "Seek Advice"
            : this.press() === "KBA 3" && !finalValues.spotUV ? 3
            : this.press() === "KBA 3" && finalValues.spotUV ? 2
            : notApplicable 
        },
        numSheets: function () {
            return this.press() === "KBA 3" ? calculateCoverNumSheets(1.1, 150, this.numUp())
            : this.press() === "Ricoh 9200" ? calculateCoverNumSheets(1.085, 2, this.numUp())
            : notApplicable
        },
        extras: function () {return this.press()==="Outwork" && finalValues.pantone ? ` £${Math.floor(100* calcSAPCPrice("Jacket", "5/0"))/100}`
        : this.press()==="Outwork" ? `£${Math.floor(100* calcSAPCPrice("Jacket", "4/0"))/100}`
        : ""},
        extrasInfo: function () {return ""},
        info: function () {return ""},
    },
    "Cloth": {
        sheets: ["640 x 970", "1020 x 760", "1020 x 850"],
        part: function () {return "Cloth"},
        press: function () {return notApplicable},
        ink: function () {return notApplicable},
        spine: function () {return calcSpineWidth()},
        size: function () {return `${parseInt(finalValues.trimHeight)+38}mm x ${(finalValues.trimWidth * 2)+this.spine()+parseInt(finalValues.spineStyle)+40}mm`},
        sheetSize: function () {return "640 x 970"},
        numUp: function () {
          let clothHeight = this.sheetSize() === "640 x 970" ? 970
          : this.sheetSize() === "1020 x 760" ? 760
          : 850 
          let clothWidth = this.sheetSize() === "640 x 970" ? 640 : 1020  
          return Math.floor((clothHeight/(parseInt(finalValues.trimHeight)+38)))*Math.floor((clothWidth/((finalValues.trimWidth*2)+this.spine()+40)))
        },
        numSheets : function () {return Math.round((finalValues.quantity/this.numUp())*1.1)},
        extras: function () {return ""},
        extrasInfo: function () {return ""},
        info: function () {
            let additionalInfo = `Foil (Spine Only): ${Math.round(calcSpineWidth()*(finalValues.quantity*1.05)*1.1/1000)}m <br>`
            if (finalValues.foil) {
                additionalInfo = `Foil: ${Math.round(finalValues.foilCoverage*(finalValues.quantity*1.05)*1.1/1000)}m <br>`
            } 
            if (finalValues.headTail) {
                additionalInfo += `Head and Tail Bands: ${Math.round(calcSpineWidth()*2*(finalValues.quantity*1.05)*1.1/1000)}m <br>`
            }
            if (finalValues.ribbon) {
                additionalInfo += `Ribbon: ${Math.round(parseInt(finalValues.trimHeight)+150*(finalValues.quantity*1.05)/1000)}m <br>`
            }
            return additionalInfo
        },
    },
    "PPC": {
        sheets: ["720 x 1020", "640 x 900"],
        part: function () {return "PPC"},
        press: function () {return checkCoverPress(6001)},
        ink: function () {return this.press()==="Outwork" && finalValues.pantone ? `5/0 </p><i class="fa-solid fa-circle-plus inkadjust mb-3 ms-3"></i>` 
        : this.press()==="Outwork" ? `4/0 </p><i class="fa-solid fa-circle-plus inkadjust mb-3 ms-3"></i>`
        : finalValues.pantone ? "5/0" : "4/0"},
        spine: function () {return calcSpineWidth()},
        size: function () {return `${parseInt(finalValues.trimHeight) + 38}mm x ${(finalValues.trimWidth*2)+this.spine()+parseInt(finalValues.spineStyle)+40}mm`},
        sheetSize: function () {return sheetCalc("PPC", this.press())},
        numUp: function() {
            return this.press() === "Ricoh 9200" ? 1
            : this.press() === "KBA 3" && finalValues.softTouch ? "Seek Advice"
            : this.press() === "KBA 3" && finalValues.spotUV && parseInt(finalValues.trimHeight)<=234 && parseInt(finalValues.trimWidth)<=156 && this.sheetSize()==="640 x 900" ? 2
            : this.press() === "KBA 3" && parseInt(finalValues.trimHeight)<=234 && parseInt(finalValues.trimWidth)<=156 ? 3
            : this.press() === "KBA 3" ? "Seek Advice"
            : notApplicable 
        },
        numSheets: function () {
            return this.press() === "KBA 3" ? calculateCoverNumSheets(1.25, 100, this.numUp())
            : this.press() === "Ricoh 9200" ? calculateCoverNumSheets(1.25, 2, this.numUp())
            : notApplicable
        },
        extras: function () {return this.press()==="Outwork" && finalValues.pantone ? `£${Math.floor(100* calcSAPCPrice("PPC", "5/0"))/100}` 
        : this.press()==="Outwork" ? `£${Math.floor(100* calcSAPCPrice("PPC", "4/0"))/100}`
        : ""},
        extrasInfo: function () {return ""},
        info: function () {
            let additionalInfo = ""
            if (finalValues.headTail) {
                additionalInfo += `Head and Tail Bands: ${Math.round(calcSpineWidth()*2*(finalValues.quantity*1.05)*1.1/1000)}m <br>`
            }
            if (finalValues.ribbon) {
                additionalInfo += `Ribbon: ${Math.round(parseInt(finalValues.trimHeight)+150*(finalValues.quantity*1.05)*1.1/1000)}m <br>`
            }
            return additionalInfo
        },
    }, 
    "eightPage": {
        sheets: ["720 x 1020", "640 x 900"],
        part: function () {return "8pp Cover"},
        press: function () {return checkCoverPress(4001)},
        ink: function () {return this.press()==="Outwork" && finalValues.pantone ? `5/0 </p><i class="fa-solid fa-circle-plus inkadjust mb-3 ms-3"></i>` 
        : this.press()==="Outwork" ? `4/0 </p><i class="fa-solid fa-circle-plus inkadjust mb-3 ms-3"></i>`
        : finalValues.pantone ? "5/0" : "4/0"},
        spine: function () {return calcSpineWidth()},
        size: function () {return `${parseInt(finalValues.trimHeight)+20}mm x ${(finalValues.trimWidth*2)+this.spine()+209}mm`},
        sheetSize: function () {return sheetCalc("eightPage", this.press())},
        numUp: function () {
            return this.press()==="Ricoh 9200" ? 1
            : this.press() === "KBA 3" && finalValues.softTouch ? "Seek Advice"
            : this.press() === "KBA 3" && parseInt(finalValues.trimHeight)<=234 && parseInt(finalValues.trimWidth)<=156 && this.sheetSize()==="720 x 1020" ? 4
            : this.press() === "KBA 3" && parseInt(finalValues.trimHeight)<=234 && parseInt(finalValues.trimWidth)<=156 && this.sheetSize()=== "640 x 900" ? 3
            : this.press() === "KBA 3" && this.sheetSize() ==="720 x 1020" ? 3
            : this.press() === "KBA 3" ? 2
            : notApplicable
        },
        numSheets: function () {
            return this.press()==="KBA 3" ? calculateCoverNumSheets(1.15, 150, this.numUp())
            : this.press() === "Ricoh 9200" ? calculateCoverNumSheets(1.15, 2, this.numUp())
            : notApplicable
        },
        extras: function () {return this.press()==="Outwork" && finalValues.pantone ? `£${Math.floor(100* calcSAPCPrice("eightPage", "5/0"))/100}` 
        : this.press()==="Outwork" ? `£${Math.floor(100* calcSAPCPrice("eightPage", "4/0"))/100}`
        : ""},
        extrasInfo: function () {return ""},
        info: function () {return ""},
    },
    "fourPage": {
        sheets: ["720 x 1020", "640 x 900"],
        part: function () {return "4pp Cover"},
        press: function () {return checkCoverPress(7001)},
        ink: function () {return this.press()==="Outwork" && finalValues.pantone ? `5/0 </p><i class="fa-solid fa-circle-plus inkadjust mb-3 ms-3"></i>` 
            : this.press()==="Outwork" ? `4/0 </p><i class="fa-solid fa-circle-plus inkadjust mb-3 ms-3"></i>`
            : finalValues.pantone ? "5/0" : "4/0"},
        spine: function () {return calcSpineWidth()},
        size: function () {return `${parseInt(finalValues.trimHeight)+20}mm x ${(finalValues.trimWidth*2)+this.spine()+9}mm`},
        sheetSize: function () {return sheetCalc("fourPage", this.press())},
        numUp: function () {
            return this.press()==="Ricoh 9200" || this.press() === "Ricoh 9210" ? 1
            : this.press() === "KBA 3" && finalValues.softTouch ? "Seek Advice"
            : this.press() === "KBA 3" && !finalValues.spotUV && parseInt(finalValues.trimHeight)<=234 && parseInt(finalValues.trimWidth)<=156 ? 8
            : this.press() === "KBA 3" && !finalValues.spotUV ? 4
            : this.press() === "KBA 3" && this.sheetSize()=== "720 x 1020" ? 4
            : this.press() === "KBA 3" ? "Use Larger Sheet" 
            : notApplicable
        },
        numSheets: function () {
            return this.press() === "KBA 3" ? calculateCoverNumSheets(1.1, 150, this.numUp())
            : this.press() === "Ricoh 9200" || this.press()=== "Ricoh 9210" ? calculateCoverNumSheets(1.1,2,this.numUp())
            : notApplicable
        },
        extras: function () {return this.press()==="Outwork" && finalValues.pantone ? `£${Math.floor(100* calcSAPCPrice("fourPage", "5/0"))/100}` 
        : this.press()==="Outwork" ? `£${Math.floor(100* calcSAPCPrice("fourPage", "4/0"))/100}`
        : ""},
        extrasInfo: function () {return ""},
        info: function () {return ""},
    },
    "Greyboard":{
        part: function () {return "Greyboard"},
        press: function () {return notApplicable},
        ink: function () {return notApplicable},
        spine: function () {return notApplicable},
        size: function () {return `${parseInt(finalValues.trimHeight)+6}mm x ${finalValues.trimWidth-4}mm`},
        sheetSize: ()=> {
            let possibleSizes = []
            generateGreyboardSizes([4,3,5], possibleSizes)
            for (let item of possibleSizes) {
                if (greyBoardStock[finalValues.greyboardThickness][item]) {
                    return item
                }
            }
            return "760 x 1020"
        },
        numUp: function () {return notApplicable},
        numSheets: function() {return notApplicable},
        extras: function () {return greyBoardStock[finalValues.greyboardThickness][this.sheetSize()]},
        extrasInfo: function () {return ""},
        info: function () {return ""},
    },    
    "Endpapers": {
        sheets: ["720 x 1020", "640 x 970", "1020 x 760"],
        part: function () {return "Endpapers"},
        press: function () {return notApplicable},
        ink: function () {return notApplicable},
        spine: function () {return notApplicable},
        size: function () {return `${parseInt(finalValues.trimHeight)+6}mm x ${(finalValues.trimWidth * 2)+6}mm`},
        sheetSize: function () {return "720 x 1020"},
        numUp: function () { 
            let endPaperHeight = this.sheetSize() === "640 x 970" ? 970 : 760
            let endPaperWidth = this.sheetSize() === "640 x 970" ? 640 : 1020
            
          return this.sheetSize()=== "720 x 1020" ? notApplicable
          : Math.floor((endPaperHeight/(parseInt(finalValues.trimHeight)+6)))*Math.floor((endPaperWidth/((finalValues.trimWidth*2)+6)))
        },
        numSheets: function () { 
            return this.sheetSize()==="720 x 1020" ? notApplicable : Math.round((finalValues.quantity/this.numUp())*2*1.1)
        },
        extras: function () {
            let standardSizes = ["252mm x 384mm", "240mm x 318mm", "222mm x 282mm", "303mm x 426mm", "252mm x 354mm", "204mm x 264mm"]
            return finalValues.printMethod === "digital" && this.sheetSize()=== "720 x 1020" || this.sheetSize()=== "720 x 1020" && standardSizes.indexOf(this.size()) !== -1 ? "Standard" 
            : this.sheetSize() !== "720 x 1020" ? ""
            : "Non-Standard"
        },
        extrasInfo: function () {return ""},
        info:function () {return ""}
    },
    "Endpapers-2pp" : {
        sheets: ["640 x 970", "1020 x 760"],
        part: function () {return "Endpapers-2pp"},
        press: function () {return notApplicable},
        ink: function () {return notApplicable},
        spine: function () {return notApplicable},
        size: function () {return `${parseInt(finalValues.trimHeight)+6}mm x ${(finalValues.trimWidth)+3}mm`},
        sheetSize: function () {return "640 x 970"},
        numUp: function () { 
            let endPaperHeight = this.sheetSize() === "640 x 970" ? 970 : 760
            let endPaperWidth = this.sheetSize() === "640 x 970" ? 640 : 1020
          return Math.floor((endPaperHeight/(parseInt(finalValues.trimHeight)+6)))*Math.floor((endPaperWidth/((finalValues.trimWidth*2)+6)))*2
        },
        numSheets: function () { 
            return Math.round((finalValues.quantity/this.numUp())*2*1.1)
        },
        extras: function () {return ""},
        extrasInfo: function () {return ""},
        info:function () {return ""}
    },
    "Text-Litho" : {
        part: function() {return lithoCalc("partTitle")},
        press: function () {return finalValues.colour === "mono" && !finalValues.textPantone ? "KBA 1" : "KBA 3"},
        ink: function() {return finalValues.colour === "mono" && !finalValues.textPantone ? "1/1" 
        : finalValues.colour === "mono" && finalValues.textPantone ? "2/2" 
        : finalValues.textPantone ? "5/5"
        : "4/4"},
        size: function() {return `${finalValues.trimHeight}mm x ${finalValues.trimWidth}mm`},
        spine: function() {return notApplicable},
        sheetSize: function () {return lithoCalc("sheetSize")},
        numUp: function() {return lithoCalc("numUp")},
        numSheets: function() {return this.press()==="KBA 1" ? Math.round((finalValues.quantity * 1.04 * Math.floor(finalExtent/impositionLitho) + 150)/this.numUp()) : Math.round((finalValues.quantity * 1.1 * Math.floor(finalExtent/impositionLitho) + 150)/this.numUp()) },
        extras: function() {return `${finalExtent}pp`},
        extrasInfo: function() {return lithoCalc("sigBreakdown")},
        info: function() {return ""}                 
    },
    "Oddment-16": {
        part: function () {return "Text-16pp"},
        press: function () {return options["Text-Litho"].press()},
        ink: function () {return options["Text-Litho"].ink()},
        size: function () {return options["Text-Litho"].size()},
        spine: function() {return notApplicable},
        sheetSize: function () {return options["Text-Litho"].sheetSize()},
        numUp: function () {return options["Text-Litho"].part() === "Text-24pp" ? 3 : (options["Text-Litho"].numUp())*2},
        numSheets: function() {return this.press()==="KBA 1" ? Math.round((finalValues.quantity * 1.04 + 150)/this.numUp()) : Math.round((finalValues.quantity * 1.1 * Math.floor(finalExtent/impositionLitho) + 150)/this.numUp()) },
        extras: function() {return ""},
        extrasInfo: function() {return "1x16pp"},
        info: function (){return ""},
    },
    "Oddment-8": {
        part: function () {return "Text-8pp"},
        press: function () {return options["Text-Litho"].press()},
        ink: function () {return options["Text-Litho"].ink()},
        size: function () {return options["Text-Litho"].size()},
        spine: function() {return notApplicable},
        sheetSize: function () {return options["Text-Litho"].sheetSize()},
        numUp: function () {return options["Text-Litho"].part() === "Text-24pp" ? 6 : (options["Text-Litho"].numUp())*4},
        numSheets: function() {return this.press()==="KBA 1" ? Math.round((finalValues.quantity * 1.04 + 150)/this.numUp()) : Math.round((finalValues.quantity * 1.1 * Math.floor(finalExtent/impositionLitho) + 150)/this.numUp()) },
        extras: function() {return ""},
        extrasInfo: function() {return "1x8pp"},
        info: function (){return ""},
    },
    "Text-Digital" : {
        part: function() {return finalValues.paper === "TJ Matt" ? "Text-4pp"
        :finalValues.trimWidth <=156 ? "Text-6pp" : "Text-4pp"},
        press: function () {return finalValues.colour === "mono" ? "Mono 8160" : "Colour 8160"},
        ink: function() {return finalValues.colour === "mono" ? "1/1" : "4/4"},
        size: function() {return `${finalValues.trimHeight}mm x ${finalValues.trimWidth}mm`},
        spine: function() {return notApplicable},
        sheetSize: function () {
            fourson480 = finalValues.trimWidth > 185 && finalValues.trimWidth <=224 ? true : false
            return finalValues.trimWidth <=117 && finalValues.paper !== "TJ Matt" ? "402 reel"
            : finalValues.trimWidth <=143 && finalValues.paper !== "TJ Matt" ? "480 reel"
            : finalValues.trimWidth <=156 && finalValues.paper !== "TJ Matt" ? "503 reel"
            : finalValues.trimWidth <=185 ? "402 reel"
            : finalValues.trimWidth <=224 ? "480 reel"
            : finalValues.trimWidth <=235 ? "503 reel"
            : "Seek Advice"
        },
        numUp: function() {return 1},
        numSheets: function() {
            calcDigital()
            return `${((parseInt(finalValues.trimHeight)+12)/1000)* finalValues.quantity * sigs}m`},
        extras: function() {
            calcDigital()
            sigBreakdownDigital = `${sigs}x${impositionDigital}pp`
            return  `${finalExtent}pp`
            },
        extrasInfo: function() {return sigBreakdownDigital},
        info: function() {return ""}
    },
    "Text-IX" : {
        part: function () {
            return finalValues.bindMethod === "Sewn" || finalValues.bindMethod === "Saddle-Stitched" ? "Text-4pp Cut and Stack"
            : finalValues.plates > 0 && finalValues.platesValue === "yes"? "Text-2pp Cut and Stack"
            : finalValues.trimHeight <=234 && finalValues.trimWidth <=156 ? "Text-8pp Fold"
            : finalValues.trimHeight <= 246 && finalValues.trimWidth <=174 ? "Text-4pp Fold"
            : finalValues.trimHeight <= 297 && finalValues.trimWidth <= 210 ? "Text-2pp Cut and Stack"
            : "Seek Advice"
        },
        press: function() {return "IX Press"},
        ink: function() {return finalValues.colour === "mono" ? "1/1" : "4/4"},
        size: function() {return `${finalValues.trimHeight}mm x ${finalValues.trimWidth}mm`},
        spine: function() {return notApplicable},
        sheetSize: function() {return this.part()==="Text-4pp Fold" ? "384x268 or 364x256" : "350 x 488"},
        numUp: function() {
            return this.part()==="Text-2pp Cut and Stack" && finalValues.trimHeight <=234 && finalValues.trimWidth <=156 ? 4
            : this.part()==="Text-4pp Cut and Stack" && finalValues.trimHeight <=234 && finalValues.trimWidth <=156 || this.part()==="Text-2pp Cut and Stack" && finalValues.trimHeight <=297 && finalValues.trimWidth <=210 ? 2
            : this.part()==="Text-4pp Cut and Stack" && finalValues.trimWidth <=215 || this.part()==="Text-2pp Cut and Stack" || this.part()==="Text-8pp Fold" ? 1
            : "Seek Advice"
        },
        numSheets: function() {return "Add Calc"},
        extras: function() {
            impositionIX = finalValues.bindMethod === "Sewn" ? 16
            : finalValues.bindMethod === "Saddle-Stitched" ? 4
            : this.part() === "Text-8pp Fold" ? 8
            : this.part() === "Text-4pp Fold" ? 4
            : 2
            finalExtent = finalValues.extent%impositionIX === 0 ? finalValues.extent : parseInt(finalValues.extent) + (impositionIX-(finalValues.extent%impositionIX))
            return `${finalExtent}pp - ${finalExtent/impositionIX}x${impositionIX}pp`
        },
        extrasInfo: function() {return ""},
        info: function() {return ""}
    },
    "Text-Plate" : {
        part: function() {return finalValues.printMethod === "IX" && finalValues.bindMethod==="Sewn" || finalValues.printMethod === "IX" && finalValues.bindMethod==="Saddle-Stitched" ? "Text-4pp Plate Cut and Stack"
        : finalValues.printMethod === "digital" || finalValues.printMethod === "IX" ? "Text-Mix Media 2pp Plate" 
        : finalValues.trimHeight <=234 && finalValues.trimWidth <=156 ? "Text-8pp Plate Fold"
        : "Text-4pp Plate Fold"
        },
        press: function() {return "IX Press-max qty?"},
        ink: function() {return "4/4"},
        size: function() {return `${finalValues.trimHeight}mm x ${finalValues.trimWidth}mm`},
        spine: function() {return notApplicable},
        sheetSize: function() {return "350x488"},
        numUp: function() {return this.part()==="Text-Mix Media 2pp Plate" ? options["Text-IX"].numUp() : 1},
        numSheets: function() {return "Add Calc"},
        extras: function() {
            let imposition = finalValues.printMethod==="digital" || finalValues.printMethod==="IX" ? impositionIX 
            : this.part()==="Text-8pp Plate Fold" ? 8 : 4
            let plateExtent = finalValues.plates%imposition === 0 ? finalValues.plates : parseInt(finalValues.plates) + (imposition-(finalValues.plates%imposition))
            return `${plateExtent}pp - ${plateExtent/imposition}x${imposition}pp`
        },
        extrasInfo: function() {return ""},
        info: function() {return ""}
    },
}

let sigs;
let impositionDigital;
let fourson480 = false;
let impositionIX;
let impositionLitho;
let sigBreakdownDigital;
let oddment16 = false;
let oddment8 = false;

let calcDigital = ()=> {
    impositionDigital = finalValues.paper === "TJ Matt"? 4 : finalValues.trimWidth <=156 ? 6 : 4
    finalExtent = finalValues.extent%impositionDigital === 0 ? finalValues.extent : parseInt(finalValues.extent) + (impositionDigital-(finalValues.extent%impositionDigital))
    sigs = finalExtent/impositionDigital
}

let generateGreyboardSizes = (arr, newArr) => {
    for (let item of arr) {
        newArr.push(`${parseInt(finalValues.trimHeight) + 6} x ${finalValues.trimWidth - item}`)
    }
}

let lithoCalc = (value) => {
    let sizes = []
    let heightBleeds = parseInt(finalValues.trimHeight)+6
    let widthBleeds = parseInt(finalValues.trimWidth)+3
    sizes.push(heightBleeds*4, widthBleeds*8, heightBleeds*4, widthBleeds*6, heightBleeds*4, widthBleeds*4, heightBleeds*2, widthBleeds*4)
    let sheetOptions = finalValues.textPantone || finalValues.colour==="colour" ? "colour" : "mono"
    for (let i=0; i<sizes.length; i+=2) {
        for (let item of lithoSheets[sheetOptions]) {
            if (sizes[i] <= item["height"] && sizes[i+1] <= item["width"]) {
                let imp = [32, 24, 32, 16]
                impositionLitho = i === 0 ? 64 : i === 2 ? 48 : i === 3 ? 32 : 16
                let numUp = [2,2,1,1]
                finalExtent = finalValues.extent%8 === 0 ? finalValues.extent : parseInt(finalValues.extent) + (8-(finalValues.extent%8))
                oddment16 = (finalExtent%imp[i/2])/8 === 3 || (finalExtent%imp[i/2])/8 === 2 ? true : false
                oddment8 = (finalExtent%imp[i/2])/8 === 3 || (finalExtent%imp[i/2])/8 === 1 ? true : false
                return value === "numUp" ? numUp[i/2]
                : value === "partTitle" ? `Text-${imp[i/2]}pp`
                : value === "sheetSize" ? `${item["height"]} x ${item["width"]}`
                : value === "sigBreakdown" ? `${(Math.floor(finalExtent/(imp[i/2])))}x${imp[i/2]}pp`
                : notApplicable
            }
        }
    }
}



let finalValues = {}
let selectedCase;

let invalid = true;
let invalidItems = []
let validateForm = (arr)=> {
    for (let item of arr) {
        let value = document.querySelector(`#${item}`).value
        if (value === "" || value === "none" || value === "Bind Method" || value === "Paper Type" || value === "Plate Paper Type" || value === "Grammage" || value=== "Plate Grammage" ) {
            invalidItems.push(item)
            document.querySelector(`#${item}`).style.border = "3px solid rgba(253, 120, 120, 0.719)"
        } else {
            document.querySelector(`#${item}`).style.border = "none"
        }
    }
    if (invalidItems.length === 0) {
        if (document.querySelector(`#bind-method`).value === "Saddle-Stitched" && document.querySelector(`#case-style`).value !== "fourPage") {
            document.querySelector(`#case-style`).style.border = "3px solid rgba(253, 120, 120, 0.719)"
            invalid = true;
            return;
        }
        invalid = false; 
        return
    } else {
        invalid = true;  
    }
}

document.querySelector("#submit").addEventListener("click", ()=> {
    document.querySelector(".append-results").innerHTML = ""
    fourson480 = false;
    items = []
    for (let item of document.querySelectorAll(".input-field")) {
        finalValues[item.name] = item.value
    }    
    for (let item of document.querySelectorAll(".checkbox-field")) {
        finalValues[item.name] = item.checked
    }

    let essentials = ["print-method", "bind-method", "case-style", "colour-select", "extent", "grammage", "paper-type", "qty", "trim-height", "trim-width"]
    if (finalValues.platesValue === "yes") {
        essentials.push("plate-extent", "plate-paper", "plate-grammage")
    }
    invalidItems = []
    validateForm(essentials)
    if (invalid === false) {

        if (finalValues.jacket === "yes") {
            createResult("Jacket")
            addEvents("Jacket", options["Jacket"].sheets)
            revertOptions("Jacket")
            if (options["Jacket"].press()==="Outwork") {
                recalculateSAPC("Jacket", outworkInk)
            }
        }
        createResult(finalValues.caseOption)
        addEvents(finalValues.caseOption, options[finalValues.caseOption].sheets)
        if (options[finalValues.caseOption].press()==="Outwork") {
            recalculateSAPC(finalValues.caseOption, outworkInk)
        }
        if (finalValues.caseOption !== "Cloth") {
            revertOptions(finalValues.caseOption)
        }
        if (finalValues.caseOption=== "PPC" || finalValues.caseOption==="Cloth") {
            createResult("Greyboard")
            createResult("Endpapers")
            addEvents("Endpapers", options["Endpapers"].sheets)
        } else if (finalValues.twoPageEndpapers) {
            createResult("Endpapers-2pp")
            addEvents("Endpapers-2pp", options["Endpapers-2pp"].sheets)
        }
        if (finalValues.printMethod==="litho") {
            createResult("Text-Litho")
            if (oddment16) {
                createResult("Oddment-16")
            }
            if (oddment8) {
                createResult("Oddment-8")
            }
        } else if (finalValues.printMethod === "digital" && finalValues.platesValue === "no") {
            createResult("Text-Digital")
        } else if (finalValues.printMethod === "IX" || finalValues.printMethod === "digital" && finalValues.plates > 0 && finalValues.platesValue === "yes") {
            createResult("Text-IX")
        }
        if (finalValues.plates > 0 && finalValues.platesValue === "yes") {
            createResult("Text-Plate")
        }
        for (let item of items) {
            if (document.querySelector(`.${item}-open`).classList.contains("hidden")) {
                document.querySelector(`.${item}-open`).classList.remove("hidden")
            }
            if (options[item].info() === "") {
                document.querySelector(`.${item}-open`).classList.add("hidden")
            } else {
                addToggle(item)
            }
        }

    }

})

let revertOptions = (part)=> {
    if (options[part].press() !== "KBA 3") {
        document.querySelector(`.${part}adjust`).style.display = "none";
        options[part].sheetSize = function () {return sheetCalc(part, options[part].press())}
        document.querySelector(`.${part}sheet`).innerHTML = options[part].sheetSize()
        document.querySelector(`.${part}NumUp`).innerHTML = options[part].numUp()
        document.querySelector(`.${part}NumSheets`).innerHTML = options[part].numSheets()
    }
}

let recalculateSAPC = (part, arr) => {
    document.querySelector(".inkadjust").addEventListener("click", ()=> {
        let currentIndex = arr.indexOf(document.querySelector(`.${part}ink`).innerHTML);
        if (currentIndex+1 !== arr.length) {
            document.querySelector(`.${part}ink`).innerHTML = arr[currentIndex+1]
            options[part].extras = function () {return options[part].press()==="Outwork" ? `£${Math.floor(100 * calcSAPCPrice(part, arr[currentIndex+1]))/100}` : ""}
            options[part].ink = function () {return options[part].press()==="Outwork" ? `${arr[currentIndex+1]} </p><i class="fa-solid fa-circle-plus inkadjust mb-3 ms-3"></i>` : finalValues.pantone ? "5/0" : "4/0"}
            document.querySelector(`.${part}extras`).innerHTML = options[part].extras()
        } else {
            document.querySelector(`.${part}ink`).innerHTML = arr[0]
            options[part].extras = function () {return options[part].press()==="Outwork" ? `£${Math.floor(100*calcSAPCPrice(part, arr[0]))/100}` : ""}
            options[part].ink = function () {return options[part].press()==="Outwork" ? `${arr[0]} </p><i class="fa-solid fa-circle-plus inkadjust mb-3 ms-3"></i>` : finalValues.pantone ? "5/0" : "4/0"}
            document.querySelector(`.${part}extras`).innerHTML = options[part].extras()
        }
    })
}

let addEvents = (part, arr)=> {
    document.querySelector(`.${part}adjust`).addEventListener("click", ()=>{
        let currentIndex = arr.indexOf(document.querySelector(`.${part}sheet`).innerHTML);
        if (currentIndex+1 !== arr.length) {
            document.querySelector(`.${part}sheet`).innerHTML = arr[currentIndex+1]
            options[part].sheetSize = function () {return arr[currentIndex + 1]}
            document.querySelector(`.${part}NumUp`).innerHTML = options[part].numUp()
            document.querySelector(`.${part}NumSheets`).innerHTML = options[part].numSheets()
            if (part === "Endpapers") {
                document.querySelector(".Endpapersextras").innerHTML = options["Endpapers"].extras()
            }
        } else {
            document.querySelector(`.${part}sheet`).innerHTML = arr[0]
            options[part].sheetSize = function () {return arr[0]}
            document.querySelector(`.${part}NumUp`).innerHTML = options[part].numUp()
            document.querySelector(`.${part}NumSheets`).innerHTML = options[part].numSheets()
            if (part === "Endpapers") {
                document.querySelector(".Endpapersextras").innerHTML = options["Endpapers"].extras()
            }
        }
    })
}

let outworkInk = ["1/0", "2/0", "3/0", "4/0", "5/0"]
let calcSAPCPrice = (value, ink) => {
    let price = SAPCBasePrice[value][ink][0] + ((SAPCBasePrice[value][ink][1])/1000)*finalValues.quantity
    if (value === "fourPage" || value === "PPC") {
        price += finalValues.softTouch ? (37/1000)*finalValues.quantity : 0
        price += finalValues.foil && finalValues.foilCoverage === "front" ? 168.3 + (42/1000)*finalValues.quantity
        : finalValues.foil && finalValues.foilCoverage === "frontSpine" ? 197 + (49/1000)*finalValues.quantity
        : finalValues.foil && finalValues.foilCoverage === "frontSpineBack" ? 289.4 + (60/1000)*finalValues.quantity : 0
        price += finalValues.spotUV ? 179.5 + (46/1000)*finalValues.quantity : 0
        price += finalValues.emboss && finalValues.embossArea === "front" ? 172.4 + (37/1000)*finalValues.quantity
        : finalValues.emboss && finalValues.embossArea === "frontSpine" ? 211.4 + (37/1000)*finalValues.quantity
        : finalValues.emboss && finalValues.embossArea === "frontSpineBack" ? 289.4 + (37/1000)*finalValues.quantity : 0
    } else if (value === "Jacket" || value === "eightPage") {
        price += finalValues.softTouch ? (50/1000)*finalValues.quantity : 0
        price += finalValues.foil && finalValues.foilCoverage === "front" ? 252 + (60/1000)*finalValues.quantity
        : finalValues.foil && finalValues.foilCoverage === "frontSpine" ? 282 + (66/1000)*finalValues.quantity
        : finalValues.foil && finalValues.foilCoverage === "frontSpineBack" ? 342 + (78/1000)*finalValues.quantity 
        : finalValues.foil && finalValues.foilCoverage === "frontSpineBackFlaps" ? 414 + (90/1000)*finalValues.quantity : 0
        price += finalValues.spotUV ? 179.5 + (46/1000)*finalValues.quantity : 0
        price += finalValues.emboss && finalValues.embossArea === "front" ? 202 + (37/1000)*finalValues.quantity
        : finalValues.emboss && finalValues.embossArea === "frontSpine" ? 241 + (37/1000)*finalValues.quantity
        : finalValues.emboss && finalValues.embossArea === "frontSpineBack" ? 319 + (37/1000)*finalValues.quantity 
        : finalValues.emboss && finalValues.embossArea === "frontSpineBackFlaps" ? 413 + (37/1000)*finalValues.quantity : 0
    }
    return price  

}

let SAPCBasePrice = {
    "fourPage" : {
        "1/0": [114.73, 99.9],
        "2/0": [169.78, 104.20],
        "3/0": [280.29, 106],
        "4/0": [114.69, 95.7],
        "5/0": [205.29, 106]
    },
    "eightPage" : {
        "1/0": [155.03, 138.5],
        "2/0": [222.73, 139.1],
        "3/0": [290.62, 140.3],
        "4/0": [148.12, 140.3],
        "5/0": [215.62, 140.3]
    },
    "PPC" : {
        "1/0": [101.81, 57],
        "2/0": [156.87, 61.3],
        "3/0": [267.41, 63],
        "4/0": [99.52, 61.8],
        "5/0": [192.41, 63]
    },
    "Jacket" : {
        "1/0": [137.84, 81.2],
        "2/0": [205.53, 81.8],
        "3/0": [273.32, 83.4],
        "4/0": [130.82, 83.4],
        "5/0": [198.32, 83.4]
    }
}

let items=[]
//Create each Result row
const createResult = (part)=> {
    items.push(part)
    let newElement = document.createElement("div")
    newElement.classList.add("row")
    newElement.classList.add("results")
    newElement.classList.add("mt-3")
    newElement.innerHTML = `
<div class="col col-lg-1 result-line">
<p>${options[part].part()}</p>
</div>
<div class="col col-lg-1 result-line">
    <p>${options[part].press()}</p>
</div>
<div class="col col-lg-1 result-line">
    <p class="${part}ink">${options[part].ink()}</p>
</div>
<div class="col col-lg-1 result-line">
<p>${options[part].spine()}</p>
</div>
<div class="col col-lg-2 result-line">
<p>${options[part].size()}</p>
</div>
<div class="col col-lg-2 result-line">
<p class="${part}sheet">${options[part].sheetSize()}</p><p></p><i class="fa-solid fa-circle-plus ${part}adjust mb-3 ms-3"></i></p>
</div>
<div class="col col-lg-1 result-line">
<p class="${part}NumUp">${options[part].numUp()}</p>
</div>
<div class="col col-lg-1 result-line">
<p class="${part}NumSheets">${options[part].numSheets()}</p>
</div>
<div class="col col-lg-1">
<p class="${part}extras me-3">${options[part].extras()}</p>
</div>
<div class="col col-lg-1">
<p class="ms-auto">${options[part].extrasInfo()}</p>
<p><i class="fa-solid fa-circle-plus ${part}-open mt-2 me-3"></i></p>
</div>
<div class="row no-display ${part}-hidden">
<div class="added-info col-lg-11 ms-auto">
<p class="me-auto ${part}info"> ${options[part].info()}</p>
</div>
</div>
    `
    document.querySelector(".append-results").appendChild(newElement)
}

let addToggle = (item) => {
        document.querySelector(`.${item}-open`).addEventListener("click", ()=> {
        document.querySelector(`.${item}-hidden`).classList.toggle("no-display")
    })
}


//BOX CALCULATOR?
//INK CALCULATOR?
//OUTWORK 8PP FOLDING
//FLAP SIZE FOR JACKET AND FOR 8PP COVER
//TEXT SIZE INCREASING FOR LITHO JOBS IF AN 8PP COVER
//ADD PASSWORD FOR ACCESS
