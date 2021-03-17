import styled from "@emotion/styled"

import Products from "src/components/Products"
import ProductCard from "src/cards/ProductCard"

const Container = styled.div`
  padding: 32px;
  height: 100%;
`

interface Props {
  products?: Product[]
}

const SearchResults = ({ products }: Props) => {
  return (
    <Container>
      <h1>Les producteurs près de chez vous</h1>
      {products?.length ? (
        <Products $col={2}>
          {products.map((product) => (
            <ProductCard key={product.objectID} product={product} />
          ))}
        </Products>
      ) : (
        <p>Aucun producteur trouvé pour ces critères de recherche</p>
      )}
    </Container>
  )
}

export default SearchResults
