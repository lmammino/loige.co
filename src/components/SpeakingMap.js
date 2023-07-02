import React, { Component } from 'react'
import styled from '@emotion/styled'

const leafletJSSrc = '/resources/leaflet/leaflet.js'
const leafletCSSSrc = '/resources/leaflet/leaflet.css'

const MapContainer = styled.div`
  width: 100%;
  height: 30vh;
  min-height: 300px;
  max-height: 900px;
  background: #46c9e5;

  &.collapsed {
    height: 0;
    min-height: 0;
    max-height: 0;
  }
`

class SpeakingMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      events: props.events
    }
    this.createMap = this.createMap.bind(this)
  }

  createMap () {
    const StamenWatercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 1,
      maxZoom: 16,
      ext: 'jpg'
    })

    const mymap = L.map('speaking_map').setView([51.505, -0.09], 3)
    StamenWatercolor.addTo(mymap)
    const markers = L.markerClusterGroup({
      maxClusterRadius: 20
    })

    this.state.events.filter(e => e.frontmatter.event_location_gps).forEach(e => {
      const coords = e.frontmatter.event_location_gps.split(',').map(parseFloat)
      L.marker(coords)
        .bindPopup(
          `<b>${e.frontmatter.event_name}</b><br/><em>${
            e.frontmatter.title
          }</em><br/>${e.frontmatter.date}`
        )
        .addTo(markers)
    })

    markers.addTo(mymap)
  }

  shouldComponentUpdate () {
    if (this.state.loaded) {
      return false
    }

    return true
  }

  componentDidMount () {
    this.setState({ loaded: true })

    const leafletScript = document.createElement('script')
    leafletScript.type = 'text/javascript'
    leafletScript.src = leafletJSSrc

    const leafletStyle = document.createElement('link')
    leafletStyle.type = 'text/css'
    leafletStyle.rel = 'stylesheet'
    leafletStyle.href = leafletCSSSrc

    document.head.appendChild(leafletScript)
    document.head.appendChild(leafletStyle)

    leafletScript.onload = this.createMap.bind(this)
  }

  render () {
    return (
      <MapContainer
        className={this.state.loaded ? null : 'collapsed'}
        id="speaking_map"
      />
    )
  }
}

export default SpeakingMap
