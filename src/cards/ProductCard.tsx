import styled from "styled-components"
import Image from "next/image"

import { COLORS, SIZES } from "src/constants"
import { Text } from "src/components/Text"
import { formatAmount, getDecimalAmount, getIntegerAmount } from "src/helpers/textHelper"
import Link from "src/components/Link"

const Container = styled.div`
  box-shadow: 0px 3px 6px ${COLORS.shadow.regular};
`
const ImageContainer = styled.div`
  height: 180px;
  position: relative;
`
const Content = styled.div`
  padding: 16px;
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
  producer: Producer
}

const ProductCard = ({ product, producer }: Props) => {
  const href = `/annonce/${product.id}`

  return (
    <Container>
      <Link href={href}>
        <ImageContainer>
          <Image src={product.image} alt={product.desc} layout="fill" objectFit="cover" />
        </ImageContainer>
        <Content>
          <Text $weight={100}>{producer.name}</Text>
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
      </Link>
    </Container>
  )
}

export default ProductCard
