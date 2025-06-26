const API_BASE_URL = 'http://localhost:4000/api';

export interface Asset {
  id: number;
  asset_code: string;
  name: string;
  description?: string;
  location_id?: number;
  location?: string;
  status: 'active' | 'transferring' | 'audited' | 'missing' | 'broken' | 'disposed';
  department_id?: number;
  owner_id?: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
  acquired_date?: string;
  department_name?: string;
  owner_name?: string;
  location_name?: string;
}

export interface Department {
  id: number;
  name_th: string;
  name_en?: string;
  description?: string;
}

export interface Location {
  id: number;
  name: string;
  description?: string;
  address?: string;
}

export interface User {
  id: number;
  username: string;
  name?: string;
  email?: string;
  role: 'admin' | 'user';
  department_id?: number;
}

// Assets API
export const assetsAPI = {
  getAll: async (): Promise<Asset[]> => {
    const response = await fetch(`${API_BASE_URL}/assets`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  },

  getById: async (id: number): Promise<Asset> => {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  },

  getByStatus: async (status: string): Promise<Asset[]> => {
    const response = await fetch(`${API_BASE_URL}/assets/status/${status}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  },

  create: async (asset: Partial<Asset>): Promise<{ id: number }> => {
    const response = await fetch(`${API_BASE_URL}/assets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(asset)
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  },

  update: async (id: number, asset: Partial<Asset>): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(asset)
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
  }
};

// Departments API
export const departmentsAPI = {
  getAll: async (): Promise<Department[]> => {
    const response = await fetch(`${API_BASE_URL}/departments`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  }
};

// Locations API
export const locationsAPI = {
  getAll: async (): Promise<Location[]> => {
    const response = await fetch(`${API_BASE_URL}/locations`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  }
};

// Users API
export const usersAPI = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  }
}; 