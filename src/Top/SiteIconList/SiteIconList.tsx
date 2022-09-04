import React from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DndContextProps,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import { SiteIcon } from './SiteIcon';
import { SitesType } from '../@types';

/**
 * @package
 */
export type SiteIconListProps = {
  sites: SitesType;
  onDragEnd: DndContextProps['onDragEnd'];
};

/**
 * @package
 */
export const SiteIconList: React.FC<SiteIconListProps> = (props) => {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  return (
    <div className='w-100 h-100 d-flex flex-row flex-wrap'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={props.onDragEnd}
      >
        <SortableContext items={props.sites} strategy={rectSortingStrategy}>
          {props.sites.map((site) => (
            <SiteIcon key={site.id} siteId={site.id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
