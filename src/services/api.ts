import type { Service } from '../types/service';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export async function fetchServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function fetchServiceById(id: string): Promise<Service | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch service: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export async function fetchServicesByCategory(category: string): Promise<Service[]> {
  try {
    const services = await fetchServices();
    if (category === 'All') return services;
    return services.filter(s => s.category === category);
  } catch (error) {
    console.error('Error fetching services by category:', error);
    return [];
  }
}
