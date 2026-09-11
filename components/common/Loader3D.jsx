/**
 * Shared loading state for admin list/detail pages. Renders in place of the
 * table/list while data is being fetched, so a page never flashes an empty
 * state before the real data arrives (see admin-loader3d styles in
 * globals.css).
 */
export default function Loader3D({ label = 'Loading' }) {
  return (
    <div className="admin-loader3d-wrap">
      <div className="admin-loader3d-scene">
        <div className="admin-loader3d-cube">
          <div className="face face-front" />
          <div className="face face-back" />
          <div className="face face-right" />
          <div className="face face-left" />
          <div className="face face-top" />
          <div className="face face-bottom" />
        </div>
        <div className="admin-loader3d-shadow" />
      </div>
      {label && <p className="admin-loader3d-label">{label}</p>}
    </div>
  );
}
