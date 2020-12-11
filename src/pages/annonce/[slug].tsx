import { MOCK_DATA } from "src/constants/mock"
import styled from "styled-components"
import Image from "next/image"
import { GetServerSideProps } from "next"

import MainLayout from "src/layouts/MainLayout"
import { Text } from "src/components/Text"
import { COLORS, SIZES } from "src/constants"
import { formatAmount, getDecimalAmount, getIntegerAmount } from "src/helpers/textHelper"
import Link from "src/components/Link"

import PinIcon from "src/assets/pin.svg"
import Products from "src/components/Products"
import ProductCard from "src/cards/ProductCard"

const Top = styled.div`
  display: flex;
`
const H1 = styled.h1`
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

const ProductPage = ({ slug }) => {
  const product = MOCK_DATA[Number(slug)]

  return (
    <MainLayout wide>
      <section>
        <Top>
          <ImageContainer>
            <Image src={product.image} alt={product.desc} layout="fill" objectFit="cover" />
          </ImageContainer>
          <Data>
            <H1>{product.desc}</H1>
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
            <Link href="/jardins">{product.producer}</Link>
            <Address>
              <PinIcon />
              <Text $color={COLORS.input}>20 rue des choux, 31000 Ramonville</Text>
            </Address>
          </Data>
        </Top>
      </section>
      <section>
        <h2>Description</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequatnim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exLorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatnim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
        </p>
        <h2>E-mail</h2>
        <p>
          <a href="mailto:prenom.nom@gmail.com">prenom.nom@gmail.com</a>
        </p>
        <h2>Téléphone</h2>
        <p>
          <a href="tel:+33102030405">01 02 03 04 05</a>
        </p>
      </section>
      <section>
        <h2>Ce producteur vend aussi</h2>
        <Products $col={3}>
          {MOCK_DATA.slice(0, 3).map((_product) => (
            <ProductCard key={_product.id} product={_product} />
          ))}
        </Products>
      </section>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...context.params,
    }, // will be passed to the page component as props
  }
}

export default ProductPage
