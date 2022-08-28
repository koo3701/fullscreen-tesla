import React, { useState } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SiteType } from './@types';
import {
  LongPressDetectEvents,
  LongPressEventReason,
  useLongPress,
} from 'use-long-press';
import { SiteIconEditModal } from './SiteIconEditModal';

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
  popover: {
    width: 120,
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

  const [modalOpen, setModalOpen] = useState(false);
  const handleToggleModal = () => setModalOpen(!modalOpen);

  const handleShortPress = () => console.log('short press');
  const handleLongPress = () => setModalOpen(true);

  const longPressListener = useLongPress(() => handleLongPress(), {
    threshold: 750,
    onCancel: (_, meta) =>
      meta.reason !== LongPressEventReason.CANCELED_BY_MOVEMENT
        ? handleShortPress()
        : undefined,
    cancelOnMovement: true,
    detect: LongPressDetectEvents.TOUCH,
  });

  const touchAction = {
    touchAction: isDragging ? 'none' : 'auto',
  };

  const id = `icon-${props.id}`;

  return (
    <>
      <div
        id={id}
        className='text-center'
        css={[styles.wrap, style, touchAction]}
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
          css={touchAction}
        />
        <p css={[styles.caption, touchAction]}>{props.title}</p>
      </div>
      <SiteIconEditModal
        isOpen={modalOpen}
        toggle={handleToggleModal}
        {...props}
      />
    </>
  );
};
