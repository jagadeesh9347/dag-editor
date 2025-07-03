export default function ControlsPanel({ addNode, autoLayout }: any) {
  return (
    <div style={{ padding: 10 }}>
      <button onClick={addNode} style={{ marginRight: 10 }}>➕ Add Node</button>
      <button onClick={autoLayout}>📐 Auto Layout</button>
    </div>
  );
}
