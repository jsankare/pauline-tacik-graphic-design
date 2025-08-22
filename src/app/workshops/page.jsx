import TransitionLink from "../components/TransitionLink";
import { H1 } from "../components/ui/ui";
import clientPromise from "@/lib/mongodb";
// import DebugInfo from "@/components/DebugInfo";
import WorkshopCard from "../components/WorkshopCard";

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
            date: workshop.date ? new Date(workshop.date).toISOString() : null,
            createdAt: workshop.createdAt ? new Date(workshop.createdAt).toISOString() : null,
            updatedAt: workshop.updatedAt ? new Date(workshop.updatedAt).toISOString() : null,
        }));
    } catch (error) {
        console.log('Error fetching workshops:', error);
    }

    return (
        <section className="p-4">
            <H1 title="Ateliers" />
            {/*<DebugInfo data={workshops} title="Workshops Data" />*/}

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-10">
                {workshops.map((workshop, id) => {
                    return (
                        <TransitionLink
                            key={workshop._id?.toString() || id}
                            href={`/workshop/${workshop._id?.toString()}`}
                            label={<WorkshopCard workshop={workshop} />}
                        />
                    );
                })}
            </section>
        </section>
    )
}

export default WorkshopsPage;