let boxes = document.querySelectorAll(".box")
let msg = document.querySelector("#msg")
let msg2 = document.querySelector("#msg2")
let Disable = document.querySelectorAll(".disable")

let turnO=true ;

//ARRAYS (storage)

// console.log(boxes[0])
const winpatern = [
    [0 ,1 ,2],
    [0 ,3 ,6],
    [0 ,4 ,8],
    [1 ,4 ,7],
    [2 ,5 ,8],
    [2 ,4 ,6],
    [3 ,4 ,5],
    [6 ,7 ,8]
]

boxes.forEach((box) =>{
    box.addEventListener("click", ()=> {
    
        if(turnO===true)
        {
            box.innerText="O"
            turnO=false
        }else{
            box.innerText="X"
            turnO=true
        }
        box.disabled=true

        checkwinner();
        // checkwinner2();
    })
})

// const checkwinner2 = () => {
    
//     if(       
//         boxes[0].innerText===winpatern[0] && boxes[1].innerText===winpatern[1] && boxes[2].innerText===winpatern[2]  ||
//         boxes[0].innerText===winpatern[0] && boxes[3].innerText===winpatern[3] && boxes[6].innerText===winpatern[6]  ||
//         boxes[0].innerText===winpatern[0] && boxes[4].innerText===winpatern[4] && boxes[8].innerText===winpatern[8]  ||
//         boxes[1].innerText===winpatern[1] && boxes[4].innerText===winpatern[4] && boxes[7].innerText===winpatern[7]  ||
//         boxes[2].innerText===winpatern[2] && boxes[5].innerText===winpatern[5] && boxes[8].innerText===winpatern[8]  ||
//         boxes[2].innerText===winpatern[2] && boxes[4].innerText===winpatern[4] && boxes[6].innerText===winpatern[6]  ||
//         boxes[3].innerText===winpatern[3] && boxes[4].innerText===winpatern[4] && boxes[5].innerText===winpatern[5]  ||
//         boxes[6].innerText===winpatern[6] && boxes[7].innerText===winpatern[7] && boxes[8].innerText===winpatern[8] 
//      ){
//         console.log("winner")
//      }
// }



const checkwinner = () => {                         
    for(patern of winpatern)
    {
        let pos1 = boxes[patern[0]].innerText
        let pos2 = boxes[patern[1]].innerText
        let pos3 = boxes[patern[2]].innerText
        
        if(pos1 !== "" && pos2 !== "" && pos3 !== ""){
            if(pos1===pos2 && pos2===pos3)
            {
                console.log("winner",pos1)
                // disable();
                showwinner(pos1);

            }else{
                checkdraw();
            }
            }
        }
    }

const checkdraw = () =>{
        if(
            boxes[0].innerText!=="" &&
            boxes[1].innerText!=="" &&
            boxes[2].innerText!=="" &&
            boxes[3].innerText!=="" &&
            boxes[4].innerText!=="" &&
            boxes[5].innerText!=="" &&
            boxes[6].innerText!=="" &&
            boxes[7].innerText!=="" &&
            boxes[8].innerText!=="" &&
            boxes[9]!=="" 
        )
        {
                showwdraw();
                console.log("Match Draw")   
        }
}

// const disable = () => {
//     let pos1 = boxes[patern[0]].innerText
//     let pos2 = boxes[patern[1]].innerText
//     let pos3 = boxes[patern[2]].innerText

//         if(pos1==="" && pos2==="" && pos3===""){
//             console.log("empty")
//         }
// }



const showwinner = (winner) => {
    msg.innerText=`Winner ${winner}`
    msg.classList.remove("hide")
};

const showwdraw = () => {
    msg2.classList.remove("hide")   
}
