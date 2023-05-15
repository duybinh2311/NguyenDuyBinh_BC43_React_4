import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  studentValue: {},
  studentEdit: {},
  isUpdateStudent: true,
  errorMessage: {},
  listStudent: [
    {
      id: '001',
      name: 'Nguyễn Duy Bình',
      phone: '0382846602',
      email: 'duybinh@gmail.com',
    },
    {
      id: '002',
      name: 'Nguyễn Anh Huy',
      phone: '0382846602',
      email: 'duybinh@gmail.com',
    },
  ],
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
      state.listStudent.push(action.payload)
    },
    editStudentReducer: (state, action) => {
      state.studentEdit = action.payload
    },
    updateStudentReducer: (state, action) => {
      const studentUpdate = state.listStudent.find(
        (student) => student.id === action.payload.id
      )
      Object.assign(studentUpdate, action.payload)
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
