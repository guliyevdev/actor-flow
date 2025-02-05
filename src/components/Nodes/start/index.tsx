import { Handle, NodeProps, Position } from "@xyflow/react";
import { FC } from "react";
import style from './style.module.scss'

export const Start: FC<NodeProps> = () => (
    <>
        <div className={style.triangle}></div>
      <Handle type="source" position={Position.Bottom} className="custom-handle"/>
    </>
);