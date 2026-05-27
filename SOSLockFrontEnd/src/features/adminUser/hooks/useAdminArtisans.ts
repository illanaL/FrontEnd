import { useDeferredValue, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  filterArtisanSchema,
  type FilterArtisanForm,
} from "../schema/filterArtisanSchema";

import { useAdminArtisansQuery } from "../queries/useAdminGetAllArtisans";

export const useAdminArtisans = () => {
  const {
    data: artisans = [],
    isPending,
    isError,
    error,
  } = useAdminArtisansQuery();

  const form = useForm<FilterArtisanForm>({
    resolver: zodResolver(filterArtisanSchema),
    defaultValues: {
      search: "",
      department: "",
      activeFilter: "all",
      profileFilter: "all",
    },
  });

  const {
    search,
    department,
    activeFilter,
    profileFilter,
  } = useWatch({
    control: form.control,
  });

  const deferredSearch = useDeferredValue(search ?? "");

  const availableDepartments = useMemo(() => {
    return [
      ...new Set(
        artisans.flatMap((artisan) => artisan.departments ?? [])
      ),
    ].sort();
  }, [artisans]);

  const filteredArtisans = useMemo(() => {
    const searchLower = deferredSearch.toLowerCase();

    return artisans.filter((artisan) => {
      const matchesSearch =
        !deferredSearch ||
        artisan.firstName.toLowerCase().includes(searchLower) ||
        artisan.lastName.toLowerCase().includes(searchLower);

      const matchesDepartment =
        !department ||
        (artisan.departments ?? []).includes(department);

      const matchesActive =
        activeFilter === "all" ||
        (activeFilter === "active" && artisan.isActive) ||
        (activeFilter === "inactive" && !artisan.isActive);

      const matchesProfile =
        profileFilter === "all" ||
        (profileFilter === "complete" &&
          artisan.isProfileComplete) ||
        (profileFilter === "incomplete" &&
          !artisan.isProfileComplete);

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesActive &&
        matchesProfile
      );
    });
  }, [
    artisans,
    deferredSearch,
    department,
    activeFilter,
    profileFilter,
  ]);

  return {
    artisans: filteredArtisans,
    total: artisans.length,
    isPending,
    isError,
    error,
    form,
    availableDepartments,
  };
};