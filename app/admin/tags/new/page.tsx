"use client";

import { useState } from "react";
import { useContent } from "@/lib/store/content";
import { EntityForm, FormSection, FormField } from "@/components/admin/entity-form";
import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/utils";

const CATEGORIES = ["飲食", "地點", "節慶", "工藝", "影視", "人物"] as const;

export default function NewTagPage() {
  const createTag = useContent((s) => s.createTag);
  const [data, setData] = useState({ name: "", category: "飲食" as (typeof CATEGORIES)[number], synonyms: "" });

  return (
    <EntityForm
      isNew
      title="新增標籤"
      backHref="/admin/tags"
      onSave={() => {
        if (!data.name) return false;
        createTag({
          name: data.name,
          category: data.category,
          synonyms: data.synonyms ? data.synonyms.split(/[,，、]/).map((s) => s.trim()).filter(Boolean) : [],
          relatedTagIds: [],
          contentCount: 0,
        });
        return true;
      }}
    >
      <FormSection title="標籤資訊">
        <FormField label="名稱" required><Input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} /></FormField>
        <FormField label="類別">
          <select value={data.category} onChange={(e) => setData({ ...data, category: e.target.value as (typeof CATEGORIES)[number] })} className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>
        <FormField label="同義詞"><Input value={data.synonyms} onChange={(e) => setData({ ...data, synonyms: e.target.value })} /></FormField>
      </FormSection>
    </EntityForm>
  );
}
