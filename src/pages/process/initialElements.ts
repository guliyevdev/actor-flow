import "@/components/Nodes/styles/index.scss"

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
    position: { x: 180, y: 130 },
    data: {
      label: '🟩',
    },
    // ...nodeDefaults,
  },
  {
    id: '3',
    position: { x: 180, y: 250 },
    data: {
      label: '🟧',
    },
    type: "codenode",
    className: 'codeNode'
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
    type: 'rededge',
  },
  {
    id: 'e1-3',
    source: '2',
    target: '3',
    type:'custom',
    style: { stroke: "blue", strokeWidth: 2 },
  },
];
 
export { initialEdges, initialNodes };