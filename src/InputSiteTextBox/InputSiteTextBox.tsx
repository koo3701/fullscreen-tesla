import React, { useContext } from 'react';
import { Button, Input } from 'reactstrap';
import { SiteListContext } from '../App';
import { Spacer } from '../utils/components/Spacer';
import { useChangeIcon } from '../utils/hooks/useChangeIcon';
import { v4 as uuidv4 } from 'uuid';

/**
 * @package
 */
export type InputSiteTextBoxProps = {};

/**
 * @package
 */
export const InputSiteTextBox: React.FC<InputSiteTextBoxProps> = (props) => {
  const [sites, setSites] = useContext(SiteListContext);
  const [title, setTitle, handleChangeUrl, url, setUrl, handleChangeTitle] =
    useChangeIcon();

  const handleAdd = () => {
    setSites &&
      setSites([
        ...sites,
        { id: uuidv4(), url: url, title: title, order: sites.length },
      ]);

    setUrl('');
    setTitle('');
  };

  return (
    <div>
      <div className='w-100 d-flex'>
        <Input
          className='flex-fill'
          placeholder='https://example.com'
          value={url}
          onChange={handleChangeUrl}
        />
        <Spacer size='5px' horizontal />
        <Input
          className='flex-fill'
          placeholder='Example'
          value={title}
          onChange={handleChangeTitle}
        />
      </div>
      <Spacer size='5px' />
      <Button className='w-100' onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
};
