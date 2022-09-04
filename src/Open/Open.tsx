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
  return location.state === true ? (
    <Container className='d-flex align-items-center justify-content-center vw-100 vh-100 text-center'>
      <div>
        {' '}
        <h2>This is Bookmark Mode!</h2>
        <h5>Add This Page to Your Tesla Browser Bookmark!</h5>
      </div>
    </Container>
  ) : (
    <></>
  );
};
