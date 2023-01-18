function Loading() {
  return (
    <div className="w-5/6 h-5/6 bg-slate-900 flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-10">
        Finding a pet... Hold your <i className=" ml-3 fa-solid fa-computer-mouse"></i>
      </h1>
      <i className="fa-solid fa-paw animate-spin-slow  text-5xl"></i>
    </div>
  );
}

export default Loading;
