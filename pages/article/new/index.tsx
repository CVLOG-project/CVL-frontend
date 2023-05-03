import React, { useState, useCallback, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { Badge } from 'flowbite-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { CopyBlock, dracula } from 'react-code-blocks';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useRecoilValue } from 'recoil';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import * as Shared from 'components/Shared';
import { userInfoAtom } from 'components/Shared/LogmeNav/Profile';
import { KeyMap } from 'lib/constants';
import LocalStorage from 'public/utils/Localstorage';
import { ErrorResponse, handleMutateErrors } from 'service/api/login';
import { useCreatePost } from 'service/hooks/New';
import 'easymde/dist/easymde.min.css';
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

const INIT_USER_INPUT = {
  title: '',
  content: '# Hello world',
  tags: [],
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

const NewPost: NextPage = () => {
  const [doc, setDoc] = useState<DocType>(INIT_USER_INPUT);
  const [tag, setTag] = useState('');
  const [isVisiblePreview, setIsVisiblePreview] = useState(true);
  const [imageArr, setImageArr] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const userInfo = useRecoilValue(userInfoAtom);
  const router = useRouter();

  const onChangeTextarea = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDoc({ ...doc, [name as keyof DocType]: value });
    },
    [doc]
  );

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

  const accessToken = LocalStorage.getItem('CVtoken') as string;
  const mutationCreatNewPost = useCreatePost();

  const createForm = {
    title: doc.title,
    content: doc.content,
    user_id: userInfo.data.id,
    category_id: 1,
    tags: doc.tags,
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
      if (tag.length >= 22) {
        alert('너무 깁니다.');
        setTag('');
      } else {
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
    }
  };

  const removeTag = (tag: string) => {
    setDoc({ ...doc, tags: doc.tags.filter(item => tag !== item) });
  };

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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/upload`,
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

  const saveNewPost = async () => {
    await mutationCreatNewPost.mutate(createForm);
  };

  //스크롤 이동
  const containerTopRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      containerTopRef.current &&
      containerTopRef.current.scrollHeight >
        containerTopRef.current.clientHeight
    ) {
      containerTopRef.current.scrollTop =
        containerTopRef.current.scrollHeight -
        containerTopRef.current.clientHeight;
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
  }, [typeof window !== 'undefined' && window.innerWidth]);

  return (
    <main className="h-screen min-h-screen">
      <div className="flex flex-col content-wrapper">
        <header>
          <div className="h-full    bg-[#f8f9fa] min-h-screen ">
            <div className="md:pt-2">
              <div className="flex flex-row-reverse">
                <button
                  className="px-2 m-1 bg-gray-600 rounded-md cursor-pointer hover:bg-ftBlue"
                  onClick={() =>
                    accessToken
                      ? saveNewPost()
                      : alert('로그인 먼저 해주세요..')
                  }
                >
                  SAVE
                </button>
                <button
                  className="px-2 m-1 bg-gray-600 rounded-md cursor-pointer hover:bg-ftBlue"
                  onClick={() =>
                    accessToken ? router.push('/article') : router.push('/')
                  }
                >
                  QUIT
                </button>
              </div>
              <div className="relative px-2 border-b md:pt-2 border-gray">
                <input
                  className="w-full h-10 text-gray-600 placeholder:text-gray-500 placeholder:text-xs lg:text-2xl md:text-xl placeholder-zinc-600 lg:placeholder:text-2xl md:placeholder:text-xl "
                  name="title"
                  value={doc.title}
                  placeholder="오늘은 어떤 주제로 모두를 놀라게 해주실 건가요? 🥰"
                  onKeyDown={changeFocusContent}
                  onChange={onChangeTextarea}
                />
              </div>
              <div className="min-h-[80px]">
                <div className="relative flex px-2 pt-2 border-b md:mt-4 border-gray">
                  <input
                    className="z-10 w-full text-sm text-gray-600 placeholder:text-gray-400 h-7 md:text-xl placeholder:text-xs placeholder-zinc-600 md:placeholder:text-lg placeholder:italic"
                    name="tag"
                    value={tag}
                    placeholder="태그를 만들어주세요."
                    onKeyDown={e => createTags(e)}
                    onChange={e => setTag(e.target.value)}
                  />
                </div>
                <div className="flex justify-between mt-2 ">
                  <div className="flex flex-wrap w-11/12 mb-1 truncate">
                    {doc.tags.map((tag, index) => {
                      return (
                        <>
                          <Badge
                            className="relative flex p-2 mx-2 mt-1 "
                            color="info"
                            size="sm"
                            key={`${tag}-${index}`}
                          >
                            {tag}
                            <Shared.LogmeIcon.CloseIcon
                              alt="left-right"
                              width={50}
                              height={50}
                              onClick={() => removeTag(tag)}
                              cn="absolute w-3 h-3 right-[-4px] top-[-4px] hover:block hover:cursor-pointer "
                            />
                          </Badge>
                        </>
                      );
                    })}
                  </div>
                  <label className=" text-gray-400 top-[-35px] right-4  flex justify-end w-10 h-8">
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
                    <Shared.LogmeIcon.EyeIcon
                      alt="eye"
                      width={30}
                      height={30}
                      onClick={() => setIsVisiblePreview(!isVisiblePreview)}
                      cn={`w-4 m-2 hover:cursor-pointer ${
                        !isVisiblePreview ? 'bg-gray-300 rounded-full' : ''
                      }`}
                    />
                  </label>
                </div>
              </div>
            </div>
            <main className="relative flex flex-col justify-center flex-1 w-full lg:flex-row ">
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
                  value={doc.content}
                  onChange={onChange}
                  onDrop={e => {
                    e.preventDefault();
                    handleImageUpload(e);
                  }}
                />
              </div>

              {isVisiblePreview && (
                <div className="flex justify-center lg:min-w-[50vw] lg:w-[50vw] ">
                  <div
                    ref={containerTopRef}
                    className=" w-[70vw] lg:w-full xl:pl-8  lg:pl-5 max-h-[35vh] md:max-h-[38vh] lg:max-h-[75vh] overflow-y-auto"
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
                </div>
              )}
            </main>
          </div>
        </header>
      </div>
    </main>
  );
};

export default NewPost;

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
  maxHeight: 'calc(100vh - 250px)',
};
