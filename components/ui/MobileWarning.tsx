'use client';

/**
 * Mobile Warning Component
 *
 * Displays a banner on mobile devices suggesting use of laptop/tablet
 */

import { useState } from 'react';

export function MobileWarning() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className="md:hidden bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 text-2xl">
            💡
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Best Experience on Larger Screens
            </p>
            <p className="text-xs text-gray-700">
              For the optimal learning experience, we recommend using a laptop, desktop, or tablet (iPad) to access Victorian Maths Tutor.
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 text-gray-500 hover:text-gray-700 p-1"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
