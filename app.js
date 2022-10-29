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
    },
    "225": {

    },
    "250": {
        "222 x 134": "E250018",
        "240 x 152": "E250019",
    },
    "275": {
        "240 x 152": "E27506"
    },
    "Non-Standard": {
        "190": "2mm E190029",
        "225": "E225029",
        "250": "E250016",
        "275": "E275010"
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
                console.log(item)
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

//Show input areas when certain options are selected
let showMore = (objectSelected, inputArea)=> {
    document.querySelector(`${objectSelected}`).addEventListener("click", ()=> {
    document.querySelector(`${inputArea}`).classList.toggle("hidden")
    })
}
showMore("#pantone", "#pantone-coverage")
showMore("#foil-front", "#foil-front-measurement")
showMore("#foil-back", "#foil-back-measurement")
showMore("#spot-uv", "#spot-uv-bleeds")


//Calculate Results
//Calculations created
let jacketPress = "";
let jacketInk = "";
let jacketSize= "";
let jacketSheetSize= "";
let jacketNumUp= "";
let jacketNumSheets= "";
let greyboardSize= "";
let greyboardSheetSize= "";
let greyboardExtras= "";
let greyboardInfo = "";
let coverPress = "";
let coverColour = "";
let coverSize = "";
let coverSheetSize = "";
let coverNumUp = "";
let coverNumSheets = "";
let calculatedCoverSheet;
let spineWidth;
let coverPart = "";
let items = []
let textPress = "";
let textInk = "";
let trimSize = "";
let textImp = "";
let textSheetSize = "";
let textNumUp = "";
let oddment16 = false;
let oddment8 = false;
let textSpine;

let caseSpine = (thickness)=> {
    spineWidth = Math.round(textSpine + (parseInt(thickness)/100)*2)
}

let calcSpineWidth = ()=> {   
    if (plates>0) {
        textSpine = (((volumes[paper] * grammage) * finalExtent )/20000)+ 0.6 + (((volumes[platePaper] * plateGrammage) * plates)/20000)
    } else {
        textSpine = (((volumes[paper] * grammage) * finalExtent )/20000)+ 0.6
    }
    if (caseOption === "4pp" || caseOption === "8pp") {
        spineWidth = Math.round(textSpine);
    }
    else if (caseOption === "Cloth" || caseOption === "PPC") {
        caseSpine(greyboardThickness) 
    } 
}

let coverSheetsData = {
    "KBA3": {
        "PPCPart": "Litho-PPC",
        "PPCPercent": 1.25,
        "PPCMakeReady": 100,
        "4ppPart": "Litho-4pp",
        "4ppPercent": 1.1,
        "4ppMakeReady": 150,
        "8ppPart": "Litho-8pp",
        "8ppPercent": 1.15,
        "8ppMakeReady": 150,
    },
    "Toner" : {
        "PPCPart": "Toner-PPC",
        "PPCPercent": 1.25,
        "PPCMakeReady": 2,
        "4ppPart": "Toner-4pp",
        "4ppPercent": 1.1,
        "4ppMakeReady": 2,
        "8ppPart": "Toner-8pp",
        "8ppPercent": 1.15,
        "8ppMakeReady": 2,  
    }
}

//JACKET CALCULATIONS
let jacketCalc = ()=> {
    jacketSize = `${parseInt(trimHeight) + 18}mm x ${(trimWidth*2)+spineWidth+192}mm`
    jacketInk = "4/0"
    if (spotUV && spotUVBleeds === "with-bleeds") {
        jacketPress = "Outwork"
        jacketNumUp = notApplicable
        jacketSheetSize = notApplicable
        jacketNumUp = notApplicable
    }
    else if (pantone || quantity >= 3001) {
        jacketPress = "KBA3"
        jacketSheetSize = `640 x 900 </p><i class="fa-solid fa-circle-plus jacket-change mb-3 ms-3"></i><p>` //ADD OPTIONS FOR BOTH SHEET SIZES
        if (spotUV) {
            jacketNumUp = 2
        }
        else {
            jacketNumUp = 3
        }
        if (pantone) {
            jacketInk = "5/0"
        }
        jacketNumSheets = Math.floor(((quantity*1.1)/jacketNumUp)+150)
    }
    else {
        jacketPress = "Ricoh 9200"
        jacketNumUp = "1"
        jacketNumSheets = quantity*1.085
        if (trimWidth*2+spineWidth+200<=492) {
            jacketSheetSize = "320 x 560"
        }
        else if (trimWidth*2+spineWidth+200>492 && trimWidth*2+spineWidth+140<492) {
            jacketSheetSize  ="Flap Size?"
            //ASK FOR FLAP SIZE
        }
        else if (trimWidth*2+spineWidth+200<=597) {
            jacketSheetSize = "320 x 660"
        }
        else if (trimWidth*2+spineWidth+200>597) { //ADD WHAT SIZE IT NEEDS TO BE SMALLER THAN
            jacketSheetSize = "320 x 700"
        }
    }
} 

let generateSizes = (arr, newArr) => {
    for (let item of arr) {
        newArr.push(`${parseInt(trimHeight) + 6} x ${trimWidth - item}`)
    }
}

//GREYBOARD CALCULATIONS
let greyboardCalc = ()=> {
    let possibleSizes = []
    generateSizes([4,3,5], possibleSizes)
    greyboardSize = `${possibleSizes[0].slice(0,3)}mm x ${possibleSizes[0].slice(6,9)}mm`
    for (let item of possibleSizes) {
        if (greyBoardStock[greyboardThickness][item]) {
            greyboardSheetSize = item;
            greyboardExtras = greyBoardStock[greyboardThickness][item]
            if (possibleSizes.indexOf(item)===1) {
                greyboardInfo = "Add 1mm to width"
            } else if (possibleSizes.indexOf(item)===2) {
                greyboardInfo = "Remove 1mm from width"
            } else {
                greyboardInfo = ""
            }
        return    
        } 
    else {
            greyboardSheetSize = "760x1020"
            greyboardExtras = greyBoardStock["Non-Standard"][greyboardThickness]
        }
    }
}

let calculateCoverNumSheets = (percent, makeReady) => {
    coverNumSheets = Math.floor(((quantity*percent)/coverNumUp)+makeReady)
}

//COVER CALCULATIONS
let coverCalc = ()=> {
    coverExtras = ""
    coverColour = "4/0"
    let printType;

    if (caseOption === "PPC" || caseOption === "Cloth") {
        let additional;
        if (spineStyle==="roundBack") {
            additional = 0
        } else if (spineStyle==="pressPahn") {
            additional = 2
        } else if (spineStyle==="boardHollow") {
            additional = 4
        }
      coverSize = `${parseInt(trimHeight)+38}mm x ${(trimWidth*2)+40+additional+spineWidth}mm`
    } else if (caseOption === "8pp") {
        coverSize = `${parseInt(trimHeight)+20}mm x ${(trimWidth*2)+209+spineWidth}mm`
    } else if (caseOption === "4pp") {
        coverSize = `${parseInt(trimHeight)+20}mm x ${(trimWidth*2)+9+spineWidth}mm`
    }

    if (spotUV && spotUVBleeds === "with-bleeds"|| caseOption !== "Cloth" && foilFront || caseOption !== "Cloth" && foilBack || emboss) {
        console.log("outwork")
        coverPress = "Outwork"
        coverSheetSize = notApplicable
        coverNumUp = notApplicable
        coverNumSheets = notApplicable
        coverPart = `Outwork-${caseOption}`
    } else {
        if (pantone || caseOption === "PPC" && quantity >= 6001 || caseOption === "4pp" && quantity >= 7001 || caseOption === "8pp" && quantity >= 4001) {
            coverPress = "KBA3"
            printType = "KBA3"
            coverSheetSize = `640 x 900 </p><i class="fa-solid fa-circle-plus cover-change mb-3 ms-3"></i><p>` //ADD OPTIONS TO CHANGE
            calculatedCoverSheet = "640 x 900"
            if (pantone) {
                coverColour = "5/0"
            }
        } else if (caseOption === "4pp" && !spotUV && printOption === "digital") {
            coverPress = "Ricoh 9210"
            printType = "Toner"
        } else {
            coverPress = "Ricoh 9200"
            printType = "Toner"
        }
        
        if (printType === "Toner") {
            coverNumUp = 1;
            if (foursOn480 === true) {
                coverSheetSize = "320 x 560"
            }
            else if (trimWidth*2 + spineWidth <=402 && caseOption === "4pp") {
               coverSheetSize = "320 x 450"
            }
            else if (trimWidth*2 + spineWidth <=512 || caseOption === "8pp") {
                coverSheetSize = "320 x 560"
            }
            else {
                coverSheetSize = "Seek Advice"
            }
    
        }
        else if (printType === "KBA3") {
            let uvOption;
            let aboveOrBelow;
            if (spotUV) {
                uvOption = "with-UV"
            } else {
                uvOption = "no-UV"
            }
            if (parseInt(trimHeight)<=234 && trimWidth <=156) {
                aboveOrBelow = "belowRoyal"
            } else {
                aboveOrBelow = "aboveRoyal"
            }
    
            if (caseOption==="PPC") {
                if (uvOption === "no-UV") {
                    if (aboveOrBelow==="belowRoyal") {
                        coverNumUp = 3
                    } else if (aboveOrBelow==="aboveRoyal") {
                        coverNumUp = "Seek Advice"
                    } 
                } else if(uvOption==="with-UV") {
                    if (aboveOrBelow==="belowRoyal") {
                        if(calculatedCoverSheet==="720 x 1020") {
                            coverNumUp = 3
                        } else {
                            coverNumUp = 2
                        }
                    } else if (aboveOrBelow==="aboveRoyal") {
                        coverNumUp = "Seek Advice"
                    }
                }
            } else if (caseOption==="4pp") {
                if (uvOption==="no-UV") {
                    if (aboveOrBelow==="belowRoyal") {
                        if (printOption !=="digital") {
                            coverNumUp = 8
                        } else {
                            if (calculatedCoverSheet === "720 x 1020") {
                                coverNumUp = 4
                            } else {
                                coverNumUp = 2
                            }
                        }
                    } else if (aboveOrBelow==="aboveRoyal") {
                        if (printOption !== "digital") {
                            coverNumUp = 4
                        }
                        else {
                            coverNumUp = "Seek Advice"
                        }
                    }
                } else if (uvOption==="with-UV") {
                    if (aboveOrBelow==="belowRoyal") {
                        if (calculatedCoverSheet==="720 x 1020" || printOption !== "digital") {
                            coverNumUp = 4
                        } else {
                            coverNumUp = 2
                        }
                    } else if (aboveOrBelow==="aboveRoyal"){
                        coverNumUp = "Seek Advice"
                    }
                }
            } else if (caseOption==="8pp") {
                if (uvOption==="no-UV") {
                    if (calculatedCoverSheet==="720 x 1020" && aboveOrBelow==="belowRoyal") {
                        coverNumUp = 4
                    } else if (calculatedCoverSheet==="720 x 1020" && aboveOrBelow==="aboveRoyal" || calculatedCoverSheet==="640 x 900" && aboveOrBelow==="belowRoyal") {
                        coverNumUp = 3
                    } else {
                        coverNumUp = 2
                    }
                } else if (uvOption === "with-UV") {
                    coverNumUp = "Seek Advice"
                }
            }    
        }        
    
        coverPart = coverSheetsData[printType][`${caseOption}Part`]
        calculateCoverNumSheets(coverSheetsData[printType][`${caseOption}Percent`], coverSheetsData[printType][`${caseOption}MakeReady`])
    } 
    if (caseOption === "Cloth") {
        coverPart = "Cloth"
        coverPress = "N/A"
      coverSheetSize = `640 x 970 </p><i class="fa-solid fa-circle-plus cover-change mb-3 ms-3"></i><p>` //ADD OPTIONS TO CHANGE
        calculatedCoverSheet = "640 x 970"
        let clothHeightCalc;
        let clothWidthCalc;
        if (calculatedCoverSheet === "640 x 970") {
            clothWidthCalc = 640;
            clothHeightCalc = 970;
        } else if (calculatedCoverSheet === "1020 x 760") {
            clothWidthCalc = 1020;
            clothHeightCalc = 760;
        } else if (calculatedCoverSheet === "1020 x 850") {
            clothWidthCalc = 1020;
            clothHeightCalc = 850;
        }
        coverNumUp = Math.floor((clothHeightCalc/(parseInt(trimHeight)+38))*(clothWidthCalc/((trimWidth*2)+spineWidth+40)))
        coverNumSheets = (quantity/coverNumUp) * 1.1
        coverExtras =  `Roll? </p><i class="fa-solid fa-circle-plus roll mb-3 ms-3"></i><p>` //ADD OPTION TO CALCULATE ROLL QTY TO ORDER
    }

}


let finalExtent;
let foursOn480 = false;
let checkIXSizes = ()=> {
    if (trimHeight <= 234 && trimWidth <= 156) {
        textSheetSize = "350x488"
        if (plates === 0) {
            textImp = "8pp-Fold"
            textNumUp = 1
            checkPagination(8)
        } else if (plates > 0) {
            textImp = "Cut-And-Stack-2pp"
            textNumUp = 4
            checkPagination(2)
        }               
        //TEXT NUM SHEETS???
    } else if (trimHeight <= 246 && trimWidth <= 174) {
        if (plates === 0) {
            textSheetSize= "384x268 or 364x256"
            textImp = "4pp-Fold"
            textNumUp = 1
            checkPagination(4)
        } else if (plates > 0) {
            textImp = "Cut-And-Stack-2pp"
            textNumUp = 2
            checkPagination(2)
        }    
    } else if (trimHeight <= 297 && trimWidth <= 210) {
        textImp = "Cut-And-Stack-2pp"
        textSheetSize = "350x488"
        textNumUp = 2
        checkPagination(2)
    }
}

let calculateText = ()=> {
    foursOn480 = false;
    if (printOption === "IX") {
        textPress = "IX Press"
    }
    if (colour === "mono") {
        textInk = "1/1"
        if (printOption==="litho") {
            textPress = "KBA1"
        }
        else if (printOption === "digital") {
            textPress = "Mono 8160"
        }
    } else if (colour === "colour") {
        textInk = "4/4"
        if (printOption==="litho") {
            textPress = "KBA3"
        }
        else if (printOption === "digital") {
            textPress = "Colour 8160"
        }
    }
    trimSize = `${trimHeight}mm x ${trimWidth}mm`
    if (printOption === "IX") {

        if (bindOption === "Sewn" || bindOption === "Saddle-Stitched") {
            textImp = "Cut-And-Stack-4pp"
            textSheetSize = "350x488"
            checkPagination(4)
            if (trimHeight <= 234 && trimWidth <= 156) {
                textNumUp = 2
            } else if (trimHeight <= 297 && trimWidth <= 210) {
                textNumUp = 1
            }
        } else if (bindOption === "PUR") {
            checkIXSizes()
        }
    }
    else if (printOption === "digital") {
        if (plates >0) {
            textPress = "IX Press"
            checkIXSizes()
        } else {
            textNumUp = 1
            if (trimWidth <= 156 && paper !== "TJ Matt") {
                textImp = "Digital-6pp"
                checkPagination(6)
                if (trimWidth <= 117) {
                    textSheetSize = "402 reel"
                } else if (trimWidth <= 143) {
                    textSheetSize = "480 reel"
                } else {
                    textSheetSize = "503 reel"
                }
            } else if (trimWidth <=235) {
                textImp = "Digital-4pp"
                checkPagination(4)
                if (trimWidth <= 185) {
                    textSheetSize = "402 reel"
                } else if (trimWidth <= 224) {
                    textSheetSize = "480 reel"
                    foursOn480 = true;
                } else {
                    textSheetSize = "503 reel"
                }
            } else {
                textImp = "Text-Seek Advice"
            }
        }

    } 
    else if (printOption === "litho") {
        let sizes = []
        let impStandardHeight = (parseInt(trimHeight)+6)*4
        let imp64Width = (parseInt(trimWidth)+3)*8
        let imp48Width = (parseInt(trimWidth)+3)*6
        let imp32Width = (parseInt(trimWidth)+3)*4
        let imp16Height = (parseInt(trimHeight)+3)*2
        sizes.push(impStandardHeight, imp64Width, impStandardHeight, imp48Width, impStandardHeight, imp32Width, imp16Height, imp32Width)
        for (let i=0; i<sizes.length; i+=2) {
            for (let item of lithoSheets[colour]) {
                if (sizes[i] <= item["height"] && sizes[i+1] <= item["width"]) {
                    let imp = [32, 24, 32, 16]
                    let numUp = [2,2,1,1]
                    let chosenImp = imp[i/2]
                    textNumUp = numUp[i/2]
                    textImp = `Text-${chosenImp}pp`
                    checkLithoPagination(chosenImp)
                    textSheetSize = `${item["height"]}mm x ${item["width"]}mm`
                    return
                }
                else {
                    textSheetSize = "Seek Advice"
                }
            }
        }

    }


}

let checkPagination = (sig)=> {
    if (extent%sig === 0) {
        finalExtent = extent
        console.log(extent)
    } else {
        finalExtent = parseInt(extent) + (sig-(extent%sig))
    } 
    if (printOption === "IX" && bindOption === "Sewn") {
        let additional = ""
        if (finalExtent%16 === 0) {
            textExtras = `Final Extent: ${finalExtent}pp <br> ${Math.floor(finalExtent/16)}x16pp`
        } else {
            if (finalExtent%16 === 4) {
                additional = `, 1x4pp, 1x16pp`
            } else if (finalExtent%16 === 8) {
                additional = `, 1x8pp, 1x16pp`
            } else if (finalExtent%16 === 12) {
                additional = `, 1x8pp, 1x4pp, 1x16pp`
            }
            textExtras = `Final Extent: ${finalExtent}pp <br> ${Math.floor((finalExtent/16)-1)}x16pp` + additional
        }       
    } else {
        textExtras = `Final Extent: ${finalExtent}pp <br> ${finalExtent/sig}x${sig}pp`
    } 
}
let checkLithoPagination = (chosenImp) => {
    oddment16 = false;
    oddment8 = false;
    if (extent%8 === 0) {
        finalExtent = extent
    } else {
        finalExtent = parseInt(extent) + (8-(extent%8))
    }
    if (finalExtent%chosenImp !== 0) {
        let extras = (finalExtent%chosenImp)/8
        if (extras === 3) {
            oddment16 = true;
            oddment8 = true;
        } else if (extras === 2) {
            oddment16 = true;
        } else if (extras ===1) {
            oddment8 = true;
        }
    } 
    if (chosenImp === 24) {
        oddment16NumUp = 3;
        oddment8NumUp = 6;
    } else {
        oddment16NumUp = 2*textNumUp;
        oddment8NumUp = 4*textNumUp;
    }
    textExtras = `Final Extent: ${finalExtent}pp <br> ${Math.floor(finalExtent/chosenImp)}x${chosenImp}pp`
}

let calculateEndpapers = ()=> {
    endpaperSize = `${parseInt(trimHeight)+6}mm x ${(trimWidth * 2)+6}mm`
    endpaperSheetSizePlain = `720 x 1020 </p><i class="fa-solid fa-circle-plus roll mb-3 ms-3"></i> <p>`
    endpaperNumUp = notApplicable
    endpaperNumSheets = notApplicable
}


let oddment16NumUp = "";
let oddment16NumSheets="";
let oddment8NumUp = "";
let oddment8NumSheets="";
let textExtras = "";
let textInfo = "";
let plateImp = "";
let platePress = "";
let plateSheetSize = "";
let plateNumUp = "";
let plateNumSheets = "";
let plateExtras = "";
let plateInfo = "";
let ixNumUp = "";
let mixMediaTextNumSheets = "";
let mixMediaPlateNumSheets = "";





//Still to calculate
let jacketExtras="";
let jacketInfo="";
let endpaperSize="";
let endpaperSheetSizePlain="";
let endpaperNumUp="";
let endpaperNumSheets="";
let endpaperExtras="";
let endpaperInfo="";
let coverExtras = "";
let coverInfo = "";
let textNumSheets = "";
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

let notApplicable = `<span class="n-a">N/A</span>`

//Check which items are needed based on book spec
let checkElementsRequired = ()=> {
    items = []
    calculateText()
    calcSpineWidth()
    coverCalc()
    document.querySelector(".append-results").innerHTML = ""
    if (caseOption === "PPC" && jacket === "yes" || caseOption === "Cloth" && jacket === "yes") {
        jacketCalc()
        //create rule, if there is foil/emboss/deboss/spotUV bleeds selected, create result for PPC Buyout
        createResult("Jacket", jacketPress, jacketInk, spineWidth, jacketSize, jacketSheetSize, jacketNumUp, jacketNumSheets, jacketExtras, jacketInfo)
        
    }   
    createResult(coverPart, coverPress, coverColour, spineWidth, coverSize, coverSheetSize, coverNumUp, coverNumSheets, coverExtras, coverInfo)
    
    if (caseOption === "Cloth" || caseOption === "PPC") {  
        greyboardCalc() 
        calculateEndpapers()   
        createResult("GreyBoard", notApplicable, notApplicable, notApplicable, greyboardSize, greyboardSheetSize, notApplicable, notApplicable, greyboardExtras, greyboardInfo)
        createResult("Endpapers", notApplicable, notApplicable, notApplicable, endpaperSize, endpaperSheetSizePlain, endpaperNumUp, endpaperNumSheets, endpaperExtras, endpaperInfo)
    
    }   
    createResult(textImp, textPress, textInk, notApplicable, trimSize, textSheetSize, textNumUp, textNumSheets, textExtras, textInfo)
    if (printOption==="litho" && oddment16) {
    createResult("Text-16pp", textPress, textInk, notApplicable, trimSize, textSheetSize, oddment16NumUp, oddment16NumSheets, "1x16pp", textInfo)
    }
    if (printOption==="litho" && oddment8) {
        createResult("Text-8pp", textPress, textInk, notApplicable, trimSize, textSheetSize, oddment8NumUp, oddment8NumSheets, "1x8pp", textInfo)
    }
    if (plates>0) {
        if (printOption === "litho") {
            createResult(plateImp, platePress, "4/4", notApplicable, trimSize, plateSheetSize, plateNumUp, plateNumSheets, plateExtras, plateInfo)
     
        } else {
            createResult("Mix-Media-Plate", "IX Press", "4/4", notApplicable, trimSize, "350x488", textNumUp, mixMediaPlateNumSheets, plateExtras, plateInfo)
        }
    }
}



//Submit button- calculate everything
document.querySelector("#submit").addEventListener("click", ()=> {     
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
    checkElementsRequired()
    console.log(items)
    addToggle(items)
    console.log(printOption, bindOption, colour, caseOption, plates, jacket, spineStyle, greyboardThickness, extent, quantity, trimHeight, trimWidth, paper, grammage, platePaper, plateGrammage, "pantone", pantone, pantoneCoverage, "foilFront", foilFront, foilFrontCoverage, "foilBack", foilBack, foilBackCoverage, "spotUV", spotUV, spotUVBleeds, "softtouch", softTouch, "headt", headTail, "ribbon", ribbon, "emboss", emboss)
})

//Create each Result row
const createResult = (part, partPress, partInk, partSpine, partSize, partSheetSize, partNumUp, partNumSheets, partExtras, partExtrasInfo, partInfo)=> {
    items.push(part)
    let newElement = document.createElement("div")
    newElement.classList.add("row")
    newElement.classList.add("results")
    newElement.classList.add("mt-3")
    newElement.innerHTML = `
    <div class="col col-lg-1">
    <p>${part}<i class="fa-solid fa-circle-plus ${part}-open mb-3 ms-3"></i></p>
</div>
<div class="col col-lg-1">
    <p>${partPress}</p>
</div>
<div class="col col-lg-1">
    <p>${partInk}</p>
</div>
<div class="col col-lg-1">
<p>${partSpine}</p>
</div>
<div class="col col-lg-2">
<p>${partSize}</p>
</div>
<div class="col col-lg-2">
<p class="coverSheet">${partSheetSize}</p>
</div>
<div class="col col-lg-1">
<p>${partNumUp}</p>
</div>
<div class="col col-lg-1">
<p>${partNumSheets}</p>
</div>
<div class="col col-lg-1">
<p>${partExtras}</p>
</div>
<div class="col col-lg-1">
<p>${partExtrasInfo}</p>
</div>
 
<div class="row hidden ${part}-hidden">
<div class="added-info col-lg-11 ms-auto">
<p>${partInfo}</p>
</div>
</div>
    `
    document.querySelector(".append-results").appendChild(newElement)
}


let addToggle = (arr)=> {
    for (let item of arr) {
        document.querySelector(`.${item}-open`).addEventListener("click", ()=> {
            console.log("clicked")
            document.querySelector(`.${item}-hidden`).classList.toggle("hidden")
        })
    }

}
