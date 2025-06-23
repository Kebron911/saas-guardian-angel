export const DatabaseInterface = {
  async select(table: string, filters: Record<string, any> = {}) {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/${table}?${query}`);
    if (!res.ok) throw new Error(`Failed to fetch from ${table}`);
    return await res.json();
  },

  async insert(table: string, data: Record<string, any>) {
    const res = await fetch(`/api/${table}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to insert into ${table}`);
    return await res.json();
  },

  async delete(table: string, filters: Record<string, any>) {
    const res = await fetch(`/api/${table}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters),
    });
    if (!res.ok) throw new Error(`Failed to delete from ${table}`);
    return await res.json();
  }
};

