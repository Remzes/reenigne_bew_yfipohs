import React from 'react'
import { connect } from 'react-redux'
import { requestFavourites } from './ducks/favourites'
import "./scss/index.scss"

import WizardContainer from './components/WizardContainer'

class App extends React.Component {
  componentDidMount() {
    this.props.requestFavourites()
  }

  render() {
    return (
      <div id="wrapper" className="wrapper">
        <WizardContainer />
      </div>
    )
  }
}

export default connect(null, { requestFavourites })(App)