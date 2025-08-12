import TransitionLink from "@/app/components/TransitionLink";

const Homepage = () => {
  return (
      <section className="p-4" >
        <h1 className="text-7xl font-extrabold text-center mt-10" >Homepage</h1>
          <TransitionLink label={"projet toto"} href={"/project/toto"} />
      </section>
  )
}

export default Homepage;