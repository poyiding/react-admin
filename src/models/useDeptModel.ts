import { useState, useCallback } from 'react';

export default function useDeptModel() {
  const [selectedNode, setSelected] = useState<{ nodeKey?: string; nodeType?: string }>({});
  const [deptInfo, setDeptInfo] = useState({});

  const setSelectedNode = useCallback((node) => {
    setSelected(node);
  }, []);

  const setDeptInfoData = useCallback((data) => {
    setDeptInfo(data);
  }, []);

  return {
    selectedNode,
    setSelectedNode,
    deptInfo,
    setDeptInfoData,
  };
}
