import { ProjectList } from "./projectList";
import { Page } from "@/components/ui/page";
import { NewBoardDialog } from "./newBoardDialog";

const ProjectsPage = () => (
  <Page>
    <NewBoardDialog />
    <ProjectList />
  </Page>
);

export default ProjectsPage;
