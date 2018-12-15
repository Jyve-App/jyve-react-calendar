import React from 'react'

import poweredBy from './assets/poweredby.jpg'

export const PoweredBy = props => {
  return (
    <div style={{ display: 'flex', margin: '2px auto 0 auto', width: '100%', justifyContent: 'center' }}>
      <a href='https://jyve.io' style={{ minWidth: 0, flexShrink: 1 }}>
        <img src={poweredBy} width={200} />
      </a>
    </div>
  )
}
