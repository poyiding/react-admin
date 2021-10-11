export type UserListItem = {
  userName?: string;
  userCode?: string;
  phone?: string;
  roleName?: string;
  roleCodes?: string[];
  account?: string;
  deptName?: string;
  pDeptName?: string;
  email?: string;
  description?: string;
  status?: string;
};

export type SearchParams = {
  currPageNo: number;
  limit: number;
  account?: string;
  phone?: string;
  userName?: string;
  pertainCode?: string;
};
