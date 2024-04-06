import React, { useContext, useState } from 'react';
import Lightbox from 'react-image-lightbox';

import AnimeImage from './AnimeImage';
import { ImagesContext } from './Layout';

const AnimeImageGrid: React.FC = () => {
  const images = useContext(ImagesContext);

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  return (
    <>
      <div className="cursor-pointer grid grid-flow-row-dense auto-rows-min gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        {images &&
          images.edges.map(({ node }, index) => (
            <AnimeImage
              image={node}
              key={node.name}
              onClick={() => {
                setPhotoIndex(index);
                //setIsOpen(true);
              }}
            />
          ))}
      </div>

      {isOpen && images && (
        <Lightbox
          reactModalStyle={{ display: 'flex', backgroundColor: '' }}
          enableZoom={true}
          mainSrc={
            images.edges[photoIndex].node.childImageSharp.original.src && ''
          }
          nextSrc={
            images.edges[Math.min(photoIndex + 1, images.edges.length - 1)].node
              .childImageSharp.original.src && ''
          }
          prevSrc={
            images.edges[Math.max(photoIndex - 1, 0)].node.childImageSharp
              .original.src && ''
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => {
            if (images) {
              setPhotoIndex((photoIndex - 1) % images.edges.length);
            }
          }}
          onMoveNextRequest={() => {
            if (images) {
              setPhotoIndex((photoIndex + 1) % images.edges.length);
            }
          }}
        />
      )}
    </>
  );
};

export default AnimeImageGrid;
