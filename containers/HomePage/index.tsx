"use client";

import { Box, Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <main>
            <Grid columns={{ initial: "1", md: "2" }} gap="4">
                <Box>
                    <Heading size="6" as="h2">
                        Selamat datang di UMKM AI Assistant
                    </Heading>

                    <Text as="p" className="my-4 text-justify">
                        UMKM AI Assistant adalah aplikasi cerdas yang dirancang
                        untuk membantu usaha mikro, kecil, dan menengah (UMKM)
                        dalam proses transformasi digital. Dengan memanfaatkan
                        teknologi AI, aplikasi ini memberikan solusi praktis
                        yang memudahkan UMKM dalam mengelola bisnis mereka
                        dengan lebih efisien.
                    </Text>

                    <Text as="p" className="font-bold">
                        Fitur utama yang saat ini tersedia pada UMKM AI
                        Assistant meliputi:
                    </Text>

                    <ul className="list-disc space-y-2">
                        <li>
                            <b>Rekomendasi Nama Bisnis:</b> Membantu pelaku
                            usaha dalam menemukan nama bisnis yang kreatif dan
                            menarik, yang sesuai dengan identitas dan visi
                            bisnis mereka.
                        </li>
                        <li>
                            <b>Rekomendasi Nama Produk</b>: Memberikan saran
                            nama produk yang unik dan relevan, sehingga produk
                            lebih mudah dikenali dan menarik minat konsumen.
                        </li>
                        <li>
                            <b>Caption Produk:</b> Membantu membuat caption
                            menarik dan informatif untuk setiap produk yang
                            dijual, sehingga dapat meningkatkan daya tarik dan
                            penjualan produk tersebut.
                        </li>
                        <li>
                            <b>Caption Sosial Media:</b> Menyediakan ide dan
                            saran caption yang kreatif untuk posting di berbagai
                            platform media sosial, membantu UMKM membangun
                            keterlibatan yang lebih baik dengan audiens mereka.
                        </li>
                    </ul>

                    <Text as="p" className="my-4 text-justify">
                        Dengan UMKM AI Assistant, pelaku usaha dapat dengan
                        mudah menghasilkan konten yang menarik dan efektif untuk
                        pemasaran digital, membantu mereka membangun merek yang
                        kuat dan meningkatkan jangkauan pasar.
                    </Text>
                </Box>

                <Flex direction="column" gap="3" className="text-center">
                    <Image
                        alt="logo"
                        width="500"
                        height="500"
                        src="/img/logo.png"
                        className="max-w-96 max-h-96 mx-auto rounded-xl"
                    />
                    <Flex className="mx-auto" gap="4">
                        <Button
                            variant="solid"
                            size="3"
                            className="min-w-36"
                            onClick={() => router.push("/asisten")}
                        >
                            Coba Aplikasi
                        </Button>
                    </Flex>
                </Flex>
            </Grid>
        </main>
    );
}
