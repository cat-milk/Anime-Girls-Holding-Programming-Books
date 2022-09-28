import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useAnimeImages } from '../hooks/useAnimeImages';
import { useDirectories } from '../hooks/useDirectories';
import { AllImages } from '../types';

// styles
const pageStyles = {
  color: '#232129',
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
    setIsMobileNavOpen(false);
    setSelectedDir(relativePath);
  }, []);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <ImagesContext.Provider value={images}>
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <header className="w-full h-12 py-2 px-8 sticky md:hidden flex flex-row z-20 items-center">
          <span className="flex-grow align-middle">
            {selectedDir
              ? selectedDir
              : directories.allDirectory.edges[0].node.name}
          </span>
          <div
            className="h-8 w-8"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            <svg className={`hamburger ${isMobileNavOpen ? 'is-opened' : ''}`}>
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                className="hamburger__bar hamburger__bar--top"
              />
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                className="hamburger__bar hamburger__bar--mid"
              />
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                className="hamburger__bar hamburger__bar--bot"
              />
            </svg>
          </div>
        </header>
        <nav
          className={`
            flex
            flex-col
            w-full 
            ${isMobileNavOpen ? 'h-screen' : 'h-0'}
            md:w-2/12
            z-10
            md:z-auto
            absolute
            md:h-screen
            md:static
            overflow-y-scroll
            space-y-2
            translate-y-12
            md:translate-y-0
            py-6
            md:py-0
            px-6
            bg-white
            transition-all
          `}
        >
          <div
            className={`flex-col w-full ${
              isMobileNavOpen ? 'flex' : 'hidden'
            } md:flex md:w-full md:h-full`}
          >
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
          </div>
        </nav>
        <main
          style={pageStyles}
          className="w-full z-0 md:w-10/12 h-screen overflow-y-scroll p-8 md:p-24"
        >
          {children}
        </main>
      </div>
    </ImagesContext.Provider>
  );
};

export default Layout;
