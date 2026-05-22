"use client";

import { useState } from "react";
import { useContent } from "@/lib/store/content";
import { EntityForm, FormSection, FormField } from "@/components/admin/entity-form";
import { Input, Textarea } from "@/components/ui/input";

const CATEGORIES = ["茶葉", "工藝品", "客語教材", "食品", "服飾"] as const;
const PLATFORMS = ["Shopee", "PChome", "客家好物網", "其他"] as const;

export default function NewProductPage() {
  const createProduct = useContent((s) => s.createProduct);
  const [data, setData] = useState({
    name: "",
    category: "茶葉" as (typeof CATEGORIES)[number],
    description: "",
    price: 0,
    image: "",
    externalUrl: "",
    externalPlatform: "Shopee" as (typeof PLATFORMS)[number],
    tags: "",
  });

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => setData((d) => ({ ...d, [k]: v }));

  return (
    <EntityForm
      isNew
      title="新增商品"
      backHref="/admin/shop"
      saveLabel="建立商品"
      onSave={() => {
        if (!data.name || !data.externalUrl) return false;
        createProduct({
          name: data.name,
          category: data.category,
          description: data.description,
          price: data.price,
          image: data.image || `https://picsum.photos/seed/${encodeURIComponent(data.name)}/800/800`,
          externalUrl: data.externalUrl,
          externalPlatform: data.externalPlatform,
          tags: data.tags ? data.tags.split(/[,，、]/).map((s) => s.trim()).filter(Boolean) : [],
          clickCount: 0,
          relatedCurations: [],
        });
        return true;
      }}
    >
      <FormSection title="基本資訊">
        <FormField label="商品名稱" required><Input value={data.name} onChange={(e) => set("name", e.target.value)} required /></FormField>
        <FormField label="類別">
          <select value={data.category} onChange={(e) => set("category", e.target.value as (typeof CATEGORIES)[number])} className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>
        <FormField label="描述"><Textarea value={data.description} onChange={(e) => set("description", e.target.value)} /></FormField>
        <FormField label="售價 (NT$)" required><Input type="number" value={data.price} onChange={(e) => set("price", Number(e.target.value))} required /></FormField>
        <FormField label="封面圖 URL" hint="留空使用隨機圖"><Input value={data.image} onChange={(e) => set("image", e.target.value)} /></FormField>
      </FormSection>

      <FormSection title="導購設定">
        <FormField label="合作電商">
          <select value={data.externalPlatform} onChange={(e) => set("externalPlatform", e.target.value as (typeof PLATFORMS)[number])} className="h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
            {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </FormField>
        <FormField label="外連 URL" required hint="使用者點購買會跳轉這個網址">
          <Input value={data.externalUrl} onChange={(e) => set("externalUrl", e.target.value)} placeholder="https://shopee.tw/..." required />
        </FormField>
        <FormField label="標籤"><Input value={data.tags} onChange={(e) => set("tags", e.target.value)} placeholder="茶, 客家, 禮盒" /></FormField>
      </FormSection>
    </EntityForm>
  );
}
