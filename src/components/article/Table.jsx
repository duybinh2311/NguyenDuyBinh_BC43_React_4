import Validation from 'models/Validation'
import React, { Component, createRef } from 'react'
import { toast } from 'react-hot-toast'
import { connect } from 'react-redux'
import {
  deleteStudentReducer,
  editStudentReducer,
  validStudentReducer,
  updateSuccessReducer,
  searchStudentReducer,
  keywordSearchReducer,
  studentValueReducer,
} from 'reducers/studentReducer'

export class Table extends Component {
  /* Render Table */
  renderTable = (listStudent = this.props.listStudent) => {
    return listStudent.map((student) => {
      return (
        <tr key={student.id}>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.phone}</td>
          <td>{student.email}</td>
          <td className="text-center">
            <button
              className="btn btn-danger btn-sm me-2"
              onClick={() => {
                this.deleteStudent(student.id)
              }}
            >
              <i className="fas fa-circle-xmark"></i>
            </button>
            <button
              className="btn btn-primary btn-sm"
              disabled={false}
              onClick={() => {
                this.editStudent(student)
              }}
            >
              <i className="far fa-pen-to-square"></i>
            </button>
          </td>
        </tr>
      )
    })
  }
  /* Edit Student */
  editStudent = (student) => {
    this.props.studentValueReducer({})
    /* Clear Error Before Edit */
    if (Object.keys(Validation.errorMessageList).length) {
      Validation.clearError()
      this.props.validStudentReducer(Validation.errorMessageList)
    }
    if (student.id !== this.props.studentEdit.id) {
      this.props.updateSuccessReducer(true)
      this.props.editStudentReducer(student)
    }
  }
  /* Delete Student */
  deleteStudent = (id) => {
    this.props.deleteStudentReducer(id)
    toast.success('Xóa sinh viên thành công')
  }
  /* Search Student */
  searchStudent = (keyword) => {
    const ascentString = Validation.validFunctions.stringToSlug
    const keywordAscent = ascentString(keyword)
    const listSearch = this.props.listStudent.filter((student) => {
      return ascentString(student.name).search(keywordAscent) !== -1
    })
    this.props.keywordSearchReducer(keyword)
    this.props.searchStudentReducer(listSearch)
  }
  /* Optimized Render, If List Not Change => Don't Re-Render */
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.listStudent !== this.props.listStudent ||
      nextProps.listStudentSearch !== this.props.listStudentSearch
    ) {
      return true
    }
    return false
  }
  render() {
    console.log('render table')
    return (
      <div className="card my-3">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <h3 className="text-center my-0 text-primary">
                Quản Lý Sinh Viên
              </h3>
            </div>
            <div className="col-6">
              <div className="form-outline">
                <input
                  type="text"
                  className="form-control"
                  id="searchBox"
                  onInput={(event) => {
                    this.searchStudent(event.target.value)
                  }}
                />
                <label htmlFor="searchBox" className="form-label">
                  Search
                </label>
                <div className="form-notch">
                  <div className="form-notch-leading"></div>
                  <div className="form-notch-middle"></div>
                  <div className="form-notch-trailing"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table mt-4 card-body">
          <thead>
            <tr>
              <th>Mã SV</th>
              <th>Họ Tên</th>
              <th>Số Điện Thoại</th>
              <th>Email</th>
              <th className="text-center">Feature</th>
            </tr>
          </thead>
          <tbody>
            {this.props.keywordStudentSearch
              ? this.renderTable(this.props.listStudentSearch)
              : this.renderTable()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  listStudent: state.studentReducer.listStudent,
  listStudentSearch: state.studentReducer.listStudentSearch,
  studentEdit: state.studentReducer.studentEdit,
  keywordStudentSearch: state.studentReducer.keywordStudentSearch,
})

const mapDispatchToProps = {
  deleteStudentReducer,
  editStudentReducer,
  validStudentReducer,
  updateSuccessReducer,
  searchStudentReducer,
  keywordSearchReducer,
  studentValueReducer,
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
