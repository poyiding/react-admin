// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    account?: string;
    userName?: string;
    userCode?: string;
    orgCode?: string;
    orgName?: string;
    authMenus?: array[string];
    authFunctionList?: array[string];
    authFunctions?: { [key: string]: any };
  };
  type UserInfoResult = {
    success?: boolean;
    dataObject?: CurrentUser;
  };

  type LoginResult = {
    success?: boolean;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    account?: string;
    password?: string;
    remember?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  interface CreateModalForm {
    visible: boolean;
    onOk: (values?: Record<any>) => void;
    onCancel: () => void;
  }
}
