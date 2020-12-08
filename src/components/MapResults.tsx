import styled from "styled-components"

import { COLORS, LAYOUT } from "src/constants"
import Map from "src/components/Map"

const Container = styled.div`
  background-color: ${COLORS.grey};
  position: sticky;
  top: ${LAYOUT.headerHeight}px;
  height: calc(100vh - ${LAYOUT.headerHeight}px);
`

const MapResults = () => {
  return (
    <Container>
      <Map />
    </Container>
  )
}

export default MapResults
