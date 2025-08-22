import TransitionLink from "./components/TransitionLink";
import { H1 } from "./components/ui/ui";
import clientPromise from "@/lib/mongodb";
// import DebugInfo from "../../src/components/DebugInfo.jsx";
import ProjectCard from "./components/ProjectCard";



const Homepage = async () => {
  // Fetch projects from MongoDB
  let projects = [];
  try {
    const client = await clientPromise;
    const db = client.db();
    const rawProjects = await db.collection('projects').find({}).toArray();
    
    // Convert MongoDB objects to plain JavaScript objects
    projects = rawProjects.map(project => ({
      ...project,
      _id: project._id.toString(),
      date: project.date ? new Date(project.date).toISOString() : null,
      createdAt: project.createdAt ? new Date(project.createdAt).toISOString() : null,
      updatedAt: project.updatedAt ? new Date(project.updatedAt).toISOString() : null,
    }));
  } catch (error) {
    console.log('Error fetching projects:', error);
  }

  return (
      <section className="p-4">
          <H1 title="Bienvenue !" />
          
            {/* Debug Info - Only shows in development */}
            {/* <DebugInfo data={projects} title="Projects Data" /> */}
          
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-10">
              {projects.map((project, id) => {
                  return (
                      <TransitionLink
                          key={project._id?.toString() || id}
                          href={`/project/${project._id?.toString()}`}
                          label={<ProjectCard project={project} />}
                      />
                  );
              })}
          </section>
      </section>
  )
}

export default Homepage;