import React from 'react';
import backgroundJpg from './background.jpg';

const styles = {
	position: 'relative',
	width: '100%',
	height: '100vh',
	background: `url(${backgroundJpg}) 50%/100%  no-repeat`,
};

function Background({ children }) {
  return <div style={styles}>{children}</div>;
}

export default Background;
