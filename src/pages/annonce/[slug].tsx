import { MOCK_DATA } from "src/constants/mock"
import styled from "styled-components"
import Image from "next/image"
import { GetServerSideProps } from "next"

import MainLayout from "src/layouts/MainLayout"
import { Text } from "src/components/Text"
import { COLORS } from "src/constants"

const Top = styled.div`
  display: flex;
`
const Data = styled.div`
  margin-left: 24px;
`
const ImageContainer = styled.div`
  height: 250px;
  position: relative;
  flex: 1;
  max-width: 50vh;

  img {
    box-shadow: 0px 3px 6px ${COLORS.shadow.regular};
    border-radius: 6px;
  }
`

const ProductPage = ({ slug }) => {
  const product = MOCK_DATA[parseInt(slug as string)]

  return (
    <MainLayout wide>
      <section>
        <Top>
          <ImageContainer>
            <Image src={product.image} alt={product.desc} layout="fill" objectFit="cover" />
          </ImageContainer>

          <Data>
            <h1>{product.desc}</h1>
            <Text>
              {product.quantity} {product.unit}
            </Text>
          </Data>
        </Top>
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
