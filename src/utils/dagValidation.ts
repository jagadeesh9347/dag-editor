import type { Edge, Node } from 'reactflow';

export default function validateDAG(nodes: Node[], edges: Edge[]) {
  if (nodes.length < 2) return false;

  const adj: Record<string, string[]> = {};
  nodes.forEach((node) => (adj[node.id] = []));
  edges.forEach((e) => {
    if (e.source !== e.target) {
      adj[e.source].push(e.target);
    }
  });

  const visited = new Set<string>();
  const recStack = new Set<string>();

  function hasCycle(nodeId: string): boolean {
    visited.add(nodeId);
    recStack.add(nodeId);
    for (const neighbor of adj[nodeId]) {
      if (!visited.has(neighbor) && hasCycle(neighbor)) return true;
      if (recStack.has(neighbor)) return true;
    }
    recStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id) && hasCycle(node.id)) return false;
  }

  // Check all nodes are connected to at least one edge
  const connected = new Set([...edges.map((e) => e.source), ...edges.map((e) => e.target)]);
  if (nodes.some((n) => !connected.has(n.id))) return false;

  return true;
}
