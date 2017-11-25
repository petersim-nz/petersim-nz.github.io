// Don't change or delete this line! It waits until the DOM has loaded, then calls
// the start function. More info:
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', start)

function start () {
  bindEventListeners(document.getElementsByClassName('colourDisplay')[0].children)
  let colourList = document.getElementById('colours')
  colourList.selectedIndex = Math.floor(Math.random() * colourList.length)
  addColours(document.getElementsByClassName('colourDisplay')[0].children)
}

function bindEventListeners (circles) {
  for (var i = 0; i < circles.length; i++) {
    circles[i].addEventListener('click', seeColourProps) // left-mouse
  }
}

function drawCircles(howMany) {
  document.write('<div class="colourDisplay">')
  for (let i = 0; i < howMany; i++) {
    document.write('<div></div>')
  }
  document.write('</div>')
}

function addColours(circles) {
  let curColour = document.getElementById('colours').value
  let colours = []
  if (curColour === 'light' || curColour === 'dark') {
    colours = randomColor({
      count: circles.length,
      luminosity: curColour
      })
    } else if (curColour === 'random') {
      colours = randomColor({
        count: circles.length,
        hue: curColour,
        luminosity: curColour
      })
    } else {
      colours = randomColor({
      count: circles.length,
      hue: curColour
    })
  }
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = colours[i]
    circles[i].setAttribute("data-tooltip", colours[i])
  }
  document.getElementsByClassName('mainHeading')[0].innerText = 'Random ' + curColour + 's'
}

function newColours() {
  addColours(document.getElementsByClassName('colourDisplay')[0].children)
}

function seeColourProps() {
  let myColour = tinycolor(this.style.backgroundColor)
  sessionStorage.setItem('myRandomColour', myColour.toHexString())
  window.location = 'index2.html'
}
