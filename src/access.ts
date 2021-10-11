/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState;
  // 默认将权限配置为false，请求得到authFunctionList如果包含该权限码设置true
  const accessObj = {
    system: false, // 系统管理
    productAdd: false, // 新增产品
  };
  currentUser?.authFunctionList.forEach((item: string) => {
    accessObj[item] = true;
  });
  return accessObj;
}
