import React from 'react'
import { Spin } from 'antd'
import ListItem from './ListItem'

class List extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.isFav) console.log(nextProps.list)
  }

  render() {
    const isFav = this.props.isFav
    const {data, fetching, fetched} = this.props.list
    return (
      <section className="list">
        {isFav && <h2>Favourites</h2>}
        <Spin spinning={fetching && !fetched}>
          { data.map((item, index) => {
            if (!this.props.isFav) console.log(item.title, item.isFav)
            return <ListItem item={item} />
          }) }
        </Spin>
      </section>
    )
  }
}

export default List