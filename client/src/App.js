import React from 'react'
import { connect } from 'react-redux'
import { requestSearch } from './ducks/search'
import "./scss/index.scss"

import WizardContainer from './components/WizardContainer'

class App extends React.Component {
  render() {
    return (
      <div id="wrapper" className="wrapper">
        <WizardContainer />
      </div>
    )
  }
}

export default connect(null, { requestSearch })(App)