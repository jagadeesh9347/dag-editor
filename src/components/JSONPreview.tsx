export default function JSONPreview({ nodes, edges }: any) {
  return (
    <pre style={{ fontSize: 12, background: '#eee', padding: 10, marginTop: 10 }}>
      {JSON.stringify({ nodes, edges }, null, 2)}
    </pre>
  );
}
