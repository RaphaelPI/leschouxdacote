import type { GetServerSideProps } from "next"
import type { ParsedUrlQuery } from "querystring"

import styled from "@emotion/styled"

import ErrorPage from "src/pages/_error"
import Layout from "src/layout"
import Products from "src/components/Products"
import ProductCard from "src/cards/ProductCard"
import { formatPhone, getMapsLink } from "src/helpers/text"
import { firestore, getObject } from "src/helpers-api/firebase"
import { COLORS, SIZES, LAYOUT } from "src/constants"

import PinIcon from "src/assets/pin.svg"

const Title = styled.h1`
  a {
    font-size: ${SIZES.card}px;
    font-weight: 300;
    color: ${COLORS.input};
  }
  @media (min-width: ${LAYOUT.mobile}px) {
    br {
      display: none;
    }
    svg {
      margin: 0 8px 0 24px;
    }
  }
`
const Description = styled.p`
  white-space: pre-line;
`

interface Params extends ParsedUrlQuery {
  id: string
}

interface Props {
  producer: Producer | null
  products?: Product[]
}

const ProducerPage = ({ producer, products }: Props) => {
  if (!producer) {
    return <ErrorPage statusCode={404} title="Producteur introuvable" />
  }

  return (
    <Layout title={producer.name} description={producer.description}>
      <Title>
        {producer.name}
        <br />
        <a href={getMapsLink(producer)} target="_blank" rel="noopener">
          <PinIcon /> {producer.address}
        </a>
      </Title>
      <h2>Description</h2>
      <Description>{producer.description}</Description>
      <h2>E-mail</h2>
      <p>
        <a href={`mailto:${producer.email}`}>{producer.email}</a>
      </p>
      <h2>Téléphone</h2>
      <p>
        <a href={`tel:${producer.phone}`}>{formatPhone(producer.phone)}</a>
      </p>
      {products && (
        <>
          <h2>{products.length} annonces en ligne</h2>
          <Products $col={3}>
            {products.map((product) => (
              <ProductCard key={product.objectID} product={product} />
            ))}
          </Products>
        </>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params, res }) => {
  const { id } = params as Params
  const producer = getObject<Producer>(await firestore.collection("producers").doc(id).get())

  const props: Props = { producer }

  if (producer) {
    const { docs } = await firestore.collection("products").where("uid", "==", id).get()
    const now = Date.now()
    props.products = (docs.map(getObject) as Product[]).filter(({ expires }) => expires && expires > now)
  } else {
    res.statusCode = 404
  }

  res.setHeader("cache-control", "s-maxage=1, stale-while-revalidate")

  return { props }
}

export default ProducerPage
