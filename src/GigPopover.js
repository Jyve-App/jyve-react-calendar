import React from 'react'
import { css } from 'emotion'
import { Popover } from 'antd'
import 'antd/lib/popover/style'

import { GigInfos } from './GigInfo'

let popoverClass = css`
  width: 100%;
  max-width: 400px;

  .ant-popover-arrow {
    display: none;
  }
`

export const GigPopover = props => {
  const { gigs, primary } = props
  return (
    <Popover overlayClassName={popoverClass}
      getPopupContainer={() => document.querySelector('.antd-popover-parent')}
      arrowPointAtCenter content={<GigInfos gigs={gigs} primary={primary} />}>
      {props.children}
    </Popover>
  )
}
