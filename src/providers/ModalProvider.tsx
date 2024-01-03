import AccountModal from '@/components/modals/AccountModal';
import DataModal from '@/components/modals/DataModal';
import PasswordModal from '@/components/modals/PasswordModal';
import SearchModal from '@/components/modals/SearchModal';
import FileUploadModal from '@/components/modals/FileUploadModal';

const ModalProvider = () => {
  return (
    <>
      <SearchModal />
      <PasswordModal />
      <DataModal />
      <AccountModal />
      <FileUploadModal />
    </>
  );
};

export default ModalProvider;
