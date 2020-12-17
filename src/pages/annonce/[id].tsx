import styled from "styled-components"
import Image from "next/image"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"

import MainLayout from "src/layouts/MainLayout"
import { Text } from "src/components/Text"
import { COLORS, SIZES } from "src/constants"
import { formatAmount, getDecimalAmount, getIntegerAmount, getMapsLink } from "src/helpers/textHelper"
import Link from "src/components/Link"
import Products from "src/components/Products"
import ProductCard from "src/cards/ProductCard"

import PinIcon from "src/assets/pin.svg"

import { MOCK_PRODUCTS, MOCK_PRODUCERS } from "src/constants/mock"

const Top = styled.div`
  display: flex;
`
const Title = styled.h1`
  margin: 0;
`
const Data = styled.div`
  min-width: 200px;
`
const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${COLORS.shadow.light};
  margin: 24px 0;
  padding-top: 24px;
`
const Price = styled.div`
  display: flex;

  & > p:last-child {
    margin-top: 4px;
  }
`
const ImageContainer = styled.div`
  height: 250px;
  position: relative;
  flex: 1;
  max-width: 50vh;
  margin: 0 64px 32px 0;

  img {
    box-shadow: 0px 3px 6px ${COLORS.shadow.regular};
  }
`
const Address = styled.a`
  padding: 8px 0;
  svg {
    margin: 8px 8px 0 0;
    vertical-align: -2px;
  }
`

interface Params extends ParsedUrlQuery {
  id: string
}

interface Props {
  product: Product
  producer: Producer
  otherProducts: Product[]
}

const ProductPage = ({ product, producer, otherProducts }: Props) => {
  return (
    <MainLayout wide>
      <section>
        <Top>
          <ImageContainer>
            <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" />
          </ImageContainer>
          <Data>
            <Title>{product.name}</Title>
            <Text $size={SIZES.small}>
              {product.quantity} {product.unit}
            </Text>
            <PriceContainer>
              <Text $weight={100} $size={SIZES.subtitle}>
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
            </PriceContainer>
            <Link href="/producteur/gallines">{producer.name}</Link>
            <br />
            <Address href={getMapsLink(producer)} target="_blank">
              <PinIcon />
              <Text as="span" $color={COLORS.input}>
                {producer.address}
              </Text>
            </Address>
          </Data>
        </Top>
      </section>
      <section>
        <h2>Description</h2>
        <p>{producer.description}</p>
        <h2>E-mail</h2>
        <p>
          <a href={`mailto:${producer.email}`}>{producer.email}</a>
        </p>
        <h2>Téléphone</h2>
        <p>
          <a href={`tel:${producer.phone}`}>{producer.phone}</a>
        </p>
      </section>
      <section>
        <h2>Ce producteur vend aussi</h2>
        <Products $col={3}>
          {otherProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} producer={producer} />
          ))}
        </Products>
      </section>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
  const product = MOCK_PRODUCTS.find(({ id }) => id === params.id)
  const producer = MOCK_PRODUCERS[product.producer]
  const otherProducts = MOCK_PRODUCTS.filter((prod) => product.producer === prod.producer && prod.id !== product.id)

  return {
    props: {
      product,
      producer,
      otherProducts,
    },
  }
}

export default ProductPage
