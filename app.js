//VARIABLES
let printOption;
let bindOption;
let caseOption;
let plates;
let jacket;
let spineStyle;
let greyboardThickness;
let extent;
let quantity;
let trimHeight;
let trimWidth;
let colour;
let paper;
let grammage;
let platePaper;
let plateGrammage;
let pantone;
let pantoneCoverage;
let foilFront;
let foilFrontCoverage;
let foilBack;
let foilBackCoverage;
let spotUV;
let spotUVBleeds;
let softTouch;
let headTail;
let emboss;
let ribbon;
let textPantone;
let textPantoneCoverage;
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
showMore("#foil-front", "#foil-front-measurement")
showMore("#foil-back", "#foil-back-measurement")

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
            } else {
                if (item.indexOf(selectedPaper)===0) {
                    for (let i=1; i<item.length; i++) {
                        newArr.push(item[i])
                    }
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
    if (document.querySelector("#print-method").value==="litho") {
        document.querySelector(".text-pantone").classList.remove("text-pantone-hidden")
    } else {
        document.querySelector(".text-pantone").classList.add("text-pantone-hidden")
    }

})

//Select Paper type- Update Options for Grammage
document.querySelector("#paper-type").addEventListener("click", (e)=> {
    let selectedPaper = document.querySelector("#paper-type").value
    createNewOption(paperOptions[document.querySelector("#print-method").value], "#grammage", "Grammage", true, false, selectedPaper)
})

//Select Plates- Update Options for Plate Paper
document.querySelector("#plates").addEventListener("click", ()=> {
    if (document.querySelector("#plates").value === "yes") {
        document.querySelector(".plate-extent").style.display = "inline" 
        createNewOption(paperOptions["plates"], "#plate-paper", "Plate Paper Type", true, true, false)
    }
    else {
        document.querySelector(".plate-extent").style.display = "none"
    }
})

//Select Plate Paper- Update Options for Grammage
document.querySelector("#plate-paper").addEventListener("click", (e)=> {
    let selectedPaper = document.querySelector("#plate-paper").value
    createNewOption(paperOptions["plates"], "#plate-grammage", "Grammage", true, false, selectedPaper)
})


//Function to update display options after chosing the case type
let showRelevantOptions = (plate, plateExtent, casedOptions, jacketValue)=> {
        document.querySelector(".plate-option").style.display = plate
        document.querySelector(".plate-extent").style.display = plateExtent
        document.querySelector(".cased-options").style.display = casedOptions
        document.querySelector("#jackets").value = jacketValue
}

//Select Case Type- Update Options Available for Plates, Case Finishes etc.
document.querySelector("#case-style").addEventListener("click", (e)=> {
    let value = document.querySelector("#case-style").value
    let extentDisplay;
    //If plates have already been selected, keep the plate extent option visible
    if (document.querySelector("#plates").value === "yes") {
        extentDisplay = "inline"
    } else {
        extentDisplay = "none"
    }
    if (value === "4pp" || value === "8pp") {
        showRelevantOptions("inline", extentDisplay, "none", "no")
    }
    else if (value === "PPC") {
        showRelevantOptions("inline", extentDisplay, "inline", "no")
        
    }
    else if (value === "Cloth") {
        showRelevantOptions("inline", extentDisplay, "inline", "yes")
    }
    else {
        showRelevantOptions("none", "none", "none", "no")
    }
})

let notApplicable = `<span class="n-a">N/A</span>`
let spine;
let additionalHollow = 0;

let sheetCalc = (part, press)=> {
    if (press === "KBA 3") {
        return "720 x 1020"
    } else if (press === "Outwork" || !press) {
        return notApplicable
    } else {
        let basicWidth = trimWidth*2+spine       
        if (spineStyle === "pressPahn") {
            additionalHollow = 2
        } else if (spineStyle === "boardHollow") {
            additionalHollow = 4
        }
        if (basicWidth+40+additionalHollow <=417 && part === "PPC" || basicWidth <=402 && part === "fourPage") {
            return "320 x 450"
        } else if (basicWidth+200 <=492 && part === "Jacket" || basicWidth+40+additionalHollow <=536 && part === "PPC" || basicWidth+209 <=546 && part === "eightPage" || basicWidth <= 512 && part === "fourPage") {
            return "320 x 560"
        } else if (basicWidth+200 <=597 && part === "Jacket") {
            return "320 x 660"
        } else if (basicWidth+ 200 > 597) {
            return "320 x 700"
        } else {
            return "Seek Advice"
        }
    }
} 

