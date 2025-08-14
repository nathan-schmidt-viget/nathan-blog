import { getAbout } from "../utils/utils";
import { DynamicMDX } from "../utils/dynamic-mdx";

export default function About(): JSX.Element {
  const about = getAbout().find((post) => post.slug === "about");
  return (
    <div className='font-light prose text-pretty'>
      {about && <DynamicMDX source={about.content} />}
    </div>
  );
}
