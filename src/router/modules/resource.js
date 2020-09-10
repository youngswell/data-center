export default {
    path: '/resource',
    name: 'resource',
    meta: {
        title: '数据',
        module: 'resource',
    },
    component: () => import('@/pages/resource'),
    children: [
        {
            path: '/resource',
            redirect: '/resource/catalog',
        },
        {
            path: '/resource/catalog',
            name: 'resource-catalog',
            meta: {
                title: '数据分类',
                module: 'catalog',
            },
            component: () => import('@/pages/resource/catalog'),
        },
        {
            path: '/resource/interface',
            name: 'resource-interface',
            meta: {
                title: 'API',
                module: 'interface',
            },
            component: () => import('@/pages/resource/interface'),
        },
        {
            path: '/resource/info/:id',
            name: 'resource-info',
            component: () => import('@/pages/resource/info'),
        },
    ],
}