let generateGreyboardSizes = (arr, newArr) => {
    for (let item of arr) {
        newArr.push(`${parseInt(trimHeight) + 6} x ${trimWidth - item}`)
    }
}

let checkCoverPress = (maxQty) => {
    if (spotUV && spotUVBleeds === "with-bleeds" || foilFront || foilBack || emboss) {
        return "Outwork"
    } else if (pantone || quantity >= maxQty) {
        return "KBA 3"
    } else if (caseOption === "4pp" && printOption === "digital" && !spotUV) {
        return "Ricoh 9210"
    } else {
        return "Ricoh 9200"
    }
}
let checkCoverInk = ()=> {
    if (pantone) {
        return "5/0"
    } else {
        return "4/0"
    }
}

let caseSpine = (thickness)=> {
    return Math.round(textSpine + (parseInt(thickness)/100)*2)
}
let textSpine;
let calcSpineWidth = ()=> {   
    if (plates>0) {
        textSpine = (((volumes[paper] * grammage) * extent )/20000)+ 0.6 + (((volumes[platePaper] * plateGrammage) * plates)/20000)
    } else {
        textSpine = (((volumes[paper] * grammage) * extent )/20000)+ 0.6
    }
    if (caseOption === "4pp" || caseOption === "8pp") {
        spine = Math.round(textSpine)
        return spine
    }
    else if (caseOption === "Cloth" || caseOption === "PPC") {
        spine = caseSpine(greyboardThickness)
        return spine
    } 
}

let calculateCoverNumSheets = (percent, makeReady, numUp)=> {
    return Math.floor(((quantity*percent)/numUp)+makeReady)
}

