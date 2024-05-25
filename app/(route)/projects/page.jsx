import { getData } from "@/app/(services)/services";
import Navbar from "@/app/components/Navbar/Navbar";
import All_projects from "@/app/components/all_projects/All_projects";
import Footer from "@/app/components/footer/Footer";
import axios from "axios";
import { fetchPageData } from "@/app/Fetchers";
// const projectData = async (page) => {
//   try {
//     const { data } = await axios.get(`http://localhost:3000/api/${page}/get`);
//     return data && data.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
const ProjectsPage = async () => {
  // const data = await projectData("projects");
  const data = await fetchPageData("projects");
  console.log(data, "check project data 11");
  return (
    <div>
      <Navbar></Navbar>
      <All_projects projectData={data && data} />
      {/* {data?.map((item, index) => {
        return (
          <>
            <h1 className="padding">not f0ound</h1>
          </>
        );
      })} */}

      <Footer></Footer>
    </div>
  );
};

export default ProjectsPage;
