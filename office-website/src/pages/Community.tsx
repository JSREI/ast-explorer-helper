import React from 'react';
import ImageViewer from '../components/ImageViewer';

const Community: React.FC = () => {
  return (
    <div className="community-page">
      <section className="section">
        <div className="container">
          <h1 className="text-center">逆向技术交流群</h1>

          <div className="community-grid">
            <div className="community-item">
              <h2>微信</h2>
              <p>扫码加入逆向技术微信交流群：</p>
              <div className="qrcode">
                <ImageViewer
                  src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016230653669.png"
                  alt="微信交流群二维码"
                  className="qrcode-image"
                />
              </div>
              <p className="note">
                如群二维码过期，可以加我个人微信，发送【逆向群】拉你进群：
              </p>
              <div className="qrcode">
                <ImageViewer
                  src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20231030132026541-7614065.png"
                  alt="个人微信二维码"
                  className="qrcode-image"
                />
              </div>
            </div>

            <div className="community-item">
              <h2>QQ</h2>
              <p>
                <a href="https://qm.qq.com/q/YfdB3w3OEY" target="_blank" rel="noopener noreferrer">
                  点此
                </a>
                扫码加入QQ交流群：
              </p>
              <div className="qrcode">
                <ImageViewer
                  src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/jsrei-qq-group.jpg"
                  alt="QQ交流群二维码"
                  className="qrcode-image"
                />
              </div>
            </div>

            <div className="community-item">
              <h2>TG</h2>
              <p>
                <a href="https://t.me/jsreijsrei" target="_blank" rel="noopener noreferrer">
                  点此
                </a>
                或扫码加入TG交流群：
              </p>
              <div className="qrcode">
                <ImageViewer
                  src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016231143315.png"
                  alt="TG交流群二维码"
                  className="qrcode-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community; 