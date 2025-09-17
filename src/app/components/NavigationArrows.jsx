"use client";

import { ChevronIcon } from './icons';
import TransitionLink from './TransitionLink';

const NavigationArrows = ({ prevItem, nextItem, basePath }) => {
    return (
        <div className="flex justify-between items-center mt-16 mb-8 max-w-6xl mx-auto px-6">
            {/* Previous Arrow */}
            {prevItem && (
                <div>
                    <TransitionLink
                        href={`${basePath}/${prevItem.id}`}
                        label={
                            <div className="flex items-center gap-3 px-6 py-4 transition-all duration-200 group">
                                <ChevronIcon className="w-8 h-8 rotate-90 group-hover:scale-110 transition-transform" />
                                <div className="flex flex-col">
                                    <span className="text-xs text-primary uppercase tracking-wide hover:text-sm transition-all duration-200 font-omnes-semicond">Précédent</span>
                                </div>
                            </div>
                        }
                    />
                </div>
            )}

            {/* Spacer when only one arrow is present */}
            {!prevItem && nextItem && <div></div>}
            {prevItem && !nextItem && <div></div>}

            {/* Next Arrow */}
            {nextItem && (
                <div>
                    <TransitionLink
                        href={`${basePath}/${nextItem.id}`}
                        label={
                            <div className="flex items-center gap-3 px-6 py-4 transition-all duration-200 group">
                                <div className="flex flex-col text-right">
                                    <span className="text-xs text-primary uppercase tracking-wide hover:text-sm transition-all duration-200 font-omnes-semicond">Suivant</span>
                                </div>
                                <ChevronIcon className="w-8 h-8 rotate-270 group-hover:scale-110 transition-transform" />
                            </div>
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default NavigationArrows; 