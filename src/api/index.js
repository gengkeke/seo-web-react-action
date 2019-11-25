/*
包含 n 个接口请求函数的模块
每个函数返回 promise
*/
import ajax from './ajax';
// 登陆
export const reqLogin = (username, password) => ajax('/auth/login', {username, password}, 'POST');
//注销
export const reqLogout = () => ajax('/auth/logout');

// 注册
export const reqRegister = (loginName, password, realName, mobilePhone, email, companyName) => {
    return ajax('/register', {loginName, password, realName, mobilePhone, email, companyName}, 'POST')
};

// 用户查询
export const reqUsers = (pageNum, pageSize, userName) => ajax('/users/pageQuery', {pageNum, pageSize, userName});

// 用户查询
export const reqRoles = () => ajax('/roles/pageQuery');


// 用户新增
export const reqSaveUser = (user) => ajax('/users/save', user, 'POST');


// 用户修改
export const reqUpdateUser = (user) => ajax('/users/update', user, 'POST');


// 用户删除
export const reqDeleteUser = (id) => ajax('/users/delete', {id}, 'POST');


// 积分查询
export const reqIntegrals = (pageNum, pageSize, loginName) => ajax('/integrals/pageQuery', {
    pageNum,
    pageSize,
    loginName
});
// 积分充值
export const reqRechargeIntegral = (integral) => ajax('/integrals/recharge', integral, 'POST');
// 积分冻结
export const reqFreezeIntegral = (integral) => ajax('/integrals/freeze', integral, 'POST');
// 积分修改
export const reqUpdateIntegral = (integral) => ajax('/integrals/update', integral, 'POST');

// 关键词市场查询
export const reqKeywords = (pageNum, pageSize, keywordName) => ajax('/keywords/pageQuery', {
    pageNum,
    pageSize,
    keywordName
});

// 关键词市场新增
export const reqSaveKeyword = (keyword) => ajax('/keywords/save', keyword, 'POST');

// 关键词市场修改
export const reqUpdateKeyword = (keyword) => ajax('/keywords/update', keyword, 'POST');

// 关键词市场删除
export const reqDeleteKeyword = (id) => ajax('/keywords/delete', {id}, 'POST');
//关键词下拉
export const reqUserKeywordsList = () => ajax('/keywords/list');

// 用户关键词查询
export const reqUserKeywords = (pageNum, pageSize, keywordName) => ajax('/keywords/user/pageQuery', {
    pageNum,
    pageSize,
    keywordName
});

// 关键词排名查询
export const reqKeywordsRank = (pageNum, pageSize, keywordName) => ajax('/keywords/rank/pageQuery', {
    pageNum,
    pageSize,
    keywordName
});

// 站点查询
export const reqSites = (pageNum, pageSize, siteName) => ajax('/sites/pageQuery', {pageNum, pageSize, siteName});
// 站点查询
export const reqSitesList = () => ajax('/sites/list');
// 站点新增
export const reqSaveSite = (site) => ajax('/sites/save', site, 'POST');

// 站点修改
export const reqUpdateSite = (site) => ajax('/sites/update', site, 'POST');

// 站点删除
export const reqDeleteSite = (id) => ajax('/sites/delete', {id}, 'POST');

//消费积分记录
export const reqConsumeRecords = (pageNum, pageSize, keywordName) => ajax('/consumeRecord/pageQuery', {
    pageNum,
    pageSize,
    keywordName
});

//用户充值记录
export const reqRechargeRecords = (pageNum, pageSize, loginName) => ajax('/rechargeRecord/pageQuery', {
    pageNum,
    pageSize,
    loginName
});




