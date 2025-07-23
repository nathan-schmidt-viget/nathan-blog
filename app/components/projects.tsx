import Link from "next/link";
import { getProjects } from "../utils/utils";

export function Projects() {
  let allProjects = getProjects();

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
            className='flex flex-col gap-2 items-start group'
            href={`/projects/${post.slug}`}
          >
            <div className='flex gap-1 items-center'>
              <h2 className='text-lg font-bold transition-all duration-300 group-hover:underline group-focus-visible:underline text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100'>
                {post.metadata.title}
              </h2>
              {post.metadata.award && (
                <p className='text-xs text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-all duration-300 bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded-md'>
                  {post.metadata.award}
                </p>
              )}
            </div>
            <p className='text-sm transition-all duration-300 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100'>
              {post.metadata.summary}
            </p>
          </Link>
        ))}
    </div>
  );
}
