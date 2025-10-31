import {HealthCheckResponse, Target, CreateTargetRequest, Domain, DomainsResponse, FetchDomainsRequest, LogsResponse, Task, CreateTaskRequest, UpdateTaskRequest} from "@/app/types/api";
import {cookies} from 'next/headers';

const API_BASE_URL = process.env.API_BASE_URL;

async function getSessionToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    // NextAuthのセッショントークンを取得
    return cookieStore.get('next-auth.session-token')?.value ||
        cookieStore.get('__Secure-next-auth.session-token')?.value;
}

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = await getSessionToken();

    if (!token) {
        throw new Error('No session token found');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return undefined as T;
    }

    return response.json();
}

export async function getHealthCheck(): Promise<HealthCheckResponse> {
    return apiFetch<HealthCheckResponse>('/healthcheck');
}

export async function getTargets(params?: {
    limit?: number;
    offset?: number;
}): Promise<Target[]> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const query = queryParams.toString();
    return apiFetch<Target[]>(`/targets${query ? `?${query}` : ''}`);
}

export async function createTarget(data: CreateTargetRequest): Promise<Target> {
    return apiFetch<Target>('/targets', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function deleteTarget(id: number): Promise<void> {
    await apiFetch<void>(`/targets/${id}`, {
        method: 'DELETE',
    });
}

export async function executeTask(id: number): Promise<void> {
    await apiFetch<void>(`/tasks/${id}/execute`, {
        method: 'POST',
    })
}

export async function getDomains(params?: {
    limit?: number;
    offset?: number;
    name?: string;
    can_view?: boolean;
    is_japan?: boolean;
    is_send?: boolean;
    owner_id?: string;
    status?: string;
    industry?: string;
    is_ssl?: boolean;
    target?: string;
}): Promise<DomainsResponse> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.name) queryParams.append('name', params.name);
    if (params?.can_view !== undefined) queryParams.append('can_view', params.can_view.toString());
    if (params?.is_japan !== undefined) queryParams.append('is_japan', params.is_japan.toString());
    if (params?.is_send !== undefined) queryParams.append('is_send', params.is_send.toString());
    if (params?.owner_id) queryParams.append('owner_id', params.owner_id);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.industry) queryParams.append('industry', params.industry);
    if (params?.is_ssl !== undefined) queryParams.append('is_ssl', params.is_ssl.toString());
    if (params?.target) queryParams.append('target', params.target);

    const query = queryParams.toString();
    return apiFetch<DomainsResponse>(`/domains${query ? `?${query}` : ''}`);
}

export async function getDomainById(id: number): Promise<Domain> {
    return apiFetch<Domain>(`/domains/${id}`);
}

export async function fetchDomains(data: FetchDomainsRequest): Promise<void> {
    await apiFetch<void>('/fetch', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getLogs(params?: {
    limit?: number;
    offset?: number;
    name?: string;
    category?: string;
}): Promise<LogsResponse> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.name) queryParams.append('name', params.name);
    if (params?.category) queryParams.append('category', params.category);

    const query = queryParams.toString();
    return apiFetch<LogsResponse>(`/logs${query ? `?${query}` : ''}`);
}

export async function getTasks(): Promise<Task[]> {
    return apiFetch<Task[]>('/tasks');
}

export async function createTask(data: CreateTaskRequest): Promise<Task> {
    return apiFetch<Task>('/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updateTask(id: number, data: UpdateTaskRequest): Promise<Task> {
    return apiFetch<Task>(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteTask(id: number): Promise<void> {
    await apiFetch<void>(`/tasks/${id}`, {
        method: 'DELETE',
    });
}
