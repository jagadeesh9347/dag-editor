import { Handle, Position } from 'reactflow';

export default function CustomNode({ data }: any) {
  return (
    <div style={{ padding: 10, border: '2px solid #4f46e5', borderRadius: 8, background: '#fff' }}>
      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
