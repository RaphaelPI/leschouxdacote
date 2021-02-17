import styled from "styled-components"

import { COLORS } from "src/constants"
import Link from "src/components/Link"
import { formatPricePerUnit, formatQuantity, formatPrice } from "src/helpers/text"
import { useHover } from "src/helpers/hover"

const Container = styled.div<{ $hover: boolean }>`
  box-shadow: 0px 3px 3px ${({ $hover }) => ($hover ? COLORS.shadow.regular : COLORS.shadow.light)};
`
const Image = styled.img`
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
`
const Content = styled.div`
  padding: 8px 10px 6px;
  position: relative;
`
const Title = styled.h2`
  margin: 0;
  font-size: 1.4em;
`
const Producer = styled.h3`
  margin: 0.4em 0 0;
  font-weight: 300;
  color: ${COLORS.green};
`
const Location = styled.h4`
  margin: 0.1em 0 0;
  font-weight: 300;
`
const Price = styled.div`
  margin: 0.4em 0 0;
  font-size: 1.7em;
  font-weight: 500;
`
const PPU = styled.div`
  position: absolute;
  right: 10px;
  bottom: 9px;
`
const Quantity = styled.div`
  position: absolute;
  right: 10px;
  bottom: calc(10px + 2em);
  font-size: 0.8em;
  font-weight: 400;
`

interface Props {
  product: Product
}

export const ProductInfos = ({ product }: Props) => {
  return (
    <Link href={`/annonce/${product.objectID}`}>
      <Image src={product.photo} alt="" />
      <Content>
        <Title>{product.title}</Title>
        <Producer>{product.producer}</Producer>
        <Location>{product.city}</Location>
        <Price>{formatPrice(product)}</Price>
        {product.quantity && product.unit && (
          <>
            <PPU>{formatPricePerUnit(product)}</PPU>
            <Quantity>{formatQuantity(product)}</Quantity>
          </>
        )}
      </Content>
    </Link>
  )
}

const ProductCard = ({ product }: Props) => {
  const { productId, setProduct } = useHover()

  return (
    <Container
      onMouseOver={() => setProduct(product.objectID)}
      onMouseOut={() => setProduct(null)}
      $hover={productId === product.objectID}
    >
      <ProductInfos product={product} />
    </Container>
  )
}

export default ProductCard
