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
  noindex?: boolean
}

const SEO = ({ title, description, noindex }: SEOProps) => {
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
      <meta property="og:image" content={process.env.NEXT_PUBLIC_URL + "/og.jpg"} />
      <meta property="og:image:width" content="1342" />
      <meta property="og:image:height" content="657" />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={config.social.twitter} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDesc} />
      {noindex && <meta name="robots" content="noindex, follow" />}
    </Head>
  )
}

export default SEO
