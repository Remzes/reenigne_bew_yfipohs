import React from 'react'

export default React.memo(({isFav, title, add, remove}) => {
  return (
    <section className="item__title">
      {
        isFav
          ? <span className="item__title__icon" onClick={remove}>UNSELECT<br/></span>
          : <span className="item__title__icon" onClick={add}>SELECT<br/></span>
      }
      <span className="item__title__text">{title}</span>
    </section>
  )
})