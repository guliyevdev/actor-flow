import { useCallback, useState,DragEvent } from 'react';
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
  ReactFlowInstance,
  NodeOrigin
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



const onDragOver = (event: DragEvent) => {
  event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeOrigin: NodeOrigin = [0.5, 0.5];

const nodeTypes: NodeTypes = {
  startnode: Start,
  codenode: Code
};
const proOptions = { hideAttribution: true };
export const DefaultProcessPage = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    }
  };

  return (
    <div className={styles.dndflow} style={{ width: 'auto', height: '92vh' }}>
      <ReactFlowProvider initialNodes={initialNodes} initialEdges={[]}>
      <Sidebar />
        <div className={styles.wrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onInit={onInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeOrigin={nodeOrigin}
            onConnect={onConnect}
            proOptions={proOptions}
          >
            <Controls />
            <MiniMap />
            <Background variant='none' gap={12} size={1} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}