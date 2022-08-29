import React, { createContext } from 'react';
import { Container } from 'reactstrap';
import { arrayMove } from '@dnd-kit/sortable';
import { SiteIconList, SiteIconListProps } from './SiteIconList';
import { InputSiteTextBox } from './InputSiteTextBox';
import { Spacer } from '../utils/components/Spacer';
import useLocalStorageState from 'use-local-storage-state';
import { SitesType } from './@types';
import { FavMode } from './FavMode';
import { defaultSiteList } from './defaultSiteList';

/**
 * @package
 */
export const SiteListContext = createContext<
  [SitesType, React.Dispatch<React.SetStateAction<SitesType>> | undefined]
>([defaultSiteList, undefined]);

/**
 * @package
 */
export const Top: React.FC = () => {
  const [sites, setSites] = useLocalStorageState('sites', {
    defaultValue: defaultSiteList,
  });

  const handleDragEnd: SiteIconListProps['onDragEnd'] = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSites((sites) => {
        const oldIndex = sites.findIndex((site) => site.id === active.id);
        const newIndex = sites.findIndex((site) => site.id === over?.id);

        if (oldIndex < 0 || newIndex < 0) return sites;

        return arrayMove(sites, oldIndex, newIndex).map((site, i) => ({
          ...site,
          order: i,
        }));
      });
    }
  };

  return (
    <SiteListContext.Provider value={[sites, setSites]}>
      <Container className='d-flex flex-row flex-wrap'>
        <Container>
          <Spacer size='10px' />
          <InputSiteTextBox />
          <Spacer size='10px' />
        </Container>
        <SiteIconList onDragEnd={handleDragEnd} sites={sites} />
      </Container>
      <div className='position-absolute top-0 end-0'>
        <FavMode />
      </div>
    </SiteListContext.Provider>
  );
};
