import type { GetStaticPaths, GetStaticProps } from "next"
import type { ParsedUrlQuery } from "querystring"

import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import Products from "src/components/Products"
import ProductCard from "src/cards/ProductCard"
import { getMapsLink } from "src/helpers/text"
import { firestore, getObject } from "src/helpers-api/firebase"
import { COLORS, SIZES } from "src/constants"

import PinIcon from "src/assets/pin.svg"

const Address = styled.a`
  font-size: ${SIZES.card}px;
  font-weight: 300;
  color: ${COLORS.input};
  svg {
    margin: 0 8px 0 24px;
  }
`

interface Params extends ParsedUrlQuery {
  id: string
}

interface Props {
  producer: Producer
  products: Product[]
}

const ProducerPage = ({ producer, products }: Props) => {
  return (
    <MainLayout title={producer.name} description={producer.description}>
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
          <ProductCard key={product.id} product={product} />
        ))}
      </Products>
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { docs } = await firestore.collection("producers").get()
  return {
    paths: docs.map((doc) => ({ params: { id: doc.id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const { id } = params as Params
  // https://github.com/vercel/next.js/issues/10933#issuecomment-598297975
  const producer = getObject(await firestore.collection("producers").doc(id).get()) as Producer
  const { docs } = await firestore.collection("products").where("uid", "==", id).get()
  const products = docs.map(getObject) as Product[]

  return {
    props: {
      producer,
      products,
    },
  }
}

export default ProducerPage