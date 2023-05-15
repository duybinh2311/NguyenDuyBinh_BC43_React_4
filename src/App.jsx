import React, { Component } from 'react'

/* Store */
import { Provider } from 'react-redux'
import { store } from 'configStore/store'

/* Component */
import Header from 'components/layouts/Header'
import QuanLySinhVien from 'components/layouts/QuanLySinhVien'
import Footer from 'components/layouts/Footer'
import { Toaster } from 'react-hot-toast'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Toaster />
        <Header />
        <QuanLySinhVien />
        <Footer />
      </Provider>
    )
  }
}
