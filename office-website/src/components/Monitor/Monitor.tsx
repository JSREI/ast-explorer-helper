import React, { useState, useRef, useEffect } from 'react';
import styles from './Monitor.module.css';

interface MonitorProps {
  videoUrl: string;
  title?: string;
}

const Monitor: React.FC<MonitorProps> = ({ 
  videoUrl,
  title
}) => {
  // 添加电源开关状态
  const [isPowerOn, setIsPowerOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 切换电源状态
  const togglePower = () => {
    setIsPowerOn(!isPowerOn);
    if (videoRef.current) {
      if (isPowerOn) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  // 处理视频点击全屏
  const handleVideoClick = () => {
    if (videoRef.current && isPowerOn) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className={styles.monitorWrapper}>
      <div className={styles.simpleMonitor}>
        {/* 显示器框架 */}
        <div className={styles.monitorFrame}>
          {/* 屏幕内容 */}
          <div className={`${styles.monitorScreen} ${isPowerOn ? styles.powerOn : styles.powerOff}`}>
            <video 
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              onClick={handleVideoClick}
              className={`${styles.demoVideo} ${!isPowerOn ? styles.invisible : ''}`}
            >
              <source src={videoUrl} type="video/quicktime" />
              <source src={videoUrl} type="video/mp4" />
              你的浏览器不支持 HTML5 视频播放
            </video>
            
            {/* 关闭时显示的黑屏 */}
            {!isPowerOn && <div className={styles.powerOffOverlay}></div>}
          </div>
        </div>
        
        {/* 底部控制区域 */}
        <div className={styles.monitorControls}>
          {/* 铭牌 */}
          <div className={styles.brandBadge}>
            <a href="https://github.com/JSREI" target="_blank" rel="noopener noreferrer" className={styles.brandLink}>
              JSREI
            </a>
            <span> - </span>
            <a href="https://github.com/JSREI/ast-explorer-helper" target="_blank" rel="noopener noreferrer" className={styles.brandLink}>
              AST Explorer Helper
            </a>
          </div>
          
          {/* 电源按钮 */}
          <button 
            className={`${styles.powerButton} ${isPowerOn ? styles.on : styles.off}`}
            onClick={togglePower}
            aria-label={isPowerOn ? '关闭显示器' : '开启显示器'}
            title={isPowerOn ? '关闭显示器' : '开启显示器'}
          >
            <span className={styles.powerIndicator}></span>
          </button>
        </div>
        
        {/* 显示器底座 */}
        <div className={styles.monitorStand}>
          <div className={styles.standNeck}></div>
          <div className={styles.standBase}></div>
        </div>
      </div>
    </div>
  );
};

export default Monitor; 