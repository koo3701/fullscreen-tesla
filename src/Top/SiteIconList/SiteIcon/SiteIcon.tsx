import React, { useState } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  LongPressDetectEvents,
  LongPressEventReason,
  useLongPress,
} from 'use-long-press';
import { SiteIconEditModal } from '../../utils/components/SiteIconEditModal';
import { useSite } from '../../utils/hooks/useSite';

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
export type SiteIconProps = {
  siteId: string | number;
};

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
  } = useSortable({ id: props.siteId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.3 : 1,
  };

  const site = useSite(props.siteId);

  const [modalOpen, setModalOpen] = useState(false);
  const handleToggleModal = () => setModalOpen(!modalOpen);

  const handleShortPress = () =>
    site !== undefined ? (window.location.href = site.url) : undefined;
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

  const id = `icon-${props.siteId}`;

  return site !== undefined ? (
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
            site.url
          )}&size=128`}
          alt={site.title}
          className='h-75'
          css={touchAction}
        />
        <p css={[styles.caption, touchAction]}>{site.title}</p>
      </div>
      <SiteIconEditModal
        isOpen={modalOpen}
        toggle={handleToggleModal}
        {...props}
      />
    </>
  ) : (
    <></>
  );
};
