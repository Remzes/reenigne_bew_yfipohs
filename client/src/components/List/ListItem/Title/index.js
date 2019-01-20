import React from 'react'

export default React.memo(({title, requestAddFavourite, requestRemoveFavourite, isFav}) => (
  <section className="item__title">
    <span className="item__title__icon" onClick={
      isFav ? requestRemoveFavourite() : requestRemoveFavourite()
    }>CLICK <br/></span>
    <span className="item__title__text">{title}</span>
  </section>
))