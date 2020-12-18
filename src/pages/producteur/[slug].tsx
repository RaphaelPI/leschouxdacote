import type { GetStaticPaths, GetStaticProps } from "next"
import type { ParsedUrlQuery } from "querystring"

import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import Products from "src/components/Products"
import ProductCard from "src/cards/ProductCard"
import { getMapsLink } from "src/helpers/textHelper"
import { COLORS, SIZES } from "src/constants"

import PinIcon from "src/assets/pin.svg"

import { MOCK_PRODUCTS, MOCK_PRODUCERS } from "src/constants/mock"

const Address = styled.a`
  font-size: ${SIZES.card}px;
  font-weight: 300;
  color: ${COLORS.input};
  svg {
    margin: 0 8px 0 24px;
  }
`

interface Params extends ParsedUrlQuery {
  slug: string
}

interface Props {
  producer: Producer
  products: Product[]
}

const ProducerPage = ({ producer, products }: Props) => {
  return (
    <MainLayout wide>
      <h1>
        {producer.name}
        <Address href={getMapsLink(producer)} target="_blank">
          <PinIcon /> {producer.address}
        </Address>
      </h1>
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
      <h2>{products.length} annonces en ligne</h2>
      <Products $col={3}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} producer={producer} />
        ))}
      </Products>
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: Object.keys(MOCK_PRODUCERS).map((id) => ({ params: { slug: id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  return {
    props: {
      producer: MOCK_PRODUCERS[params.slug],
      products: MOCK_PRODUCTS.slice(0, 3),
    },
  }
}

export default ProducerPage
