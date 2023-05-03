import React from 'react';
import axios from 'axios';
import { Avatar } from 'flowbite-react';
import { useMutation } from 'react-query';
import CommentLayout from 'components/Layout/commentLayout';

const ReComment = ({
  id,
  recomment,
}: {
  id: number;
  recomment: RecommentType;
}) => {
  const token = 'dsfdsfsdf';
  //삭제 기능
  const deleteComment = useMutation(
    (id: number) => {
      return axios.delete(`api/${id}`, { data: { Authorization: token } });
    },
    {
      onSuccess: () => {
        if (window.confirm('정말 삭제합니까?')) {
          alert('삭제되었습니다.');
        } else {
          alert('취소합니다.');
        }
      },
      onError: ({ message }) => {
        console.log(message);
      },
    }
  );

  //수정 기능
  const updateComment = useMutation(
    (id: number) => {
      return axios.put(`api/${id}`, { data: { Authorization: token } });
    },
    {
      onSuccess: () => {
        if (window.confirm('정말 수정합니까?')) {
          alert('수정되었습니다.');
        } else {
          alert('취소합니다.');
        }
      },
      onError: ({ message }) => {
        console.log(message);
      },
    }
  );

  return (
    <>
      {recomment.recomment.map(
        ({ id, profile_image, name, comment }: Recomment) => (
          <CommentLayout key={id}>
            <div className="sm:mt-3">
              <div className="flex justify-between w-full ">
                <Avatar
                  img={profile_image}
                  rounded={true}
                  className="flex justify-start "
                >
                  <div className="space-y-1 font-medium dark:text-white ">
                    <div className="text-[11px] md:text-base text-ftBlick">
                      {name}
                    </div>

                    <div className="h-5 text-[5px] md:text-xs overflow-hidden  text-gray-500 w-28 md:w-40 lg:w-80 dark:text-gray-400">
                      {formatDate(new Date())}
                    </div>
                  </div>
                </Avatar>
                <section className="flex">
                  <article className="flex flex-row mt-1 mr-1 md:mt-1 md:m-0">
                    <div
                      className="m-1 text-[10px] cursor-pointer md:p-1 md:text-sm hover:text-blue-400 text-ftBlick"
                      onClick={() => {
                        updateComment.mutate(id);
                      }}
                    >
                      수정
                    </div>
                    <div
                      className="m-1 text-[10px] cursor-pointer md:p-1 md:text-sm hover:text-blue-400 text-ftBlick"
                      onClick={() => {
                        deleteComment.mutate(id);
                      }}
                    >
                      삭제
                    </div>
                  </article>
                </section>
              </div>
              <main className="w-full p-2 pl-6 text-sm md:text-base sm:text-md lg:py-5 text-ftBlick">
                {comment}
              </main>
            </div>
          </CommentLayout>
        )
      )}
    </>
  );
};

export default ReComment;

export interface Recomment {
  id: number;
  comment: string;
  profile_image: string;
  name: string;
}
export interface RecommentType {
  recomment: Recomment[];
}

//FIXME 백엔드 통신 시 삭제 될 목 데이터입니다.

const formatDate = (date: Date) =>
  Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: 'narrow',
    day: 'numeric',
    localeMatcher: 'lookup',
  }).format(date);
