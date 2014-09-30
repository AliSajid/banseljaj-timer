// Countdown Clock for Banseljaj
//


function utc(year, month, day, hours, minutes, seconds, milliseconds) {
    // JS counts the months from 0...
    return new Date(Date.UTC(year, month - 1, day || 1,
                             hours || 0, minutes || 0, seconds || 0, milliseconds || 0));
}

var EVENTS = [
    {name: "banseljaj boards his plane", time: utc(2014, 10, 23, 22, 40)},
    {name: "banseljaj lands in San Francisco", time: utc(2014, 10, 25, 15, 50)},
    {name: "banseljaj boards his return plane", time: utc(2014, 12, 1, 20, 25)},
    {name: "banseljaj lands in Islamabad", time: utc(2014, 12, 2, 20, 0)},
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
        clockFace: 'DailyCounter',
        countdown: true
    });

    function updateClock() {
        var nextEvent = getNextEvent();
        if (nextEvent) {
            var time = nextEvent.time.getTime() - unixTimeNow();
            clock.setTime(time / 1000); // round to nearest second
            $('.next-event').text(nextEvent.name);
        } else {
            clock.stop();
            alert("BANSELJAJ IS HERE!");
        }
    }

    updateClock();
    clock.start(updateClock);
});
