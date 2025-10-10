import { MainTitle } from "./components/ui/ui";
import clientPromise from "@/lib/mongodb";
import FilteredProjects from "./components/FilteredProjects";

export const dynamic = 'force-dynamic';

const Homepage = async () => {
  // Fetch projects from MongoDB
  let projects = [];
  try {
    const client = await clientPromise;
    const db = client.db();
    const rawProjects = await db.collection('projects').find({}).sort({ createdAt: -1 }).toArray();
    
    // Convert MongoDB objects to plain JavaScript objects
    projects = rawProjects.map(project => ({
        ...project,
        _id: project._id.toString(),
        date: project.date || null,
        createdAt: project.createdAt ? new Date(project.createdAt).toISOString() : null,
        updatedAt: project.updatedAt ? new Date(project.updatedAt).toISOString() : null,
    }));
  } catch (error) {
    console.log('Error fetching projects:', error);
  }

  return (
    <section className="flex flex-col py-30 px-10 gap-8 md:py-15">
      <MainTitle
          size="text-5xl"
          bold={false}
          italic
          color="text-primary"

          title="Designer graphique et illustratrice basée à Metz, je conçois avec vous des identités visuelles, supports imprimés et illustrations sur mesure."
      />
      
      <FilteredProjects projects={projects} />
    </section>
  )
}

export default Homepage;

