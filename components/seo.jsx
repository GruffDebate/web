import React from 'react'
import Helmet from 'react-helmet'

// eslint-disable-next-line react/prop-types
function SEO({ description, lang, meta, keywords, title, image, url }) {
  const metaTitle = title
  const metaDescription = description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s | ${metaTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `apple-mobile-web-app-status-bar-style`,
          content: `black-translucent`,
        },
        {
          name: `apple-mobile-web-app-title`,
          content: `Gruff`,
        },
        {
          name: `apple-mobile-web-app-capable`,
          content: `yes`,
        },
        {
          name: `mobile-web-app-capable`,
          content: `yes`,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          property: `og:site_name`,
          content: `gruff.org`,
        },
        {
          property: `og:url`,
          content: `gruff.org`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: 'gruff',
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : [],
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

export default SEO
