import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface Directory {
  name: string;
  relativePath: string;
}

export interface Directories {
  allDirectory: {
    edges: { node: Directory }[];
  };
}

export interface ImageFile {
  name: string;
  relativeDirectory: string;
  base: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
    original: {
      src: string;
    };
  };
}

export interface AllImages {
  edges: { node: ImageFile }[];
}

export interface ImageQueryResponse {
  allImages: AllImages;
}
