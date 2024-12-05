import React from 'react';

export function Education({ 
  institution, 
  degree,
  graduationDate
}) {
  return (
    <div className="py-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{institution}</h3>
          <div className="text-neutral-300 text-sm">
            {degree}
          </div>
        </div>
        <span className="text-sm text-neutral-400">{graduationDate}</span>
      </div>
    </div>
  );
}
