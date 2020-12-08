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
  description?: string
  title?: string
}

const SEO = ({ description, title }: Props) => {
  const siteTitle = title || config.title

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description || config.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={config.social.twitter} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
    </Head>
  )
}

export default SEO
