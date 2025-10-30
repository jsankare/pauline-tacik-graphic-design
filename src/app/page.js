import { MainTitle } from "./components/ui/ui";
import clientPromise from "@/lib/mongodb";
import FilteredProjects from "./components/FilteredProjects";

export const metadata = {
  title: "Graphiste et illustratrice à Metz, Nancy, Luxembourg | Pauline Tacik",
  description:
    "Graphisme, illustration et linogravure pour vos projets à Metz, Nancy et Luxembourg : identité visuelle, logo, affiche, édition et supports imprimés. Découvrez mon portfolio et commandez vos créations.",
  openGraph: {
    title: "Graphiste et illustratrice à Metz, Nancy, Luxembourg | Pauline Tacik",
    description:
      "Portfolio et prestations de graphisme, identité visuelle, illustration et linogravure à Metz, Nancy et Luxembourg. Projets sur mesure pour entreprises et indépendants.",
    url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
    images: [{ url: "/ptacik-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Graphiste et illustratrice à Metz, Nancy, Luxembourg | Pauline Tacik",
    description:
      "Identité visuelle, logo, affiche et illustration. Découvrez mon portfolio et mes services à Metz, Nancy et Luxembourg.",
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

