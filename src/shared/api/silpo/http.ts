export async function fetchJson<T>(url: string, signal?: AbortSignal, attempts = 3): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return (await res.json()) as T
    } catch (error) {
      if (signal?.aborted || attempt >= attempts) throw error
      await new Promise((resolve) => setTimeout(resolve, 400 * attempt))
    }
  }
}

/** Runs `worker` over `list` with at most `size` calls in flight. */
export async function runPool<T>(list: readonly T[], size: number, worker: (item: T) => Promise<void>) {
  let next = 0
  const lanes = Array.from({ length: Math.min(size, list.length) }, async () => {
    while (next < list.length) await worker(list[next++] as T)
  })
  await Promise.all(lanes)
}
