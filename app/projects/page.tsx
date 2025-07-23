import { Projects } from "../components/projects";
import GithubRepos from "../components/github-repos";

export const metadata = {
  title: "Projects",
  description: "A collection of my projects and work.",
};

export default function Page(): JSX.Element {
  return (
    <section className='flex flex-col gap-12'>
      <div>
        <h1 className='font-semibold text-2xl mb-4 tracking-tighter'>
          Featured Projects
        </h1>
        <Projects />
      </div>
      <GithubRepos />
    </section>
  );
}
