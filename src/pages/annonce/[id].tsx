import styled from "styled-components"
import Image from "next/image"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"

import MainLayout from "src/layouts/MainLayout"
import { Text } from "src/components/Text"
import { COLORS, SIZES } from "src/constants"
import { formatAmount, getDecimalAmount, getIntegerAmount } from "src/helpers/textHelper"
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
const Address = styled.div`
  display: flex;
  padding: 8px 0;

  svg {
    margin-right: 8px;
  }
`

interface Params extends ParsedUrlQuery {
  id: string
}

const ProductPage = ({ id }: Params) => {
  const product = MOCK_PRODUCTS[Number(id)]
  const producer = MOCK_PRODUCERS[product.producer]

  return (
    <MainLayout wide>
      <section>
        <Top>
          <ImageContainer>
            <Image src={product.image} alt={product.desc} layout="fill" objectFit="cover" />
          </ImageContainer>
          <Data>
            <Title>{product.desc}</Title>
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
            <Address>
              <PinIcon />
              <Text $color={COLORS.input}>{producer.address}</Text>
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
          {MOCK_PRODUCTS.slice(0, 3).map((_product) => (
            <ProductCard key={_product.id} product={_product} producer={producer} />
          ))}
        </Products>
      </section>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Params, Params> = async ({ params }) => {
  return {
    props: params, // map query params to component props
  }
}

export default ProductPage
