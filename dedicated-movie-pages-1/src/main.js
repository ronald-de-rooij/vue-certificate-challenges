import { createApp } from "vue"
import App from "./App.vue"
import "../style.css"
import { createRouter, createWebHistory } from "vue-router"
import HomePage from "./pages/HomePage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/:id",
      name: "movieDetail",
      component: () => import("./pages/MovieDetailpage.vue"),
      props: (route) => ({ id: Number(route.params.id) }),
    },
  ],
})

createApp(App).use(router).mount("#app")
