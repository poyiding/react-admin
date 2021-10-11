import { Request, Response } from 'express';

export default {
  'GET /absplat/prod/list.json': (req: Request, res: Response) => {
    res.send({
      dataObject: {
        datas: [
          {
            abssqrProdCode: 'prodCode_1002',
            approveStatus: { code: 'PASSED', desc: '已通过' },
            managerOrgCode: '1009',
            managerOrgName: '1009',
            operate: 0,
            prodCode: 'pd1002',
            prodName: '信贷准入产品001xxx',
          },
        ],
        currPageNo: 1,
        limit: 20,
        total: 1,
      },
      success: true,
    });
  },
};
