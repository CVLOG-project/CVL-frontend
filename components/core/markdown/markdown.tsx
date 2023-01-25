// import React from 'react';
// import { CopyBlock, dracula } from 'react-code-blocks';

// export const customizedComponent = {
//   code({ inline, className, children, ...props }) {
//     const match = /language-(\w+)/.exec(className || '');
//     return !inline && match ? (
//       <CopyBlock
//         language={match[1]}
//         text={String(children).replace(/\n$/, '')}
//         theme={dracula}
//         showLineNumbers={true}
//         wrapLines={true}
//         codeBlock
//       />
//     ) : (
//       <code
//         className={className}
//         style={{
//           color: '#eb5757',
//           padding: '2px 4px',
//         }}
//         {...props}
//       >
//         {children}
//       </code>
//     );
//   },
//   highlight: ({ ...props }: CodeProps) => (
//     <span style={{ backgroundColor: '#EFEEFF', padding: '0 3px' }} {...props} />
//   ),
//   background: ({ children, ...props }: CustomCodeProps) => {
//     return (
//       <p
//         style={{
//           backgroundColor: '#f1f5f9',
//           // backgroundColor: BACKGROUND_STRING_TO_HEX[color],
//           padding: '10px 2px',
//         }}
//         {...props}
//       >
//         {children}
//       </p>
//     );
//   },
//   color: ({ children, color, ...props }: CustomCodeProps) => {
//     return (
//       <span style={{ color: color }} {...props}>
//         {children}
//       </span>
//     );
//   },
//   callout: ({ children, emoji, ...props }: CustomCodeProps) => {
//     return (
//       <Callout content={children} emoji={emoji ? emoji : '💡'} {...props} />
//     );
//   },
//   columns: ({ children, number, ...props }: CustomCodeProps) => {
//     return (
//       <Columns number={number} {...props}>
//         {children}
//       </Columns>
//     );
//   },
//   indentation: ({ children, ...props }: CustomCodeProps) => {
//     return (
//       <span style={{ display: 'block', marginLeft: '20px' }} {...props}>
//         {children}
//       </span>
//     );
//   },
// };
export default {};
