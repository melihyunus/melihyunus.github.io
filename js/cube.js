const base = document.querySelector(".cube-base");
const cube = document.querySelector(".cube");
const move = document.querySelector(".move");

const sides = document.querySelectorAll(".side");

sides.forEach(element => {
    const mirror = document.createElement("div");
    mirror.classList.add("side", "mirror");
    mirror.style.backgroundColor = window.getComputedStyle(element).backgroundColor;
    mirror.innerHTML = element.innerHTML;
    element.appendChild(mirror);
});

let pointer = {
    _X:0, _Y:0, _rX: 0, _rY: 0,
    get X(){return(this._X)}, set X(value)
    {
        this._X = value; 
        document.getElementById("X").value = value;
        moveAt(this._X, this._Y);
    },
    get Y(){return(this._Y)}, set Y(value){
        this._Y = value; 
        document.getElementById("Y").value = value;
        moveAt(this._X, this._Y);
    },
    get rX(){return(this._rX)}, set rX(value){
        this._rX = value; 
        document.getElementById("rX").value = value;
        rotateAt(this._rX, this._rY);
    },
    get rY(){return(this._rY)}, set rY(value){
        this._rY = value; 
        document.getElementById("rY").value = value;
        rotateAt(this._rX, this._rY);
    }
};

pointer.X = 0;
pointer.Y = 0;

move.addEventListener("mousedown", function(e) {
    e.preventDefault();

    let startX = e.pageX, endX;
    let startY = e.pageY, endY;

    document.addEventListener("mousemove", onMouseMove);

    function onMouseMove(event) {
        endX = event.pageX - startX;
        endY = event.pageY - startY;
        startX = event.pageX;
        startY = event.pageY;
        pointer.X = pointer.X + endX;
        pointer.Y = pointer.Y + endY;

        document.onmouseup = function (e) {
            document.removeEventListener("mousemove", onMouseMove);
            document.onmouseup = null;
        }
    }
})
    
function moveAt(x, y) {
    base.style.left = x + "px";
    base.style.top = y + "px";
}

pointer.rX = -35;
pointer.rY = 45;
cube.style.transform = "rotateX(" + pointer.rX + "deg) rotateY(" + pointer.rY + "deg)";

cube.addEventListener("mousedown", function(e) {
    e.preventDefault();

    let startX = e.pageX, endX;
    let startY = e.pageY, endY;

    document.addEventListener("mousemove", onMouseMove);

    function onMouseMove(event) {
        endX = event.pageX - startX;
        endY = event.pageY - startY;
        startX = event.pageX;
        startY = event.pageY;
        pointer.rX -= endY / 4;
        pointer.rY += endX / 4;

        document.onmouseup = function (e) {
            document.removeEventListener("mousemove", onMouseMove);
            document.onmouseup = null;
        }
    }
})

function rotateAt(x, y){
    cube.style.transform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
}

const parameters = document.querySelectorAll(".parameters input");
parameters.forEach( el => {
    el.addEventListener("change", function(e){
        switch(el.id){
            case "X": 
                pointer.X = Number(el.value);
                break;          
            case "Y":
                pointer.Y = Number(el.value);
                break;
            case "rX": 
                pointer.rX = Number(el.value);
                break;
            case "rY":
                pointer.rY = Number(el.value);
                break;
        }
    })
});