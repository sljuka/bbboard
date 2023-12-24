import { ProjectList } from "./projectList";
import { Page } from "@/components/ui/page";
import { NewBoardDialog } from "./newBoardDialog";

const ProjectsPage = () => (
  <Page>
    <div className="flex flex-col gap-4">
      <div>
        <NewBoardDialog />
      </div>
      <ProjectList />
    </div>
  </Page>
);

export default ProjectsPage;
