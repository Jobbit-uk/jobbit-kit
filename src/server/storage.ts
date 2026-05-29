import { requireEnv, trimTrailingSlash, type EnvSource } from "./env";
import { bearerHeaders, parseResponse, type FetchLike } from "./http";

export type JobbitFileVisibility = "public" | "private";

export interface StorageClientOptions {
  baseUrl?: string;
  apiKey?: string;
  env?: EnvSource;
  fetch?: FetchLike;
}

export interface JobbitFileInfo {
  id: string;
  owner_id: string;
  app_id: string;
  visibility: JobbitFileVisibility;
  original_filename: string;
  safe_filename: string;
  content_type: string;
  size_bytes: number;
  sha256: string;
  metadata: Record<string, unknown>;
  public_url?: string | null;
  status: string;
  created_at?: string | null;
  deleted_at?: string | null;
}

export interface UploadFileInput {
  file: Blob | Uint8Array | ArrayBuffer | string;
  visibility?: JobbitFileVisibility;
  name?: string;
  metadata?: Record<string, unknown>;
}

export interface FileListResult {
  files: JobbitFileInfo[];
  total: number;
}

export interface DownloadUrlResult {
  file_id: string;
  visibility: JobbitFileVisibility;
  url: string;
  expires_in?: number | null;
}

function toBlob(file: UploadFileInput["file"]): Blob | string {
  if (typeof file === "string") return file;
  if (file instanceof Blob) return file;
  return new Blob([file as BlobPart]);
}

export function createStorageClient(options: StorageClientOptions = {}) {
  const baseUrl = trimTrailingSlash(options.baseUrl ?? requireEnv("JBS3_BASE_URL", options.env));
  const apiKey = options.apiKey ?? requireEnv("JBS3_API_KEY", options.env);
  const fetchImpl = options.fetch ?? fetch;

  return {
    async uploadFile(input: UploadFileInput): Promise<JobbitFileInfo> {
      const form = new FormData();
      const body = toBlob(input.file);
      if (typeof body === "string") {
        form.set("file", new Blob([body], { type: "text/plain" }), input.name ?? "file.txt");
      } else {
        form.set("file", body, input.name ?? "file");
      }
      form.set("visibility", input.visibility ?? "private");
      if (input.name) form.set("name", input.name);
      if (input.metadata) form.set("metadata", JSON.stringify(input.metadata));

      const response = await fetchImpl(`${baseUrl}/v1/files`, {
        method: "POST",
        headers: bearerHeaders(apiKey),
        body: form
      });
      return parseResponse<JobbitFileInfo>(response, "jobbit-s3");
    },

    async listFiles(params: { visibility?: JobbitFileVisibility; limit?: number } = {}): Promise<FileListResult> {
      const url = new URL(`${baseUrl}/v1/files`);
      if (params.visibility) url.searchParams.set("visibility", params.visibility);
      if (params.limit) url.searchParams.set("limit", String(params.limit));
      const response = await fetchImpl(url, { headers: bearerHeaders(apiKey) });
      return parseResponse<FileListResult>(response, "jobbit-s3");
    },

    async getFile(fileId: string): Promise<JobbitFileInfo> {
      const response = await fetchImpl(`${baseUrl}/v1/files/${encodeURIComponent(fileId)}`, {
        headers: bearerHeaders(apiKey)
      });
      return parseResponse<JobbitFileInfo>(response, "jobbit-s3");
    },

    async createDownloadUrl(fileId: string): Promise<DownloadUrlResult> {
      const response = await fetchImpl(`${baseUrl}/v1/files/${encodeURIComponent(fileId)}/download-url`, {
        method: "POST",
        headers: bearerHeaders(apiKey)
      });
      return parseResponse<DownloadUrlResult>(response, "jobbit-s3");
    },

    async deleteFile(fileId: string): Promise<{ ok: boolean }> {
      const response = await fetchImpl(`${baseUrl}/v1/files/${encodeURIComponent(fileId)}`, {
        method: "DELETE",
        headers: bearerHeaders(apiKey)
      });
      return parseResponse<{ ok: boolean }>(response, "jobbit-s3");
    }
  };
}

export const jobbitStorage = createStorageClient;
