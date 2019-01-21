import React from 'react'
import { Spin } from 'antd'
import c from 'classnames'
import ListItem from './ListItem'

export default props => {
  const isFav = props.isFav
  const {data, fetching, fetched} = props.list
  return (
    <section className={c("lists__list", { '-favourites': isFav, '-hidden': !fetching && data.length < props.num, '-loading': fetching && data.length < 1 })}>
      <Spin spinning={fetching && !fetched}>
        {isFav && <h2>Favourites</h2>}
        { data.map((item, index) => <ListItem item={item} />) }
      </Spin>
    </section>
  )
}
