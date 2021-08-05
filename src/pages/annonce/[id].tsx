import type { GetServerSideProps } from "next"
import type { ParsedUrlQuery } from "querystring"

import styled from "@emotion/styled"

import ErrorPage from "src/pages/_error"
import Layout from "src/layout"
import { COLORS, LAYOUT, SIZES, SSR_CACHE_HEADER } from "src/constants"
import { formatPricePerUnit, formatPrice, formatQuantity, getMapsLink } from "src/helpers/text"
import { firestore, getObject } from "src/helpers-api/firebase"
import { Product, User } from "src/types/model"
import { ButtonLink } from "src/components/Link"
import { Text } from "src/components/Text"
import PinIcon from "src/assets/pin.svg"
import Products from "src/components/Products"
import ProductCard from "src/cards/ProductCard"

const Wrapper = styled.div`
  display: flex;
  gap: 100px;
  padding: 4rem 5rem;

  @media (max-width: ${LAYOUT.mobile}px) {
    padding: 30px 10px;
    flex-direction: column;
    gap: 30px;
  }
`

const ProductSection = styled.section`
  display: flex;
  gap: 50px;
  flex-direction: row;
  background-color: white;
  box-shadow: 20px 20px 60px #00000014;
  border-radius: 4px;
  flex: 1;

  @media (max-width: ${LAYOUT.mobile}px) {
    flex-direction: column;
  }
`

const ProductInfo = styled.div`
  margin-top: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`

const ProductTitle = styled.h1`
  margin-bottom: 10px;
  text-align: center;
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;
`

const Price = styled.div`
  display: flex;
`

const ProducerSection = styled.section`
  background-color: white;
  box-shadow: 20px 20px 60px #00000014;
  border-radius: 4px;
  padding: 20px 30px;
  height: fit-content;
`

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

const Description = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`

const ProducerInfo = styled.div`
  margin-top: 40px;
`

const ProducerFollow = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`

const Label = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`

const Info = styled.span`
  padding-bottom: 15px;
  display: block;
`

const ImageContainer = styled.div`
  position: relative;
  flex: 0.6;

  img {
    max-width: 100%;
    height: auto;
    max-height: 50vh;
    object-fit: contain;
    border-radius: 6px;
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

const DescriptionSection = styled.section`
  background-color: white;
  box-shadow: 20px 20px 60px #00000014;
  border-radius: 4px;
  margin-top: 30px;
  padding: 20px 50px;

  @media (max-width: ${LAYOUT.mobile}px) {
    padding: 30px 10px;
  }
`

const OtherProducts = styled.section`
  margin-top: 40px;
`
interface Params extends ParsedUrlQuery {
  id: string
}

interface Props {
  product: Product | null
  producer: User | null
  otherProducts?: Product[]
}

const ProductPage = ({ product, producer, otherProducts }: Props) => {
  if (!product) {
    return <ErrorPage statusCode={404} title="Produit introuvable" />
  }
  if (!producer) {
    return <ErrorPage statusCode={404} title="Producteur introuvable" />
  }

  const price = formatPrice(product)
  const pricePerUnit = formatPricePerUnit(product)
  const description = `${pricePerUnit || price} chez ${producer.name} à ${product.city}`

  const priceParts = price.split(",")

  return (
    <Layout title={product.title} description={description} fullWidth={true}>
      <Wrapper>
        <div>
          <ProductSection>
            <ImageContainer>
              <img src={product.photo} alt={product.title} />
            </ImageContainer>
            <ProductInfo>
              <div>
                <ProductTitle>{product.title}</ProductTitle>
                {product.quantity && product.unit && (
                  <Text $size={SIZES.card} $color={COLORS.input}>
                    {formatQuantity(product)}
                  </Text>
                )}
              </div>

              <PriceContainer>
                {pricePerUnit && (
                  <Text $size={SIZES.card} $color={COLORS.input}>
                    {pricePerUnit}
                  </Text>
                )}
                <Price>
                  <Text as="span" $weight={400} $color={COLORS.green} $size={30}>
                    {priceParts[0]}
                  </Text>
                  <Text as="span" $weight={400} $color={COLORS.green} $size={30}>
                    ,{priceParts[1]}
                  </Text>
                </Price>
              </PriceContainer>

              <Address href={getMapsLink(product)} target="_blank" rel="noopener">
                <PinIcon />
                <Text as="span" $color={COLORS.input} $size={15}>
                  {product.address}
                </Text>
              </Address>
            </ProductInfo>
          </ProductSection>

          <DescriptionSection>
            <Description>Description</Description>
            <Text $size={SIZES.card} $color={COLORS.input}>
              {product.description}
            </Text>
          </DescriptionSection>

          {otherProducts && otherProducts.length > 0 && (
            <OtherProducts>
              <h2>Ce producteur vend aussi</h2>
              <Products $col={3}>
                {otherProducts.map((prod) => (
                  <ProductCard key={prod.objectID} product={prod} />
                ))}
              </Products>
            </OtherProducts>
          )}
        </div>

        <ProducerSection>
          <Title>{producer.name}</Title>
          <ProducerInfo>
            <Label>Email</Label>
            <Info>{producer.email}</Info>

            <Label>Téléphone</Label>
            <Info>{producer.phone}</Info>
            <ProducerFollow>
              <ButtonLink href="/compte/producteur/annonce" $variant="green">
                Créer une annonce
              </ButtonLink>
            </ProducerFollow>
          </ProducerInfo>
        </ProducerSection>
      </Wrapper>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params, res }) => {
  const { id } = params as Params
  const product = getObject<Product>(await firestore.collection("products").doc(id).get())
  const producer = product && getObject<User>(await firestore.collection("users").doc(product.uid).get())

  const props: Props = { product, producer }

  if (product && producer) {
    const { docs } = await firestore.collection("products").where("uid", "==", product.uid).get()
    const now = Date.now()
    props.otherProducts = (docs.map(getObject) as Product[]).filter(
      ({ objectID, expires }) => objectID !== product.objectID && expires && expires > now
    )
  } else {
    res.statusCode = 404
  }

  res.setHeader("cache-control", SSR_CACHE_HEADER)

  return { props }
}

export default ProductPage
