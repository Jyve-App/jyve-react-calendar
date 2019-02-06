import React from 'react'
import Media from 'react-media'
import BigCalendar from 'react-big-calendar'
import styled from 'react-emotion'
import moment from 'moment'

import ContainerDimensions from 'react-container-dimensions'

import { SmallCalendar } from './SmallCalendar'
import { GigPopover } from './GigPopover'
import { PoweredBy } from './PoweredBy'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const MIN_WIDTH = 576

const localizer = BigCalendar.momentLocalizer(moment)

const DAY_FORMAT = 'YYYY-MM-DD'

const accessors = {
  titleAccessor: 'name',
  startAccessor: 'startDate',
  endAccessor: 'endDate',
  views: ['month'],
  formats: {
    dayFormat: DAY_FORMAT
  }
}

const LargeCalendar = props => {
  let {
    gigs = [],
    primary = '#a89be8', // primary color of calendar
    secondary = 'white' // text color
  } = props

  const Big = ({ height, width }) => {
    const StyledBigCalendar = styled(BigCalendar)`
      height: 100%;
      min-height: 520px;
      max-width: ${height * 1.2}px;
      margin: auto;
    
      .rbc-month-view {
        border-radius: 20px;
        background-color: #f8f6ff;
      }

      .rbc-event-content {
        color: ${secondary}
      }

      .rbc-btn-group {
        button {
          background: ${primary}
          color: ${secondary}
        }
      }

      .rbc-month-view .rbc-month-row:first-child {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
      }

      .rbc-month-view .rbc-month-row:last-child {
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
      }

      .rbc-event {
        background-color: ${primary};
      }

      .rbc-today {
        color: ${secondary};
      }

      .rbc-date-cell {
        color: black;
      }
    `

    return width > MIN_WIDTH ? (
      <div className='foo'>
        <StyledBigCalendar
          localizer={localizer}
          events={gigs}
          components={{
            eventWrapper: props => {
              return <GigPopover gigs={props.event} secondary={secondary} primary={primary}>{props.children}</GigPopover>
            }
          }}
          {...accessors}
        />
        <PoweredBy />
      </div>
    ) : (
      <div>
        <SmallCalendar {...props} gigs={gigs} />
      </div>
    )
  }

  // TODO: Tyler. Make this prettier
  if (!gigs) return <span>Loading...</span>

  return (
    <Media query={`(max-width: ${MIN_WIDTH}px)`}>
      {matches =>
        !matches ? (
          <ContainerDimensions>
            <Big />
          </ContainerDimensions>
        ) : (
          <div>
            <SmallCalendar {...props} gigs={gigs} />
          </div>
        )
      }
    </Media>
  )
}

export { LargeCalendar }
