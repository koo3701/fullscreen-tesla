import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { arrayMove } from '@dnd-kit/sortable';
import { SiteIconList, SiteIconListProps, SitesType } from './SiteIconList';
import { InputSiteTextBox, InputSiteTextBoxProps } from './InputSiteTextBox';
import { Spacer } from './utils/components/Spacer';

import { v4 as uuidv4 } from 'uuid';

const siteList: SitesType = [
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
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [sites, setSites] = useState(siteList);

  const handleChangeUrl: InputSiteTextBoxProps['onChangeUrl'] = (event) =>
    setUrl(event.target.value);

  const handleChangeTitle: InputSiteTextBoxProps['onChangeTitle'] = (event) =>
    setTitle(event.target.value);

  const handleAdd = () => {
    setSites([
      ...sites,
      { id: uuidv4(), url: url, title: title, order: sites.length },
    ]);

    setUrl('');
    setTitle('');
  };

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
      <Container>
        <Spacer size='10px' />
        <InputSiteTextBox
          url={url}
          onChangeUrl={handleChangeUrl}
          title={title}
          onChangeTitle={handleChangeTitle}
          onAdd={handleAdd}
        />
        <Spacer size='10px' />
      </Container>
      <SiteIconList onDragEnd={handleDragEnd} sites={sites} />
    </Container>
  );
};

export default App;
