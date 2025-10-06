import { H1 } from "../components/ui/ui";
import clientPromise from "@/lib/mongodb";
import FilteredWorkshops from "../components/FilteredWorkshops";

const WorkshopsPage = async () => {
    // Fetch workshops from MongoDB
    let workshops = [];
    try {
        const client = await clientPromise;
        const db = client.db();
        const rawWorkshops = await db.collection('workshops').find({}).toArray();

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
        <section className="p-4">
            <H1 title="Ateliers" />
            
            <FilteredWorkshops workshops={workshops} />
        </section>
    )
}

export default WorkshopsPage;

