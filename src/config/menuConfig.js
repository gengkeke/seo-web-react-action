const menuList = [
    {
        title: ' 概览', // 菜单标题名称
        key: '/home', // 对应的 path
        icon: 'home', // 图标名称
    },
    {
        title: ' 用户管理',
        key: '/user',
        icon: 'user'
    },
    {
        title: ' 角色管理',
        key: '/role',
        icon: 'home'
    },
    {
        title: ' 权限管理',
        key: '/permission',
        icon: 'home'
    },
    {
        title: ' 积分管理',
        key: '/integral',
        icon: 'home'
    },
    {
        title: ' 关键词管理',
        key: '/keyword',
        icon: 'appstore',
        children: [ // 子菜单列表
            {
                title: ' 关键词市场',
                key: '/keyword/market',
                icon: 'bars'
            },
            {
                title: ' 用户关键词',
                key: '/keyword/user',
                icon: 'tool'
            },
            {
                title: ' 关键词排名',
                key: '/keyword/rank',
                icon: 'tool'
            }
        ]
    },
    {
        title: ' 站点管理',
        key: '/site',
        icon: 'safety',
    },
    {
        title: ' 用户记录',
        key: '/record',
        icon: 'area-chart',
        children: [
            {
                title: ' 消费记录',
                key: '/record/consume',
                icon: 'bar-chart'
            },
            {
                title: ' 充值记录',
                key: '/record/recharge',
                icon: 'line-chart'
            }
        ]
    },
    {
        title: ' 告警管理',
        key: '/alarm',
        icon: 'pie-chart'
    },
    {
        title: ' 日志管理',
        key: '/log',
        icon: 'pie-chart'
    }
];
export default menuList;