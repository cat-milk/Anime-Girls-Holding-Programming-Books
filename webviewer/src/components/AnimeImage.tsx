import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { ImageFile } from '../types';

interface AnimeImageProps {
  image: any;
  onClick: () => void;
}

const AnimeImage: React.FC<AnimeImageProps> = ({ image, onClick }) => {
  const pic = getImage(image);
  return (
    <div
      key={image.id}
      className="relative group col-span-1 h-96"
      onClick={onClick}
    >
      <div
        className="
          absolute
          w-full
          h-full
          bg-indigo-400
          bg-opacity-0
          group-hover:bg-opacity-80
          transition-all
          duration-700
          z-10
          top-0
          left-0
          p-4
          overflow-clip
        "
      >
        <span className="text-transparent group-hover:text-white transition-color duration-700 tracking-wide text-md capitalize">
          <span className="mr-1">Filename: </span>
          <span className="break-all">{image.name.replace(/_/g, ' ')}</span>
        </span>
      </div>
      <GatsbyImage
        className="h-full"
        image={pic}
        alt={image.name}
        title={image.name}
        height={'100%'}
        width={'100%'}
      />
    </div>
  );
};

export default AnimeImage;
