import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Draggable,
  Droppable,
  DropResult,
  DragDropContext,
} from 'react-beautiful-dnd';
import CVAddModal from 'components/domain/List/Folder/CVAddModal';
import CVRemoveModal from 'components/domain/List/Folder/CVRemoveModal';
import { Folder, UpdateForm } from 'pages/api/tag/type';
import { useGetFolders, usePutTagsFolder } from 'hooks/List';
import LocalStorage from 'public/utils/Localstorage';

const SideMenu = () => {
  const [putForm, setPutForm] = useState<UpdateForm>({
    tag_id: 0,
    folder_id: 0,
  });
  const accessToken = LocalStorage.getItem('CVtoken') as string;

  const queryGetTagsFolders = useGetFolders(accessToken);
  const mutationUpdateTagsFolders = usePutTagsFolder(putForm, accessToken);
  const [closedIdx, setClosedIdx] = useState<number[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectModal, setSelectModal] = useState<string>('');
  const [winReady, setwinReady] = useState(false);

  const namedFolder =
    queryGetTagsFolders.data?.filter(item => item.name !== '') ?? [];
  const defaultFolder =
    queryGetTagsFolders.data?.filter(item => item.name === '') ?? [];

  const onClickAccordion =
    (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const hasId = closedIdx.some(storedId => storedId === id);
      if (hasId) setClosedIdx(closedIdx.filter(storedId => storedId !== id));
      else setClosedIdx([...closedIdx, id]);
    };

  useEffect(() => {
    setwinReady(true);
  }, []);

  function OnDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!result.destination) return;

    const sourceFolder = queryGetTagsFolders.data?.find(
      folder => folder.id.toString() === source.droppableId
    );

    const destinationFolder = queryGetTagsFolders.data?.find(
      folder =>
        folder.id.toString() === (destination && destination.droppableId)
    );

    const setForm: UpdateForm = {
      tag_id: sourceFolder?.tags[result.source.index].id,
      folder_id: destinationFolder?.id,
    };

    setPutForm(setForm);
    setTimeout(() => {
      mutationUpdateTagsFolders.mutate();
    }, 0);
  }

  const tryOpenModal = (name: string) => {
    setSelectModal(name);
    setShowModal(true);
  };

  return (
    <>
      {selectModal === 'add' && (
        <CVAddModal showModal={showModal} setShowModal={setShowModal} />
      )}
      {selectModal === 'delete' && (
        <CVRemoveModal showModal={showModal} setShowModal={setShowModal} />
      )}
      <div className="hidden xl:block">
        <div className="flex flex-col justify-end w-44">
          <div className="flex justify-end w-[195px]">
            <button
              onClick={() => tryOpenModal('add')}
              className="hidden m-1 mt-3 text-gray-500 cursor-pointer md:block"
            >
              ADD
            </button>
            <button
              onClick={() => tryOpenModal('delete')}
              className="hidden m-1 mt-3 text-gray-500 cursor-pointer md:block"
            >
              DELETE
            </button>
          </div>
        </div>
        {winReady ? (
          <ul className="mt-3 mr-8 rounded-sm bg-bgWhite">
            <DragDropContext onDragEnd={OnDragEnd}>
              {namedFolder.map((folder: Folder) => {
                const isOpened = closedIdx.includes(folder.id);

                return (
                  <Droppable
                    droppableId={folder.id.toString()}
                    type="SIDEBAR_Folder"
                    key={folder.id}
                  >
                    {provided => {
                      return (
                        <li
                          key={folder.id}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="w-[12rem] rounded-sm shadow-md overflow-hidden h-full"
                        >
                          <div
                            className="flex justify-between p-2 bg-blue-100"
                            onClick={onClickAccordion(folder.id)}
                          >
                            <span
                              className="flex h-8 itemrs-center text-md text-ftBlick"
                              ref={provided.innerRef}
                            >
                              {folder.name}
                            </span>
                            <button>
                              <Image
                                src="/images/arrow.png"
                                className={`duration-150  ${
                                  !isOpened ? '' : '-rotate-180'
                                }`}
                                alt="arrow"
                                width="20"
                                height="20"
                              />
                            </button>
                          </div>
                          <ul className="h-full bg-ftWhite">
                            {folder.tags.map((tag, index) => {
                              return (
                                <Draggable
                                  draggableId={folder.id + '-' + tag?.id}
                                  index={index}
                                  key={tag?.id}
                                >
                                  {provided => {
                                    return (
                                      <li
                                        key={`${folder.id}-${tag?.id}`}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={` duration-150 ${
                                          !isOpened ? 'p-1 bg-bgWhite' : 'h-0'
                                        }`}
                                      >
                                        <a
                                          href="#"
                                          className="ml-2 text-sm text-slate-400 text-ftBlick"
                                        >
                                          {tag?.name}
                                        </a>
                                        <a className="m-3 ml-1 text-ftBlue">
                                          ({tag?.postsCount})
                                        </a>
                                      </li>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </ul>
                        </li>
                      );
                    }}
                  </Droppable>
                );
              })}
              {defaultFolder.map(folder => {
                const isOpened = closedIdx.includes(folder.id);
                return (
                  <Droppable
                    droppableId={folder.id.toString()}
                    type="SIDEBAR_Folder"
                    key={folder.id}
                  >
                    {provided => {
                      return (
                        <li
                          className="mt-3 "
                          key={folder.id}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {folder.tags.map((tag, index) => {
                            return (
                              <Draggable
                                draggableId={folder.id + '-' + tag?.id}
                                index={index}
                                key={tag?.id}
                              >
                                {provided => {
                                  return (
                                    <li
                                      key={`${folder.id}-${tag?.id}`}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`w-[12rem] rounded-sm shadow-md overflow-hidden h-full duration-150 ${
                                        !isOpened ? 'p-1 bg-bgWhite' : 'h-0'
                                      }`}
                                    >
                                      <a
                                        href="#"
                                        className="ml-2 text-sm text-slate-400 text-ftBlick"
                                      >
                                        {tag?.name}
                                      </a>
                                      <a className="m-3 ml-1 text-ftBlue">
                                        ({tag?.postsCount})
                                      </a>
                                    </li>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                        </li>
                      );
                    }}
                  </Droppable>
                );
              })}
            </DragDropContext>
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default SideMenu;
