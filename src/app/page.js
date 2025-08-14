import TransitionLink from "./components/TransitionLink";
import Image from "next/image";
import { H1 } from "./components/ui/ui";
import clientPromise from "@/lib/mongodb";

const Homepage = async () => {
  // Fetch projects from MongoDB
  let projects = [];
  try {
    const client = await clientPromise;
    const db = client.db();
    projects = await db.collection('projects').find({}).toArray();
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  return (
      <section className="p-4">
          <H1 title="Bienvenue !" />
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-10">
              {projects.map((project, id) => (
                  <TransitionLink
                      key={project._id || id}
                      href={`/project/${project._id}`}
                      label={
                          <div className="relative group overflow-hidden rounded-lg shadow-lg">
                              <Image
                                  width={500}
                                  height={300}
                                  alt={project.title}
                                  src={project.thumbnail || '/placeholder.svg'}
                                  className="w-full h-72 object-cover transform transition-transform duration-500 group-hover:scale-110"
                              />
                              {/* Image Overlay */}
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <span className="text-white text-lg font-semibold text-center px-4">{project.title}</span>
                              </div>
                          </div>
                      }
                  />
              ))}
          </section>
      </section>
  )
}

export default Homepage;