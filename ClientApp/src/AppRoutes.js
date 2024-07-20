import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import {BrawlerDisplay} from "./components/BrawlerDisplay";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/brawler-display',
    element: <BrawlerDisplay />
  }
];

export default AppRoutes;
