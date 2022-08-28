import React from 'react';

/**
 * @package
 */
export type SpacerProps = {
  size: string | number;
  horizontal?: boolean;
};

/**
 * @package
 */
export const Spacer: React.FC<SpacerProps> = (props) => {
  return (
    <div
      style={
        props.horizontal
          ? {
              width: props.size,
              height: 'auto',
              display: 'inline-block',
              flexShrink: 0,
            }
          : { width: 'auto', height: props.size, flexShrink: 0 }
      }
    />
  );
};
