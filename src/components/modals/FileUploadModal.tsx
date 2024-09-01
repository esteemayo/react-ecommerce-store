import styled, { css } from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { toast } from 'react-toastify';

import { useDarkMode } from '../../hooks/useDarkMode';
import { useAuth } from '../../hooks/useAuth';
import { useFileModal } from '../../hooks/useFileModal';

import Spinner from '../Spinner';
import UploadProgress from '../form/UploadProgress';

import app from '../../firebase';
import { updateData } from '../../services/userService';

interface IOverlay {
  mode: string;
  type: string;
}

const FileUploadModal = () => {
  const { isOpen, onClose } = useFileModal();
  const mode = useDarkMode((state) => state.mode);
  const {
    isError,
    isLoading,
    isSuccess,
    message,
    reset,
    updateUserDataFulfilled,
    updateUserDataPending,
    updateUserDataRejected,
  } = useAuth();

  const [file, setFile] = useState<File>();
  const [perc, setPerc] = useState(0);
  const [showModal, setShowModal] = useState(isOpen);
  const [image, setImage] = useState('');

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const selectedFile = (target.files as FileList)[0];
    setFile(selectedFile);
  }, []);

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
    file && setFile(undefined);
  }, [file, onClose]);

  const closeModalHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const target = e.target as Element;

      if (target.classList.contains('overlay')) {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  const uploadFile = useCallback((file: File) => {
    const fileName = `${new Date().getTime()}-${file.name}`;

    const storage = getStorage(app);
    const storageRef = ref(storage, `users/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPerc(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (err: unknown) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  }, []);

  const handleUpload = useCallback(async () => {
    updateUserDataPending();

    try {
      const dataObj = {
        image,
      };

      const { data } = await updateData(dataObj);
      updateUserDataFulfilled(data);
      isSuccess && toast.success('Avatar successfully changed!!!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: unknown | any) {
      console.log(err);
      updateUserDataRejected(err.response.data.message);
    }
  }, [
    image,
    isSuccess,
    updateUserDataFulfilled,
    updateUserDataPending,
    updateUserDataRejected,
  ]);

  const activeModal = useMemo(() => {
    return showModal ? 'show' : '';
  }, [showModal]);

  const disabledBtn = useMemo(() => {
    const disabled = !image || isLoading || (perc > 0 && perc < 100);
    return !!disabled;
  }, [image, isLoading, perc]);

  useEffect(() => {
    file && uploadFile(file);
  }, [file, uploadFile]);

  useEffect(() => {
    isSuccess && handleClose();
    isError && toast.error(message);

    return () => reset();
  }, [handleClose, isError, isSuccess, message, reset]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  if (!isOpen) {
    return;
  }

  return (
    <Overlay
      className='overlay'
      mode={mode.toString()}
      type={activeModal}
      onClick={closeModalHandler}
    >
      <Container>
        <Wrapper>
          <CloseButtonContainer>
            <CloseButton type='button' onClick={handleClose}>
              <CloseIcon />
            </CloseButton>
          </CloseButtonContainer>
          <UploadContainer>
            <InputContainer>
              {perc > 0 && perc <= 100 ? (
                <UploadProgress type percentage={perc} />
              ) : (
                <>
                  <Input
                    type='file'
                    id='file'
                    accept='image/*'
                    onChange={handleFile}
                  />
                  <Label htmlFor='file'>Attach a photo</Label>
                </>
              )}
            </InputContainer>
            <ButtonContainer>
              <Button
                type='button'
                disabled={disabledBtn}
                onClick={handleUpload}
              >
                {isLoading ? <Spinner /> : 'Upload'}
              </Button>
            </ButtonContainer>
          </UploadContainer>
        </Wrapper>
      </Container>
    </Overlay>
  );
};

const Overlay = styled.aside<IOverlay>`
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.bgOverlay};
  backdrop-filter: ${({ mode }) => setBackDropFilter(mode)};
  position: fixed;
  top: 0;
  right: 0;
  display: ${({ type }) => (type === 'show' ? 'block' : 'none')};
  visibility: ${({ type }) => (type === 'show' ? 'visible' : 'hidden')};
  opacity: ${({ type }) => (type === 'show' ? 1 : 0)};
  z-index: ${({ type }) => (type === 'show' ? 4000 : -1)};
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
  width: 40rem;
  padding: 2rem 4rem;
  background-color: ${({ theme }) => theme.bgModal};
  border-radius: 0.5rem;
  position: relative;

  @media only screen and (max-width: 25em) {
    width: 35rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 30rem;
    padding-bottom: 2rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 50rem;
    padding: 2rem;
  }
`;

const CloseButtonContainer = styled.div`
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 1rem;
  right: 0;
`;

const CloseButton = styled.button`
  display: inline-block;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2.3rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textPayModal};
  outline-color: ${({ theme }) => theme.payModalOut};
  cursor: pointer;

  @media only screen and (min-width: 112.5em) {
    width: 3rem;
    height: 3rem;
    font-size: 3rem;
  }

  svg {
    font-size: inherit;
    fill: currentColor;
  }
`;

const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4rem 0;

  @media only screen and (max-width: 25em) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media only screen and (max-width: 25em) {
    width: 100%;
  }
`;

const Label = styled.label`
  display: inline-block;
  font-weight: 600;
  font-size: var(--default-font-size);
  color: #888;

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  &:focus + ${Label} {
    outline: 3px solid ${({ theme }) => theme.uploadFileInput};
    outline-offset: 3px;
  }

  & + ${Label} {
    color: ${({ theme }) => theme.textFile};
    display: inline-block;
    text-decoration: none;
    padding: 3px;
    border-bottom: 1px solid ${({ theme }) => theme.uploadFileInput};
    cursor: pointer;
    transition: all 0.3s;

    @media only screen and (max-width: 25em) {
      width: 100%;
    }

    @media only screen and (min-width: 112.5em) {
      border-bottom: 2px solid ${({ theme }) => theme.uploadFileInput};
    }

    &:hover {
      background-color: ${({ theme }) => theme.uploadFileInput};
      color: ${({ theme }) => theme.textCat};
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
      -webkit-box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
      -moz-box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
  }
`;

const ButtonContainer = styled.div`
  @media only screen and (max-width: 25em) {
    width: 100%;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  font-weight: 500;
  font-size: 1.4rem;
  padding: 1rem 3rem;
  background-color: ${({ theme }) => theme.bgCartBtn};
  color: ${({ theme }) => theme.textBtn};
  background-image: ${({ theme }) => css`
  linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    ${theme.bgImgCartBtn} 50%
  );
  `};
  background-size: 220%;
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.btnCartOut};
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.398rem;
  }

  @media only screen and (max-width: 25em) {
    font-size: 1.3rem;
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
    padding: 1.5rem 5rem;
  }

  &:hover {
    background-position: 100%;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const setBackDropFilter = (mode: string) => {
  return mode === 'true' ? 'blur(2px)' : undefined;
};

export default FileUploadModal;
