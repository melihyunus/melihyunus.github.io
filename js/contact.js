const mailform = document.querySelector("form");

mailform.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());

    e.target.querySelector("input[type='submit']").value = "Sending";
    e.target.querySelector(".button").style["pointer-events"] = "none";

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "https://node.melihyunus.com.tr/contact", false); 
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.onreadystatechange = function() {
        if(this.readyState === XMLHttpRequest.DONE){
            if (this.status == 200){
                reset();
                e.target.querySelector(".statusMessage").style.color = "aquamarine";
                e.target.querySelector(".statusMessage").innerHTML = "Mesajınız gönderildi.";
            }
            else {
                errors(JSON.parse(this.responseText));
                if(this.status != 400) {
                    e.target.querySelector(".statusMessage").style.color = "red";
                    e.target.querySelector(".statusMessage").innerHTML = "Teknik bir aksaklık nedeniyle mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyiniz.";
                }
            }           
        }

        e.target.querySelector("input[type='submit']").value = "Send";
        e.target.querySelector(".button").style["pointer-events"] = "auto";
    };
    try{
        xmlHttp.send(JSON.stringify(value));        
    }
    catch(err){
        e.target.querySelector("input[type='submit']").value = "Send";
        e.target.querySelector(".button").style["pointer-events"] = "auto";
        e.target.querySelector(".statusMessage").style.color = "red";
        e.target.querySelector(".statusMessage").innerHTML = err;
    }
})

function errors(errList){
    document.querySelectorAll("form .field").forEach( el => {
        if(errList.indexOf(el.name) > -1){
            document.querySelector(".field[name='" + el.name + "']~span").innerHTML = "!";
        }
        else{
            document.querySelector(".field[name='" + el.name + "']~span").innerHTML = "";
        }
    });
    document.querySelector(".statusMessage").style.color = "red";
    document.querySelector(".statusMessage").innerHTML = "Lütfen formdaki alanşları uygun şekilde doldurunuz.";
}

function reset(){
    document.querySelector("form").reset();
    document.querySelectorAll("form>div>span").forEach( el => {

            el.innerHTML = "";
    });
}

function mailControl(mail){
    const errlist = [];
    if(mail.name === "" || mail.name.length < 3) errlist.push("name");
    if(mail.email === "" || mail.email.length < 3) errlist.push("email");
    if(mail.subject === "" || mail.subject.length < 3) errlist.push("subject");
    if(mail.message === "" || mail.message.length < 3) errlist.push("message");
    return errlist;
}
