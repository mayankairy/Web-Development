console.log("hi using script")

// trailing slash problem, i am asked to remove .../sum/ -> .../sum
// still not working
async function sum(){
    const a=document.getElementById("first").value;
    const b=document.getElementById("second").value;

    const res=await fetch("http://localhost:3003/sum/", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            a:a,
            b:b
        })
    });
    const json=await res.json();
    document.getElementById("response").innerHTML=json.ans;
}

async function sub(){
    const a=document.getElementById("first").value;
    const b=document.getElementById("second").value;

    const res=await fetch("http://localhost:3003/sub/" ,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            a:a,
            b:b
        })
    })
    const json=await res.json();
    document.getElementById("response").innerHTML=json.ans;
}

async function multiply(){
    const a=document.getElementById("first").value;
    const b=document.getElementById("second").value;

    const res=await fetch("http://localhost:3003/multiply/" , {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            a:a,
            b:b
        })
    })
    const json=await res.json();
    document.getElementById("response").innerHTML=json.ans;
}

async function divide(){
    const a=document.getElementById("first").value;
    const b=document.getElementById("second").value;

    const res=await fetch("http://localhost:3003/divide/", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            a:a,
            b:b
        })
    })
    const json=await res.json();
    document.getElementById("response").innerHTML=json.ans;
}