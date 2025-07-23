import Link from "next/link";

export default async function GithubRepos() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/github`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    console.error(
      "Failed to fetch GitHub data:",
      response.status,
      response.statusText
    );
    return <div>Failed to load GitHub projects</div>;
  }

  const data = await response.json();
  const pinnedItems = data.user.pinnedItems.edges.map(({ node }) => node);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-end gap-4'>
        <h2 className='text-2xl font-bold tracking-tighter'>GitHub Projects</h2>
        <p className='text-sm text-neutral-500 dark:text-neutral-500'>
          {data.user.contributionsCollection.contributionCalendar.totalContributions.toLocaleString()}{" "}
          contributions in the last year
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {pinnedItems.map((repo) => (
          <Link
            key={repo.id}
            href={repo.url}
            target='_blank'
            rel='noopener noreferrer'
            className='py-3 px-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors'
          >
            <div className='flex flex-col gap-2'>
              <h3 className='font-semibold text-neutral-900 dark:text-neutral-100'>
                {repo.name}
              </h3>
              <div className='flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500'>
                <ul className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                  {repo.languages.edges.map(({ node }) => (
                    <li key={node.name}>
                      <span className='text-xs'>{node.name}</span>
                    </li>
                  ))}
                </ul>
                {repo.stargazerCount > 0 && (
                  <span className='flex items-center gap-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 16 16'
                      width='12'
                      height='12'
                      fill='currentColor'
                    >
                      <path d='M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z' />
                    </svg>
                    {repo.stargazerCount}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
