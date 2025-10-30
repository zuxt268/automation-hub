export interface HealthCheckResponse {
  status: string;
}

export interface Target {
  id: number;
  name: string;
  ip: string;
  status: 'init';
  created_at: string;
  updated_at: string;
}

export interface CreateTargetRequest {
  name: string;
  ip: string;
}

export type DomainStatus = 'unknown' | 'initialize' | 'check_view' | 'check_japan' | 'crawl_comp_info' | 'done';

export interface Domain {
  id: number;
  name: string;
  title: string;
  company: string;
  president: string;
  address: string;
  prefecture: string;
  phone: string;
  landline_phone: string;
  mobile_phone: string;
  industry: string;
  page_num: number;
  raw_page: string;
  owner_id: string;
  can_view: boolean;
  is_japan: boolean;
  is_ssl: boolean;
  is_send: boolean;
  status: DomainStatus;
  target: string;
  created_at: string;
  updated_at: string;
}

export interface DomainsResponse {
  domains: Domain[];
  total: number;
  count: number;
}

export interface FetchDomainsRequest {
  target: string;
}

export interface Log {
  id: number;
  name: string;
  category: string;
  message: string;
  created_at: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskRequest {
  name: string;
  description: string;
  status: number;
}

export interface UpdateTaskRequest {
  name?: string;
  description?: string;
  status?: number;
}