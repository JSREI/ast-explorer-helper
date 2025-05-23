import React, { useEffect, useCallback } from 'react';
import styles from './ImageViewer.module.css';

interface ImageViewerProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  visible?: boolean;
  onClose?: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  alt = '',
  width,
  height,
  visible = false,
  onClose = () => {}
}) => {
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [visible, handleEscape]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`${styles.overlay} ${visible ? styles.visible : ''}`}
      onClick={handleOverlayClick}
    >
      <img 
        src={src} 
        alt={alt} 
        className={styles.image}
        width={width}
        height={height}
      />
      <button 
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close image viewer"
      >
        ×
      </button>
    </div>
  );
};

export default ImageViewer; 