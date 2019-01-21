import React from 'react'
import { Icon } from 'antd'

export default React.memo(({isFav, title, add, remove}) => {
  return (
    <section className="lists__list__item__title">
      {
        isFav
          ? <Icon className="lists__list__item__title__icon -selected" type="star" theme="filled" onClick={remove} />
          : <Icon className="lists__list__item__title__icon" type="star" theme="filled" onClick={add} />
      }
      <span className="lists__list__item__title__text">{title}</span>
    </section>
  )
})