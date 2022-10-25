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



let bindOptions = {
    "litho": ["Notched", "Sewn"],
    "digital": ["P/Bound"],
    "IX": ["PUR", "Sewn", "Saddle-Stitched"]
};
document.querySelector("#print-method").addEventListener("click", (e)=> {
    document.querySelector("#bind-method").innerHTML = "<option selected disabled>Bind Method</option>"
        for (item of bindOptions[document.querySelector("#print-method").value]) {
        let newOption = document.createElement("option")
        newOption.value = item;
        newOption.innerHTML = item;
        document.querySelector("#bind-method").appendChild(newOption)
        } 
    document.querySelector("#paper-type").innerHTML = "<option selected disabled>Paper Type</option>"
    for (item of paperOptions[document.querySelector("#print-method").value]) {
        let newOption = document.createElement("option")
        newOption.value = item[0]
        newOption.innerHTML = item[0]
        document.querySelector("#paper-type").appendChild(newOption)
    }

})

document.querySelector("#paper-type").addEventListener("click", (e)=> {
    document.querySelector("#grammage").innerHTML = "<option selected disabled>Grammage</option>"
    for (let i=1; i<paperOptions[document.querySelector("#print-method").value][e.target.options.selectedIndex-1].length; i++) {
        let newOption = document.createElement("option")
        newOption.value = paperOptions[document.querySelector("#print-method").value][e.target.options.selectedIndex-1][i]
        newOption.innerHTML = paperOptions[document.querySelector("#print-method").value][e.target.options.selectedIndex-1][i]
        document.querySelector("#grammage").appendChild(newOption);
    }

})

let paperOptions = {
    "litho": [
        ["Munken Premium Cream", 80, 90], 
        ["Munken Premium White", 80, 90],
        ["TJ Mechanical Cream", 60, 70],
        ["TJ Uncoated", 80, 90, 100, 120],
        ["TJ Gloss", 90, 115, 130, 150],
        ["TJ Matt", 70, 80, 90, 115, 130],
        ["TJ Silk", 90, 100, 115, 130, 150, 170],
        ["Munken Pure", 80, 100, 120, 150],
        ["TJ Mechanical White", 70],
        ["TJ Preprint", 70],
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
        ["Munken Lynx", 120, 150]
        ["Munken Pure", 80, 100, 120, 150],
    ],
    "plates": [
        ["TJ Gloss", 90, 115, 130, 150],
        ["TJ Matt", 70, 80, 90, 115, 130],
        ["TJ Silk", 90, 100, 115, 130, 150, 170],
    ]
}


let caseOptions = ["none", "4pp", "8pp", "ppc", "cloth"]
document.querySelector("#case-style").addEventListener("click", (e)=> {
    if (document.querySelector("#case-style").value === "4pp" || document.querySelector("#case-style").value === "8pp") {
        console.log(document.querySelector(".plate-option"))
        document.querySelector(".plate-option").style.display = "inline"
        document.querySelector(".plate-extent").style.display = "none"
        document.querySelector(".cased-options").style.display = "none"
    }
    else if (document.querySelector("#case-style").value === "PPC") {
        document.querySelector(".plate-option").style.display = "inline"
        document.querySelector(".plate-extent").style.display = "none"
        document.querySelector(".cased-options").style.display = "inline"
        document.querySelector("#jackets").value = "no"
        
    }
    else if (document.querySelector("#case-style").value === "Cloth") {
        document.querySelector(".plate-option").style.display = "inline"
        document.querySelector(".cased-options").style.display = "inline"
        document.querySelector(".plate-extent").style.display = "none"
        document.querySelector("#jackets").value = "yes"
    }
    else {
        document.querySelector(".plate-option").style.display = "none"
        document.querySelector(".cased-options").style.display = "none"
    }

})

document.querySelector("#plates").addEventListener("click", ()=> {
    if (document.querySelector("#plates").value === "yes") {
        document.querySelector(".plate-extent").style.display = "block"
        for (let i=0; i<paperOptions["plates"].length; i++) {
            let newOption = document.createElement("option")
            newOption.value = paperOptions["plates"][i][0]
            newOption.innerHTML = paperOptions["plates"][i][0]
            document.querySelector("#plate-paper").appendChild(newOption)
        }  
    }
    else {
        document.querySelector(".plate-extent").style.display = "none"
    }
})

document.querySelector("#plate-paper").addEventListener("click", (e)=> {
    document.querySelector("#plate-grammage").innerHTML = "<option selected disabled>Gsm</option>"
    for (let i=1; i<paperOptions["plates"][e.target.options.selectedIndex-1].length; i++) {
        let newOption = document.createElement("option")
        newOption.value = paperOptions["plates"][e.target.options.selectedIndex-1][i]
        newOption.innerHTML = paperOptions["plates"][e.target.options.selectedIndex-1][i]
        document.querySelector("#plate-grammage").appendChild(newOption);
    }
})

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
    
    console.log(printOption, bindOption, colour, caseOption, plates, jacket, spineStyle, greyboardThickness, extent, quantity, trimHeight, trimWidth, paper, grammage, platePaper, plateGrammage)
})












const greyBoardStock = {
    "1.9": {
        "204 x 125": "E19005",
        "222 x 134": "E19009",
        "216 x 144": "E190011",
        "234 x 148": "E190013",
        "235 x 152": "E190013 - Remove 1mm From Head Trim",
        "240 x 152": "E190014",
        "252 x 185": "E190017",
        "222 x 131": "E190018",
        "250 x 166": "E190019",
        "259 x 173": "E190020",
        "303 x 206": "E190028",
        "252 x 170": "S190020",
        "240 x 150": "S190070",
    },
    "2.5": {
        "222 x 134": "E250018",
        "240 x 152": "E250019",
    },
    "2.75": {
        "240 x 152": "E27506"
    }
}


