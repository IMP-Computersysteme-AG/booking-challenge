import { useCallback, useEffect, useState } from "react";
import { apiGet } from "../../api/client";

export type BookableResource = {
  id: number;
  name: string;
  category: string;
  location: string;
  capacity: number;
};

type ResourcesState = {
  resources: BookableResource[];
  loading: boolean;
  error: string | null;
};

const LOADING: ResourcesState = {
  resources: [],
  loading: true,
  error: null,
};

/**
 * Loads the bookable resources and exposes a `reload` for the retry button.
 *
 * Plain `useState` on purpose — small enough to read at a glance. If your solution needs caching,
 * revalidation or optimistic updates, reach for a data-fetching library instead.
 */
export function useResources() {
  const [state, setState] = useState<ResourcesState>(LOADING);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    apiGet<BookableResource[]>("/api/resources", { signal: controller.signal })
      .then((resources) => setState({ resources, loading: false, error: null }))
      .catch((error: unknown) => {
        // A cancelled request is not a failure — the component moved on.
        if (controller.signal.aborted) {
          return;
        }
        setState({ resources: [], loading: false, error: messageOf(error) });
      });

    return () => controller.abort();
  }, [attempt]);

  const reload = useCallback(() => {
    setState(LOADING);
    setAttempt((current) => current + 1);
  }, []);

  return { ...state, reload };
}

function messageOf(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Die Ressourcen konnten nicht geladen werden.";
}
