import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>
        Nathan Schmidt
      </h1>
      <p className='mb-4'>
        {`Always building. Nathan started out as a construction worker before deciding that he’d rather build websites than houses. He earned degrees in web development and graphic design and has now been creating digital products for more than a decade. A Colorado native, Nathan loves applying creative thinking to web development and bringing interactive components to life.`}
      </p>
      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  );
}
