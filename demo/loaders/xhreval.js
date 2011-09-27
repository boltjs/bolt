var blob = document.getElementById("xhreval.file");
blob.innerHTML = "[passed] xhreval.js ran @ " + new Date().getTime();

// simulate some slow code 
new Array(10000).join("xx.xx").split(".").join("yy");
