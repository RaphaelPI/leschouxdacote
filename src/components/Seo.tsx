import Head from "next/head"

const CONFIG = {
  title: "Les Choux d'à Côté",
  tagline: "L'alimentaire sans intermédiaire",
  description:
    "1ère plateforme d’annonces alimentaire pour la vente directe. Achetez directement aux producteurs locaux. Vendez directement aux clients.",
  image: process.env.NEXT_PUBLIC_URL + "/opengraph.jpg",
  social: {
    twitter: "https://twitter.com/leschouxdacote",
  },
}

export interface SEOProps {
  title?: string
  description?: string
  image?: string
  noindex?: boolean
}

const SEO = ({ title, description, image, noindex }: SEOProps) => {
  const pageTitle = title ? `${title} | ${CONFIG.title}` : `${CONFIG.title} | ${CONFIG.tagline}`
  const pageDesc = description || CONFIG.description

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:site_name" content={CONFIG.title} />
      <meta property="og:image" content={image || CONFIG.image} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={CONFIG.social.twitter} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDesc} />
      {noindex && <meta name="robots" content="noindex, follow" />}
    </Head>
  )
}

export default SEO
