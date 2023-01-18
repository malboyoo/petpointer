import { useEffect, useRef, useState } from "react";
import { images } from "./data/imagebank";
import Loading from "./Loading";

function Playground() {
  const map = useRef({});
  const [mousePos, setMousePos] = useState({});
  const [closestImg, setClosestImg] = useState("");

  useEffect(() => {
    let cancel = false;
    const id = setTimeout(() => {
      setClosestImg(chooseImg(mousePos));
    }, 2000);

    return () => {
      cancel = true;
      clearTimeout(id);
      setClosestImg("");
    };
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
    let minDistance = 200;

    images.map((el) => {
      let distance = Math.round(Math.sqrt(sqr(el.y - mousePos.y) + sqr(el.x - mousePos.x)));
      console.log(distance);
      if (distance < minDistance) {
        url = el.url;
        minDistance = distance;
      }
    });

    if (url !== "") {
      return url;
    }
    console.log("current distance is:", minDistance);
  }

  return (
    <div
      ref={map}
      onMouseMove={(event) => {
        calculateMousePos(event);
      }}
      className="bg-slate-900 min-h-[370px] min-w-[370px] w-[1200px] h-[1200px]  text-4xl flex justify-center items-center"
    >
      {closestImg ? <img className="w-full h-full object-cover" src={closestImg} alt="" /> : <Loading />}
      {/* <img
        className="w-full h-full object-cover"
        src="https://images.pexels.com/photos/1398185/pexels-photo-1398185.jpeg"
        alt=""
      /> */}
    </div>
  );
}

export default Playground;
