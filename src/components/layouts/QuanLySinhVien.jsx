import React, { Component } from 'react'
import Form from 'components/article/Form'
import Table from 'components/article/Table'

export default class Body extends Component {
  render() {
    return (
      <div className="container my-3" style={{ minHeight: 750 }}>
        <Form />
        <Table />
      </div>
    )
  }
}
