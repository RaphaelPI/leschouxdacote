import { useState } from "react"
import styled from "@emotion/styled"

import Layout from "src/layout"
import { useUser } from "src/helpers/auth"
import { COLORS, SIZES, LAYOUT } from "src/constants"
import { useQuery } from "src/helpers/firebase"
import AccountProduct from "src/components/AccountProduct"
import { Product } from "src/types/model"

type Tab = "all" | "online" | "disabled"

const Title = styled.h1`
  text-align: center;
  @media (max-width: ${LAYOUT.mobile}px) {
    display: none;
  }
`
const Tabs = styled.div`
  margin-bottom: 20px;
`
const Tab = styled.button<{ $active: boolean }>`
  background-color: transparent;
  border: none;
  color: ${({ $active }) => ($active ? COLORS.green : COLORS.dark)};
  padding: 0;
  font-size: ${SIZES.large}px;
  @media (max-width: ${LAYOUT.mobile}px) {
    margin-bottom: 8px;
  }
  @media (min-width: ${LAYOUT.mobile}px) {
    &:not(:last-of-type) {
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid ${COLORS.dark};
    }
  }
`

const TABS: { id: Tab; title: string }[] = [
  { id: "all", title: "Toutes mes annonces" },
  { id: "online", title: "Annonces en ligne" },
  { id: "disabled", title: "Annonces désactivées" },
]

const MyAdsPage = () => {
  const { user: producer } = useUser()
  const [tab, setTab] = useState<Tab>("all")

  const { data } = useQuery<Product>("products", producer ? ["uid", "==", producer.objectID] : false, true)

  const now = Date.now()
  const tabsData: Record<Tab, Product[]> = {
    all: data,
    online: data.filter(({ expires }) => expires && expires > now),
    disabled: data.filter(({ expires }) => !expires || expires <= now),
  }

  return (
    <Layout title="Mes annonces" noindex>
      <Title>Mes annonces</Title>
      <Tabs>
        {TABS.map(({ id, title }) => (
          <Tab key={id} $active={id === tab} onClick={() => setTab(id)}>
            {title} ({tabsData[id].length})
          </Tab>
        ))}
      </Tabs>
      {tabsData[tab].map((product, index) => (
        <AccountProduct key={product.objectID} product={product} odd={index % 2 === 0} />
      ))}
    </Layout>
  )
}

export default MyAdsPage
