// Countdown Clock for Banseljaj
//


function utc(year, month, day, hours, minutes, seconds, milliseconds) {
    // JS counts the months from 0...
    return new Date(Date.UTC(year, month - 1, day || 1,
                             hours || 0, minutes || 0, seconds || 0, milliseconds || 0));
}

var EVENTS = [
    {name: "Takeoff!", time: utc(2014, 10, 20, 2, 30)},
    {name: "Landing...", time: utc(2014, 10, 21, 3, 40)},
    {name: "Party at djanatyn's place!", time: utc(2014, 10, 22, 4, 0)},
];
EVENTS.sort(function(e1, e2) {
    return e1.time.getTime() - e2.time.getTime();
});

function unixTimeNow() {
    return new Date().getTime();
}

function getNextEvent() {
    var currentUnixTime = unixTimeNow();

    for (var i = 0; i < EVENTS.length; ++i) {
        var event = EVENTS[i];
        if (event.time > currentUnixTime) {
            return event;
        }
    }
    return null;
}


$(document).ready(function() {
    var clock = $('.countdown-timer').FlipClock({
        autoStart: false,
        countdown: true
    });

    function updateClock() {
        var nextEvent = getNextEvent();
        console.log(nextEvent);
        if (nextEvent) {
            clock.setTime(nextEvent.time.getTime() - unixTimeNow());
        } else {
            clock.stop();
            alert("BANSELJAJ IS HERE!");
        }
    }

    updateClock();
    clock.start(updateClock);
});
