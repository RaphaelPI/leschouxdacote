import type { Product } from "src/types/model"

import React from "react"
import styled from "@emotion/styled"

import { COLORS } from "src/constants"
import Link from "src/components/Link"
import { FloatingTag } from "src/components/Tag"
import { formatPricePerUnit, formatQuantity, formatPrice } from "src/helpers/text"
import { useHover } from "src/helpers/hover"
import { isFollowed } from "src/helpers/user"
import { useUser } from "src/helpers/auth"

import IconHeartEmpty from "src/assets/icon-heart-empty.svg"
import IconHeart from "src/assets/icon-heart.svg"

const Container = styled.div<{ $hover: boolean }>`
  box-shadow: 0px 3px 3px ${({ $hover }) => ($hover ? COLORS.green : COLORS.shadow.light)};
`
const CardLink = styled(Link)`
  position: relative;
  display: block;
`
const Image = styled.img`
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
`
const Content = styled.div`
  padding: 8px 10px 6px;
  position: relative;
`

const FollowHover = styled.div`
  display: none;
  position: absolute;
  top: -40px;
  right: -5px;
  padding: 5px 10px;
  background-color: #101010;
  color: white;
  font-size: 10px;
`

const Follow = styled.div`
  position: absolute;
  top: -15px;
  right: 30px;
  padding: 10px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 3px 6px #00000029;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover + ${FollowHover} {
    display: block;
  }
`

const Title = styled.h2<{ $margin?: boolean }>`
  margin: ${({ $margin }) => ($margin ? "0 70px 0 0" : "0")};
  font-size: 1.4em;
`
const Producer = styled.h3`
  margin: 0.4em 0 0;
  font-weight: 300;
  color: ${COLORS.green};
`
const Location = styled.h4`
  margin: 0.1em 0 0;
  font-weight: 300;
`
const Price = styled.div`
  margin: 0.4em 0 0;
  font-size: 1.2em;
`
const PPU = styled.div`
  position: absolute;
  right: 10px;
  bottom: 6px;
  font-size: 1.2em;
  font-weight: 400;
`
const Quantity = styled.div`
  position: absolute;
  right: 10px;
  bottom: calc(10px + 2em);
  font-size: 0.8em;
  font-weight: 400;
`

interface Props {
  product: Product
  followButton?: boolean
}

export const ProductInfos = ({ product, followButton }: Props) => {
  const { user, toggleFollow } = useUser()
  const followed = isFollowed(product.uid, user)

  const handleFollow = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    toggleFollow(product.uid, !followed)
  }

  return (
    <CardLink href={`/annonce/${product.objectID}`}>
      <Image src={product.photo} alt="" />
      {product.bio && <FloatingTag>Bio / raisonnée</FloatingTag>}
      <Content>
        {followButton && (
          <>
            <Follow onClick={handleFollow}>{followed ? <IconHeart /> : <IconHeartEmpty />}</Follow>
            <FollowHover>{followed ? "Ne plus suivre le producteur" : "Suivre le producteur"}</FollowHover>
          </>
        )}

        <Title $margin={followButton}>{product.title}</Title>
        <Producer>{product.producer}</Producer>
        <Location>
          {product.city}
          {product.dpt && <> ({product.dpt})</>}
        </Location>
        <Price>{formatPrice(product)}</Price>
        {product.quantity && product.unit && (
          <>
            <PPU>{formatPricePerUnit(product)}</PPU>
            <Quantity>{formatQuantity(product)}</Quantity>
          </>
        )}
      </Content>
    </CardLink>
  )
}

const ProductCard = ({ product, followButton }: Props) => {
  const { productId, setProduct } = useHover()

  return (
    <Container
      onMouseOver={() => setProduct(product.objectID)}
      onMouseOut={() => setProduct(null)}
      $hover={productId === product.objectID}
    >
      <ProductInfos product={product} followButton={followButton} />
    </Container>
  )
}

export default ProductCard
