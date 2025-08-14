import React from "react";

interface MDXProps {
  source: string;
}

export function DynamicMDX({ source }: MDXProps) {
  // Security: List of allowed functions and objects for safe execution
  const allowedGlobals = {
    Math: {
      floor: Math.floor,
      ceil: Math.ceil,
      round: Math.round,
      abs: Math.abs,
      max: Math.max,
      min: Math.min,
      pow: Math.pow,
      sqrt: Math.sqrt,
      PI: Math.PI,
      E: Math.E,
    },
    Date: Date,
    parseInt: parseInt,
    parseFloat: parseFloat,
    isNaN: isNaN,
    isFinite: isFinite,
  };

  // Safe evaluation function with security restrictions
  const safeEvaluate = (expression: string): string => {
    try {
      // Remove the wrapping curly braces
      const cleanExpression = expression.slice(1, -1).trim();

      // Create a safe evaluation context
      const safeEval = new Function(
        ...Object.keys(allowedGlobals),
        `"use strict"; return (${cleanExpression});`
      );

      // Execute with allowed globals
      const result = safeEval(...Object.values(allowedGlobals));
      return String(result);
    } catch (error) {
      console.error("Error evaluating JavaScript expression:", error);
      return `[Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }]`;
    }
  };

  // Parse text and replace JavaScript expressions
  const parseTextWithJS = (text: string): React.ReactNode[] => {
    const jsExpressionRegex = /\{([^{}]+)\}/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = jsExpressionRegex.exec(text)) !== null) {
      const [fullMatch, expression] = match;
      const matchIndex = match.index!;

      // Add text before the expression
      if (matchIndex > lastIndex) {
        parts.push(text.slice(lastIndex, matchIndex));
      }

      // Evaluate and add the JavaScript result
      const result = safeEvaluate(fullMatch);
      parts.push(result);

      lastIndex = matchIndex + fullMatch.length;
    }

    // Add remaining text after the last expression
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  // Dynamic markdown to JSX conversion
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

          // Add text before the link (with JS parsing)
          if (matchIndex_ > lastIndex) {
            const textBefore = trimmedLine.slice(lastIndex, matchIndex_);
            const parsedText = parseTextWithJS(textBefore);
            lineElements.push(
              <span key={`text-${matchIndex}`}>{parsedText}</span>
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

        // Add remaining text after the last link (with JS parsing)
        if (lastIndex < trimmedLine.length) {
          const textAfter = trimmedLine.slice(lastIndex);
          const parsedText = parseTextWithJS(textAfter);
          lineElements.push(<span key='text-end'>{parsedText}</span>);
        }

        elements.push(
          <p key={`p-${index}`} className='mb-2'>
            {lineElements}
          </p>
        );
      } else {
        // Regular text line (with JS parsing)
        const parsedText = parseTextWithJS(trimmedLine);
        elements.push(
          <p key={`p-${index}`} className='mb-2'>
            {parsedText}
          </p>
        );
      }
    });

    return elements;
  };

  return <div>{parseMarkdown(source)}</div>;
}