let options = {
    "Jacket": {
        sheets: ["720 x 1020", "640 x 900"],
        part: function () {return "Jacket"},
        press: function () {return checkCoverPress(3001)},   
        ink: function () {return checkCoverInk()},
        spine: function () {return calcSpineWidth()},
        size: function () {return `${parseInt(trimHeight) + 18}mm x ${(trimWidth*2)+ this.spine() +192}mm`},
        sheetSize: function () {return sheetCalc("Jacket", this.press())},
        numUp: function () {
            if (this.press() === "Ricoh 9200") {
                return 1
            } else if (this.press() === "KBA 3"){
                if (!spotUV) {
                    return 3
                } else {
                    return 2
                }
            } else {
                return notApplicable
            }   
        },
        numSheets: function () {
            if (this.press() === "KBA 3") {
                return calculateCoverNumSheets(1.1, 150, this.numUp())
            } else if (this.press() === "Ricoh 9200")  {
                return calculateCoverNumSheets(1.085, 2, this.numUp())
            } else {
                return notApplicable
            }
        },
        extras: function () {return ""},
        extrasInfo: function () {return ""},
        info: function () {return ""},
    },
    "Cloth": {
        sheets: ["640 x 970", "1020 x 760", "1020 x 850"],
        part: function () {return "Cloth"},
        press: function () {return notApplicable},
        ink: function () {return notApplicable},
        spine: function () {return calcSpineWidth()},
        size: function () {
            if (spineStyle === "pressPahn") {
                additionalHollow = 2
            } else if (spineStyle === "boardHollow") {
                additionalHollow = 4
            }
            return `${parseInt(trimHeight)+38}mm x ${(trimWidth * 2)+this.spine()+additionalHollow+40}mm`},
        sheetSize: function () {return "640 x 970"},
        numUp: function () {
          let clothHeight;
          let clothWidth;  
          if (this.sheetSize() === "640 x 970") {
            clothHeight = 640;
            clothWidth = 970;
          } else if (this.sheetSize() === "1020 x 760") {
            clothHeight = 1020;
            clothWidth = 760;
          } else if (this.sheetSize() === "1020 x 850") {
            clothHeight = 1020;
            clothWidth = 850;
          }
          return Math.floor((clothHeight/(parseInt(trimHeight)+38)))*Math.floor((clothWidth/((trimWidth*2)+this.spine()+40)))
        },
        numSheets : function () {
            return Math.round((quantity/this.numUp())*1.1)
        },
        extras: function () {return ""},
        extrasInfo: function () {return ""},
        info: function () {return ""},
    },
    "PPC": {
        sheets: ["720 x 1020", "640 x 900"],
        part: function () {return "PPC"},
        press: function () {return checkCoverPress(6001)},
        ink: function () {return checkCoverInk()},
        spine: function () {return calcSpineWidth()},
        size: function () {
            if (spineStyle === "pressPahn") {
                additionalHollow = 2
            } else if (spineStyle === "boardHollow") {
                additionalHollow = 4
            }
            return `${parseInt(trimHeight) + 38}mm x ${(trimWidth*2)+this.spine()+additionalHollow+40}mm`},
        sheetSize: function () {return sheetCalc("PPC", this.press())},
        numUp: function() {
            if (this.press() === "Ricoh 9200") {
                return 1
            } else if (this.press() === "KBA 3"){
                if (spotUV && parseInt(trimHeight)<=234 && parseInt(trimWidth)<=156 && this.sheetSize()==="640 x 900") {
                    return 2
                } else if (parseInt(trimHeight)<=234 && parseInt(trimWidth)<=156) {
                    return 3
                } else {
                    return "Seek Advice"
                }
            } else {
                return notApplicable
            }   
        },
        numSheets: function () {
            if (this.press() === "KBA 3") {
                return calculateCoverNumSheets(1.25, 100, this.numUp())
            } else if (this.press() === "Ricoh 9200")  {
                return calculateCoverNumSheets(1.25, 2, this.numUp())
            } else {
                return notApplicable
            }
        },
        extras: function () {return ""},
        extrasInfo: function () {return ""},
        info: function () {return ""},
    }, 
    "eightPage": {
        sheets: ["720 x 1020", "640 x 900"],
        part: function () {return "8pp Cover"},
        press: function () {return checkCoverPress(4001)},
        ink: function () {return checkCoverInk()},
        spine: function () {return calcSpineWidth()},
        size: function () {return `${parseInt(trimHeight)+20}mm x ${(trimWidth*2)+this.spine()+209}mm`},
        sheetSize: function () {return sheetCalc("eightPage", this.press())},
        numUp: function () {
            if (this.press()==="Ricoh 9200") {
                return 1
            } else if (this.press() === "KBA 3") {
                if (parseInt(trimHeight)<=234 && parseInt(trimWidth)<=156 && this.sheetSize()==="720 x 1020") {
                    return 4
                } else if (parseInt(trimHeight)<=234 && parseInt(trimWidth)<=156 && this.sheetSize()=== "640 x 900") {
                    return 3
                } else {
                    if (this.sheetSize() ==="720 x 1020") {
                        return 3
                    } else {
                        return 2
                    }
                }
            } else {
                return notApplicable;
            }
        },
        numSheets: function () {
            if (this.press()==="KBA 3") {
                return calculateCoverNumSheets(1.15, 150, this.numUp());
            } else if (this.press() === "Ricoh 9200") {
                return calculateCoverNumSheets(1.15, 2, this.numUp())
            } else {
                return notApplicable;
            }
        },
        extras: function () {return ""},
        extrasInfo: function () {return ""},
        info: function () {return ""},
    },
    "fourPage": {
        sheets: ["720 x 1020", "640 x 900"],
        part: function () {return "4pp Cover"},
        press: function () {return checkCoverPress(7001)},
        ink: function () {return checkCoverInk()},
        spine: function () {return calcSpineWidth()},
        size: function () {return `${parseInt(trimHeight)+20}mm x ${(trimWidth*2)+this.spine()+9}mm`},
        sheetSize: function () {return sheetCalc("fourPage", this.press())},
        numUp: function () {
            if (this.press()==="Ricoh 9200" || this.press() === "Ricoh 9210") {
                return 1
            } else if (this.press() === "KBA 3") {
                if (!spotUV) {
                    if (parseInt(trimHeight)<=234 && parseInt(trimWidth)<=156) {
                        return 8
                    } else {
                        return 4
                    }
                } else {
                    if (this.sheetSize()=== "720 x 1020") {
                        return 4
                    } else {
                        return "Use Larger Sheet"
                    }
                }
            } else {
                return notApplicable
            }
        },
        numSheets: function () {
            if (this.press() === "KBA 3") {
                return calculateCoverNumSheets(1.1, 150, this.numUp())
            } else if (this.press() === "Ricoh 9200" || this.press()=== "Ricoh 9210") {
                return calculateCoverNumSheets(1.1,2,this.numUp())
            } else {
                return notApplicable;
            }
        },
        extras: function () {return ""},
        extrasInfo: function () {return ""},
        info: function () {return ""},
    },
    "Greyboard":{
        part: function () {return "Greyboard"},
        press: function () {return notApplicable},
        ink: function () {return notApplicable},
        spine: function () {return notApplicable},
        size: function () {return `${parseInt(trimHeight)+6}mm x ${trimWidth-4}mm`},
        sheetSize: ()=> {
            let possibleSizes = []
            generateGreyboardSizes([4,3,5], possibleSizes)
            console.log(possibleSizes)
            for (let item of possibleSizes) {
                if (greyBoardStock[greyboardThickness][item]) {
                    return item
                }
            }
                return "760 x 1020"
        },
        numUp: function () {return notApplicable},
        numSheets: function() {return notApplicable},
        extras: function () {return greyBoardStock[greyboardThickness][this.sheetSize()]},
        extrasInfo: function () {return ""},
        info: function () {return ""},
    },    
    "Endpapers": {
        sheets: ["720 x 1020", "640 x 970", "1020 x 760", "1020 x 850"],
        part: function () {return "Endpapers"},
        press: function () {return notApplicable},
        ink: function () {return notApplicable},
        spine: function () {return notApplicable},
        size: function () {
            return `${parseInt(trimHeight)+6}mm x ${(trimWidth * 2)+6}mm`
        },
        sheetSize: function () {return "720 x 1020"},
        numUp: function () {
            if (this.sheetSize() === "1020 x 760") {
                return 789
            } else {
                return 500
            }  
        },
        numSheets: function () {
            return 10
        },
        extras: function () {return ""},
        extrasInfo: function () {return ""},
        info:function () {return ""}
    },
}

