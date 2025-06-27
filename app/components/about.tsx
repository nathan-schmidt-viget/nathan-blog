import { getAbout } from "../utils/utils";
import { CustomMDX } from "app/components/mdx";

export default function About() {
  const about = getAbout().find((post) => post.slug === "about");
  return (
    <div className='prose text-pretty'>
      {about && <CustomMDX source={about.content} />}
    </div>
  );
}
