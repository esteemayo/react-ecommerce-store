import Modal from './Modal';
import UpdateData from '../accounts/UpdateData';

import { useAuth } from '../../hooks/useAuth';
import { useEmailModal } from '../../hooks/useEmailModal';

const DataModal = () => {
  const { isOpen, onClose } = useEmailModal();
  const currentUser = useAuth((state) => state.user);

  return (
    <Modal title='Change your email address' isOpen={isOpen} onClose={onClose}>
      <UpdateData email={currentUser.email} onCancel={onClose} />
    </Modal>
  );
};

export default DataModal;
