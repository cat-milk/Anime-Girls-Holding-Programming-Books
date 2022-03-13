import { useStaticQuery, graphql } from 'gatsby';
import { Directories, ImageFiles } from '../types';

const useAnimeImages = (): ImageFiles => {
  const data = useStaticQuery(graphql`
    query {
      allImages: allFile(sort: { order: ASC, fields: relativeDirectory }) {
        edges {
          node {
            name
            id
            relativePath
            childImageSharp {
              gatsbyImageData(
                width: 400
                placeholder: TRACED_SVG
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  `);
  return data;
};

export { useAnimeImages };
