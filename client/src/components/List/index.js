import React from 'react'
import { Spin } from 'antd'
import ListItem from './ListItem'

class List extends React.Component {
  render() {
    const isFav = this.props.isFav
    const {data, fetching, fetched} = this.props.list
    return (
      <section className="list">
        {isFav && <h2>Favourites</h2>}
        <Spin spinning={fetching && !fetched}>
          { data.map((item, index) => (<ListItem item={item} key={item.title} />)) }
        </Spin>
      </section>
    )
  }
}

export default List