import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";
import About from "./sections/about/About";
import Contact from "./sections/contact/Contact";
import Hero from "./sections/hero/Hero";
import Portfolio from "./sections/portfolio/Portfolio";
import Services from "./sections/services/Services";
import Technology from "./sections/technology/Technology";
import { fetchPageData } from "./Fetchers";
import Arrow from "./components/arrow/Arrow";
// const extractdata = async (page) => {
//   const { data } = await axios.get(`http://localhost:3000/api/${page}/get`);
//   return data && data.data;
// };
export default async function Home() {
  const heroData = await fetchPageData("header");
  const aboutData = await fetchPageData("about");
  const contactData = await fetchPageData("contact");
  const servicesData = await fetchPageData("services");
  const techData = await fetchPageData("tech");
  const projectsData = await fetchPageData("projects");
  return (
    <main className="relative ">
      <Navbar />
      <section className="">
        <Hero heroData={heroData}></Hero>
      </section>
      <section className=" relative ">
        <About aboutData={aboutData} contactData={contactData}></About>
      </section>
      <section className="  ">
        <Technology techData={techData}></Technology>
      </section>
      <section className="  ">
        <Services servicesData={servicesData}></Services>
      </section>
      <section className="padding-t padding-b  " id="portfolio">
        <Portfolio projectsData={projectsData}></Portfolio>
      </section>
      <section id="contact">
        <Contact contactData={contactData}></Contact>
      </section>
      <section id="contact">
        <Footer></Footer>
      </section>
      <Arrow></Arrow>
    </main>
  );
}
