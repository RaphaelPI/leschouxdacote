import type { Product } from "src/types/model"

import styled from "@emotion/styled"

import Products from "src/components/Products"
import ProductCard from "src/cards/ProductCard"
import { LAYOUT } from "src/constants"

const Container = styled.div`
  padding: 32px;
  height: 100%;
  @media (max-width: ${LAYOUT.mobile}px) {
    h1 {
      margin-right: 75px;
      font-size: 1.5em;
    }
  }
`

interface Props {
  products: Product[]
}

const SearchResults = ({ products }: Props) => {
  return (
    <Container>
      <h1>Les producteurs près de chez vous</h1>
      {products.length ? (
        <Products $col={2}>
          {products.map((product) => (
            <ProductCard key={product.objectID} product={product} followButton />
          ))}
        </Products>
      ) : (
        <p>Aucun producteur trouvé pour ces critères de recherche</p>
      )}
    </Container>
  )
}

export default SearchResults
