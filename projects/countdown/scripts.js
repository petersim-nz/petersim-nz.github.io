/*
** Countdown Timer
** Programmer: Peter Sim
** (with inspiration from Yaphi Berhanu:
**  https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/)
** December, 2017
*/

// Wait until the DOM has loaded, then call the start function.
document.addEventListener('DOMContentLoaded', start)

function start () {
  const targetTime = 'January 8 2018 08:30:00 GMT+1300'
  initTimer('countdown', targetTime)
}

function calcTimeLeft(untilTarget) {
  let timeLeft = Date.parse(untilTarget) - Date.parse(new Date())
  let seconds = Math.floor((timeLeft / 1000) % 60)
  let minutes = Math.floor((timeLeft / 1000 / 60) % 60)
  let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
  let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  // return times values as an object
  return {
    'total': timeLeft,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  }
}

function initTimer(id, endTime) {
  let timer = document.getElementById(id)
  let daysSpan = timer.querySelector('.days')
  let hoursSpan = timer.querySelector('.hours')
  let minutesSpan = timer.querySelector('.minutes')
  let secondsSpan = timer.querySelector('.seconds')

  function updateTimer() {
    let theTime = calcTimeLeft(endTime)
    daysSpan.innerHTML = theTime.days
    hoursSpan.innerHTML = ('0' + theTime.hours).slice(-2)
    minutesSpan.innerHTML = ('0' + theTime.minutes).slice(-2)
    secondsSpan.innerHTML = ('0' + theTime.seconds).slice(-2)

    if (theTime.total <= 0) {
      clearInterval(timeInterval)
    }
  }

  updateTimer()
  // call updateTimer() once per second
  let timeInterval = setInterval(updateTimer, 1000)
}

let goBack = function goBack(fallback) {
    let useFallback = true

    window.addEventListener('beforeunload', function() {
      useFallback = false
    })

    window.history.back()

    setTimeout(function() {
        if (useFallback) { window.location.href = fallback }
    }, 100) 
}
