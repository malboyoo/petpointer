import { useEffect, useRef, useState } from "react";
import { images } from "./data/imagebank";
import Loading from "./Loading";

function Playground() {
  const map = useRef({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [closestImg, setClosestImg] = useState({ url: "", translateX: 0, translateY: 0 });

  useEffect(() => {
    let cancel = false;
    const id = setTimeout(() => {
      setClosestImg(chooseImg(mousePos));
    }, 1500);

    return () => {
      cancel = true;
      clearTimeout(id);
      setClosestImg({ url: "", translateX: 0, translateY: 0 });
    };
    // console.log(mousePos);
  }, [mousePos]);

  function calculateMousePos(event) {
    let x = Math.round(((event.clientX - map.current.offsetLeft) / map.current.offsetWidth) * 100);
    let y = Math.round(((event.clientY - map.current.offsetTop) / map.current.offsetHeight) * 100);
    setMousePos({ x, y });
  }

  function sqr(a) {
    return a * a;
  }

  function chooseImg(mousePos) {
    let url = "";
    let x = 0;
    let y = 0;
    let minDistance = 200;

    images.map((el) => {
      let distance = Math.round(Math.sqrt(sqr(el.y - mousePos.y) + sqr(el.x - mousePos.x)));
      if (distance < minDistance) {
        url = el.url;
        minDistance = distance;
        x = el.x;
        y = el.y;
      }
    });
    if (url !== "") {
      return { url, translateX: `${mousePos.x - x}%`, translateY: `${mousePos.y - y}%` };
    }
  }

  return (
    <div
      ref={map}
      onMouseMove={(event) => {
        calculateMousePos(event);
      }}
      className="min-h-[350px] min-w-[350px] w-[1080px] h-[1080px]  text-4xl flex justify-center items-center overflow-hidden"
    >
      {closestImg.url ? (
        <img
          className={`w-[110%] h-[110%]  object-cover`}
          src={closestImg.url}
          style={{ transform: `translate(${closestImg.translateX}, ${closestImg.translateY})` }}
          alt=""
        />
      ) : (
        <Loading />
      )}
      {/* <img
        className="min-w-[110%] min-h-[110%] object-cover"
        src="https://images.unsplash.com/photo-1630359555185-87e1a286cf6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1588&q=80"
        alt=""
      /> */}
    </div>
  );
}

export default Playground;
