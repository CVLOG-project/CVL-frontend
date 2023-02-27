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
  const [inputValue, setInputValue] = useState<string>('');
  const [closedIdx, setClosedIdx] = useState<number[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectModal, setSelectModal] = useState<string>('');
  const [winReady, setwinReady] = useState(false);

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

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      {selectModal === 'add' && (
        <CVAddModal showModal={showModal} setShowModal={setShowModal} />
      )}
      {selectModal === 'minus' && (
        <CVRemoveModal showModal={showModal} setShowModal={setShowModal} />
      )}
      <div className="hidden xl:block">
        <div className="flex flex-col justify-end w-44">
          <div className="flex">
            <input
              value={inputValue}
              onChange={e => inputChange(e)}
              className="w-[150px] m-2 bg-transparent focus:outline-none"
              placeholder="Folder Name"
            />

            <button>
              <Image
                src="/images/magnifying-glass.png"
                className="w-3 m-2 invert"
                alt="arrow"
                width="20"
                height="20"
              />
            </button>
          </div>
          <div className="flex justify-end w-[195px]">
            <button onClick={() => tryOpenModal('add')}>
              <Image
                src="/images/add.png"
                className="w-3 m-2 invert"
                alt="arrow"
                width="20"
                height="20"
              />
            </button>
            <button onClick={() => tryOpenModal('minus')}>
              <Image
                src="/images/minus.png"
                className="w-3 m-2 invert"
                alt="arrow"
                width="20"
                height="20"
              />
            </button>
          </div>
        </div>
        {winReady ? (
          <ul className="mt-3 mr-8 rounded-sm bg-bgWhite">
            <DragDropContext onDragEnd={OnDragEnd}>
              {queryGetTagsFolders.data?.map((folder: Folder) => {
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
                              className="flex items-center h-8 text-md text-ftBlick"
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
                            {folder.tags.map((tag, index) => (
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
                                        !isOpened ? 'p-1 bg-red-50' : 'h-0'
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
                            ))}
                            {provided.placeholder}
                          </ul>
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
      <ul className="flex justify-center mb-2 xl:hidden">
        {queryGetTagsFolders.data?.map(tags =>
          tags.tags.map(tag => (
            <li className="flex p-2" key={tag.id}>
              <div className="mr-1 cursor-pointer text-ftBlick">{tag.name}</div>
              <div className="mt-1 text-sm text-ftBlue">({tag.postsCount})</div>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default SideMenu;
