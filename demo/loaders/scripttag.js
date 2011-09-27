var blob = document.getElementById("scripttag.file");
blob.innerHTML = "[passed] scripttag.js ran @ " + new Date().getTime();

// simulate some slow code 
new Array(10000).join("xx.xx").split(".").join("yy");

