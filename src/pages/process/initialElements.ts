import "@/components/Nodes/styles/StartNode.scss"

const initialNodes = [
  {
    id: '1',
    position: { x: 150, y: 0 },
    data: {
      label: '🟩',
    },
    type: "startnode",
    className: 'startNode'
  },
  {
    id: '2',
    position: { x: 250, y: 70 },
    data: {
      label: '🟩',
    },
    // ...nodeDefaults,
  },
  {
    id: '3',
    position: { x: 350, y: 100 },
    data: {
      label: '🟧',
    },
    // ...nodeDefaults,
  },
  {
    id: '4',
    position: { x: 500, y: 180 },
    data: {
      label: '🟦',
    },
    // ...nodeDefaults,
  },
];
 
const initialEdges = [
  {
    id: 'edge-button',
    source: '1',
    target: '2',
    type: 'buttonedge',
  },
  {
    id: 'e1-3',
    source: '2',
    target: '3',
    type:'custom'
    // style: { stroke: "blue", strokeWidth: 2 },
  },
];
 
export { initialEdges, initialNodes };