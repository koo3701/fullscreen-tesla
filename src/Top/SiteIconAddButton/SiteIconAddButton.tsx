import React, { useState } from 'react';
import { SiteIconEditModal } from '../utils/components/SiteIconEditModal';
import { PlusCircleFill } from 'react-bootstrap-icons';

/**
 * @package
 */
export type SiteIconAddButtonProps = {};

/**
 * @package
 */
export const SiteIconAddButton: React.FC<SiteIconAddButtonProps> = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleToggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      <PlusCircleFill size={35} onClick={handleToggleModal} />
      <SiteIconEditModal isOpen={modalOpen} toggle={handleToggleModal} />
    </>
  );
};
