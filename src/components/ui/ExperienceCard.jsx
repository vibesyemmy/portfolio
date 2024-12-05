import React from 'react';
import { IconExternalLink } from '@tabler/icons-react';

export function ExperienceCard({ 
  company, 
  role, 
  period, 
  description, 
  accomplishments,
  companyUrl 
}) {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-md rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{role}</h3>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">{company}</span>
            {companyUrl && (
              <a 
                href={companyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <IconExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        <span className="text-sm text-neutral-400">{period}</span>
      </div>
      
      {description && (
        <p className="text-neutral-300 text-sm leading-relaxed mb-4">
          {description}
        </p>
      )}
      
      {accomplishments && accomplishments.length > 0 && (
        <>
          <h4 className="text-sm font-medium text-white mb-2">Accomplishments:</h4>
          <ul className="list-disc list-inside space-y-1">
            {accomplishments.map((accomplishment, index) => (
              <li key={index} className="text-neutral-300 text-sm leading-relaxed">
                {accomplishment}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
