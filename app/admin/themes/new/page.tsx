"use client";

import { useState } from "react";
import { useContent } from "@/lib/store/content";
import { EntityForm, FormSection, FormField } from "@/components/admin/entity-form";
import { Input, Textarea } from "@/components/ui/input";
import { slugify } from "@/lib/utils";

export default function NewThemePage() {
  const createTheme = useContent((s) => s.createTheme);
  const [data, setData] = useState({ name: "", description: "", cover: "", tagIds: "" });

  return (
    <EntityForm
      isNew
      title="新增主題訂閱"
      backHref="/admin/themes"
      saveLabel="建立主題"
      onSave={() => {
        if (!data.name) return false;
        const slug = slugify(data.name);
        createTheme({
          slug,
          name: data.name,
          description: data.description,
          cover: data.cover || `https://picsum.photos/seed/theme-${slug}/1200/700`,
          tagIds: data.tagIds ? data.tagIds.split(/[,，、]/).map((s) => s.trim()).filter(Boolean) : [],
          subscriberCount: 0,
        });
        return true;
      }}
    >
      <FormSection title="主題資訊">
        <FormField label="主題名稱" required><Input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required /></FormField>
        <FormField label="描述" required><Textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} required /></FormField>
        <FormField label="封面圖 URL" hint="留空使用隨機圖"><Input value={data.cover} onChange={(e) => setData({ ...data, cover: e.target.value })} /></FormField>
        <FormField label="關聯標籤 ID" hint="用逗號分隔，例：tag-tea, tag-meishan">
          <Input value={data.tagIds} onChange={(e) => setData({ ...data, tagIds: e.target.value })} />
        </FormField>
      </FormSection>
    </EntityForm>
  );
}
