function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="w-12 h-12 rounded-full border-4 border-t-black border-r-black border-b-transparent border-l-transparent animate-spin"
        style={{ borderWidth: "5px" }}
      ></div>
    </div>
  );
}
export default Loading;
