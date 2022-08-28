import React, { useContext } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { SiteType } from '../../@types';
import { Spacer } from '../../../utils/components/Spacer';
import { SiteListContext } from '../../Top';
import { useChangeIcon } from '../../../utils/hooks/useChangeIcon';

/**
 * @package
 */
export type SiteIconEditModalProps = SiteType & {
  isOpen: boolean;
  toggle: () => void;
};

/**
 * @package
 */
export const SiteIconEditModal: React.FC<SiteIconEditModalProps> = (props) => {
  const [sites, setSites] = useContext(SiteListContext);
  const [title, setTitle, handleChangeUrl, url, setUrl, handleChangeTitle] =
    useChangeIcon(props.title, props.url);

  const handleCancel = () => {
    props.toggle();
    setTitle(props.title);
    setUrl(props.url);
  };

  const handleSave = () => {
    setSites &&
      setSites(
        sites.map((site) =>
          site.id === props.id ? { ...site, title: title, url: url } : site
        )
      );

    props.toggle();
  };

  const handleDelete = () => {
    setSites && setSites(sites.filter((site) => site.id !== props.id));
    props.toggle();
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} unmountOnClose>
      <ModalHeader>Edit</ModalHeader>
      <ModalBody>
        <div className='text-center'>
          <img
            src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(
              props.url
            )}&size=128`}
            alt={props.title}
            className='w-25'
          />
        </div>
        <Spacer size='5px' />
        <Input
          className='w-100'
          placeholder='https://example.com'
          value={url}
          onChange={handleChangeUrl}
        />
        <Spacer size='5px' />
        <Input
          className='w-100'
          placeholder='Example'
          value={title}
          onChange={handleChangeTitle}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color='danger'
          onClick={handleDelete}
          style={{ marginRight: 'auto' }}
        >
          Delete
        </Button>
        <Button color='primary' onClick={handleSave}>
          Save
        </Button>
        <Button color='secondary' onClick={handleCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
