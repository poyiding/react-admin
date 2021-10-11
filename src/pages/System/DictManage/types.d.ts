export type DictInfoType = {
  dictKey?: string;
  dictName?: string;
  attr?: string;
  description?: string;
  id?: number;
  validStatus?: number;
  dictId?: number | string;
};

export type SearchParams = {
  currPageNo: number;
  limit: number;
  condition: string;
  parentKey: string | number;
};

export type OptionModal = {
  visible: boolean;
  onCancel: () => void;
  parentKey: string | number;
};

export type OptionList = Pick<DictInfoType, 'dictKey' | 'dictName' | 'attr'>[];
