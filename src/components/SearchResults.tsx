import styled from "styled-components"

import Products from "src/components/Products"
import ProductCard from "src/cards/ProductCard"

import { MOCK_PRODUCERS } from "src/constants/mock"

const Container = styled.div`
  padding: 32px;
  height: 100%;
`

interface Props {
  products: Product[]
}

const SearchResults = ({ products }: Props) => {
  return (
    <Container>
      <h1>Les producteurs près de chez vous</h1>
      <Products $col={2}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} producer={MOCK_PRODUCERS[product.producer]} />
        ))}
      </Products>
    </Container>
  )
}

export default SearchResults
