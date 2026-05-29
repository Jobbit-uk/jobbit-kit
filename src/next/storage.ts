import { createStorageClient, type JobbitFileVisibility } from "../server/storage";

export async function uploadRequestFile(
  request: Request,
  options: {
    field?: string;
    visibility?: JobbitFileVisibility;
    metadata?: Record<string, unknown>;
  } = {}
) {
  const form = await request.formData();
  const value = form.get(options.field ?? "file");
  if (!(value instanceof File)) {
    throw new Error(`Missing multipart file field "${options.field ?? "file"}"`);
  }
  return createStorageClient().uploadFile({
    file: value,
    name: value.name,
    visibility: options.visibility ?? "public",
    metadata: options.metadata
  });
}
