import React, { useState } from 'react';
import styles from './CopyButton.module.css';

interface CopyButtonProps {
  text: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.error('无法复制内容: ', err);
      }
    );
  };

  return (
    <button 
      onClick={handleCopy} 
      className={`${styles.copyButton} ${className || ''} ${copied ? styles.copied : ''}`} 
      aria-label="复制代码"
      title="复制代码"
    >
      {copied ? (
        <svg className={styles.icon} viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      ) : (
        <svg className={styles.icon} viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
        </svg>
      )}
      <span className={styles.tooltip}>{copied ? '已复制' : '复制'}</span>
    </button>
  );
};

export default CopyButton; 