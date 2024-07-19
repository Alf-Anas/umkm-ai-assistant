"use client";

import { Box, Heading, Tabs } from "@radix-ui/themes";
import CaptionSosialMediaTab from "./CaptionSosialMediaTab";
import { FeatureEnum } from "@/types/feature.enum";
import RekomendasiNamaBisnisTab from "./RekomendasiNamaBisnisTab";
import RekomendasiNamaProdukTab from "./RekomendasiNamaProdukTab";
import CaptionProdukTab from "./CaptionProdukTab";

export default function MainPage() {
    return (
        <main className="overflow-x-auto">
            <Heading size="6" as="h2" className="mb-8">
                Minta Bantuan Asisten
            </Heading>
            <Tabs.Root defaultValue={FeatureEnum.CaptionSosialMedia}>
                <Tabs.List size="2">
                    <Tabs.Trigger value={FeatureEnum.RekomendasiNamaBisnis}>
                        Rekomendasi Nama Bisnis
                    </Tabs.Trigger>
                    <Tabs.Trigger value={FeatureEnum.RekomendasiNamaProduk}>
                        Rekomendasi Nama Produk
                    </Tabs.Trigger>
                    <Tabs.Trigger value={FeatureEnum.CaptionProduk}>
                        Caption Produk
                    </Tabs.Trigger>
                    <Tabs.Trigger value={FeatureEnum.CaptionSosialMedia}>
                        Caption Sosial Media
                    </Tabs.Trigger>
                </Tabs.List>

                <Box pt="3">
                    <Tabs.Content
                        forceMount
                        value={FeatureEnum.RekomendasiNamaBisnis}
                        className="data-[state=inactive]:hidden"
                    >
                        <RekomendasiNamaBisnisTab />
                    </Tabs.Content>
                    <Tabs.Content
                        forceMount
                        value={FeatureEnum.RekomendasiNamaProduk}
                        className="data-[state=inactive]:hidden"
                    >
                        <RekomendasiNamaProdukTab />
                    </Tabs.Content>
                    <Tabs.Content
                        forceMount
                        value={FeatureEnum.CaptionProduk}
                        className="data-[state=inactive]:hidden"
                    >
                        <CaptionProdukTab />
                    </Tabs.Content>
                    <Tabs.Content
                        forceMount
                        value={FeatureEnum.CaptionSosialMedia}
                        className="data-[state=inactive]:hidden"
                    >
                        <CaptionSosialMediaTab />
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </main>
    );
}
