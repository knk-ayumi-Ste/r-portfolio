// References to DOM Elements
const firstBtn = document.querySelector("#first-btn");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const endBtn = document.querySelector("#end-btn");
const main = document.querySelector("#main")

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

// Event Listener
firstBtn.addEventListener("click",goFirstPage);
prevBtn.addEventListener("click",goPrevPage);
nextBtn.addEventListener("click",goNextPage);
endBtn.addEventListener("click",goEndPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = 3; //paperの総数
let maxLocation = numOfPapers + 1;

function openBook() {

}

function closeBook() {

}


function goFirstPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                closeBook();
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                break;
            case 3:
                closeBook();
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                break;
            case 4:
                closeBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation = 1;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                closeBook();
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                break;
            case 3:
                closeBook();
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                break;
            case 4:
                closeBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;
                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation--;
    }
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                openBook();
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                openBook();
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                break;
            default:
                throw new Error("unknown state")
        }
        currentLocation++;
    }
}

function goEndPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                break;
            case 2:
                openBook();
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                break;
            case 3:
                openBook();
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation = maxLocation;
    }
}