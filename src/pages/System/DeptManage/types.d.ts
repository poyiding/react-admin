export interface DeptInfo {
  simpleName: string;
  pcode?: string;
  type: string;
  typeCode: string;
  code?: string;
}

export type DataNode =
  | {
      length: JSX.Element;
      title: string;
      key: string;
      isLeaf?: boolean;
      children?: DataNode[];
    }
  | [];
