import { useStaticQuery, graphql } from 'gatsby';
import { AllImages, ImageQueryResponse } from '../types';

const useAnimeImages = (): AllImages => {
  const { allImages }: ImageQueryResponse = useStaticQuery(graphql`
    query {
      allImages: allFile(
        sort: { order: ASC, fields: relativeDirectory }
        filter: { sourceInstanceName: { eq: "images" } }
      ) {
        edges {
          node {
            name
            base
            id
            relativeDirectory
            childImageSharp {
              gatsbyImageData(
                width: 800
                placeholder: TRACED_SVG
                formats: [AUTO, JPG, PNG, AVIF]
              )
              original {
                src
              }
            }
          }
        }
      }
    }
  `);
  return allImages;
};

export { useAnimeImages };
