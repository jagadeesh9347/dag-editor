import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  MarkerType,
  useReactFlow,
} from 'reactflow';

import type { Connection, Edge, Node } from 'reactflow';

import 'reactflow/dist/style.css';



import CustomNode from './components/CustomNode';
import ControlsPanel from './components/ControlsPanel';
import JSONPreview from './components/JSONPreview';
import validateDAG from './utils/dagValidation';
import { getLayoutedElements } from './utils/layoutHelper';

const nodeTypes = { custom: CustomNode };

let id = 0;
const getId = () => `node_${id++}`;

function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isValid, setIsValid] = useState(false);
  const { fitView } = useReactFlow();

  const onConnect = useCallback((params: Edge | Connection) => {
    if (params.source === params.target) return;

    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: 'default',
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        eds
      )
    );
  }, []);

  const addNode = () => {
    const label = prompt('Enter node label');
    if (!label) return;
    const newNode: Node = {
      id: getId(),
      type: 'custom',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const autoLayout = () => {
    const { layoutedNodes, layoutedEdges } = getLayoutedElements(nodes, edges);
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    fitView();
  };

  const deleteSelected = useCallback(() => {
    setNodes((nds) => nds.filter((n) => !n.selected));
    setEdges((eds) => eds.filter((e) => !e.selected));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete') deleteSelected();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelected]);

  useEffect(() => {
    const valid = validateDAG(nodes, edges);
    setIsValid(valid);
  }, [nodes, edges]);

  return (
    <>
      <ControlsPanel addNode={addNode} autoLayout={autoLayout} />
      <div style={{ width: '100vw', height: '90vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <div style={{ padding: '10px', fontWeight: 'bold', color: isValid ? 'green' : 'red' }}>
        {isValid ? '✅ Valid DAG' : '❌ Invalid DAG'}
      </div>
      <JSONPreview nodes={nodes} edges={edges} />
    </>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}
