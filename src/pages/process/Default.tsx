import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Start } from '@/components/Nodes';
import ButtonEdge from "./CustomEdge.tsx";
import "./index.css"
import "./xy-theme.css"

const edgeTypes = { buttonedge: ButtonEdge };

import { initialEdges, initialNodes } from './initialElements.ts';


const nodeTypes: NodeTypes = {
  startnode: Start,
};
const proOptions = { hideAttribution: true };
export const DefaultProcessPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: 'auto', height: '92vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={proOptions}
      >
        <Controls />
        <MiniMap />
        <Background variant='none'  gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}