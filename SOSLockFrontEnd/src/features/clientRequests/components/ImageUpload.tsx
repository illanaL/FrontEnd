import { useCallback, useRef, useState } from "react";
import { useClientRequestStore } from "../stores/useClientRequestStore";
import api from "../../../client/client";

const MAX_FILES = 6;
const MAX_SIZE_MB = 20;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface PreviewFile {
  id: string;
  file: File;
  preview: string;
  status: UploadStatus;
  url?: string; // URL retournée par le backend après upload
  error?: string;
}

export function ImageUpload() {
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const update = useClientRequestStore((s) => s.update);

  const showError = (msg: string) => {
    setLocalError(msg);
    setTimeout(() => setLocalError(null), 4000);
  };

  // Sync les URLs confirmées ("success") dans le store Zustand
  const syncStore = (updated: PreviewFile[]) => {
    const urls = updated
      .filter((p) => p.status === "success" && p.url)
      .map((p) => p.url!);
    update("photos", urls);
  };

  const uploadOne = async (preview: PreviewFile): Promise<PreviewFile> => {
    const formData = new FormData();
    formData.append("file", preview.file);

    try {
      const { data } = await api.post<{ url: string }>("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return { ...preview, status: "success", url: data.url };
    } catch {
      return { ...preview, status: "error", error: "Échec de l'upload" };
    }
  };

  const addFiles = useCallback(
    async (newFiles: FileList | File[]) => {
      const toAdd = Array.from(newFiles);
      const validated: PreviewFile[] = [];

      for (const file of toAdd) {
        if (previews.length + validated.length >= MAX_FILES) {
          showError(`Maximum ${MAX_FILES} photos autorisées.`);
          break;
        }
        if (!ACCEPTED_TYPES.includes(file.type)) {
          showError(`${file.name} : format non accepté (JPG, PNG, WEBP).`);
          continue;
        }
        if (file.size > MAX_SIZE_BYTES) {
          showError(`${file.name} dépasse ${MAX_SIZE_MB} Mo.`);
          continue;
        }
        validated.push({
          id: crypto.randomUUID(),
          file,
          preview: URL.createObjectURL(file),
          status: "uploading",
        });
      }

      if (validated.length === 0) return;

      // Affichage immédiat en "uploading"
      setPreviews((prev) => [...prev, ...validated]);

      // Upload individuel en parallèle
      const results = await Promise.all(validated.map(uploadOne));

      setPreviews((prev) => {
        const updated = prev.map((p) => {
          const result = results.find((r) => r.id === p.id);
          return result ?? p;
        });
        syncStore(updated);
        return updated;
      });
    },
    [previews],
  );

  const removeFile = (id: string) => {
    setPreviews((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      syncStore(updated);
      return updated;
    });
  };

  const retryFile = async (id: string) => {
    const target = previews.find((p) => p.id === id);
    if (!target) return;

    setPreviews((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "uploading", error: undefined } : p,
      ),
    );

    const result = await uploadOne(target);

    setPreviews((prev) => {
      const updated = prev.map((p) => (p.id === id ? result : p));
      syncStore(updated);
      return updated;
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const successCount = previews.filter((p) => p.status === "success").length;
  const totalCount = previews.length;

  return (
    <div className="flex flex-col gap-3">
      {/* Zone de dépôt — masquée si max atteint */}
      {totalCount < MAX_FILES && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={[
            "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 cursor-pointer transition-colors select-none",
            dragOver
              ? "border-teal-500 bg-teal-50"
              : "border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50",
          ].join(" ")}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-sm font-medium text-neutral-700">
            Cliquez ou glissez vos photos ici
          </p>
          <p className="text-xs text-neutral-400">
            JPG, PNG, WEBP · max {MAX_SIZE_MB} Mo · max {MAX_FILES} photos
          </p>
        </div>
      )}

      {/* Erreur locale */}
      {localError && <p className="text-xs text-red-600">{localError}</p>}

      {/* Compteur */}
      {totalCount > 0 && (
        <p className="text-xs text-neutral-500">
          {successCount} / {MAX_FILES} photo{successCount > 1 ? "s" : ""}{" "}
          uploadée{successCount > 1 ? "s" : ""}
          {previews.some((p) => p.status === "uploading") && (
            <span className="ml-2 text-teal-600 animate-pulse">
              · Envoi en cours…
            </span>
          )}
        </p>
      )}

      {/* Grille de previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {previews.map(({ id, file, preview, status }) => (
            <div
              key={id}
              className="relative rounded-lg overflow-hidden border border-neutral-200 group"
            >
              <img
                src={preview}
                alt={file.name}
                className="h-24 w-full object-cover"
              />

              {/* Overlay : uploading */}
              {status === "uploading" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <svg
                    className="h-6 w-6 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                </div>
              )}

              {/* Badge : success */}
              {status === "success" && (
                <div className="absolute top-1.5 left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}

              {/* Overlay : error */}
              {status === "error" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-red-900/60">
                  <p className="text-xs text-white font-medium">Échec</p>
                  <button
                    type="button"
                    onClick={() => retryFile(id)}
                    className="text-xs text-white underline"
                  >
                    Réessayer
                  </button>
                </div>
              )}

              {/* Bouton suppression (visible au hover, désactivé pendant upload) */}
              {status !== "uploading" && (
                <button
                  type="button"
                  onClick={() => removeFile(id)}
                  className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Supprimer ${file.name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              <p className="truncate px-1.5 py-1 text-xs text-neutral-500">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
