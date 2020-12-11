import styled from "styled-components"
import Image from "next/image"

import { COLORS, SIZES } from "src/constants"
import { Text } from "src/components/Text"
import { formatAmount, getDecimalAmount, getIntegerAmount } from "src/helpers/textHelper"

const Container = styled.div`
  min-width: 300px;
  flex: 1;
  margin: 1em;
  box-shadow: 0px 3px 6px ${COLORS.shadow.regular};
`
const ImageContainer = styled.div`
  height: 180px;
  position: relative;
`
const Content = styled.div`
  padding: 10px 15px;
`
const ProductName = styled(Text)`
  margin-top: 16px;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`
const Price = styled.div`
  display: flex;

  & > p:last-child {
    margin-top: 4px;
  }
`

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={product.image} alt={product.desc} layout="fill" objectFit="cover" />
      </ImageContainer>
      <Content>
        <Text $weight={100}>{product.producer}</Text>
        <Text $size={SIZES.card}>{product.location}</Text>
        <ProductName $size={SIZES.subtitle}>{product.desc}</ProductName>
        <Bottom>
          <Text $weight={100} $size={SIZES.small}>
            {formatAmount(product.price)} / {product.unit}
          </Text>
          <Price>
            <Text $weight={600} $size={SIZES.price}>
              {getIntegerAmount(product.price)}
            </Text>
            <Text $weight={600} $size={SIZES.small}>
              .{getDecimalAmount(product.price)}
            </Text>
          </Price>
        </Bottom>
      </Content>
    </Container>
  )
}

export default ProductCard
