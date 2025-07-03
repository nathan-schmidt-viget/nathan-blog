import { Projects } from "../components/projects";

export const metadata = {
  title: "Projects",
  description: "A collection of my projects and work.",
};

export default function Page() {
  return (
    <section>
      <h1 className='font-semibold text-2xl mb-8 tracking-tighter'>
        Featured Projects
      </h1>
      <Projects />
    </section>
  );
}
