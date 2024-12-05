import React from 'react';
import { IconExternalLink } from '@tabler/icons-react';

export function Certification({ 
  title,
  organization,
  year,
  isLast,
  url
}) {
  const TitleComponent = url ? 'a' : 'h3';
  const titleProps = url ? {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-xl font-semibold text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-2"
  } : {
    className: "text-xl font-semibold text-white mb-1"
  };

  return (
    <>
      <div className="py-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <TitleComponent {...titleProps}>
              {title}
              {url && <IconExternalLink className="w-4 h-4" />}
            </TitleComponent>
            <div className="text-neutral-300 text-sm">
              {organization}
            </div>
          </div>
          <span className="text-sm text-neutral-400">{year}</span>
        </div>
      </div>
      {!isLast && <div className="border-t border-neutral-800" />}
    </>
  );
}
