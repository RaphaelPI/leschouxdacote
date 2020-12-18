import Head from "next/head"

const config = {
  title: "Les choux d'à côté",
  tagline: "L'alimentaire sans intermédiaire",
  description: "Producteurs et acheteurs, pratiquez le circuit court !",
  social: {
    twitter: "https://twitter.com/leschouxdacote",
  },
}

export interface SEOProps {
  title?: string
  description?: string
}

const SEO = ({ title, description }: SEOProps) => {
  const pageTitle = title ? `${title} | ${config.title}` : `${config.title} | ${config.tagline}`
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
