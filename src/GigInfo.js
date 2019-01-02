import React, { useState, useEffect } from 'react'

import { Skeleton } from 'antd'

import format from 'date-fns/format'

import { api } from './api'

const defaultImage = 'https://s3.amazonaws.com/jyve-public-assets/j_on_white_logo.png'

export const GigInfo = props => {
  const { gigId } = props

  const [performers, setPerformers] = useState([])
  const [gig, setGig] = useState(undefined)
  const [first, setFirst] = useState(undefined)

  useEffect(() => {
    api.get(`api/gigs/${gigId}`)
      .then(({ data }) => {
        setGig(data)
        return data
      })
      .then(() => api.get(`api/gigs/${gigId}/performers`))
      .then(({ data }) => {
        setPerformers(data)
        setFirst(data[0])
      })
  }, [props.gigId])

  return (
    <Skeleton loading={!gig} avatar active>
      {!gig ? <div /> : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flex: 1 }}>
            <img
              src={gig.imageUrl || defaultImage}
              style={{ width: 100, height: 100, borderRadius: 4, marginRight: 8 }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: 0 }}>
                {first ? <a style={{ color: props.primary }} href={first ? `https://jyve.io/${first.prettyUrl}` : ''}>{gig.name}</a> : <div>{gig.name}</div>}
              </h3>
              <strong>
                at <a style={{ color: props.secondary }} href={`https://jyve.io/${gig.venue.prettyUrl}`}>{gig.venue.name}</a>
              </strong>
              <p>{format(gig.startDate, 'h:mm')} - {format(gig.endDate, 'h:mm A')}</p>
            </div>
            {performers.length <= 1 ? undefined
              : performers.map(p =>
                <div style={{ flex: 1 }}><a href={`https://jyve.io/${p.prettyUrl}`}>{p.name}</a></div>
              )
            }
          </div>
          <div style={{ flex: 1, margin: '10px 10px auto 10px' }}>{gig.description}</div>
        </div>
      )}
    </Skeleton>
  )
}

export const GigInfos = ({ gigs, ...restProps }) => (
  Array.isArray(gigs) ? (
    gigs.map(gig => <GigInfo key={gig.id} {...restProps} gigId={gig.id} />)
  ) : (
    <GigInfo gigId={gigs.id} {...restProps} />
  )
)
