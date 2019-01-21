import React from 'react'

export default React.memo(({text}) => (
  <section className="lists__list__item__description">
    {text}
  </section>
))