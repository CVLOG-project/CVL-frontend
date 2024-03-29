import React, { useState } from 'react';
import { Button, Label } from 'flowbite-react';
import { Modal } from 'flowbite-react';
import { useQueryClient } from 'react-query';
import { useCreateFolders, useGetFolders } from 'service/hooks/List';

const CVModal = (props: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { showModal, setShowModal } = props;

  const [inputValue, setInputValue] = useState<string>('');

  const queryClient = useQueryClient();
  const queryGetTagsFolders = useGetFolders();
  const mutationCreateTagsFolders = useCreateFolders();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const valueToForm = (inputValue: string) => {
    return {
      name: inputValue,
    };
  };

  const addFolder = async () => {
    const folderName = inputValue;
    await mutationCreateTagsFolders.mutate(valueToForm(folderName), {
      onSuccess: () => queryGetTagsFolders.refetch(),
      onError: () => alert('중복된 폴더 이름이거나, 폴더 생성에 실패했습니다.'),
    });
    setInputValue('');
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Modal
      show={showModal}
      size="md"
      popup={true}
      onClose={closeModal}
      className="dark"
    >
      <Modal.Header />
      <Modal.Body>
        <div className="flex flex-col items-center justify-center p-2">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            New Folder
          </h3>
          <div className="w-full">
            <div className="block mb-2">
              <Label value="Folder Name" />
            </div>
            <div className="flex items-center justify-center p-1 mb-5 bg-gray-500 border border-gray-500 rounded-md">
              <input
                className="w-full bg-transparent focus:outline-none"
                placeholder="Folder Name"
                value={inputValue}
                onChange={e => inputChange(e)}
              />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <Button onClick={addFolder}>Create Folder</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CVModal;
