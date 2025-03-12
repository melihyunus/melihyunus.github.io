const mailform = document.querySelector("form");

mailform.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/contact", false); // false for synchronous request
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.onreadystatechange = function() {
        const res = document.querySelector(".response");

        if(this.readyState == 4){
            if (this.status == 200){
                e.target.style.display = "none";
                const resText = document.querySelector(".okMessage");
                e.target.reset();
                res.style.display = "flex";
                resText.innerHTML = "<h3>Mesajınız gönderildi. En kısa süre içerisinde size dönüş yapacağım.</h3>";                    
            }
            else {
                const resText = document.querySelector(".statusMessage");
                var errList = JSON.parse(this.responseText);
                resText.style.color = "red";
                errors(errList);
                if(this.status == 400) {
                    resText.innerHTML = "Lütfen bütün alanları uygun şekilde doldurunuz!";
                }
                else {
                    resText.innerHTML = "Teknik bir aksaklık nedeniyle mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyiniz.";
                }
            }           
        }
    };
    xmlHttp.send(JSON.stringify(value));
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
}