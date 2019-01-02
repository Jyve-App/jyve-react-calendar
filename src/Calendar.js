import React, { useState, useEffect } from 'react'
import { css } from 'emotion'

import { Spin } from 'antd'

import { SmallCalendar } from './SmallCalendar'
import { LargeCalendar } from './LargeCalendar'

import { api } from './api'

const Calendar = props => {
  const [gigs, setGigs] = useState(null)
  const [loading, setLoading] = useState(true)

  let spinnerClass = css`
  .ant-spin-dot {
    i {
      background-color: ${props.primary || '#a89be8'}
    }
  }

  .ant-spin-text {
    color: ${props.primary || '#a89be8'}
  }
`

  useEffect(() => {
    let { token } = props
    api.get(`widgets`, {
      params: { access_token: token }
    }).then(({ data }) => {
      setGigs(data)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [props.token])

  const Calendar = props.type === 'large' ? (<LargeCalendar {...props} gigs={gigs} />)
    : (<SmallCalendar {...props} gigs={gigs} />)

  return (
    <Spin className={spinnerClass} tip='Loading Events...' spinning={loading} delay={500}>
      {Calendar}
    </Spin>
  )
}

export { Calendar }
