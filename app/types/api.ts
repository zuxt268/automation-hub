export interface HealthCheckResponse {
  status: string;
}

export interface Target {
  id: number;
  name: string;
  ip: string;
  status: 'init';
  create_at: string;
  update_at: string;
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
  create_at: string;
  update_at: string;
}

export interface FetchDomainsRequest {
  target: string;
}