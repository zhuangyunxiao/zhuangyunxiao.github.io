import { HomeIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import ExperienceDetail from "./pages/ExperienceDetail.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Experience Detail",
    to: "/experience/:id",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <ExperienceDetail />,
  },
  {
    title: "Project Detail",
    to: "/projects/:id",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <ProjectDetail />,
  },
];
