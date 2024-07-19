"use client";

import { Avatar, Button, Flex, Heading } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <header className="flex items-center px-4 border-b bg-cyan-500 text-gray-800">
            <Avatar src="./img/logo.png" fallback="logo" className="mr-2" />
            <Heading as="h1" className="flex-grow my-4">
                UMKM AI Assistant
            </Heading>
            <Flex gap="1">
                <Button
                    variant="solid"
                    disabled={pathname === "/"}
                    onClick={() => router.push("/")}
                >
                    Beranda
                </Button>
                <Button
                    variant="solid"
                    disabled={pathname === "/asisten"}
                    onClick={() => router.push("/asisten")}
                >
                    Panggil Asisten
                </Button>
            </Flex>
        </header>
    );
}
