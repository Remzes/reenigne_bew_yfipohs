import React from 'react'

export default React.memo(({text}) => (
  <section className="item__description">
    {text}
  </section>
))