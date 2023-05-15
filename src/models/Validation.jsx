export default class Validation {
  static formRules = {}
  static errorMessageList = {}
  static getValidRule(inputValidList) {
    inputValidList.forEach((input) => {
      let validRules = input.getAttribute('data-valid-rule').split('|')
      validRules.forEach((rule) => {
        if (Array.isArray(this.formRules[input.id])) {
          this.formRules[input.id].push(this.validFunctions[rule])
        } else {
          this.formRules[input.id] = [this.validFunctions[rule]]
        }
      })
    })
  }
  static handleError(input, listStudent) {
    let errorMessage
    this.formRules[input.id].find((test) => {
      errorMessage = test(input.value, listStudent)
      return errorMessage
    })
    if (errorMessage) {
      this.errorMessageList = {
        ...this.errorMessageList,
        [input.id]: errorMessage,
      }
    } else {
      const newErrorMessageList = { ...this.errorMessageList }
      delete newErrorMessageList[input.id]
      this.errorMessageList = { ...newErrorMessageList }
    }
  }
  static clearError() {
    this.errorMessageList = {}
  }
  /* Function Valid */
  static validFunctions = {
    required: (value) => {
      return value.trim() ? '' : `Please enter something`
    },
    number: (value) => {
      const regexNumber = /^[0-9]+$/
      return regexNumber.test(value.trim()) ? '' : `Input value must be number`
    },
    letter: (value) => {
      const regexLetter = /^[A-Z a-z]+$/
      return regexLetter.test(this.validFunctions.removeAscent(value.trim()))
        ? ''
        : `Input value must be letter`
    },
    email: (value) => {
      const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      return regexEmail.test(value.trim()) ? '' : `Invalid Email`
    },
    password: (value) => {
      const regexPassword =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/g
      return regexPassword.test(value)
        ? ''
        : `Password needs at least one uppercase, number and special character`
    },

    availableID: (value, listStudent) => {
      return listStudent.find((student) => student.id === value)
        ? `This ID: ${value} is already on the list `
        : ``
    },
    minLength: (min) => {
      return (value) => {
        return value.length >= min ? '' : `Min ${min} characters`
      }
    },
    maxLength: (max) => {
      return (value) => {
        return value.length <= max ? '' : `Max ${max} characters`
      }
    },
    minValue: (min) => {
      return (value) => {
        return value >= Number(min)
          ? ''
          : `The input value must be greater than or equal to ${Number(
              min
            ).toLocaleString()}`
      }
    },
    maxValue: (max) => {
      return (value) => {
        return value <= Number(max)
          ? ''
          : `The input value must be less than or equal to ${Number(
              max
            ).toLocaleString()}`
      }
    },
    removeAscent: (string) => {
      if (string === null || string === undefined) return string
      string = string.toLowerCase()
      string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      string = string.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      string = string.replace(/đ/g, 'd')
      return string
    },
    stringToSlug: (string) => {
      let slug = string.toLowerCase()
      slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
      slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
      slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
      slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
      slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
      slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
      slug = slug.replace(/đ/gi, 'd')
      slug = slug.replace(
        /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
        ''
      )
      slug = slug.replace(/ /gi, '-')
      slug = slug.replace(/\-\-\-\-\-/gi, '-')
      slug = slug.replace(/\-\-\-\-/gi, '-')
      slug = slug.replace(/\-\-\-/gi, '-')
      slug = slug.replace(/\-\-/gi, '-')
      slug = '@' + slug + '@'
      slug = slug.replace(/\@\-|\-\@|\@/gi, '')
      return slug
    },
  }
}
