import { Interpolation, Theme } from '@emotion/react';
import React from 'react';
import { StarFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const styles: { [key: string]: Interpolation<Theme> } = {
  icon: {
    stroke: '#000',
  },
};

/**
 * @package
 */
export type FavModeProps = {};

/**
 * @package
 */
export const FavMode: React.FC<FavModeProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/open', { state: true });
  };

  return (
    <StarFill
      css={styles.icon}
      size={35}
      color='yellow'
      onClick={handleClick}
    />
  );
};
