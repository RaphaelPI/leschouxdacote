import ProductCard from "src/cards/ProductCard"
import styled from "styled-components"

const Container = styled.div`
  padding: 3em;
  height: 100%;
`
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1em;
`

interface Props {
  products: Product[]
}

const SearchResults = ({ products }: Props) => {
  return (
    <Container>
      <h1>Les producteurs près de chez vous</h1>
      <Content>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Content>
    </Container>
  )
}

export default SearchResults
