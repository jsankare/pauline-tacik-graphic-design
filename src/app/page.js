import { MainTitle } from "./components/ui/ui";
import clientPromise from "@/lib/mongodb";
import FilteredProjects from "./components/FilteredProjects";

export const metadata = {
  title: "Designer graphique & illustratrice à Metz | Pauline Tacik",
  description:
    "Portfolio de Pauline Tacik, designer graphique et illustratrice à Metz. Identités visuelles, supports imprimés, gravure et illustration.",
  openGraph: {
    title: "Designer graphique & illustratrice à Metz | Pauline Tacik",
    description:
      "Portfolio de Pauline Tacik, designer graphique et illustratrice à Metz. Identités visuelles, supports imprimés, gravure et illustration.",
    url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
    images: [{ url: "/ptacik-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Designer graphique & illustratrice à Metz | Pauline Tacik",
    description:
      "Portfolio de Pauline Tacik, designer graphique et illustratrice à Metz.",
    images: ["/ptacik-logo.png"],
  },
};

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
    <section className="flex flex-col px-10 gap-8 md:py-15">
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

