import Link from "next/link";
import { formatDate, getProjects } from "../utils/utils";
import clients from "../projects/clients.json";

export function Projects() {
  let allProjects = getProjects();

  return (
    <div className='flex flex-col gap-4'>
      {allProjects
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className='flex flex-col hover:underline focus-visible:underline'
            href={`/projects/${post.slug}`}
          >
            <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-2'>
              <p className='text-neutral-900 dark:text-neutral-100 tracking-tight'>
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
      <div className='flex flex-col gap-6 mt-8'>
        <h2 className='text-sm uppercase font-bold text-neutral-600 dark:text-neutral-300'>
          Clients I have worked with
        </h2>
        <ul className='flex flex-col gap-x-6 gap-y-4'>
          {clients.clients
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((client) => (
              <li key={client.name} className='text-md'>
                {client.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
