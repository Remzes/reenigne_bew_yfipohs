import React from 'react'
import he from 'he'
import { connect } from 'react-redux'
import { Parser } from 'html-to-react'
import Title from './Title'
import Description from './Description'
import { requestAddFavourite, requestRemoveFavourite } from '../../../ducks/favourites'

class ListItem extends React.Component {

  render() {
    const { item } = this.props
    let description
    if (item.body) {
      let html = he.decode(item.body)
      const parser = Parser()
      description = parser.parse(html)
    }

    return (
      <section className="list__item">
        <Title isFav={item.isFav} title={item.title} add={() => requestAddFavourite(item)} remove={requestRemoveFavourite(item.title)} />
        <Description text={description} />
      </section>
    )
  }
}

export default connect(null, { requestAddFavourite, requestRemoveFavourite })(ListItem)