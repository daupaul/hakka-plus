"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";

import settingsSeed from "@/lib/mock/settings.json";
import videosSeed from "@/lib/mock/videos.json";
import newsSeed from "@/lib/mock/news.json";
import curationsSeed from "@/lib/mock/curations.json";
import productsSeed from "@/lib/mock/products.json";
import themesSeed from "@/lib/mock/themes.json";
import tagsSeed from "@/lib/mock/tags.json";
import timelineSeed from "@/lib/mock/timeline.json";

import type {
  SiteSettings,
  Video,
  NewsItem,
  Curation,
  Short,
  Product,
  Theme,
  Tag,
  TimeSlot,
} from "@/lib/types";

const initialVideos = videosSeed as unknown as Video[];
const initialNews = newsSeed as unknown as NewsItem[];
const initialCurations = curationsSeed as unknown as Curation[];
const initialShorts: Short[] = [];
const initialProducts = productsSeed as unknown as Product[];
const initialThemes = themesSeed as unknown as Theme[];
const initialTags = tagsSeed as unknown as Tag[];
const initialTimeline = timelineSeed as unknown as TimeSlot[];

interface ContentStore {
  settings: SiteSettings;
  videos: Video[];
  news: NewsItem[];
  curations: Curation[];
  shorts: Short[];
  products: Product[];
  themes: Theme[];
  tags: Tag[];
  timeline: TimeSlot[];

  // Settings
  updateSettings: (patch: Partial<SiteSettings>) => void;

  // Video CRUD
  createVideo: (input: Omit<Video, "id">) => string;
  updateVideo: (id: string, patch: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  publishVideo: (id: string) => void;

  // News CRUD
  createNews: (input: Omit<NewsItem, "id">) => string;
  updateNews: (id: string, patch: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  publishNews: (id: string) => void;

  // Curation CRUD
  createCuration: (input: Omit<Curation, "id">) => string;
  updateCuration: (id: string, patch: Partial<Curation>) => void;
  deleteCuration: (id: string) => void;

  // Shorts CRUD
  createShort: (input: Omit<Short, "id">) => string;
  updateShort: (id: string, patch: Partial<Short>) => void;
  deleteShort: (id: string) => void;

  // Products
  createProduct: (input: Omit<Product, "id">) => string;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Themes / Tags
  createTheme: (input: Omit<Theme, "id">) => string;
  updateTheme: (id: string, patch: Partial<Theme>) => void;
  deleteTheme: (id: string) => void;
  createTag: (input: Omit<Tag, "id">) => string;
  updateTag: (id: string, patch: Partial<Tag>) => void;
  deleteTag: (id: string) => void;

  // Timeline
  updateTimeSlot: (time: string, patch: Partial<TimeSlot>) => void;

  // Reset
  reset: () => void;
}

export const useContent = create<ContentStore>()(
  persist(
    (set, get) => ({
      settings: settingsSeed as SiteSettings,
      videos: initialVideos,
      news: initialNews,
      curations: initialCurations,
      shorts: initialShorts,
      products: initialProducts,
      themes: initialThemes,
      tags: initialTags,
      timeline: initialTimeline,

      updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),

      createVideo: (input) => {
        const id = nanoid(8);
        set((s) => ({ videos: [...s.videos, { id, ...input }] }));
        return id;
      },
      updateVideo: (id, patch) =>
        set((s) => ({ videos: s.videos.map((v) => (v.id === id ? { ...v, ...patch } : v)) })),
      deleteVideo: (id) => set((s) => ({ videos: s.videos.filter((v) => v.id !== id) })),
      publishVideo: (id) =>
        set((s) => ({
          videos: s.videos.map((v) => (v.id === id ? { ...v, status: "published", publishedAt: new Date().toISOString() } : v)),
        })),

      createNews: (input) => {
        const id = nanoid(8);
        set((s) => ({ news: [...s.news, { id, ...input }] }));
        return id;
      },
      updateNews: (id, patch) =>
        set((s) => ({ news: s.news.map((n) => (n.id === id ? { ...n, ...patch } : n)) })),
      deleteNews: (id) => set((s) => ({ news: s.news.filter((n) => n.id !== id) })),
      publishNews: (id) =>
        set((s) => ({
          news: s.news.map((n) => (n.id === id ? { ...n, status: "published", publishedAt: new Date().toISOString() } : n)),
        })),

      createCuration: (input) => {
        const id = nanoid(8);
        set((s) => ({ curations: [...s.curations, { id, ...input }] }));
        return id;
      },
      updateCuration: (id, patch) =>
        set((s) => ({ curations: s.curations.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
      deleteCuration: (id) => set((s) => ({ curations: s.curations.filter((c) => c.id !== id) })),

      createShort: (input) => {
        const id = nanoid(8);
        set((s) => ({ shorts: [...s.shorts, { id, ...input }] }));
        return id;
      },
      updateShort: (id, patch) =>
        set((s) => ({ shorts: s.shorts.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      deleteShort: (id) => set((s) => ({ shorts: s.shorts.filter((x) => x.id !== id) })),

      createProduct: (input) => {
        const id = nanoid(8);
        set((s) => ({ products: [...s.products, { id, ...input }] }));
        return id;
      },
      updateProduct: (id, patch) =>
        set((s) => ({ products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
      deleteProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

      createTheme: (input) => {
        const id = nanoid(8);
        set((s) => ({ themes: [...s.themes, { id, ...input }] }));
        return id;
      },
      updateTheme: (id, patch) =>
        set((s) => ({ themes: s.themes.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
      deleteTheme: (id) => set((s) => ({ themes: s.themes.filter((t) => t.id !== id) })),

      createTag: (input) => {
        const id = nanoid(8);
        set((s) => ({ tags: [...s.tags, { id, ...input }] }));
        return id;
      },
      updateTag: (id, patch) =>
        set((s) => ({ tags: s.tags.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
      deleteTag: (id) => set((s) => ({ tags: s.tags.filter((t) => t.id !== id) })),

      updateTimeSlot: (time, patch) =>
        set((s) => ({ timeline: s.timeline.map((t) => (t.time === time ? { ...t, ...patch } : t)) })),

      reset: () => {
        set({
          settings: settingsSeed as SiteSettings,
          videos: initialVideos,
          news: initialNews,
          curations: initialCurations,
          shorts: initialShorts,
          products: initialProducts,
          themes: initialThemes,
          tags: initialTags,
          timeline: initialTimeline,
        });
        if (typeof window !== "undefined") {
          localStorage.removeItem("hakka-poc.content");
        }
      },
    }),
    {
      name: "hakka-poc.content",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      version: 2, // bump → 自動清掉舊 localStorage（避免殘留 stale seed 讓 timeline 配對為空）
    },
  ),
);
