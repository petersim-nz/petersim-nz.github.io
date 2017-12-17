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
  // const COLOURS = [ 'black', 'navy', 'darkblue', 'mediumblue', 'blue', 'darkgreen', 'green', 'teal', 'darkcyan', 'deepskyblue', 'darkturquoise', 'mediumspringgreen', 'lime', 'springgreen', 'aqua', 'cyan', 'midnightblue', 'dodgerblue', 'lightseagreen', 'forestgreen', 'seagreen', 'darkslategray', 'darkslategrey', 'limegreen', 'mediumseagreen', 'turquoise', 'royalblue', 'steelblue', 'darkslateblue', 'mediumturquoise', 'indigo', 'darkolivegreen', 'cadetblue', 'cornflowerblue', 'rebeccapurple', 'mediumaquamarine', 'dimgray', 'dimgrey', 'slateblue', 'olivedrab', 'slategray', 'slategrey', 'lightslategray', 'lightslategrey', 'mediumslateblue', 'lawngreen', 'chartreuse', 'aquamarine', 'maroon', 'purple', 'olive', 'gray', 'grey', 'skyblue', 'lightskyblue', 'blueviolet', 'darkred', 'darkmagenta', 'saddlebrown', 'darkseagreen', 'lightgreen', 'mediumpurple', 'darkviolet', 'palegreen', 'darkorchid', 'yellowgreen', 'sienna', 'brown', 'darkgray', 'darkgrey', 'lightblue', 'greenyellow', 'paleturquoise', 'lightsteelblue', 'powderblue', 'firebrick', 'darkgoldenrod', 'mediumorchid', 'rosybrown', 'darkkhaki', 'silver', 'mediumvioletred', 'indianred', 'peru', 'chocolate', 'tan', 'lightgray', 'lightgrey', 'thistle', 'orchid', 'goldenrod', 'palevioletred', 'crimson', 'gainsboro', 'plum', 'burlywood', 'lightcyan', 'lavender', 'darksalmon', 'violet', 'palegoldenrod', 'lightcoral', 'khaki', 'aliceblue', 'honeydew', 'azure', 'sandybrown', 'wheat', 'beige', 'whitesmoke', 'mintcream', 'ghostwhite', 'salmon', 'antiquewhite', 'linen', 'lightgoldenrodyellow', 'oldlace', 'red', 'fuchsia', 'magenta', 'deeppink', 'orangered', 'tomato', 'hotpink', 'coral', 'darkorange', 'lightsalmon', 'orange', 'lightpink', 'pink', 'gold', 'peachpuff', 'navajowhite', 'moccasin', 'bisque', 'mistyrose', 'blanchedalmond', 'papayawhip', 'lavenderblush', 'seashell', 'cornsilk', 'lemonchiffon', 'floralwhite', 'snow', 'yellow', 'lightyellow', 'ivory', 'white' ]
  const COLOURS = [ 'pink', 'lightpink', 'hotpink', 'deeppink', 'palevioletred', 'mediumvioletred', 'lightsalmon', 'salmon', 'darksalmon', 'lightcoral', 'indianred', 'crimson', 'firebrick', 'darkred', 'red', 'orangered', 'tomato', 'coral', 'darkorange', 'orange', 'yellow', 'lightyellow', 'lemonchiffon', 'lightgoldenrodyellow', 'papayawhip', 'moccasin', 'peachpuff', 'palegoldenrod', 'khaki', 'darkkhaki', 'gold', 'cornsilk', 'blanchedalmond', 'bisque', 'navajowhite', 'wheat', 'burlywood', 'tan', 'rosybrown', 'sandybrown', 'goldenrod', 'darkgoldenrod', 'peru', 'chocolate', 'saddlebrown', 'sienna', 'brown', 'maroon', 'darkolivegreen', 'olive', 'olivedrab', 'yellowgreen', 'limegreen', 'lime', 'lawngreen', 'chartreuse', 'greenyellow', 'springgreen', 'mediumspringgreen', 'lightgreen', 'palegreen', 'darkseagreen', 'mediumaquamarine', 'mediumseagreen', 'seagreen', 'forestgreen', 'green', 'darkgreen', 'aqua', 'cyan', 'lightcyan', 'paleturquoise', 'aquamarine', 'turquoise', 'mediumturquoise', 'darkturquoise', 'lightseagreen', 'cadetblue', 'darkcyan', 'teal', 'lightsteelblue', 'powderblue', 'lightblue', 'skyblue', 'lightskyblue', 'deepskyblue', 'dodgerblue', 'cornflowerblue', 'steelblue', 'royalblue', 'blue', 'mediumblue', 'darkblue', 'navy', 'midnightblue', 'lavender', 'thistle', 'plum', 'violet', 'orchid', 'fuchsia', 'magenta', 'mediumorchid', 'mediumpurple', 'blueviolet', 'darkviolet', 'darkorchid', 'darkmagenta', 'purple', 'indigo', 'darkslateblue', 'rebeccapurple', 'slateblue', 'mediumslateblue', 'white', 'snow', 'honeydew', 'mintcream', 'azure', 'aliceblue', 'ghostwhite', 'whitesmoke', 'seashell', 'beige', 'oldlace', 'floralwhite', 'ivory', 'antiquewhite', 'linen', 'lavenderblush', 'mistyrose', 'gainsboro', 'lightgray', 'lightgrey', 'silver', 'darkgray', 'darkgrey', 'gray', 'grey', 'dimgray', 'dimgrey', 'lightslategray', 'lightslategrey', 'slategray', 'slategrey', 'darkslategray', 'darkslategrey', 'black' ]
  for (var i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = COLOURS[i]
    circles[i].setAttribute("data-tooltip", COLOURS[i])
  }
  document.getElementsByClassName('mainHeading')[0].style.backgroundColor = COLOURS[Math.floor(Math.random() * COLOURS.length)]
  document.getElementsByClassName('mainHeading')[0].style.color = COLOURS[Math.floor(Math.random() * COLOURS.length)]
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
  let fgColour = document.getElementsByClassName('mainHeading')[0].style.color
  cssString = `background-color: ${bgColour};<br>color: ${fgColour};`
  document.getElementById('css-link').innerHTML = cssString
}
