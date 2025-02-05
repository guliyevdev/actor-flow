import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { FC } from "react";
import style from "./style.module.scss";

export const Code: FC<NodeProps> = () => (
    <>
    <Handle type="target" position={Position.Top} />
        <div className={style.box}>
            <FontAwesomeIcon icon={faCode} size="2x" color="black" />
            <div className={style.error}>
                <p>Error</p>
            </div>
        </div>
      <Handle type="source"  position={Position.Right}/>
      <Handle type="source" position={Position.Bottom} />
    </>
);      