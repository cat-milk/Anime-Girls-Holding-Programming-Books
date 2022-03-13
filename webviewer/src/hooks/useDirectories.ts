import { useStaticQuery, graphql } from 'gatsby';
import { Directories, ImageFiles } from '../types';

export const useDirectories = (): Directories => {
  const data: Directories = useStaticQuery(graphql`
    query {
      allDirectory(filter: { sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            name
            relativePath
          }
        }
      }
    }
  `);
  return data;
};
