import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  filterArtisanSchema,
  type FilterArtisanForm,
} from "../schema/filterArtisanSchema";

import { useAdminArtisansQuery } from "../queries/useAdminGetAllArtisans";
import { useAdminDeletedArtisansQuery } from "../queries/useAdminGetDeletedArtisans";
import type { AdminArtisanQueryParams } from "../../artisan/type/artisan.type";

export const useAdminArtisans = ({ showDeleted }: { showDeleted: boolean }) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  // Formulaire des filtres
  const form = useForm<FilterArtisanForm>({
    resolver: zodResolver(filterArtisanSchema),
    defaultValues: {
      search: "",
      department: "",
      activeFilter: "all",
      profileFilter: "all",
    },
  });

 
  const { search, department, activeFilter, profileFilter } = useWatch({
    control: form.control,
  });

  useEffect(() => {
    setPage(1);
  }, [search, department, activeFilter, profileFilter, showDeleted]);

 
  const filters: AdminArtisanQueryParams = {
    page,
    limit,
    search: search || undefined,
    department: department || undefined,
    activeFilter: activeFilter || "all",
    profileFilter: profileFilter || "all",
    showDeleted,
  };


  const query = showDeleted
    ? useAdminDeletedArtisansQuery({ page, limit })
    : useAdminArtisansQuery(filters);

  const { data, isPending, isError, error } = query;

  const artisans = data?.data ?? [];

 
  const availableDepartments = useMemo(() => {
    return [...new Set(artisans.flatMap((a) => a.departments ?? []))].sort();
  }, [artisans]);

  return {
    artisans,
    total: data?.total ?? 0,
    totalActive: data?.totalActive ?? 0,
    totalInactive: data?.totalInactive ?? 0,
    totalIncomplete: data?.totalIncomplete ?? 0,
    totalPages: data?.totalPages ?? 0,
    page,
    setPage,
    isPending,
    isError,
    error,
    form,
    availableDepartments,
  };
};
