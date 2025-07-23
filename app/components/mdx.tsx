import Link from "next/link";
import Image from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";

function Table({
  data,
}: {
  data: { headers: string[]; rows: string[][] };
}): JSX.Element {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: {
  href: string;
  children: React.ReactNode;
}): JSX.Element {
  let href = props.href;

  if (href.startsWith("/")) {
    const { href: hrefProp, ...rest } = props;
    return (
      <Link href={href} {...rest} key={href}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target='_blank' rel='noopener noreferrer' {...props} />;
}

function RoundedImage(props: { alt: string; src: string }): JSX.Element {
  const { alt, ...rest } = props;
  return <Image alt={alt} className='rounded-lg' {...rest} key={alt} />;
}

function Code({
  children,
  ...props
}: {
  children: React.ReactNode;
  key: string;
}): JSX.Element {
  let codeHTML = highlight(children as string);
  return (
    <code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      {...props}
      key={props.key}
    />
  );
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number): React.FC<{ children: React.ReactNode }> {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    let slug = slugify(children as string);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

export function CustomMDX(props: MDXRemoteProps): JSX.Element {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
