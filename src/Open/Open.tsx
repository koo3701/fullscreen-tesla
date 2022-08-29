import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'reactstrap';

/**
 * @package
 */
export const Open: React.FC = () => {
  const location = useLocation();
  const uri = new URL(window.location.href);

  if (location.state !== true)
    window.location.replace(
      `https://www.youtube.com/redirect?q=${uri.protocol}//${uri.host}/`
    );
  return (
    <Container>
      This is Bookmark Mode!
      <br />
      Add This Page to Your Browser Bookmark!
    </Container>
  );
};
