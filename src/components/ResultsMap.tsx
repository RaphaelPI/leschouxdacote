import styled from "@emotion/styled"
import dynamic from "next/dynamic"

import { COLORS } from "src/constants"
import { Product } from "../types/model"

const Map = dynamic(import("src/components/Map"), {
  ssr: false,
  loading() {
    return <Loader>Chargement de la carte…</Loader>
  },
})

const Container = styled.div`
  background-color: ${COLORS.border};
  position: sticky;
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
`
const Loader = styled.div`
  padding-top: 40vh;
  text-align: center;
`

interface Props {
  products?: Product[]
}

const ResultsMap = ({ products }: Props) => {
  return <Container>{products && <Map products={products} />}</Container>
}

export default ResultsMap
