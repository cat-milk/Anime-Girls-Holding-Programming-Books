import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useAnimeImages } from '../hooks/useAnimeImages';
import { useDirectories } from '../hooks/useDirectories';
import { AllImages } from '../types';

// styles
const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

export const ImagesContext = createContext<AllImages | undefined>(undefined);
const Layout: React.FC = ({ children }) => {
  const directories = useDirectories();
  const allImages = useAnimeImages();
  const [selectedDir, setSelectedDir] = useState('');

  const images = useMemo(() => {
    const desu: typeof allImages = {
      edges: [],
    };
    if (allImages && allImages.edges) {
      if (selectedDir === '') {
        return allImages;
      }
      desu.edges = allImages.edges.filter(({ node }) => {
        return selectedDir === node.relativeDirectory;
      });
    }
    return desu;
  }, [allImages, selectedDir]);

  const handleDirSelect = useCallback((relativePath: string) => {
    setSelectedDir(relativePath);
  }, []);

  return (
    <ImagesContext.Provider value={images}>
      <div className="flex">
        <nav className="flex flex-col w-2/12 h-screen overflow-y-scroll space-y-2 px-6">
          {directories.allDirectory.edges.map(({ node }: any) => (
            <span
              className={`
                p-2
                hover:bg-indigo-500
                hover:text-white
                transition-colors
                duration-300
                rounded-md
                cursor-pointer
                ${
                  node.relativePath === selectedDir
                    ? 'bg-indigo-500 text-white'
                    : ''
                }
              `}
              onClick={_event => {
                handleDirSelect(node.relativePath);
              }}
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
