import UpdatePassword from '../accounts/UpdatePassword';
import Modal from '@/components/modals/Modal';
import usePasswordModal from '@/hooks/usePasswordModal';

const PasswordModal = () => {
  const { isOpen, onClose } = usePasswordModal();

  return (
    <Modal
      title='Change your password'
      isOpen={isOpen}
      onClose={onClose}
    >
      <UpdatePassword onCancel={onClose} />
    </Modal>
  );
}

export default PasswordModal;
