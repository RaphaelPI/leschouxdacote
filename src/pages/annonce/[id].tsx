import type { GetServerSideProps } from "next"
import type { ParsedUrlQuery } from "querystring"

import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import { Text } from "src/components/Text"
import { COLORS, SIZES } from "src/constants"
import { getMapsLink, formatPricePerUnit, formatQuantity, formatPrice } from "src/helpers/text"
import Link from "src/components/Link"
import Products from "src/components/Products"
import ProductCard from "src/cards/ProductCard"

import PinIcon from "src/assets/pin.svg"
import { firestore, getObject } from "src/helpers-api/firebase"

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
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0px 3px 6px ${COLORS.shadow.light};
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
  const price = formatPrice(product)
  const pricePerUnit = formatPricePerUnit(product)
  const description = `${pricePerUnit || price} chez ${producer.name} à ${product.city}`

  const priceParts = price.split(",")

  return (
    <MainLayout title={product.title} description={description}>
      <section>
        <Top>
          <ImageContainer>
            <img src={product.photo} alt={product.title} />
          </ImageContainer>
          <Data>
            <Title>{product.title}</Title>
            {product.quantity && product.unit && <Text $size={SIZES.small}>{formatQuantity(product)}</Text>}
            <PriceContainer>
              {pricePerUnit && (
                <Text $weight={100} $size={SIZES.subtitle}>
                  {pricePerUnit}
                </Text>
              )}
              <Price>
                <Text $weight={600} $size={SIZES.price}>
                  {priceParts[0]}
                </Text>
                <Text $weight={600} $size={SIZES.small}>
                  .{priceParts[1]}
                </Text>
              </Price>
            </PriceContainer>
            <Link href={`/producteur/${producer.objectID}`}>{producer.name}</Link>
            <br />
            <Address href={getMapsLink(product)} target="_blank">
              <PinIcon />
              <Text as="span" $color={COLORS.input}>
                {product.address}
              </Text>
            </Address>
          </Data>
        </Top>
      </section>

      <section>
        <h2>Description</h2>
        <p>{product.description}</p>
        {product.email && (
          <>
            <h2>E-mail</h2>
            <p>
              <a href={`mailto:${product.email}`}>{product.email}</a>
            </p>
          </>
        )}
        {product.phone && (
          <>
            <h2>Téléphone</h2>
            <p>
              <a href={`tel:${product.phone}`}>{product.phone}</a>
            </p>
          </>
        )}
      </section>

      {otherProducts.length > 0 && (
        <section>
          <h2>Ce producteur vend aussi</h2>
          <Products $col={3}>
            {otherProducts.map((prod) => (
              <ProductCard key={prod.objectID} product={prod} />
            ))}
          </Products>
        </section>
      )}
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
  const { id } = params as Params
  const product = getObject(await firestore.collection("products").doc(id).get()) as Product
  const producer = getObject(await firestore.collection("producers").doc(product.uid).get()) as Producer

  const { docs } = await firestore.collection("products").where("uid", "==", product.uid).get()
  const otherProducts = (docs.map(getObject) as Product[]).filter(({ objectID }) => objectID !== product.objectID)

  return {
    props: {
      product,
      producer,
      otherProducts,
    },
  }
}

export default ProductPage
