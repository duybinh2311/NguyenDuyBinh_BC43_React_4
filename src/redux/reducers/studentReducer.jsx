import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  studentValue: {},
  studentEdit: {},
  isUpdateStudent: true,
  errorMessage: {},
  listStudent: [],
  listStudentSearch: [],
  keywordStudentSearch: '',
}

const studentReducer = createSlice({
  name: 'studentReducer',
  initialState,
  reducers: {
    studentValueReducer: (state, action) => {
      if (!Object.keys(action.payload).length) {
        state.studentValue = action.payload
        return
      }
      state.studentValue[action.payload.key] = action.payload.value
    },
    validStudentReducer: (state, action) => {
      state.errorMessage = action.payload
    },
    addStudentReducer: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.listStudent = action.payload
        return
      }
      state.listStudent.push(action.payload)
      localStorage.setItem('listStudent', JSON.stringify(state.listStudent))
    },
    editStudentReducer: (state, action) => {
      state.studentEdit = action.payload
    },
    updateStudentReducer: (state, action) => {
      const studentUpdate = state.listStudent.find(
        (student) => student.id === action.payload.id
      )
      Object.assign(studentUpdate, action.payload)
      localStorage.setItem('listStudent', JSON.stringify(state.listStudent))
    },
    updateSuccessReducer: (state, action) => {
      state.isUpdateStudent = action.payload
    },
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
    searchStudentReducer: (state, action) => {
      state.listStudentSearch = action.payload
    },
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
