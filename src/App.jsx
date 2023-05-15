import React, { Component } from 'react'

/* Store */
import { Provider } from 'react-redux'
import { store } from 'configStore/store'

/* Component */
import Header from 'components/layouts/Header'
import Body from 'components/layouts/Body'
import Footer from 'components/layouts/Footer'
import Form from 'components/article/Form'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Body />
        <Footer />
      </Provider>
    )
  }
}
