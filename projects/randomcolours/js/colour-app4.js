// Don't change or delete this line! It waits until the DOM has loaded, then calls
// the start function. More info:
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', start)

function start () {
  let myColour = sessionStorage.getItem('myRandomColour')
  document.title = 'Colour Details for ' + myColour
  document.getElementsByClassName('mainHeading')[0].innerText = `All about ${myColour}`
  txtColour = tinycolor.mostReadable(myColour, ['#000000', '#ffffff']).toHexString()
  document.body.style.backgroundColor = myColour
  document.body.style.color = txtColour
  document.getElementsByClassName('mainHeading')[0].style.color = txtColour
  if (txtColour === '#ffffff') {
    document.getElementsByClassName('mainHeading')[0].style.textShadow = '2pt 2pt 1pt #000000'
    let rows = document.getElementsByClassName('pal')
    for (let i = 0; i < rows.length; i++) {
      rows[i].style.color = '#000'
    }
  }
  showProperties(myColour)
  addPalettes(myColour)
  let clipboard = new Clipboard('.btn')
  clipboard.on('success', function(e) {
    e.clearSelection()
    showTooltip(e.trigger, 'Copied!')
    clearTooltip(e.trigger)
  })

  clipboard.on('error', function(e) {
    e.clearSelection()
    console.log(e.trigger, 'Failed!')
  })
  addClipEvents()
}

function showProperties(someColour) {
  let tiny = tinycolor(someColour)
  document.getElementById('colourName').value = tiny.toString('name')
  document.getElementById('rgb').value = tiny.toString('rgb')
  document.getElementById('rgbp').value = tiny.toString('prgb')
  document.getElementById('hsv').value = tiny.toString('hsv')
  document.getElementById('hsl').value = tiny.toString('hsl')
}

function addPalettes(someColour) {
  let tiny = tinycolor(someColour)
  addMonochromatic(tiny)
  addAnalogous(tiny)
  addComplementary(tiny)
  addSplitComplementary(tiny)
  addTriadic(tiny)
  addTetradic(tiny)
}

function addMonochromatic(myColour) {
  let monochromaticColours = tinycolor(myColour).monochromatic()
  monochromaticColours = monochromaticColours.map(function(t) { return t.toHexString() })
  monochromaticColours.sort()
  let circles = document.getElementsByClassName('mono')[0].children
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = monochromaticColours[i]
    circles[i].setAttribute('title', monochromaticColours[i])
  }
  document.getElementById('mono').setAttribute('data-clipboard-text', monochromaticColours.join(', '))
}

function addAnalogous(myColour) {
  let analogousColours = tinycolor(myColour).analogous()
  analogousColours = analogousColours.map(function(t) { return t.toHexString() })
  analogousColours.sort()
  let circles = document.getElementsByClassName('analogous')[0].children
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = analogousColours[i]
    circles[i].setAttribute('title', analogousColours[i])
  }
  document.getElementById('analogous').setAttribute('data-clipboard-text', analogousColours.join(', '))
}

function addComplementary(myColour) {
  let complementaryColours = []
  complementaryColours.push(tinycolor(myColour).toString())
  complementaryColours.push(tinycolor(myColour).complement().toHexString())
  let circles = document.getElementsByClassName('complementary')[0].children
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = complementaryColours[i]
    circles[i].setAttribute('title', complementaryColours[i])
  }
  document.getElementById('complementary').setAttribute('data-clipboard-text', complementaryColours.join(', '))
}

function addSplitComplementary(myColour) {
  let splitComplementaryColours = tinycolor(myColour).splitcomplement()
  splitComplementaryColours = splitComplementaryColours.map(function(t) { return t.toHexString() })
  let circles = document.getElementsByClassName('splitComplementary')[0].children
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = splitComplementaryColours[i]
    circles[i].setAttribute('title', splitComplementaryColours[i])
  }
  document.getElementById('splitComplementary').setAttribute('data-clipboard-text', splitComplementaryColours.join(', '))
}

function addTriadic(myColour) {
  let triadicColours = tinycolor(myColour).triad()
  triadicColours = triadicColours.map(function(t) { return t.toHexString() })
  let circles = document.getElementsByClassName('triadic')[0].children
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = triadicColours[i]
    circles[i].setAttribute('title', triadicColours[i])
  }
  document.getElementById('triadic').setAttribute('data-clipboard-text', triadicColours.join(', '))
}

function addTetradic(myColour) {
  let tetradicColours = tinycolor(myColour).tetrad()
  tetradicColours = tetradicColours.map(function(t) { return t.toHexString() })
  let circles = document.getElementsByClassName('tetradic')[0].children
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = tetradicColours[i]
    circles[i].setAttribute('title', tetradicColours[i])
  }
  document.getElementById('tetradic').setAttribute('data-clipboard-text', tetradicColours.join(', '))
}

function addClipEvents() {
  let btns = document.querySelectorAll('.btn')
  for (let i = 0; i<btns.length; i++) {
    btns[i].addEventListener('mouseleave', clearTooltip)
    btns[i].addEventListener('blur', clearTooltip)
  }
}

function clearTooltip(e) {
  if (e.currentTarget !== undefined) {
    e.currentTarget.setAttribute('class', 'btn')
    e.currentTarget.removeAttribute('aria-label')
  }
}

function showTooltip(elem, msg) {
  elem.setAttribute('class', 'btn tooltipped tooltipped-s')
  elem.setAttribute('aria-label', msg)
}
