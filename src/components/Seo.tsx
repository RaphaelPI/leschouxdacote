import Head from "next/head"

const config = {
  title: "Les choux d'à côté",
  description: "Un site super bien",
  author: {
    name: "LCDC inc",
    summary: "Mofo",
  },
  social: {
    twitter: "https://twitter.com/leschouxdacote",
  },
}

interface Props {
  title?: string
  description?: string
}

const SEO = ({ title, description }: Props) => {
  const pageTitle = title ? `${title} | ${config.title}` : config.title
  const pageDesc = description || config.description

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:site_name" content={config.title} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={config.social.twitter} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDesc} />
    </Head>
  )
}

export default SEO
