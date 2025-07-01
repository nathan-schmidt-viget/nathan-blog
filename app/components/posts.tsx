import Link from "next/link";
import { formatDate, getBlogPosts } from "app/utils/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div className='flex flex-col gap-4'>
      {allBlogs
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
            href={`/blog/${post.slug}`}
          >
            <div className='w-full grid grid-cols-4 items-center'>
              <p className='text-neutral-600 dark:text-neutral-400 text-xs uppercase font-bold'>
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className='text-neutral-900 dark:text-neutral-100 col-span-3 tracking-tight'>
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
