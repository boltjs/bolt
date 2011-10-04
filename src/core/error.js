exports.die = function (code, message) {
    console.error("error: " + message + "\n");
    process.exit(code);
};
