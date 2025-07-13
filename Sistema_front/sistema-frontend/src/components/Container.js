// src/components/Container.js
import React from 'react';

const Container = ({ children }) => {
  return (
    <div style={{
      maxWidth: '100%',
      margin: '0 auto',
      padding: '1rem',
      width: '95%',
      boxSizing: 'border-box'
    }}>
      {children}
    </div>
  );
};

export default Container;
