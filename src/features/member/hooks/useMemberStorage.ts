import { useLocalStorageObject } from "../../../shared/hooks/useLocalStorage";
import { MemberData } from "../types/member.type";
import { initialMembers } from "../data/initialData";
import { useState } from "react";

const STORAGE_TYPE = import.meta.env.VITE_STORAGE || "in-memory";
const STORAGE_KEY = "members";

export const useMemberStorage = () => {
  const [localStorageMembers, setLocalStorageMembers] = useLocalStorageObject<
    MemberData[]
  >(STORAGE_KEY, initialMembers);
  const [inMemoryMembers, setInMemoryMembers] =
    useState<MemberData[]>(initialMembers);

  const members =
    STORAGE_TYPE === "local-storage" ? localStorageMembers : inMemoryMembers;
  const setMembers =
    STORAGE_TYPE === "local-storage"
      ? setLocalStorageMembers
      : setInMemoryMembers;

  const addMember = (member: Omit<MemberData, "key">) => {
    setMembers((prev) => [
      ...prev,
      {
        ...member,
        key: String(Date.now()),
      },
    ]);
  };

  const updateMember = (key: string, member: Omit<MemberData, "key">) => {
    setMembers((prev) =>
      prev.map((item) =>
        item.key === key
          ? {
              ...member,
              key,
            }
          : item
      )
    );
  };

  const deleteMember = (key: string) => {
    setMembers((prev) => prev.filter((item) => item.key !== key));
  };

  const deleteMembers = (keys: string[]) => {
    setMembers((prev) =>
      prev.filter((item) => !keys.includes(String(item.key)))
    );
  };

  return {
    members,
    addMember,
    updateMember,
    deleteMember,
    deleteMembers,
  };
};
