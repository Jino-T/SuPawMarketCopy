console.log("Running React");

const line1DataRoute = document.getElementById("line1Data").value;
const line2DataRoute = document.getElementById("line2Data").value;
const cityDataRoute = document.getElementById("cityData").value;
const stateDataRoute = document.getElementById("stateData").value;
const zipDataRoute = document.getElementById("zipData").value;
let line1; 
let line2;
let City;
let State;
let Zip;

async function getLine1() {
    let res = await fetch(line1DataRoute);
    line1 = await res.json();
    return line1;
}

async function getLine2() {
    let res = await fetch(line2DataRoute);
    line2 = await res.json();
    return line2;
}

async function getCity() {
    let res = await fetch(cityDataRoute);
    City = await res.json();
    return City;
}

async function getState() {
    let res = await fetch(stateDataRoute);
    State = await res.json();
    return State;
}

async function getZip() {
    let res = await fetch(zipDataRoute);
    Zip = await res.json();
    return Zip;
}

// getLine1();
// getLine2();
// getCity();
// getState();
// getZip();


window.onload = async function() {
    document.getElementById("address").value = await getLine1();
    document.getElementById("address2").value = await getLine2();
    document.getElementById("city").value = await getCity();
    document.getElementById("state").value = await getState();
    document.getElementById("zip").value = await getZip();
}
