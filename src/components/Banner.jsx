import BannerImage from "../assets/golden-triangle.jpg";

const ImageWithOverlayText = () => {
    return (
      <div style={{ position: "relative", marginTop: "0"}}>
        <img
          src={BannerImage}
          alt="Golden Triangle Downtown Kuala Lumpur"
          style={{ width: "90vw", height: "50vh", display: "block", objectFit: "cover", marginBottom: "20px", opacity:"65%"}}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textShadow: "2px 4px #333",
            fontSize: "48px",
            textAlign: "center",
            opacity: "100%",
          }}>
          <h1 style={{fontSize: "60px"}}>Get your public transport updates here.</h1>
        </div>
      </div>
    );
  }

  export default ImageWithOverlayText;