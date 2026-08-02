import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const normalizePositiveInteger = (value, fallback) => {
  const normalizedValue = Number.parseInt(value, 10);

  if (Number.isNaN(normalizedValue) || normalizedValue <= 0) {
    return fallback;
  }

  return normalizedValue;
};

const normalizeStatusValue = (value, statusOptions) => {
  const normalizedValue = String(value || "").trim();

  if (!normalizedValue || normalizedValue === "all") {
    return "all";
  }

  const allowed = new Set(statusOptions || []);
  return allowed.has(normalizedValue) ? normalizedValue : "all";
};

export const useAdminListQueryState = ({
  statusOptions,
  staticParams,
} = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const enableStatus = Array.isArray(statusOptions) && statusOptions.length > 0;
  const lastSerializedParamsRef = useRef("");

  const initialPage = useMemo(
    () => normalizePositiveInteger(searchParams.get("page"), 1),
    [searchParams]
  );
  const initialQuery = useMemo(() => searchParams.get("q") || "", [searchParams]);
  const initialStatus = useMemo(
    () =>
      enableStatus
        ? normalizeStatusValue(searchParams.get("status"), statusOptions)
        : "all",
    [enableStatus, searchParams, statusOptions]
  );

  const [page, setPage] = useState(initialPage);
  const [q, setQ] = useState(initialQuery);
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    const serialized = searchParams.toString();

    if (serialized === lastSerializedParamsRef.current) {
      return;
    }

    const nextPage = normalizePositiveInteger(searchParams.get("page"), 1);
    const nextQuery = searchParams.get("q") || "";
    const nextStatus = enableStatus
      ? normalizeStatusValue(searchParams.get("status"), statusOptions)
      : "all";

    setPage(nextPage);
    setQ(nextQuery);
    setStatus(nextStatus);
  }, [enableStatus, searchParams, statusOptions]);

  useEffect(() => {
    const nextParams = new URLSearchParams();

    Object.entries(staticParams || {}).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }

      const normalizedValue = String(value).trim();
      if (normalizedValue) {
        nextParams.set(key, normalizedValue);
      }
    });

    if (page > 1) {
      nextParams.set("page", String(page));
    }

    const trimmedQuery = q.trim();
    if (trimmedQuery) {
      nextParams.set("q", trimmedQuery);
    }

    if (enableStatus && status && status !== "all") {
      nextParams.set("status", status);
    }

    lastSerializedParamsRef.current = nextParams.toString();
    setSearchParams(nextParams, { replace: true });
  }, [enableStatus, page, q, setSearchParams, staticParams, status]);

  return {
    page,
    setPage,
    q,
    setQ,
    status,
    setStatus,
    enableStatus,
  };
};
