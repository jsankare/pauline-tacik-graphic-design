import { H3 } from "./components/ui/ui";
import clientPromise from "@/lib/mongodb";
import FilteredProjects from "./components/FilteredProjects";

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
    <section className="flex flex-col py-30 px-10 gap-10 md:py-15">
        <div/>
      <H3 size="text-lg" color="text-primary" italic title="Designer graphique et illustratrice basée à Metz, je conçois avec vous des identités visuelles, supports imprimés et illustrations sur mesure." />
      
      <FilteredProjects projects={projects} />
    </section>
  )
}

export default Homepage;

