import { useState } from "react"
import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import { useUser } from "src/helpers/auth"
import { COLORS, SIZES } from "src/constants"
import { useQuery } from "src/helpers/firebase"
import AccountProduct from "src/components/AccountProduct"

const Titles = styled.div`
  text-align: center;
  h1,
  h2 {
    margin: 0 0 10px;
  }
`

type Tab = "all" | "online" | "disabled"

const Tab = styled.button<{ $active: boolean }>`
  background-color: transparent;
  border: none;
  color: ${({ $active }) => ($active ? COLORS.green : COLORS.dark)};
  padding: 0;
  font-size: ${SIZES.large}px;
  &:not(:last-of-type) {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid ${COLORS.dark};
  }
`

const TABS: { id: Tab; title: string }[] = [
  { id: "all", title: "Toutes mes annonces" },
  { id: "online", title: "Annonces en ligne" },
  { id: "disabled", title: "Annonces désactivées" },
]

const MyAdsPage = () => {
  const { producer } = useUser()
  const [tab, setTab] = useState<Tab>("all")

  const { data } = useQuery<Product>("products", producer ? ["uid", "==", producer.objectID] : false, true)

  const now = Date.now()
  const tabsData: Record<Tab, Product[]> = {
    all: data,
    online: data.filter(({ expires }) => expires && expires > now),
    disabled: data.filter(({ expires }) => !expires || expires <= now),
  }

  return (
    <MainLayout title="Mes annonces" noindex>
      <Titles>
        <h1>Mon compte</h1>
        <h2>{producer?.name}</h2>
      </Titles>
      <h3>Mes annonces</h3>
      <div>
        {TABS.map(({ id, title }) => (
          <Tab key={id} $active={id === tab} onClick={() => setTab(id)}>
            {title} ({tabsData[id].length})
          </Tab>
        ))}
      </div>
      {tabsData[tab].map((product, index) => (
        <AccountProduct key={product.objectID} product={product} odd={index % 2 === 0} />
      ))}
    </MainLayout>
  )
}

export default MyAdsPage