document.querySelector("#submit").addEventListener("click", ()=> {
    document.querySelector(".append-results").innerHTML = ""
    //Gather Results
    printOption = document.querySelector("#print-method").value
    bindOption = document.querySelector("#bind-method").value
    caseOption = document.querySelector("#case-style").value
    if (document.querySelector("#plates").value === "yes") {
        plates = document.querySelector("#plate-extent").value
        platePaper = document.querySelector("#plate-paper").value
        plateGrammage = document.querySelector("#plate-grammage").value
    } else {
        plates = 0
        platePaper = false;
        plateGrammage = false;
    }
    jacket = document.querySelector("#jackets").value
    spineStyle = document.querySelector("#spine-style").value
    greyboardThickness = document.querySelector("#greyboard").value
    extent = document.querySelector("#extent").value
    quantity = document.querySelector("#qty").value
    trimHeight = document.querySelector("#trim-height").value
    trimWidth = document.querySelector("#trim-width").value
    colour = document.querySelector("#colourSelect").value
    paper = document.querySelector("#paper-type").value
    grammage = document.querySelector("#grammage").value
    pantone = document.querySelector("#pantone").checked
    if (pantone) {
        pantoneCoverage = document.querySelector("#pantone-coverage").value
    }
    textPantone = document.querySelector("#text-pantone").checked
    if (pantone) {
        textPantoneCoverage = document.querySelector("#text-pantone-coverage").value
    }
    foilFront = document.querySelector("#foil-front").checked
    if (foilFront) {
        foilFrontCoverage = document.querySelector("#foil-front-measurement").value
    }
    foilBack = document.querySelector("#foil-back").checked
    if (foilBack) {
        foilBackCoverage = document.querySelector("#foil-back-measurement").value
    }
    spotUV = document.querySelector("#spot-uv").checked
    if (spotUV) {
        spotUVBleeds = document.querySelector("#spot-uv-bleeds").value
    }
    softTouch = document.querySelector("#soft-touch").checked
    headTail = document.querySelector("#head-tail").checked
    emboss = document.querySelector("#emboss").checked
    ribbon = document.querySelector("#ribbon").checked 

    createResult("Jacket")
    addEvents("Jacket", options["Jacket"].sheets)
    revertOptions("Jacket")
    createResult("Cloth")
    addEvents("Cloth", options["Cloth"].sheets)
    createResult("PPC")
    addEvents("PPC", options["PPC"].sheets)
    revertOptions("PPC")
    createResult("eightPage")
    addEvents("eightPage", options["eightPage"].sheets)
    revertOptions("eightPage")
    createResult("fourPage")
    addEvents("fourPage", options["fourPage"].sheets)
    revertOptions("fourPage")
    createResult("Greyboard")
    createResult("Endpapers")
    addEvents("Endpapers", options["Endpapers"].sheets)
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

let addEvents = (part, arr)=> {
    document.querySelector(`.${part}adjust`).addEventListener("click", ()=>{
        let currentIndex = arr.indexOf(document.querySelector(`.${part}sheet`).innerHTML);
        if (currentIndex+1 !== arr.length) {
            document.querySelector(`.${part}sheet`).innerHTML = arr[currentIndex+1]
            options[part].sheetSize = function () {return arr[currentIndex + 1]}
            document.querySelector(`.${part}NumUp`).innerHTML = options[part].numUp()
            document.querySelector(`.${part}NumSheets`).innerHTML = options[part].numSheets()
            
        } else {
            document.querySelector(`.${part}sheet`).innerHTML = arr[0]
            options[part].sheetSize = function () {return arr[0]}
            document.querySelector(`.${part}NumUp`).innerHTML = options[part].numUp()
            document.querySelector(`.${part}NumSheets`).innerHTML = options[part].numSheets()
        }
    })
}

//Create each Result row
const createResult = (part)=> {
    let newElement = document.createElement("div")
    newElement.classList.add("row")
    newElement.classList.add("results")
    newElement.classList.add("mt-3")
    newElement.innerHTML = `
<div class="col col-lg-1">
<p>${options[part].part()}</p>
</div>
<div class="col col-lg-1">
    <p>${options[part].press()}</p>
</div>
<div class="col col-lg-1">
    <p>${options[part].ink()}</p>
</div>
<div class="col col-lg-1">
<p>${options[part].spine()}</p>
</div>
<div class="col col-lg-2">
<p>${options[part].size()}</p>
</div>
<div class="col col-lg-2">
<p class="${part}sheet">${options[part].sheetSize()}</p><p></p><i class="fa-solid fa-circle-plus ${part}adjust mb-3 ms-3"></i></p>
</div>
<div class="col col-lg-1">
<p class="${part}NumUp">${options[part].numUp()}</p>
</div>
<div class="col col-lg-1">
<p class="${part}NumSheets">${options[part].numSheets()}</p>
</div>
<div class="col col-lg-1">
<p>${options[part].extras()}</p>
<p>${options[part].extrasInfo()}</p>
</div>
<div class="col col-lg-1">
<p><i class="fa-solid fa-circle-plus ${part}-open mt-2 ms-auto"></i></p>
</div>
<div class="row no-display ${part}-hidden">
<div class="added-info col-lg-11 ms-auto">
<p>${options[part].info()}</p>
</div>
</div>
    `
    document.querySelector(".append-results").appendChild(newElement)
}

let addToggle = (arr)=> {
    for (let item of arr) {
        document.querySelector(`.${item}-open`).addEventListener("click", ()=> {
            console.log("clicked")
            document.querySelector(`.${item}-hidden`).classList.toggle("no-display")
        })
    }

}

//ADD FOURS ON 480 REEL 
//OUTWORK 8PP FOLDING
//SAPC OUTWORK PRICING
//QUANTITIES TO ORDER- FOIL, PMS, HEAD AND TAIL BANDS, CLOTH, RIBBON MARKERS, ENDPAPERS
//ADD OPTIONS TO CHANGE
//FLAP SIZE FOR JACKET AND FOR 8PP COVER
//TEXT SIZE INCREASING FOR LITHO JOBS IF AN 8PP COVER
//CHECK PAGINAITON OF PLATE SECTION
//ADD OPTION TO SEE IF PLATES CAN FALL IN CERTAIN PLACE
//ADD WHICH ENDPAPERS IF PLAIN
//ADD STANDARD OR NON STANDARD FOR ENDPAPERS
//CREATE OPTION FOR PRINTED ENDPAPERS
//IMPLEMENT FUNCTIONALITY FOR TEXT PANTONE- ONLY APPEAR WHEN TEXT IS LITHO
