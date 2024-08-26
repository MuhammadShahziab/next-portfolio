import Navbar from "@/app/components/Navbar/Navbar";
import All_projects from "@/app/components/all_projects/All_projects";
import Footer from "@/app/components/footer/Footer";
import { fetchPageData } from "@/app/Fetchers";

const ProjectsPage = async () => {
  const data = await fetchPageData("projects");
  const heroData = await fetchPageData("header");

  return (
    <div>
      <Navbar></Navbar>
      <All_projects projectData={data && data} />

      <Footer heroData={heroData && heroData}></Footer>
    </div>
  );
};

export default ProjectsPage;
