import React, { ComponentProps } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SiteType } from './@types';
import { useLongPress } from 'use-long-press';

const styles: { [key: string]: Interpolation<Theme> } = {
  wrap: {
    width: 200,
    height: 200,
  },
  caption: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    overflow: 'hidden',
  },
};

/**
 * @package
 */
export type SiteIconProps = SiteType;

/**
 * @package
 */
export const SiteIcon: React.FC<SiteIconProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.3 : 1,
  };

  const handleShortPress = () => console.log('short press');
  const handleLongPress = () => console.log('long press');

  const longPressListener = useLongPress(() => handleLongPress(), {
    threshold: 2000,
    onCancel: (_, meta) =>
      meta.reason !== 'canceled-by-movement' ? handleShortPress() : null,
    cancelOnMovement: true,
  });

  return (
    <div
      className='text-center'
      css={[styles.wrap, style]}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      {...longPressListener()}
    >
      <img
        src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(
          props.url
        )}&size=128`}
        alt={props.title}
        className='h-75'
      />
      <p css={styles.caption}>{props.title}</p>
    </div>
  );
};
