import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import Products from "src/components/Products"
import ProductCard from "src/cards/ProductCard"

import PinIcon from "src/assets/pin.svg"

import { MOCK_PRODUCTS, MOCK_PRODUCERS } from "src/constants/mock"

const Address = styled.a`
  font-size: 18px;
  font-weight: 300;
  margin-left: 24px;
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
        <Address href={`https://www.google.com/maps/search/${encodeURIComponent(producer.address)}/`}>
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
    paths: [{ params: { slug: MOCK_PRODUCTS[0].producer } }],
    fallback: true,
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
