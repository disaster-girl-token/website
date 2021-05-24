// Set the date we're counting down to
var t1 = new Date("May 26, 2021 00:00:00").getTime();
var t2 = new Date("Jun 06, 2021 00:00:00").getTime();
var days, hours, minutes, seconds;

function timeTo(countDownDate) {
    // Update the count down every 1 second


    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    return [distance, days, hours, minutes, seconds]
}

function presaleCountdown(start, stop) {
    var timeST, timeSP;
    var x = setInterval(function () {
        timeST = timeTo(start);
        days = timeST[1];
        hours = timeST[2];
        minutes = timeST[3];
        seconds = timeST[4];
        if (timeST[0] < 0) {
            var btn = document.getElementById("buy-btn")
            var y = setInterval(function () {
                timeSP = timeTo(stop);
                days = timeSP[1];
                hours = timeSP[2];
                minutes = timeSP[3];
                seconds = timeSP[4];
                if (timeSP[0] < 0) {
                    btn.innerHTML = "Presale ended!";
                    //console.log("Ended");
                    btn.disabled = true;
                    document.getElementById("countdown").innerHTML = "Presale ends in 0d 0h 0m 0s";
                } else {
                    btn.innerHTML = "Buy now!"
                    //console.log("Running");
                    btn.disabled = false;
                    document.getElementById("countdown").innerHTML = "Presale ends in " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
                }
            }, 1000);
        } else {
            //console.log("Starting");
            document.getElementById("countdown").innerHTML = "Presale starts in " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        }
    }, 1000);
}

presaleCountdown(t1, t2)