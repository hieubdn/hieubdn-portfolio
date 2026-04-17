const DEFAULT_MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function waitForOnline(): Promise<void> {
  if (typeof window === "undefined" || navigator.onLine) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    window.addEventListener("online", () => resolve(), { once: true });
  });
}

function isTransientFailure(error: unknown): boolean {
  if (error instanceof TypeError) return true;
  return false;
}

export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  options?: { maxRetries?: number },
): Promise<Response> {
  const maxRetries = options?.maxRetries ?? DEFAULT_MAX_RETRIES;
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(input, init);
      if (response.ok) return response;

      if (response.status >= 500 && attempt < maxRetries) {
        await delay(BASE_DELAY_MS * 2 ** attempt);
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (!isTransientFailure(error)) throw error;

      if (typeof navigator !== "undefined" && !navigator.onLine) {
        await waitForOnline();
      }

      if (attempt < maxRetries) {
        await delay(BASE_DELAY_MS * 2 ** attempt);
        continue;
      }
      throw error;
    }
  }

  throw lastError;
}
