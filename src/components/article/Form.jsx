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
  /* Edit Student */
  editStudent = () => {
    /* Field Input Value Student Edit*/
    this.inputRenderList.forEach((input) => {
      const inputElement = this.formRef.current.elements[input.id]
      inputElement.value = this.props.studentEdit[input.id]
      inputElement.focus()
      inputElement.blur()
      if (inputElement.classList.contains('is-invalid')) {
        inputElement.classList.remove('is-invalid')
      }
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
    /* Clear Input */
    this.inputRenderList.forEach((input) => {
      const inputElement = this.formRef.current.elements[input.id]
      inputElement.disabled = false
      inputElement.value = ''
      inputElement.focus()
      inputElement.blur()
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
                        this.props.errorMessage[input.id] ? `is-invalid` : ``
                      }`}
                      id={input.id}
                      data-valid-rule={input.validRule}
                      onInput={this.handleInputChange}
                    />
                    <label htmlFor={input.id} className="form-label">
                      {input.htmlString}
                    </label>
                    <div className="form-notch">
                      <div className="form-notch-leading"></div>
                      <div className="form-notch-middle"></div>
                      <div className="form-notch-trailing"></div>
                    </div>
                    <div className="invalid-feedback">
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
