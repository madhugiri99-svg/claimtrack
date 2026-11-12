import { useEffect, useRef } from 'react';

let isFirstPage = true;

/**
 * Sets the browser tab title and, after in-app navigation, moves focus to the
 * page's <h1> so screen reader users hear the new page instead of silence.
 * (Single-page apps don't do this on their own.)
 *
 * Pass `ready = false` while the heading isn't rendered yet (e.g. data still
 * loading); focus moves once it is.
 */
export function usePageTitle(title: string, ready = true) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(!isFirstPage);

  useEffect(() => {
    isFirstPage = false;
  }, []);

  useEffect(() => {
    document.title = `${title} · Prairie Mutual`;
  }, [title]);

  useEffect(() => {
    if (ready && shouldFocus.current && headingRef.current) {
      headingRef.current.focus();
      shouldFocus.current = false;
    }
  }, [ready]);

  return headingRef;
}
