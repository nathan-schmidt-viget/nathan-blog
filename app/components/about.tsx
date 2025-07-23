import { getAbout } from "../utils/utils";
import { SimpleMDX } from "../utils/simple-mdx";

export default function About(): JSX.Element {
  const about = getAbout().find((post) => post.slug === "about");
  return (
    <div className='font-light prose text-pretty'>
      {about && <SimpleMDX source={about.content} />}
    </div>
  );
}
