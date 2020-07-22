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
            path: "/datas/list",
            name: "datas-list",
            component: () => import("@/pages/datas/list"),
        },
        {
            path: "/datas/API",
            name: "datas-api",
            component: () => import("@/pages/datas/api"),
        }
    ]
}