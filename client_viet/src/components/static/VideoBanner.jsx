import support_banner from '@assets/img/banner-ngang-5037.png'

function VideoBanner() {
  return (
    <>
      <div className="fade-in support-banner">
        <img src="./img/banner-ngang-5037.png" alt="" />
      </div>
      <div className="fade-in iframe-video">
        <div className="main-title">Truyền thông nói gì ?</div>
        <iframe
          src="https://www.youtube.com/embed/MdxiqAK_X0s?si=2US4R7ZtdFD4rCqx"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </>
  );
}

export default VideoBanner;
