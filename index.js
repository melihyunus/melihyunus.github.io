const eys=document.querySelectorAll(".key");
/*for(i=0;i<=keys.length-1;i++){
    console.log(keys[i]);
}*/
eys.forEach(a=>{
    document.getElementById("screen").innerHTML+=a.innerHTML;
})












eys.forEach(function(a){
    a.addEventListener("click",b=>{
        document.getElementById("screen").innerHTML+=a.innerHTML;

    })
})

