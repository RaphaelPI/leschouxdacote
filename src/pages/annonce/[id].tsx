import type { GetServerSideProps } from "next"
import type { ParsedUrlQuery } from "querystring"
import type { Product, User } from "src/types/model"

import { Button } from "@mui/material"
import styled from "@emotion/styled"

import ErrorPage from "src/pages/_error"
import Layout from "src/layout"
import { COLORS, LAYOUT, SIZES, SSR_CACHE_HEADER } from "src/constants"
import { formatPricePerUnit, formatPrice, formatQuantity, getMapsLink, formatPhone } from "src/helpers/text"
import { firestore, getObject } from "src/helpers-api/firebase"
import { Text } from "src/components/Text"
import Products from "src/components/Products"
import Link from "src/components/Link"
import ProductCard from "src/cards/ProductCard"
import { useUser } from "src/helpers/auth"
import { isFollowed } from "src/helpers/user"

import PinIcon from "src/assets/pin.svg"
import IconHeartEmpty from "src/assets/icon-heart-empty.svg"
import IconHeart from "src/assets/icon-heart.svg"

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 4rem;

  @media (max-width: ${LAYOUT.mobile}px) {
    padding: 30px 10px;
  }
`

const TopSection = styled.div`
  display: flex;
  gap: 80px;

  @media (max-width: ${LAYOUT.tablet}px) {
    gap: 30px;
  }

  @media (max-width: 1040px) {
    flex-direction: column;
    gap: 30px;
  }
`

const ProductColumn = styled.div`
  flex: 1;
`

const BottomSection = styled.section`
  margin-top: 40px;
  @media (max-width: ${LAYOUT.mobile}px) {
    width: 100%;
  }
`

const ProductSection = styled.section`
  display: flex;
  gap: 10px;
  box-shadow: 20px 20px 60px ${COLORS.shadow.light};
  border-radius: 6px;

  @media (max-width: ${LAYOUT.mobile}px) {
    flex-direction: column;
    width: 100%;
  }
`

const ImageContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;

  img {
    max-width: 100%;
    height: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0px 3px 6px ${COLORS.shadow.light};
    display: block;

    @media (max-width: ${LAYOUT.mobile}px) {
      max-height: 50vh;
    }
  }
`

const ProductInfo = styled.div`
  padding: 20px;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`

const ProductTitle = styled.h1`
  margin-bottom: 10px;
  text-align: center;
`

const Prices = styled.div`
  flex: 1;
  width: 270px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 0 20px;
  margin-top: 10px;

  @media (max-width: ${LAYOUT.mobile}px) {
    border: none;
  }
`

const Address = styled.a`
  margin-top: 10px;
  svg {
    margin: 8px 8px 0 0;
    vertical-align: -2px;
  }
`

const ProducerBox = styled.section`
  background-color: white;
  box-shadow: 20px 20px 60px ${COLORS.shadow.light};
  border-radius: 6px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ProducerTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

const Label = styled.div`
  font-weight: bold;
  margin-top: 30px;
`

const Info = styled.p``

const FollowButton = styled(Button)`
  margin: 20px auto 10px;
  background-color: white;
  color: #f21414;
  text-transform: none;
  font-weight: 300;
  &:hover {
    background-color: white;
  }
`

const DescriptionSection = styled.section`
  background-color: white;
  box-shadow: 20px 20px 60px ${COLORS.shadow.light};
  border-radius: 6px;
  margin-top: 30px;
  padding: 20px 25px;

  @media (max-width: ${LAYOUT.mobile}px) {
    padding: 30px 10px;
  }
`

const DescriptionTitle = styled.h3`
  font-size: ${SIZES.large}px;
  font-weight: bold;
  margin-top: 0;
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
  const { user, toggleFollow } = useUser()

  if (!product) {
    return <ErrorPage statusCode={404} title="Produit introuvable" />
  }
  if (!producer) {
    return <ErrorPage statusCode={404} title="Producteur introuvable" />
  }

  const price = formatPrice(product)
  const pricePerUnit = formatPricePerUnit(product)
  const description = `${pricePerUnit || price} chez ${producer.name} à ${product.city}`

  const followed = isFollowed(product.uid, user)

  return (
    <Layout title={product.title} description={description} fullWidth={true}>
      <Wrapper>
        <TopSection>
          <ProductColumn>
            <ProductSection>
              <ImageContainer>
                <img src={product.photo} alt={product.title} />
              </ImageContainer>
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                {product.quantity && product.unit && (
                  <Text $size={SIZES.card} $color={COLORS.input}>
                    {formatQuantity(product)}
                  </Text>
                )}

                <Prices>
                  {pricePerUnit && (
                    <Text $size={SIZES.card} $color={COLORS.input}>
                      {pricePerUnit}
                    </Text>
                  )}
                  <Text $weight={400} $color={COLORS.green} $size={30}>
                    {price}
                  </Text>
                </Prices>

                <Address href={getMapsLink(product)} target="_blank" rel="noopener">
                  <PinIcon />
                  <Text as="span" $color={COLORS.input} $size={15}>
                    {product.address}
                  </Text>
                </Address>
              </ProductInfo>
            </ProductSection>
            <DescriptionSection>
              <DescriptionTitle>Description</DescriptionTitle>
              <Text $size={SIZES.card} $color={COLORS.input}>
                {product.description}
              </Text>
            </DescriptionSection>
          </ProductColumn>
          <ProducerBox>
            <div>
              <ProducerTitle>
                <Link href={`/producteur/${producer.objectID}`}>{producer.name}</Link>
              </ProducerTitle>

              <Label>Email</Label>
              <Info>
                <a href={`mailto:${producer.email}`} target="_blank" rel="noreferrer">
                  {producer.email}
                </a>
              </Info>

              <Label>Téléphone</Label>
              <Info>
                <a href={`tel:${producer.phone}`}>{formatPhone(producer.phone)}</a>
              </Info>
            </div>

            <FollowButton
              onClick={() => toggleFollow(product?.uid, !followed)}
              variant="contained"
              startIcon={followed ? <IconHeart /> : <IconHeartEmpty />}
            >
              {followed ? "Ne plus suivre le producteur" : "Suivre le producteur"}
            </FollowButton>
          </ProducerBox>
        </TopSection>
        <BottomSection>
          {otherProducts && otherProducts.length > 0 && (
            <>
              <h2>Ce producteur vend aussi</h2>
              <Products $col={4}>
                {otherProducts.map((prod) => (
                  <ProductCard key={prod.objectID} product={prod} />
                ))}
              </Products>
            </>
          )}
        </BottomSection>
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
