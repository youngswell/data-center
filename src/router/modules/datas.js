export default {
    path: "/datas",
    name: "datas",
    component: () => import("@/pages/datas"),
    children: [
        {
            path: "/datas",
            redirect: "/datas/list"
        },
        {
            path: "/datas/list/:id",
            name: "datas-list",
            component: () => import("@/pages/datas/list"),
            children: [
                {
                    path: "/datas/list",
                    redirect: "/datas/list/0"
                },
            ]
        },
        {
            path: "/datas/API",
            name: "datas-api",
            component: () => import("@/pages/datas/api"),
        }
    ]
}