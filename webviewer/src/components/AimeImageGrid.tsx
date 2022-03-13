import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import AnimeImage from './AnimeImage';
import { ImageFiles } from '../types';
import { ImagesContext } from './Layout';

const AnimeImageGrid: React.FC = () => {
  const images = useContext(ImagesContext);
  console.log(images);
  const data: ImageFiles = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          relativeDirectory
          name
        }
      }
    }
  `);
  console.log(images);
  return (
    <div className="grid grid-flow-row-dense auto-rows-min gap-y-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {(images as any).allImages.edges.map((file: any) => (
        <AnimeImage image={file.node} />
      ))}
    </div>
  );
};

export default AnimeImageGrid;
