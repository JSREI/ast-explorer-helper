import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Community.module.css';
import ImageViewer from '../../components/ImageViewer';

const Community: React.FC = () => {
  const { t } = useTranslation();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const communityGroups = [
    {
      key: 'wechat',
      qrCode: 'https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016230653669.png',
    },
    {
      key: 'qq',
      qrCode: 'https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/jsrei-qq-group.jpg',
    },
    {
      key: 'telegram',
      qrCode: 'https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016231143315.png',
    }
  ];

  return (
    <div className={styles.communityPage}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h1 className={styles.title}>{t('community.subtitle')}</h1>
          <div className={styles.communityGrid}>
            {communityGroups.map((group) => (
              <div key={group.key} className={styles.communityItem}>
                <h2>{t(`community.groups.${group.key}.name`)}</h2>
                <p>{t(`community.groups.${group.key}.description`)}</p>
                <div 
                  className={styles.qrcode}
                  onClick={() => setActiveImage(group.qrCode)}
                >
                  <img src={group.qrCode} alt={`${t(`community.groups.${group.key}.name`)} QR Code`} />
                </div>
                <p className={styles.note}>{t(`community.groups.${group.key}.note`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ImageViewer
        src={activeImage || ''}
        alt="QR Code"
        onClose={() => setActiveImage(null)}
        visible={activeImage !== null}
      />
    </div>
  );
};

export default Community; 