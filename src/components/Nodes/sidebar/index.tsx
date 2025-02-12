import { DragEvent } from 'react';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faCode } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

export const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <div className="react-flow__node-input" onDragStart={(event: DragEvent) => onDragStart(event, 'input')} draggable>
      <Button>
        <FontAwesomeIcon icon={faCode} />
      </Button>
      </div>
      <div
        className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'error')}
        draggable
      >
        <Button >
          <FontAwesomeIcon icon={faCircleExclamation} />
        </Button>
      </div>
    </aside>
  );
};
