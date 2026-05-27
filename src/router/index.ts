import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import i18n from "@/i18n";
import { trackPageview } from "@/utils/analytics";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
        meta: { titleKey: "routes.home" },
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/views/AboutView.vue"),
        meta: { titleKey: "routes.about" },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFoundView.vue"),
    meta: { titleKey: "routes.notFound" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const titleKey = to.meta.titleKey as string | undefined;
  const title = titleKey ? (i18n.global as any).t(titleKey) : "Regex AI";
  document.title = title;
  trackPageview(to.fullPath, title);
});

export default router;
