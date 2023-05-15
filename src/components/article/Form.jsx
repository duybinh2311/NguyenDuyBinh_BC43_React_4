import Validation from 'models/Validation'
import React, { Component, createRef } from 'react'
import { toast } from 'react-hot-toast'
import { connect } from 'react-redux'
import {
  studentValueReducer,
  addStudentReducer,
  validStudentReducer,
  editStudentReducer,
  updateStudentReducer,
  updateSuccessReducer,
} from 'reducers/studentReducer'

/* Data Input */
export class Form extends Component {
  /* Data Input And Form Ref */
  formRef = createRef()
  errorRef = {
    id: createRef(),
    phone: createRef(),
    name: createRef(),
    email: createRef(),
  }
  inputRenderList = [
    {
      id: 'id',
      htmlString: 'Mã sinh viên',
      key: 1,
      validRule: 'required|number|availableID',
    },
    {
      key: 2,
      id: 'name',
      htmlString: 'Họ tên',
      validRule: 'required|letter',
    },
    {
      key: 3,
      id: 'phone',
      htmlString: 'Số điện thoại',
      validRule: 'required|number',
    },
    {
      key: 4,
      id: 'email',
      htmlString: 'Email',
      validRule: 'required|email',
    },
  ]
  /* Toast Message */
  toastAddSuccess = (message) => {
    toast.dismiss()
    toast.success(message)
  }
  toastError = (message) => {
    toast.dismiss()
    toast.error(message)
  }
  toastUpdateSuccess = (message) => {
    toast.dismiss()
    toast.success(message, {
      iconTheme: {
        primary: '#00a6ed',
        secondary: '#fff',
      },
    })
  }
  /* Handle Error Message Element */
  handleError = (event) => {
    const { id } = event.target
    Validation.handleError(event.target, this.props.listStudent)
    if (!Validation.errorMessageList[id]) {
      event.target.classList.add('is-valid')
      event.target.classList.remove('is-invalid')
      this.errorRef[id].current.innerHTML = 'Thông tin hợp lệ'
      this.errorRef[id].current.classList.add('valid-feedback')
      this.errorRef[id].current.classList.remove('invalid-feedback')
      return
    } else {
      event.target.classList.remove('is-valid')
      event.target.classList.add('is-invalid')
      this.errorRef[id].current.innerHTML = Validation.errorMessageList[id]
      this.errorRef[id].current.classList.remove('valid-feedback')
      this.errorRef[id].current.classList.add('invalid-feedback')
      return
    }
  }
  /* Get Input Value */
  handleInputChange = (event) => {
    const { id, value } = event.target
    this.props.studentValueReducer({
      key: id,
      value: value.trim(),
    })
  }
  /* Get Rule Validation Input */
  getRuleValidInput = () => {
    const inputValidList = []
    this.inputRenderList.forEach((input) => {
      inputValidList.push(this.formRef.current.elements[input.id])
    })
    Validation.getValidRule(inputValidList)
    this.formRef.current.elements.btnUpdate.disabled = true
  }
  /* Validation Input */
  validationInput = () => {
    /* Validation Input If Error => Show Message */
    this.inputRenderList.forEach((input) => {
      const inputElement = this.formRef.current.elements[input.id]
      if (!inputElement.hasAttribute('disabled')) {
        Validation.handleError(inputElement, this.props.listStudent)
      }
    })
    this.props.validStudentReducer(Validation.errorMessageList)
  }
  /* Add Student */
  addStudent = (event) => {
    event.preventDefault()
    this.validationInput()
    /* If Input Valid => Add Student */
    if (!Object.keys(Validation.errorMessageList).length) {
      this.props.addStudentReducer({ ...this.props.studentValue })
      this.resetForm()
      this.toastAddSuccess('Thêm sinh viên thành công')
      return
    }
    this.toastError('Thông tin nhập vào không hợp lệ')
  }
  /* Edit Student */ a
  editStudent = () => {
    /* Field Input Value Student Edit*/
    this.inputRenderList.forEach((input) => {
      const inputElement = this.formRef.current.elements[input.id]
      const errorElement = this.errorRef[input.id].current
      errorElement.innerHTML = ''
      inputElement.value = this.props.studentEdit[input.id]
      inputElement.focus()
      inputElement.blur()
      inputElement.classList.remove('is-invalid')
      inputElement.classList.remove('is-valid')
      if (inputElement.id === 'id') {
        inputElement.disabled = true
      }
    })
    /* Disable, Enable Button */
    this.formRef.current.elements.btnCreate.disabled = true
    this.formRef.current.elements.btnUpdate.disabled = false
    this.toastUpdateSuccess('Lấy thông tin sinh viên thành công')
  }
  /* Update Student */
  updateStudent = () => {
    this.validationInput()
    if (!Object.keys(Validation.errorMessageList).length) {
      const studentUpdate = {
        ...this.props.studentEdit,
        ...this.props.studentValue,
      }
      this.props.updateStudentReducer(studentUpdate)
      this.resetForm()
      this.toastUpdateSuccess('Sửa đổi thông tin sinh viên thành công')
      return
    }
    this.toastError('Thông tin sửa đổi không hợp lệ')
  }
  /* Handle If Error Message Change */
  handleErrorChange = () => {
    this.inputRenderList.forEach((input) => {
      const inputElement = this.formRef.current.elements[input.id]
      if (inputElement.value) {
        inputElement.focus()
        inputElement.blur()
      }
    })
  }
  /* Reset Form */
  resetForm = () => {
    Validation.clearError()
    /* Clear Input & Error */
    this.inputRenderList.forEach((input) => {
      const inputElement = this.formRef.current.elements[input.id]
      const errorElement = this.errorRef[input.id].current
      inputElement.disabled = false
      inputElement.classList.remove('is-valid')
      inputElement.classList.remove('is-invalid')
      inputElement.value = ''
      inputElement.focus()
      inputElement.blur()
      errorElement.innerHTML = ''
    })
    /* Disable, Enable Button */
    this.formRef.current.elements.btnCreate.disabled = false
    this.formRef.current.elements.btnUpdate.disabled = true
    /* Reset State */
    this.props.studentValueReducer({})
    this.props.editStudentReducer({})
    this.props.validStudentReducer({})
    this.props.updateSuccessReducer(false)
  }
  getLocalListStudent = () => {
    if (localStorage.getItem('listStudent')) {
      const listStudent = JSON.parse(localStorage.getItem('listStudent'))
      this.props.addStudentReducer(listStudent)
    }
  }
  /* Optimized, If Error Or Student Edit Not Change => Don't Re-Render */
  shouldComponentUpdate(nextProps) {
    const errorPrev = JSON.stringify(this.props.errorMessage)
    const errorNext = JSON.stringify(nextProps.errorMessage)
    const editPrev = JSON.stringify(this.props.studentEdit)
    const editNext = JSON.stringify(nextProps.studentEdit)
    if (errorPrev !== errorNext || editPrev !== editNext) {
      return true
    }
    return false
  }
  render() {
    return (
      <form onSubmit={this.addStudent} ref={this.formRef}>
        <div className="card">
          <h3 className="text-center card-header text-bg-primary">
            Quản Lý Sinh Viên
          </h3>
          <div className="card-body row g-4">
            {this.inputRenderList.map((input) => {
              return (
                <div className="col-6" key={input.key}>
                  <div className="form-outline">
                    <input
                      type="text"
                      className={`form-control ${
                        Validation.errorMessageList[input.id]
                          ? `is-invalid`
                          : ``
                      }`}
                      id={input.id}
                      data-valid-rule={input.validRule}
                      onInput={(event) => {
                        this.handleError(event)
                        this.handleInputChange(event)
                      }}
                    />
                    <label htmlFor={input.id} className="form-label">
                      {input.htmlString}
                    </label>
                    <div className="form-notch">
                      <div className="form-notch-leading"></div>
                      <div className="form-notch-middle"></div>
                      <div className="form-notch-trailing"></div>
                    </div>
                    <div
                      className="invalid-feedback"
                      ref={this.errorRef[input.id]}
                    >
                      {this.props.errorMessage[input.id]}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="card-footer text-end">
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.resetForm}
            >
              Reset
            </button>
            <button
              className="btn btn-primary ms-3"
              type="button"
              onClick={this.updateStudent}
              id="btnUpdate"
            >
              Update
            </button>
            <button
              className="btn btn-success ms-3"
              type="submit"
              id="btnCreate"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    )
  }
  /* Get Rule Input Validation After Mouting */
  componentDidMount() {
    this.getRuleValidInput()
    this.getLocalListStudent()
  }
  /* Handle Input When Error Or Student Edit Change */
  componentDidUpdate(prevProps) {
    if (
      prevProps.studentEdit !== this.props.studentEdit &&
      this.props.isUpdateStudent
    ) {
      this.editStudent()
    }
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.handleErrorChange()
    }
  }
}

const mapStateToProps = (state) => ({
  studentValue: state.studentReducer.studentValue,
  studentEdit: state.studentReducer.studentEdit,
  errorMessage: state.studentReducer.errorMessage,
  listStudent: state.studentReducer.listStudent,
  isUpdateStudent: state.studentReducer.isUpdateStudent,
})

const mapDispatchToProps = {
  studentValueReducer,
  addStudentReducer,
  validStudentReducer,
  editStudentReducer,
  updateStudentReducer,
  updateSuccessReducer,
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
