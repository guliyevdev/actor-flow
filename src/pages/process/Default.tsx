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
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Start, Code } from '@/components/Nodes';
import { RedEdge } from "@/components/Edges"
import styles from "./style/index.module.css"
import "./style/xy-theme.css"

const edgeTypes = { rededge: RedEdge };

import { initialEdges, initialNodes } from './initialElements.ts';
import { Sidebar } from '@/components/Nodes/sidebar/index.tsx';
// import styles from "./index.module.css"

const nodeTypes: NodeTypes = {
  startnode: Start,
  codenode: Code
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
    <div className={styles.dndflow} style={{ width: 'auto', height: '92vh' }}>
      <ReactFlowProvider initialNodes={initialNodes} initialEdges={[]}>
        <div className={styles.wrapper}>
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
            <Background variant='none' gap={12} size={1} />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}