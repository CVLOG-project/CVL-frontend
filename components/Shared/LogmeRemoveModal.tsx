import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { Modal } from 'flowbite-react';
import { Folder } from 'service/api/tag/type';
import { useGetFolders, useRemoveFolders } from 'service/hooks/List';

const CVRemoveModal = (props: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { showModal, setShowModal } = props;

  const [selectFodler, setSelecteFolder] = useState<number>(0);
  const removeTagsFolders = useRemoveFolders(selectFodler);
  const queryGetTagsFolders = useGetFolders();

  const closeModal = () => {
    setShowModal(false);
  };

  const removeFolder = async () => {
    await removeTagsFolders.mutate();
    setSelecteFolder(0);
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
        <div className="flex flex-col items-center justify-center">
          <h3 className="mb-5 text-xl font-medium text-gray-900 dark:text-white">
            Remove Folder
          </h3>
          <div className="w-full">
            <div className="block mb-2 overflow-scroll bg-gray-800 h-52">
              {queryGetTagsFolders.data?.map(
                ({ id: folderId, name: folder, tags }: Folder) => {
                  return (
                    tags.length === 0 && (
                      <div
                        key={folderId}
                        className={`flex justify-between h-10 p-2 cursor-pointer ${
                          folderId === selectFodler ? 'bg-gray-700' : ''
                        } `}
                        id={folder}
                        onClick={() => setSelecteFolder(folderId)}
                      >
                        <span className="text-2xl">{folder}</span>
                      </div>
                    )
                  );
                }
              )}
            </div>
          </div>
          <div className="flex justify-center w-full">
            <Button onClick={removeFolder}>Remove Folder</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CVRemoveModal;
