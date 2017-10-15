// Don't change or delete this line! It waits until the DOM has loaded, then calls
// the start function. More info:
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', start)

function start () {
  bindEventListeners(document.getElementsByClassName('colourDisplay')[0].children)
  addColours(document.getElementsByClassName('colourDisplay')[0].children)
}

function bindEventListeners (circles) {
  for (var i = 0; i < circles.length; i++) {
    circles[i].addEventListener('contextmenu', changeFgColour) // right-mouse
    circles[i].addEventListener('click', changeBgColour) // left-mouse
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
  let colours = []
  let bsColour = ''
  let parts = ['0', '3', '6', '9', 'c', 'f']
  for (var i = 0; i < parts.length; i++) {
    for (var j = 0; j < parts.length; j++) {
      for (var k = 0; k < parts.length; k++) {
        bsColour = `#${parts[i]}${parts[j]}${parts[k]}`
        colours.push(bsColour)
      }
    }
  }
  for (var i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = colours[i]
    circles[i].setAttribute("data-tooltip", colours[i])
  }
  document.getElementsByClassName('mainHeading')[0].style.backgroundColor = colours[Math.floor(Math.random() * colours.length)]
  document.getElementsByClassName('mainHeading')[0].style.color = colours[Math.floor(Math.random() * colours.length)]
  updateCSS()
}

function changeFgColour (evt) {
  evt.preventDefault()
  document.getElementsByClassName('mainHeading')[0].style.color = this.style.backgroundColor
  updateCSS()
}

function changeBgColour (evt) {
  document.getElementsByClassName('mainHeading')[0].style.backgroundColor = this.style.backgroundColor
  updateCSS()
}

function updateCSS() {
  let bgColour = document.getElementsByClassName('mainHeading')[0].style.backgroundColor
  bgColour = colorToHex(bgColour)
  bgColour = shortHand(bgColour)
  let fgColour = document.getElementsByClassName('mainHeading')[0].style.color
  fgColour = colorToHex(fgColour)
  fgColour = shortHand(fgColour)
  cssString = `background-color: ${bgColour};<br>color: ${fgColour};`
  document.getElementById('css-link').innerHTML = cssString
}

// Source: https://haacked.com/archive/2009/12/29/convert-rgb-to-hex.aspx/
// Author: Dave Cook
function colorToHex(c) {
var m = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(c)
return m ? '#' + (1 << 24 | m[1] << 16 | m[2] << 8 | m[3]).toString(16).substr(1) : c
}

function shortHand(c) {
  // #99ccff -> #9cf
  return c[0] + c[1] + c[3] + c[5]
}
