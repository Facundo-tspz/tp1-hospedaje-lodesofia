import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
}

const SITE_NAME = 'Lo de Sofía - Hospedaje'
const SITE_URL = 'https://lo-de-sofia.netlify.app'
const DEFAULT_IMAGE = 'https://lo-de-sofia.netlify.app/hero-tinogasta.webp'

const SEO = ({ title, description, image, url }: SEOProps) => {
  const pageTitle = `${title} | ${SITE_NAME}`
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL
  const pageImage = image || DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
    </Helmet>
  )
}

export default SEO
