export interface Directory {
  name: string;
  relativePath: string;
}

export interface Directories {
  allDirectory: {
    edges: Directory[];
  };
}

export interface ImageFile {
  name: string;
  relativeDirectory: string;
}

export interface ImageFiles {
  allFile: {
    edges: ImageFile[];
  };
}
