import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { Badge } from 'flowbite-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CopyBlock, dracula } from 'react-code-blocks';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useRecoilValue } from 'recoil';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { userInfoAtom } from 'components/core/nav/Profile';
import { BASE_URL } from 'pages/api/axios';
import { ErrorResponse, handleMutateErrors } from 'pages/api/login';
import { Tag } from 'pages/api/tag/type';
import { useModifyPost } from 'hooks/Detail';
import { KeyMap } from 'lib/constants';
import 'easymde/dist/easymde.min.css';
import LocalStorage from 'public/utils/Localstorage';
import { cn } from 'styles/utils';
import css from './new.module.scss';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type DocType = {
  title: string;
  content: string;
  tags: string[];
};

const languageArr = [
  'abap',
  'abnf',
  'actionscript',
  'ada',
  'agda',
  'al',
  'antlr4',
  'apacheconf',
  'apex',
  'apl',
  'applescript',
  'aql',
  'arduino',
  'arff',
  'asciidoc',
  'asm6502',
  'asmatmel',
  'aspnet',
  'autohotkey',
  'autoit',
  'avisynth',
  'avroIdl',
  'avro-idl',
  'bash',
  'basic',
  'batch',
  'bbcode',
  'bicep',
  'birb',
  'bison',
  'bnf',
  'brainfuck',
  'brightscript',
  'bro',
  'bsl',
  'c',
  'cfscript',
  'chaiscript',
  'cil',
  'clike',
  'clojure',
  'cmake',
  'cobol',
  'coffeescript',
  'concurnas',
  'coq',
  'cpp',
  'crystal',
  'csharp',
  'cshtml',
  'csp',
  'cssExtras',
  'css-extras',
  'css',
  'csv',
  'cypher',
  'd',
  'dart',
  'dataweave',
  'dax',
  'dhall',
  'diff',
  'django',
  'dnsZoneFile',
  'dns-zone-file',
  'docker',
  'dot',
  'ebnf',
  'editorconfig',
  'eiffel',
  'ejs',
  'elixir',
  'elm',
  'erb',
  'erlang',
  'etlua',
  'excelFormula',
  'excel-formula',
  'factor',
  'falselang',
  'false',
  'firestoreSecurityRules',
  'firestore-security-rules',
  'flow',
  'fortran',
  'fsharp',
  'ftl',
  'gap',
  'gcode',
  'gdscript',
  'gedcom',
  'gherkin',
  'git',
  'glsl',
  'gml',
  'gn',
  'goModule',
  'go-module',
  'go',
  'graphql',
  'groovy',
  'haml',
  'handlebars',
  'haskell',
  'haxe',
  'hcl',
  'hlsl',
  'hoon',
  'hpkp',
  'hsts',
  'http',
  'ichigojam',
  'icon',
  'icuMessageFormat',
  'icu-message-format',
  'idris',
  'iecst',
  'ignore',
  'inform7',
  'ini',
  'io',
  'j',
  'java',
  'javadoc',
  'javadoclike',
  'javascript',
  'javastacktrace',
  'jexl',
  'jolie',
  'jq',
  'jsExtras',
  'js-extras',
  'jsTemplates',
  'js-templates',
  'jsdoc',
  'json',
  'json5',
  'jsonp',
  'jsstacktrace',
  'jsx',
  'julia',
  'keepalived',
  'keyman',
  'kotlin',
  'kumir',
  'kusto',
  'latex',
  'latte',
  'less',
  'lilypond',
  'liquid',
  'lisp',
  'livescript',
  'llvm',
  'log',
  'lolcode',
  'lua',
  'magma',
  'makefile',
  'markdown',
  'markupTemplating',
  'markup-templating',
  'markup',
  'matlab',
  'maxscript',
  'mel',
  'mermaid',
  'mizar',
  'mongodb',
  'monkey',
  'moonscript',
  'n1ql',
  'n4js',
  'nand2tetrisHdl',
  'nand2tetris-hdl',
  'naniscript',
  'nasm',
  'neon',
  'nevod',
  'nginx',
  'nim',
  'nix',
  'nsis',
  'objectivec',
  'ocaml',
  'opencl',
  'openqasm',
  'oz',
  'parigp',
  'parser',
  'pascal',
  'pascaligo',
  'pcaxis',
  'peoplecode',
  'perl',
  'phpExtras',
  'php-extras',
  'php',
  'phpdoc',
  'plsql',
  'powerquery',
  'powershell',
  'processing',
  'prolog',
  'promql',
  'properties',
  'protobuf',
  'psl',
  'pug',
  'puppet',
  'pure',
  'purebasic',
  'purescript',
  'python',
  'q',
  'qml',
  'qore',
  'qsharp',
  'r',
  'racket',
  'reason',
  'regex',
  'rego',
  'renpy',
  'rest',
  'rip',
  'roboconf',
  'robotframework',
  'ruby',
  'rust',
  'sas',
  'sass',
  'scala',
  'scheme',
  'scss',
  'shellSession',
  'shell-session',
  'smali',
  'smalltalk',
  'smarty',
  'sml',
  'solidity',
  'solutionFile',
  'solution-file',
  'soy',
  'sparql',
  'splunkSpl',
  'splunk-spl',
  'sqf',
  'sql',
  'squirrel',
  'stan',
  'stylus',
  'swift',
  'systemd',
  't4Cs',
  't4-cs',
  't4Templating',
  't4-templating',
  't4Vb',
  't4-vb',
  'tap',
  'tcl',
  'textile',
  'toml',
  'tremor',
  'tsx',
  'tt2',
  'turtle',
  'twig',
  'typescript',
  'typoscript',
  'unrealscript',
  'uorazor',
  'uri',
  'v',
  'vala',
  'vbnet',
  'velocity',
  'verilog',
  'vhdl',
  'vim',
  'visualBasic',
  'visual-basic',
  'warpscript',
  'wasm',
  'webIdl',
  'web-idl',
  'wiki',
  'wolfram',
  'wren',
  'xeora',
  'xmlDoc',
  'xml-doc',
  'xojo',
  'xquery',
  'yaml',
  'yang',
  'zig',
];
const ModifyPost = ({ pid }: { pid: string }) => {
  const accessToken = LocalStorage.getItem('CVtoken') as string;
  const router = useRouter();
  const [doc, setDoc] = useState<DocType>({
    title: '',
    content: '',
    tags: [],
  });
  useEffect(() => {
    axios
      .get(`${BASE_URL}/posts/${pid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res =>
        setDoc({
          title: res.data.data.post.title,
          content: res.data.data.post.content,
          tags: res.data?.data.post.tags?.map((e: Tag) => e.name),
        })
      );
  }, [pid]);

  const [tag, setTag] = useState('');
  const [isVisiblePreview, setIsVisiblePreview] = useState(true);
  const [imageArr, setImageArr] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const onChangeTextarea = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDoc({ ...doc, [name as keyof DocType]: value });
    },
    [doc]
  );
  const userInfo = useRecoilValue(userInfoAtom);
  // if (doc.content) return;

  const onChange = useCallback(
    (value: string) => {
      if (value.startsWith('![') && value.endsWith(')')) {
        const pastValue = doc.content;
        const newValue = pastValue + '\n\n' + value;
        setDoc({ ...doc, content: newValue });
      } else {
        setDoc({ ...doc, content: value });
      }
    },
    [doc]
  );

  const createForm = {
    title: doc?.title,
    content: doc?.content,
    user_id: userInfo.data.id,
    category_id: 1,
    tags: doc?.tags,
    files: imageArr,
  };

  const checkLanguage = (arr: string[], val: string) => {
    return arr.some((arrVal: string) => val === arrVal) ? val : '';
  };

  //TODO: implement auto focus
  const changeFocusContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== KeyMap.ENTER) return;
    e.preventDefault();
  };

  const createTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tag && e.key === KeyMap.ENTER) {
      if (e.nativeEvent.isComposing === false) {
        if (doc.tags.some((item: string) => tag === item)) {
          alert('중복된 태그이름 입니다.');
          setTag('');
        } else {
          setDoc({ ...doc, tags: [...doc.tags, tag] });
          setTag('');
        }
      }
    }
  };

  const removeTag = (tag: string) => {
    setDoc({ ...doc, tags: doc.tags.filter(item => tag !== item) });
  };

  //FIXME  추후 기능 추가
  // const changePreviewMode = (id: string) => {
  //   if (id !== 'no-preview') {
  //     setIsVisiblePreview(true);
  //     setPreviewAlign(!previewAlign);
  //   } else if (id === 'no-preview') {
  //     setIsVisiblePreview(false);
  //   }
  // };

  const handleImageUpload = async (e: React.DragEvent<HTMLDivElement>) => {
    const file = e.dataTransfer.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
    };
    const resizedImage = await imageCompression(file, options);
    const formData = new FormData();
    formData.append('file', resizedImage, resizedImage.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${LocalStorage.getItem('CVtoken')}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${BASE_URL}/posts/upload`,
        formData,
        config
      );
      const imageUrl = data.data.url;
      const imageName = data.data.name;
      onChange(`![${imageName}](${imageUrl})`);
      setImageArr([...imageArr, imageUrl]);
    } catch (errorRe) {
      const error = errorRe as ErrorResponse;
      if (error.response && error.response.status === 401) {
        handleMutateErrors(error);
      }
    }
  };

  //post
  const mutationCreatModifyPost = useModifyPost(accessToken, parseInt(pid));
  const saveModifyPost = async () => {
    await mutationCreatModifyPost.mutate(createForm);
  };

  //스크롤 이동
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      containerRef.current &&
      containerRef.current.scrollHeight > containerRef.current.clientHeight
    ) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight - containerRef.current.clientHeight;
    }
  }, [doc]);

  //반응형 레이아웃
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="h-screen min-h-screen">
      <div className="flex flex-col pt-3 content-wrapper">
        <header>
          <div className="px-6 pt-2 pb-6 border bg-gray-50 rounded-xl">
            <div className="flex flex-row-reverse">
              <button
                className="px-2 m-1 bg-gray-500 rounded-md cursor-pointer hover:bg-black"
                onClick={() =>
                  accessToken ? saveModifyPost : alert('로그인 먼저 해주세요..')
                }
              >
                SAVE
              </button>
              <button
                className="px-2 m-1 bg-gray-500 rounded-md cursor-pointer hover:bg-black"
                onClick={() =>
                  accessToken ? router.push('/article') : router.push('/')
                }
              >
                QUIT
              </button>
            </div>
            <div className="relative px-2 pt-2 border-b border-gray">
              <label className="absolute text-gray-400 top-[-10px] left-4 bg-gray-50 ">
                제목
              </label>
              <input
                className="w-full h-10 font-bold text-gray-600 placeholder:text-gray-300 placeholder:text-xs lg:text-xl md:text-2xl placeholder-zinc-600 lg:placeholder:text-lg md:placeholder:text-xl"
                name="title"
                value={doc.title}
                placeholder="오늘은 어떤 주제로 모두를 놀라게 해주실 건가요? 🥰"
                onKeyDown={changeFocusContent}
                onChange={onChangeTextarea}
              />
            </div>
            <div className="min-h-[80px]">
              <div className="relative flex px-2 pt-2 mt-4 border-b border-gray">
                <label className="absolute text-gray-400 top-[-10px] left-4 bg-gray-50 ">
                  태그
                </label>
                <input
                  className="z-10 w-full text-sm font-bold text-gray-600 placeholder:text-gray-300 h-7 lg:text-xl placeholder:text-xs placeholder-zinc-600 lg:placeholder:text-lg"
                  name="tag"
                  value={tag}
                  placeholder="태그 생성"
                  onKeyDown={e => createTags(e)}
                  onChange={e => setTag(e.target.value)}
                />
              </div>
              <div className="flex mt-2">
                <div className="flex flex-row-reverse">
                  {doc?.tags?.map((tag, index) => {
                    return (
                      <>
                        <Badge
                          className="relative p-2 mr-2"
                          color="info"
                          size="sm"
                          key={`${tag}-${index}`}
                        >
                          {tag}
                          <Image
                            className="absolute w-3 h-3 right-[-4px] top-[-4px] hover:block  hover:cursor-pointer"
                            src="/images/close.png"
                            alt="left-right"
                            width="50"
                            height="50"
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <main className="relative flex flex-col justify-center flex-1 w-full mt-8 lg:flex-row">
              <div
                className={cn(
                  css.mde,
                  `${isVisiblePreview ? 'lg:w-1/2' : 'lg:w-full'}`,
                  'w-full'
                )}
              >
                <SimpleMDE
                  style={{ color: '#fff' }}
                  options={isMobile ? MDE_OPTIONMOBILE : MDE_OPTION}
                  value={doc?.content}
                  onChange={onChange}
                  onDrop={e => {
                    e.preventDefault();
                    handleImageUpload(e);
                  }}
                />
              </div>
              <label className="absolute text-gray-400 top-[-25px] left-4 bg-gray-50 text-sm lg:text-base ">
                편집기
              </label>
              <label className="absolute text-gray-400 top-[-35px] right-4 bg-gray-50 flex">
                {/* FIXME 추후 기능 추가
                <Image
                  src="/images/mirror.png"
                  className={`w-4 m-2 ${
                    isVisiblePreview && (previewAlign ? 'bg-gray-300' : '')
                  }`}
                  alt="left-right"
                  id="left-right"
                  width="30"
                  height="30"
                  onClick={() => changePreviewMode('left-right')}
                />
                <Image
                  src="/images/mirror.png"
                  className={`w-4 m-2 rotate-90 ${
                    isVisiblePreview && (previewAlign ? '' : 'bg-gray-300')
                  }`}
                  alt="top-bottom"
                  id="top-bottom"
                  width="30"
                  height="30"
                  onClick={() => changePreviewMode('top-bottom')}
                /> */}
                <Image
                  src="/images/eye.png"
                  className={`w-4 m-2 hover:cursor-pointer ${
                    !isVisiblePreview ? 'bg-gray-300 rounded-full' : ''
                  }`}
                  alt="no-preview"
                  id="no-preview"
                  width="30"
                  height="30"
                  onClick={() => setIsVisiblePreview(!isVisiblePreview)}
                />
              </label>
              <div className="flex justify-center lg:w-[50vw] lg:min-w-[50vw] ">
                {isVisiblePreview && (
                  <div
                    ref={containerRef}
                    className=" w-[70vw] lg:w-full xl:pl-8  lg:pl-5 max-h-[20vh] md:max-h-[35vh] lg:max-h-[62vh] overflow-y-auto"
                  >
                    <ReactMarkdown
                      className="contentMarkdown"
                      rehypePlugins={[rehypeRaw]}
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <CopyBlock
                              language={checkLanguage(languageArr, match[1])}
                              text={String(children).replace(/\n$/, '')}
                              theme={dracula}
                              showLineNumbers={true}
                              wrapLines={true}
                              codeBlock
                            />
                          ) : (
                            <code
                              className={className}
                              style={{
                                color: '#eb5757',
                                padding: '2px 4px',
                              }}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {doc?.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </main>
          </div>
        </header>
        <section className="flex flex-col flex-1"></section>
      </div>
    </main>
  );
};

export default ModifyPost;

export const getServerSideProps: GetServerSideProps = async context => {
  const pid = context.params?.pid;
  return { props: { pid } };
};
const MDE_OPTIONMOBILE = {
  spellChecker: false,
  sideBySideFullscreen: false,
  toolbar: false,
  insertTexts: {
    horizontalRule: ['', '\n\n-----\n\n'],
    image: ['![](http://', ')'],
    link: ['[', '](http://)'],
    table: [
      '',
      '\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n',
    ],
  },
  tabSize: 2,
  maxHeight: '30vh',
};

const MDE_OPTION = {
  spellChecker: false,
  sideBySideFullscreen: false,
  toolbar: false,
  insertTexts: {
    horizontalRule: ['', '\n\n-----\n\n'],
    image: ['![](http://', ')'],
    link: ['[', '](http://)'],
    table: [
      '',
      '\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n',
    ],
  },
  tabSize: 2,
  maxHeight: '60vh',
};
