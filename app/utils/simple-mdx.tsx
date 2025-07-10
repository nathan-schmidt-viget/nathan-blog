import React from "react";

interface MDXProps {
  source: string;
}

export function SimpleMDX({ source }: MDXProps) {
  // Simple markdown to JSX conversion
  const parseMarkdown = (text: string) => {
    // Split into lines
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        // Empty line - add a break
        elements.push(<br key={`br-${index}`} />);
        return;
      }

      // Handle links [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const linkMatches: RegExpExecArray[] = [];
      let match;

      while ((match = linkRegex.exec(trimmedLine)) !== null) {
        linkMatches.push(match);
      }

      if (linkMatches.length > 0) {
        let lastIndex = 0;
        const lineElements: React.ReactNode[] = [];

        linkMatches.forEach((match, matchIndex) => {
          const [fullMatch, linkText, linkUrl] = match;
          const matchIndex_ = match.index!;

          // Add text before the link
          if (matchIndex_ > lastIndex) {
            lineElements.push(
              <span key={`text-${matchIndex}`}>
                {trimmedLine.slice(lastIndex, matchIndex_)}
              </span>
            );
          }

          // Add the link
          lineElements.push(
            <a
              key={`link-${matchIndex}`}
              href={linkUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              {linkText}
            </a>
          );

          lastIndex = matchIndex_ + fullMatch.length;
        });

        // Add remaining text after the last link
        if (lastIndex < trimmedLine.length) {
          lineElements.push(
            <span key='text-end'>{trimmedLine.slice(lastIndex)}</span>
          );
        }

        elements.push(
          <p key={`p-${index}`} className='mb-2'>
            {lineElements}
          </p>
        );
      } else {
        // Regular text line
        elements.push(
          <p key={`p-${index}`} className='mb-2'>
            {trimmedLine}
          </p>
        );
      }
    });

    return elements;
  };

  return <div>{parseMarkdown(source)}</div>;
}
