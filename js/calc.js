const keys = document.querySelectorAll("button");
const div_operation = document.getElementById("operation");
const div_number = document.getElementById("number");

let operation = {
    _number: "",
    _operation: "",

    get number(){ return this._number}, set number(value){ 
        this._number = value; 
        div_number.innerText = value
    },
    get operation(){ return this._operation}, set operation(value){
        this._operation = value; 
        div_operation.innerText = value
    },
}

keys.forEach(el => {
    el.addEventListener("click", function(e){
        e.preventDefault();
        const key = e.target.value;

        switch(el.className){
            case "number":
                //div_operation.innerText = operation.operation;
                operation.number += key;
                break;
            
            case "decimal":
                if(operation.number.indexOf(".") < 0){
                    if(operation.number == "") operation.number = 0 + key;
                    else operation.number += key;
                }
                break;

            case "operator":
                if(operation.number == ""){
                    if(operation.operation !== ""){
                        operation.operation = operation.operation.substring(0, operation.operation.length - 1) + key;
                    }
                }
                else{
                    operation.operation = operation.operation + operation.number + key;
                    operation._number = "";                    
                }
                break;

            case "eval":
                operation.operation += operation.number;
                operation.number = eval(operation.operation);
                operation._number = "";
                operation._operation = "";
                break;
        }
    });
});

