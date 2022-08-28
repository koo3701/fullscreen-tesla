import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { arrayMove } from '@dnd-kit/sortable';

import { SiteIconList, SiteIconListProps } from './SiteIconList';

const siteList = [
  { id: 1, url: 'https://www.youtube.com/', title: 'YouTube', order: 1 },
  {
    id: 2,
    url: 'https://animestore.docomo.ne.jp/animestore/tp_pc',
    title: 'dアニメストア | 初めての方は初月無料のアニメ見放題サイト！',
    order: 2,
  },
  {
    id: 3,
    url: 'https://abema.tv/',
    title: 'ABEMA | 無料動画・話題の作品が楽しめる新しい未来のテレビ',
    order: 3,
  },
  {
    id: 4,
    url: 'https://tweetdeck.twitter.com/',
    title: 'TweetDeck',
    order: 4,
  },
];

const App: React.FC = () => {
  const [sites, setSites] = useState(siteList);

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
    <Container className='d-flex flex-row flex-wrap'>
      <SiteIconList onDragEnd={handleDragEnd} sites={sites} />
    </Container>
  );
};

export default App;
