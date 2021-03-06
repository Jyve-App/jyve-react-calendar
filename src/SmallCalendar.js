import React from 'react'
import { css } from 'emotion'

import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import format from 'date-fns/format'
import isSameDay from 'date-fns/is_same_day'
import fromPairs from 'lodash/fromPairs'

import { GigPopover } from './GigPopover'
import { PoweredBy } from './PoweredBy'

const DATE_FORMAT = 'YYYY-MM-DD'

const SmallCalendar = props => {
  let {
    gigs = [],
    primary = '#a89be8', // primary color of calendar
    secondary = 'white' // text color
  } = props

  let events = gigs && gigs.map(g => new Date(g.startDate))

  const modifierConfig = {
    gig: {
      predicate: date =>
        events &&
        events.find(
          d =>
            format(new Date(date), DATE_FORMAT) ===
            format(new Date(d), DATE_FORMAT)
        ),
      styles: {
        color: secondary,
        backgroundColor: primary
      }
    },
    today: {
      predicate: date =>
        format(new Date(date), DATE_FORMAT) === format(new Date(), DATE_FORMAT),
      styles: {
        color: '#d0021b'
      }
    },
    selected: {
      predicate: date => format(new Date(date), DATE_FORMAT) === format(),
      styles: {
        color: secondary,
        backgroundColor: primary
      }
    }
  }

  const daypickerClass = css`
    &.DayPicker {
      border-radius: 15px;
      background-color: #f8f6ff;
      margin: auto;
      display: table !important;
    }
  `

  function getConfig (node) {
    return fromPairs(
      Object.keys(modifierConfig).map(k => [k, modifierConfig[k][node]])
    )
  }

  // TODO: Tyler. Make this prettier
  if (!gigs) return (<span>Loading...</span>)

  const renderDay = (day, modifiers) => {
    return 'gig' in modifiers ? (
      <GigPopover gigs={gigs.filter(gig => isSameDay(day, gig.startDate))} primary={primary}>
        {day.getDate()}
      </GigPopover>
    ) : (
      day.getDate()
    )
  }

  return (
    <div className='foo' style={{ display: 'block', margin: 'auto' }}>
      <DayPicker className={daypickerClass}
        showOutsideDays
        modifiers={getConfig('predicate')}
        modifiersStyles={getConfig('styles')}
        renderDay={renderDay}
      />
      <PoweredBy />
    </div>
  )
}

export { SmallCalendar }
