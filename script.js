const URL = "https://sponsor.ajay.app/api/getTotalStats";
const target = 1000000;

let firstSubmissionCount = null;
let firstCountTime = null;

const submissionsElem = document.getElementById("submissions");
const rateElem = document.getElementById("rate");
const etaElem = document.getElementById("eta");

function updateData(result) {
    if (result && result.totalSubmissions){
        submissionsElem.innerText = result.totalSubmissions;

        if (firstSubmissionCount === null) {
            firstSubmissionCount = result.totalSubmissions;
            firstCountTime = Date.now();
        } else if (firstSubmissionCount !== result.totalSubmissions) {
            // Per minute
            const submissionDifference = result.totalSubmissions - firstSubmissionCount;
            const timePassed = Date.now() - firstCountTime;
            const rpm = submissionDifference / (timePassed / 60000);
            rateElem.innerText = rpm;

            // In hours
            const eta =  (target - result.totalSubmissions) / (rpm * 60);
            etaElem.innerText = eta;

            if (result.totalSubmission >= 1000000 && !confetti.isRunning()) confetti.start(); 
        }
    }

    setTimeout(async () => {
        (await fetch(URL)).json().then(updateData);
    }, 500);
}

updateData();