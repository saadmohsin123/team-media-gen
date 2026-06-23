"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_HUMAN_MODELS } from "@/lib/human-models";
import type { HumanModel } from "@/types/human-model";

const STORAGE_KEY = "team-media-gen-custom-models";

function loadCustomModels(): HumanModel[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HumanModel[];
  } catch {
    return [];
  }
}

function saveCustomModels(models: HumanModel[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
}

export function useHumanModels() {
  const [customModels, setCustomModels] = useState<HumanModel[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCustomModels(loadCustomModels());
    setReady(true);
  }, []);

  const models = useMemo(() => {
    const defaultIds = new Set(DEFAULT_HUMAN_MODELS.map((model) => model.id));
    const extra = customModels.filter((model) => !defaultIds.has(model.id));
    return [...DEFAULT_HUMAN_MODELS, ...extra];
  }, [customModels]);

  const getModelById = useCallback(
    (id: string) => models.find((model) => model.id === id),
    [models],
  );

  const addModel = useCallback((model: HumanModel) => {
    setCustomModels((current) => {
      const defaultIds = new Set(DEFAULT_HUMAN_MODELS.map((m) => m.id));
      if (defaultIds.has(model.id)) return current;

      const next = [...current.filter((m) => m.id !== model.id), { ...model, custom: true }];
      saveCustomModels(next);
      return next;
    });
  }, []);

  return { models, addModel, getModelById, ready };
}
