export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  prettyJSON,
  getRandomReviewContent,
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function prettyJSON(obj) {
  function _replacer(match, pIndent, pKey, pVal, pEnd) {
    var key = '<span class=json-key>'
    var val = '<span class=json-value>'
    var str = '<span class=json-string>'
    var r = pIndent || ''
    if (pKey) r = r + key + pKey.replace(/[": ]/g, '') + '</span>: '
    if (pVal) r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>'
    return r + (pEnd || '')
  }

  const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm
  return JSON.stringify(obj, null, 3)
    .replace(/&/g, '&amp;')
    .replace(/\\"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(jsonLine, _replacer)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomDate() {
  const start = new Date(2023, 0, 1) // January 1, 2023
  const end = new Date(2024, 11, 31) // December 31, 2024
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )

  return date.toLocaleDateString('en-GB') // Format: DD-MM-YYYY
}

function getRandomName() {
  const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Chris']
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis']

  const firstName = firstNames[getRandomInt(0, firstNames.length - 1)]
  const lastName = lastNames[getRandomInt(0, lastNames.length - 1)]

  return `${firstName} ${lastName}`
}

function getRandomUserName(fullName) {
  return fullName.toLowerCase().replace(' ', '_') + getRandomInt(1, 99)
}

function getRandomReviewContent() {
  const randomId = getRandomInt(1000, 9999).toString()
  const randomRating = getRandomInt(1, 5)
  const reviewTexts = [
    'Great product!',
    'Not what I expected.',
    'Average experience.',
    'Highly recommend it!',
    'Would not buy again.',
  ]
  const randomTxt = reviewTexts[getRandomInt(0, reviewTexts.length - 1)]
  const fullName = getRandomName()
  const userName = getRandomUserName(fullName)

  return {
    date: getRandomDate(),
    fullName: fullName,
    id: randomId,
    rating: randomRating,
    txt: randomTxt,
    userName: userName,
  }
}
