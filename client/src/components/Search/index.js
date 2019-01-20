import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import {reduxForm, Form, Field} from 'redux-form'
import { requestSearch } from '../../ducks/search'

class Search extends React.Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <Form className="search" onSubmit={handleSubmit(values => this.props.requestSearch(values.keywords))}>
        <section className="search__form">
            <Field className="search__form__input" name="keywords" id="keywords" component="input" />
            <Button className="search__form__button" htmlType="submit" icon="search" />
        </section>
      </Form>
    )
  }
}

export default connect(null, { requestSearch })(
  reduxForm({form: 'searchForm'})(Search)
)