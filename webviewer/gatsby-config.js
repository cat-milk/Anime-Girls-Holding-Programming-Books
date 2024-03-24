/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: `Anime Girls Holding Programming Books`,
    siteUrl: `https://cat-milk.github.io/`,
  },
  pathPrefix: '/Anime-Girls-Holding-Programming-Books/',
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `..`,
        ignore: [
          '**/.*',
          '**/docs',
          '../**/node_modules/**',
          '../node_modules/**',
          '**/webviewer/**',
          '**/README.md',
          '**/CONTRIBUTING.md',
        ],
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
  ],
};
