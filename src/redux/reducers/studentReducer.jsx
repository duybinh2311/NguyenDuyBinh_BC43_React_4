import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  studentValue: {},
  studentEdit: {},
  isUpdateStudent: false,
  errorMessage: {},
  listStudent: [],
  listStudentSearch: [],
  keywordStudentSearch: '',
}

const studentReducer = createSlice({
  name: 'studentReducer',
  initialState,
  reducers: {
    /* Get Value Student */
    studentValueReducer: (state, action) => {
      if (!Object.keys(action.payload).length) {
        state.studentValue = action.payload
        return
      }
      state.studentValue[action.payload.key] = action.payload.value
    },
    /* Get Error Message */
    validStudentReducer: (state, action) => {
      state.errorMessage = action.payload
    },
    /* Add New Student */
    addStudentReducer: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.listStudent = action.payload
        return
      }
      state.listStudent.push(action.payload)
      localStorage.setItem('listStudent', JSON.stringify(state.listStudent))
    },
    /* Get Student Edit Value */
    editStudentReducer: (state, action) => {
      state.studentEdit = action.payload
    },
    /* Update Student */
    updateStudentReducer: (state, action) => {
      const studentUpdate = state.listStudent.find(
        (student) => student.id === action.payload.id
      )
      Object.assign(studentUpdate, action.payload)
      localStorage.setItem('listStudent', JSON.stringify(state.listStudent))
    },
    /* Status Update */
    updateSuccessReducer: (state, action) => {
      state.isUpdateStudent = action.payload
    },
    /* Delete Student */
    deleteStudentReducer: (state, action) => {
      const index = state.listStudent.findIndex(
        (student) => student.id === action.payload
      )
      if (index !== -1) {
        state.listStudent.splice(index, 1)
        if (state.listStudent.length) {
          localStorage.setItem('listStudent', JSON.stringify(state.listStudent))
        } else {
          localStorage.removeItem('listStudent')
        }
      }
    },
    /* Filter List Student Search */
    searchStudentReducer: (state, action) => {
      state.listStudentSearch = action.payload
    },
    /* Get Keyword Search Student */
    keywordSearchReducer: (state, action) => {
      state.keywordStudentSearch = action.payload
    },
  },
})

export const {
  studentValueReducer,
  addStudentReducer,
  deleteStudentReducer,
  editStudentReducer,
  validStudentReducer,
  updateStudentReducer,
  updateSuccessReducer,
  searchStudentReducer,
  keywordSearchReducer,
} = studentReducer.actions

export default studentReducer.reducer
