import { createApp } from "vue";
import App from "./App.vue";
import "../style.css";
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";

createApp(App)
  .use(
    createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", component: HomePage },
        {
          path: "/:id",
          name: "movie",
          component: () => import("./pages/MovieDetailPage.vue"),
          props: (route) => ({ id: Number(route.params.id) }),
        },
      ],
    })
  )
  .mount("#app");
