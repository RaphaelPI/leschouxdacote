import { useRouter } from "next/router"

import MainLayout from "src/layouts/MainLayout"

const SearchPage = () => {
  const router = useRouter()
  const { what, where } = router.query

  return (
    <MainLayout>
      <div>{what}</div>
      <div>{where}</div>
    </MainLayout>
  )
}

export default SearchPage
