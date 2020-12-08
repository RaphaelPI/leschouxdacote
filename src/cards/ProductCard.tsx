import styled from "styled-components"
import { COLORS } from "src/constants"

const Container = styled.div`
  min-width: 300px;
  flex: 1;
  margin: 1em;
  box-shadow: 0px 3px 6px ${COLORS.shadow.regular};
`
const ImageContainer = styled.div`
  height: 180px;
  position: relative;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`
const Content = styled.div`
  padding: 10px 15px;
`

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  return (
    <Container>
      <ImageContainer>
        <img src={product.image} alt={product.desc} />
      </ImageContainer>
      <Content>
        <div>{product.producer}</div>
        <div>{product.location}</div>
        <div>{product.desc}</div>
        <div>{product.price}</div>
      </Content>
    </Container>
  )
}

export default ProductCard
