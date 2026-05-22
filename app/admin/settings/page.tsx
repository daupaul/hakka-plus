"use client";

import { useState } from "react";
import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { EntityForm, FormSection, FormField } from "@/components/admin/entity-form";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const settings = useContent((s) => s.settings);
  const updateSettings = useContent((s) => s.updateSettings);
  const toast = useUi((s) => s.toast);
  const [data, setData] = useState(settings);

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => setData((d) => ({ ...d, [k]: v }));

  return (
    <EntityForm
      title="網站基本資訊"
      backHref="/admin"
      backLabel="回 Dashboard"
      onSave={() => {
        updateSettings(data);
        toast({ variant: "success", title: "已儲存設定", description: "前台 footer 已立即同步更新" });
      }}
    >
      <FormSection title="網站資訊">
        <FormField label="網站名稱"><Input value={data.siteName} onChange={(e) => set("siteName", e.target.value)} /></FormField>
        <FormField label="網站標語"><Input value={data.siteTagline} onChange={(e) => set("siteTagline", e.target.value)} /></FormField>
        <FormField label="客服 Email"><Input type="email" value={data.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} /></FormField>
        <FormField label="客服電話"><Input value={data.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} /></FormField>
      </FormSection>

      <FormSection title="社群連結">
        <FormField label="Facebook"><Input value={data.socialLinks.facebook ?? ""} onChange={(e) => set("socialLinks", { ...data.socialLinks, facebook: e.target.value })} /></FormField>
        <FormField label="Instagram"><Input value={data.socialLinks.instagram ?? ""} onChange={(e) => set("socialLinks", { ...data.socialLinks, instagram: e.target.value })} /></FormField>
        <FormField label="YouTube"><Input value={data.socialLinks.youtube ?? ""} onChange={(e) => set("socialLinks", { ...data.socialLinks, youtube: e.target.value })} /></FormField>
        <FormField label="LINE"><Input value={data.socialLinks.line ?? ""} onChange={(e) => set("socialLinks", { ...data.socialLinks, line: e.target.value })} /></FormField>
      </FormSection>

      <FormSection title="App 連結">
        <FormField label="iOS App Store"><Input value={data.appLinks.ios ?? ""} onChange={(e) => set("appLinks", { ...data.appLinks, ios: e.target.value })} /></FormField>
        <FormField label="Android Google Play"><Input value={data.appLinks.android ?? ""} onChange={(e) => set("appLinks", { ...data.appLinks, android: e.target.value })} /></FormField>
      </FormSection>
    </EntityForm>
  );
}
