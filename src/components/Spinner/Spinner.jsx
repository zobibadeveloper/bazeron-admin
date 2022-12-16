export default function Spinner({ className, svgClass }) {
  return (
    <div className={`min-height-80 w-100 d-flex justify-content-center align-items-center ${className}`}>
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
