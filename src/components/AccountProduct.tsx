import { useState } from "react"
import styled from "styled-components"

import { Button } from "src/components/Button"
import Link from "src/components/Link"
import Modal from "src/components/Modal"
import { Form, BasicInput, SubmitButton } from "src/components/Form"
import ProductEndDate from "src/components/ProductEndDate"
import { formatAmount, formatQuantity } from "src/helpers/text"
import { formatDate, daysFromNow } from "src/helpers/date"
import api from "src/helpers/api"
import { COLORS, SIZES } from "src/constants"

import EditIcon from "src/assets/edit.svg"
import DeleteIcon from "src/assets/delete.svg"

const Container = styled.div<{ $odd?: boolean }>`
  margin: 20px 0;
  background-color: ${({ $odd }) => ($odd ? COLORS.odd : COLORS.white)};
  padding: 20px;
`
const Ad = styled.div`
  display: flex;
  padding-bottom: 17px;
  border-bottom: 1px solid ${COLORS.border};
  margin-bottom: 15px;
  position: relative;
`
const Image = styled.div`
  width: 200px;
  height: 120px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`
const Infos = styled.div`
  margin: 0 20px;
  h4 {
    font-size: 18px;
    font-weight: normal;
    margin: 0 0 5px;
  }
`
const Days = styled.div`
  margin: 15px 0;
  color: ${COLORS.grey};
`
const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  a {
    display: inline-block;
    padding: 1px 6px;
  }
  button {
    border: none;
    background-color: transparent;
  }
`
const End = styled.div`
  font-weight: 400;
`
const Bottom = styled.div`
  position: relative;
  button {
    margin: 10px 10px 0 0;
  }
  em {
    font-size: ${SIZES.regular}px;
  }
`
const Status = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  color: ${({ $active }) => ($active ? COLORS.green : COLORS.red)};
  font-weight: 400;
  font-size: ${SIZES.large}px;
  &::before {
    content: "";
    background-color: ${({ $active }) => ($active ? COLORS.green : COLORS.red)};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: 0;
    margin-right: 12px;
  }
`
const Input = styled(BasicInput)`
  width: 65px;
  padding: 10px;
`

interface Props {
  product: Product
  odd?: boolean
}

const AccountProduct = ({ product, odd }: Props) => {
  const [modal, setModal] = useState<null | "publish" | "disable" | "delete">(null)
  const infos = [formatAmount(product.price), formatQuantity(product), product.city]
  const active = product.expires ? product.expires > Date.now() : false

  const handlePublish: Submit<{ days: string }> = async (data) => {
    const days = Number(data.days)
    if (days) {
      const payload: Publish = { id: product.id, days }
      await api.post("publish", payload)
    }
    setModal(null)
  }

  const handleDisable: Submit<never> = async () => {
    const payload: Publish = { id: product.id }
    await api.put("publish", payload)
    setModal(null)
  }

  const handleDelete: Submit<never> = async () => {
    const payload: Publish = { id: product.id }
    await api.delete("publish", payload)
    setModal(null)
  }

  const handleClose = () => setModal(null)

  return (
    <Container $odd={odd}>
      <Ad>
        <Image>
          <img src={product.photo} />
        </Image>
        <Infos>
          <h4>{product.title}</h4>
          <div>{infos.filter((info) => info).join(" | ")}</div>
          <Days>
            Annonce créée le {formatDate(product.created)}
            {product.updated && <> et modifiée le {formatDate(product.updated)}</>}
          </Days>
        </Infos>
        <Actions>
          <Link href={`/modifier/${product.id}`}>
            <EditIcon />
          </Link>
          <button onClick={() => setModal("delete")}>
            <DeleteIcon />
          </button>
        </Actions>
      </Ad>
      {active ? (
        <Bottom>
          <End>
            La publication se termine le {formatDate(product.expires)} ({daysFromNow(product.expires)})
          </End>
          <Button $variant="green" onClick={() => setModal("publish")}>
            Ajouter des jours
          </Button>
          <Button onClick={() => setModal("disable")}>Désactiver l’annonce</Button>
          <em>Vous pourrez la réactiver à tout moment</em>
          <Status $active={true}>Annonce en ligne</Status>
        </Bottom>
      ) : (
        <Bottom>
          <End>La publication est désactivée</End>
          <Button $variant="green" onClick={() => setModal("publish")}>
            Publier l’annonce
          </Button>
          <Status $active={false}>Annonce désactivée</Status>
        </Bottom>
      )}
      {modal && (
        <Modal onClose={handleClose}>
          {modal === "publish" && (
            <Form onSubmit={handlePublish}>
              <p>
                Publier l’annonce pour une durée de{" "}
                <Input type="number" name="days" min={0} step={1} defaultValue={0} /> jour(s) supplémentaires
              </p>
              <ProductEndDate start={product.expires} />
              <SubmitButton />
            </Form>
          )}
          {modal === "disable" && (
            <Form onSubmit={handleDisable}>
              <p>Désactiver l’anonce ?</p>
              <SubmitButton />
            </Form>
          )}
          {modal === "delete" && (
            <Form onSubmit={handleDelete}>
              <p>Supprimer l’anonce ?</p>
              <SubmitButton />
            </Form>
          )}
        </Modal>
      )}
    </Container>
  )
}

export default AccountProduct
