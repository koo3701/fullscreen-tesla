import React, { useContext } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { Spacer } from '../../../../utils/components/Spacer';
import { SiteListContext } from '../../../Top';
import { useChangeIcon } from '../../../../utils/hooks/useChangeIcon';
import { useSite } from '../../hooks/useSite';
import { v4 as uuidv4 } from 'uuid';

/**
 * @package
 */
export type SiteIconEditModalProps = {
  siteId?: string | number;
  isOpen: boolean;
  toggle: () => void;
};

/**
 * @package
 */
export const SiteIconEditModal: React.FC<SiteIconEditModalProps> = (props) => {
  const [sites, setSites] = useContext(SiteListContext);
  const site = useSite(props.siteId);

  const [title, setTitle, handleChangeUrl, url, setUrl, handleChangeTitle] =
    useChangeIcon(site?.title, site?.url);

  const handleToggle = () => {
    if (props.isOpen) {
      setTitle(site?.title ?? '');
      setUrl(site?.url ?? '');
    }
    props.toggle();
  };

  const handleCancel = () => {
    props.toggle();
    setTitle(site?.title ?? '');
    setUrl(site?.url ?? '');
  };

  const handleSave = () => {
    if (site !== undefined) {
      setSites &&
        setSites(
          sites.map((s) =>
            s.id === site.id ? { ...s, title: title, url: url } : s
          )
        );
    } else {
      setSites &&
        setSites([
          ...sites,
          { id: uuidv4(), url: url, title: title, order: sites.length },
        ]);
    }

    props.toggle();
  };

  const handleDelete = () => {
    setSites && setSites(sites.filter((s) => s.id !== props.siteId));
    props.toggle();
  };

  return (
    <Modal isOpen={props.isOpen} toggle={handleToggle} unmountOnClose>
      <ModalHeader>{site !== undefined ? 'Edit' : 'Add'}</ModalHeader>
      <ModalBody>
        <div className='text-center'>
          <img
            src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(
              site !== undefined ? site.url : url
            )}&size=128`}
            alt={site !== undefined ? site.title : title}
            className='w-25'
          />
        </div>
        <Spacer size='5px' />
        <Input
          className='w-100'
          placeholder='https://www.tesla.com/'
          value={url}
          onChange={handleChangeUrl}
        />
        <Spacer size='5px' />
        <Input
          className='w-100'
          placeholder='Tesla'
          value={title}
          onChange={handleChangeTitle}
        />
      </ModalBody>
      <ModalFooter>
        {site !== undefined ? (
          <Button
            color='danger'
            onClick={handleDelete}
            style={{ marginRight: 'auto' }}
          >
            Delete
          </Button>
        ) : (
          <></>
        )}
        <Button color='primary' onClick={handleSave}>
          {site !== undefined ? 'Save' : 'Add'}
        </Button>
        <Button color='secondary' onClick={handleCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
