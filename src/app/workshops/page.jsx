import {H1, H3} from "../components/ui/ui";
import clientPromise from "@/lib/mongodb";
import FilteredWorkshops from "../components/FilteredWorkshops";

export const metadata = {
  title: "Ateliers | Pauline Tacik",
  description: "Découvrez les ateliers de gravure et d'illustration animés par Pauline Tacik, pour tous les publics.",
  openGraph: {
    title: "Ateliers | Pauline Tacik",
    description: "Ateliers de gravure et d'illustration pour tous les publics.",
    images: [{ url: "/ptacik-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ateliers | Pauline Tacik",
    description: "Ateliers de gravure et d'illustration pour tous les publics.",
    images: ["/ptacik-logo.png"],
  },
};

export const dynamic = 'force-dynamic';

const WorkshopsPage = async () => {
    // Fetch workshops from MongoDB
    let workshops = [];
    try {
        const client = await clientPromise;
        const db = client.db();
        const rawWorkshops = await db.collection('workshops').find({}).sort({ createdAt: -1 }).toArray();

        workshops = rawWorkshops.map(workshop => ({
            ...workshop,
            _id: workshop._id.toString(),
            date: workshop.date || null,
            createdAt: workshop.createdAt ? new Date(workshop.createdAt).toISOString() : null,
            updatedAt: workshop.updatedAt ? new Date(workshop.updatedAt).toISOString() : null,
        }));
    } catch (error) {
        console.log('Error fetching workshops:', error);
    }

    return (
        <section className="flex flex-col px-10 gap-8 md:py-15">
            <H3
                size="text-5xl"
                bold={false}
                italic
                color="text-primary"

                title="Ateliers"
            />
            
            <FilteredWorkshops workshops={workshops} />
        </section>
    )
}

export default WorkshopsPage;

