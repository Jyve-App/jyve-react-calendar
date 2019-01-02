import React from 'react'
import { css } from 'emotion'
import { Popover } from 'antd'

import { GigInfos } from './GigInfo'

let popoverClass = css`
  .ant-popover-arrow {
    display: none;
  }
`

// TODO: use react emotion to style the Gig properly

export const GigPopover = props => {
  const { gigs, primary } = props
  const Content = <GigInfos gigs={gigs} primary={primary} />
  return (
    <Popover overlayClassName={popoverClass} arrowPointAtCenter content={Content}>{props.children}</Popover>
  )
}
