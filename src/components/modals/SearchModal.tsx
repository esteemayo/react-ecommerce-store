import Modal from './Modal';
import Search from '../Search';

import useSearchModal from '@/hooks/useSearchModal';

const SearchModal = () => {
  const { isOpen, onClose } = useSearchModal((state) => ({ ...state }));

  return (
    <Modal
      title='Search products'
      isOpen={isOpen}
      onClose={onClose}
    >
      <Search />
    </Modal>
  );
}

export default SearchModal;
