const BASE_URL = `${process.env.NEXT_PUBLIC_INTERNAL_URL}/api`;

export const client = {
  get: async <T = any>(input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(`${BASE_URL}${input}`, {
      ...init,
    });

    if (res.ok) {
      const data = await res.json();
      return data as T;
    }

    throw res;
  },
  post: async <T = any>(input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(`${BASE_URL}${input}`, {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (res.ok) {
      const { data } = await res.json();
      return data as T;
    }

    throw res;
  },
  put: async <T = any>(input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(`${BASE_URL}${input}`, {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    if (res.ok) {
      const { data } = await res.json();
      return data as T;
    }

    throw res;
  },
  patch: async <T = any>(input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(`${BASE_URL}${input}`, {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });

    if (res.ok) {
      const { data } = await res.json();
      return data as T;
    }

    throw res;
  },
  delete: async <T = any>(input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(`${BASE_URL}${input}`, {
      ...init,
      headers: {
        ...init?.headers,
        "Content-type": "application/json",
      },
      method: "DELETE",
    });

    if (res.ok) {
      const { data } = await res.json();
      return data as T;
    }

    throw res;
  },
};
