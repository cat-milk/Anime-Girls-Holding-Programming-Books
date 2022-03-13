import React, { createContext, useMemo, useState } from 'react';
import AnimeImageGrid from '../components/AimeImageGrid';
import { useAnimeImages } from '../hooks/useAnimeImages';
import { useDirectories } from '../hooks/useDirectories';
import { ImageFiles } from '../types';

// styles
const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};
const headingAccentStyles = {
  color: '#663399',
};

const linkStyle = {
  color: '#8954A8',
  fontWeight: 'bold',
  fontSize: 16,
  verticalAlign: '5%',
};

export const ImagesContext = createContext<ImageFiles | undefined>(undefined);
// markup
const Layout: React.FC = ({ children }) => {
  const directories = useDirectories();
  const allImages = useAnimeImages();
  console.log(allImages);
  const images = useMemo(() => allImages, [allImages]);

  return (
    <ImagesContext.Provider value={images}>
      <div className="flex">
        <nav className="flex flex-col w-2/12 h-screen overflow-y-scroll space-y-2 px-6">
          {directories.allDirectory.edges.map(({ node }: any) => (
            <span
              className="p-2 hover:bg-indigo-500 hover:text-white transition-colors duration-300 rounded-md cursor-pointer"
              onClick={() => {}}
            >
              {node.name}
            </span>
          ))}
        </nav>
        <main style={pageStyles} className="w-10/12 h-screen overflow-y-scroll">
          {children}
        </main>
      </div>
    </ImagesContext.Provider>
  );
};

export default Layout;
