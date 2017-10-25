/*****************************************************\
| JavaScript for Random Whakatauki Generator          |
| Peter Sim, October, 2017                            |
\*****************************************************/

// Wait until the DOM has loaded, then call the start function.
document.addEventListener('DOMContentLoaded', start)

function start () {
  getProverb()
  makeButtons()
}

function getProverb() {
  var xhr = new XMLHttpRequest()
  var url = "https://eda-te-reo.herokuapp.com/api/whakatauki"
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText)
      showProverb(myArr)
    }
  }
  xhr.open("GET", url, true)
  xhr.send()
}

function showProverb(arr) {
  document.getElementById('whakatauki').innerText = arr.source
  document.getElementById('pakeha').innerText = arr.translation
}

function makeButtons() {
  // 1. Create button
  var button1 = document.createElement('button')
  button1.innerText = 'Ano | Again'
  button1.setAttribute('id', 'button1')
  button1.classList.add('margins')

  // 2. Append to buttonBar
  var buttonBar = document.getElementById('buttonBar')
  buttonBar.appendChild(button1)

  // 3. Add event handler
  button1.addEventListener ('click', getProverb)
}
