/**
 * Thin wrapper around `fetch`.
 *
 * The one thing it really does for you: it turns a non-2xx response into an {@link ApiError} whose
 * message comes from the backend's `application/problem+json` body. That way a component can show
 * the reason a request failed instead of a generic "something went wrong".
 *
 * Extend or replace this as you like — a data-fetching library is perfectly acceptable too.
 */

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** RFC 9457 problem detail, as produced by ApiExceptionHandler on the backend. */
type ProblemDetail = {
  title?: string;
  detail?: string;
};

const JSON_CONTENT_TYPE = { "Content-Type": "application/json" };

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      ...(init.body ? JSON_CONTENT_TYPE : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, await readErrorMessage(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function apiGet<T>(path: string, init: RequestInit = {}): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "GET" });
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const problem = (await response.json()) as ProblemDetail;
    return problem.detail ?? problem.title ?? response.statusText;
  } catch {
    // Not every error response carries a JSON body — a crashed backend or a proxy error page
    // will not.
    return response.statusText || `HTTP ${response.status}`;
  }
}
