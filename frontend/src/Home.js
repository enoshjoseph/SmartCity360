import Plx from "react-plx";
import './Home.css';
import HomeNavbar from "./HomeNavbar";

function Home() {
  return (
    <div>
      <div className="homeMain">
      {/* Navbar with scroll-triggered visibility */}
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 700,
            properties: [
              {
                startValue: 0,
                endValue: 0,
                property: "opacity"
              }
            ]
          },
          {
            start: 700,
            end: 701, // Small range to make it appear instantly at 700
            properties: [
              {
                startValue: 0,
                endValue: 1,
                property: "opacity"
              }
            ]
          }
        ]}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 300 // Ensure the Navbar is above other elements
        }}
      >
        <HomeNavbar />
      </Plx>

      {/* Background and foreground elements */}
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 700,
            easing: "ease-in",
            properties: [
              {
                startValue: 1,
                endValue: 1.6,
                property: "scale"
              }
            ]
          }
        ]}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          zIndex: 100
        }}
      >
        <img style={{ width: "100%" }} src="bg.png" alt="foreground" />
      </Plx>
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 800,
            properties: [
              {
                startValue: 1,
                endValue: 1.18,
                property: "scale"
              }
            ]
          }
        ]}
        style={{  
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%"
        }}
      >
        <img style={{ width: "100%" }} src="background.jpg" alt="background" />
      </Plx>
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 400,
            properties: [
              {
                startValue: 1,
                endValue: 0,
                property: "opacity"
              }
            ]
          }
        ]}
        style={{
          position: "fixed",
          left: 0,
          top: "26vw",
          width: "100%"
        }}
      >
        <img
          style={{
            width: "30vw"
          }}
          src="spider2.png"
          alt="Goonies"
        />
      </Plx>
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 200,
          paddingTop: "56%",
          height: "400vh",
          width: "100%"
        }}
      >
        <div
          style={{
            background: "#000",
            height: "100%"
          }}
        ></div>
      </div>
      </div>
    </div>
  );
}

export default Home;