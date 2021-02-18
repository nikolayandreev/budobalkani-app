export const validName = (value = '') => {
  if (value !== null) {
    const $regex = new RegExp('^[a-zA-Zа-яА-Я-\\s]+$')
    const $output = $regex.test(value)

    return $output
  }
  return false
}
export const validVatId = (value = '') => {
  if (!value) {
    return false
  }
  if (!value.startsWith('BG')) {
    return false
  }
} //BG999999999
export const validPhone = (value = '') => {
  const $prefixes3 = ['099', '098', '087', '088', '089']
  const $prefixes4 = ['0437', '0438', '0439']

  if (value !== null) {
    return (value.length === 10 && $prefixes3.includes(value.substr(0, 3))) ||
      (value.length === 9 && $prefixes4.includes(value.substr(0, 4)))
      ? true
      : false
  }
  return false
}

export const validEgn = (value = '') => {
  if (value !== null) {
    if (value.length != 10) {
      return false
    }
    if (/[^0-9]/.test(value)) {
      return false
    }
    let year = Number(value.slice(0, 2))
    let month = Number(value.slice(2, 4))
    let day = Number(value.slice(4, 6))

    if (month >= 40) {
      year += 2000
      month -= 40
    } else if (month >= 20) {
      year += 1800
      month -= 20
    } else {
      year += 1900
      if (!isValidDate(year, month, day)) {
        return false
      }

      let checkSum = 0
      let weights = [2, 4, 8, 5, 10, 9, 7, 3, 6]

      for (let key in weights) {
        checkSum += weights[key] * Number(value.charAt(key))
      }

      checkSum %= 11
      checkSum %= 10

      if (checkSum !== Number(value.charAt(9))) {
        return false
      }
      return true
    }
    return false
  }
}

export const validIban = (value) => {
  if (value !== null) {
    let rearrange = value.substring(4, value.length) + value.substring(0, 4)
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    let alphaMap = {}
    let number = []

    alphabet.forEach((value, index) => {
      alphaMap[value] = index + 10
    })

    rearrange.split('').forEach((value, index) => {
      number[index] = alphaMap[value] || value
    })

    return modulo(number.join('').toString(), 97) === 1
  }
  return false
}

const modulo = (aNumStr, aDiv) => {
  var tmp = ''
  var i, r
  for (i = 0; i < aNumStr.length; i++) {
    tmp += aNumStr.charAt(i)
    r = tmp % aDiv
    tmp = r.toString()
  }
  return tmp / 1
}

const isValidDate = (y, m, d) => {
  const date = new Date(y, m - 1, d)
  return date && date.getMonth() + 1 == m && date.getDate() == Number(d)
}
