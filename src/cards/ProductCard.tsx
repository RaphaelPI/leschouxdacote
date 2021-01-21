import styled from "styled-components"
import Image from "next/image"

import { COLORS } from "src/constants"
import { formatPricePerUnit, formatQuantity, formatPrice } from "src/helpers/text"
import Link from "src/components/Link"

const Container = styled.div`
  box-shadow: 0px 3px 6px ${COLORS.shadow.regular};
`
const ImageContainer = styled.div`
  height: 180px;
  position: relative;
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
  margin: 8px 0 0;
  font-weight: 300;
  color: ${COLORS.green};
`
const Location = styled.h4`
  margin: 2px 0 0;
  font-weight: 300;
`
const Price = styled.div`
  margin: 12px 0 0;
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
  bottom: 32px;
  font-size: 0.8em;
  font-weight: 400;
`

interface Props {
  product: Product
  producer: Producer
}

const ProductCard = ({ product, producer }: Props) => {
  return (
    <Container>
      <Link href={`/annonce/${product.id}`}>
        <ImageContainer>
          <Image src={product.image} alt={product.title} layout="fill" objectFit="cover" />
        </ImageContainer>
        <Content>
          <Title>{product.title}</Title>
          <Producer>{producer.name}</Producer>
          <Location>{product.location}</Location>
          <Price>{formatPrice(product)}</Price>
          <PPU>{formatPricePerUnit(product)}</PPU>
          <Quantity>{formatQuantity(product)}</Quantity>
        </Content>
      </Link>
    </Container>
  )
}

export default ProductCard
