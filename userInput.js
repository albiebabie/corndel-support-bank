const Readline = require("readline-sync");

function getStringWithPrompt(prompt) {
    console.log(`\n${prompt}`);
    return Readline.prompt();
}

exports.getNumberWithPrompt = function(prompt) {
    let response;
    do {
        response = +getStringWithPrompt(prompt);
    } while (isNaN(response));
    return response;
};

exports.getStringWithPrompt = getStringWithPrompt;
