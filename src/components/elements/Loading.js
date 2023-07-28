export default function Loading({ isTransparent }) {
  return (
    <div
      className="preloader flex-column justify-content-center align-items-center"
      style={{ backgroundColor: isTransparent && "transparent" }}
    >
      <img
        src="/loading.png"
        className="rotate"
        width="70"
        height="70"
      />
    </div>
  );
}