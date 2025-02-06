import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath,
    useReactFlow,
    type EdgeProps,
  } from '@xyflow/react';
import { Button } from 'antd';
import "./style.css";

  export const RedEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
  }: EdgeProps) => {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
    

    const onEdgeClick = () => {
      // setEdges((edges) => edges.filter((edge) => edge.id !== id));
      alert("Hello world");
    };
   
    return (
      <>
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={{...style,stroke: "red",strokeWidth: 2 }} />
        <EdgeLabelRenderer>
        <div
            className="button-edge__label nodrag nopan"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
          >
            <Button type="primary" shape="circle">
            <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
        </EdgeLabelRenderer>
      </>
    );
  }