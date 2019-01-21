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
          {search.data.length > 0 && <List list={search} />}
          {favourites.data.length > 0 && <List isFav={true} list={favourites} />}
        </section>
      </section>
    )
  }
}

export default connect(state => ({
  search: state.search,
  favourites: favourites(state)}
))(WizardContainer)