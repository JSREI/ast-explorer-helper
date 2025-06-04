import React from 'react';
import styles from './CodeBlock.module.css';
import CopyButton from '../CopyButton';

interface CodeBlockProps {
  code: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, className }) => {
  return (
    <div className={`${styles.codeBlockWrapper} codeBlockWrapper ${className || ''}`}>
      <pre className={styles.codeBlock}>
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  );
};

export default CodeBlock; 