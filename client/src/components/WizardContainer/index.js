import React from 'react'
import { connect } from 'react-redux'
import Title from '../Title'
import Search from '../Search'
import List from '../List'
import { search, favourites } from '../../selectors'

class WizardContainer extends React.Component {
  render() {
    const { search, favourites } = this.props
    return (
      <section className="wizard">
        <Title />
        <Search />
        <section className="lists">
          {search && <List list={search} />}
          {favourites && <List isFav={true} list={favourites} />}
        </section>
      </section>
    )
  }
}

export default connect(state => ({search: search(state), favourites: favourites(state)}))(WizardContainer)