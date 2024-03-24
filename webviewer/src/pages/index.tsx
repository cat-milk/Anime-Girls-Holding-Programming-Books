import React from 'react';
import AnimeImageGrid from '../components/AimeImageGrid';
import Layout from '../components/Layout';

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

// markup
const IndexPage: React.FC = () => {
  return (
    <Layout>
      <title>Home Page</title>
      <AnimeImageGrid />
    </Layout>
  );
};

export default IndexPage;
