import { FeatureEnum } from "@/types/feature.enum";
import { swalError } from "@/utils";
import { fetchAI } from "@/utils/fetch-ai";
import { MagicWandIcon } from "@radix-ui/react-icons";
import {
    Blockquote,
    Box,
    Button,
    Card,
    DataList,
    Grid,
    Heading,
    Separator,
    Text,
    TextField,
} from "@radix-ui/themes";
import { useState } from "react";

export type CaptionProdukSettingType = {
    nama_produk: string;
    deskripsi_produk: string;
    harga_produk: string;
    manfaat_utama: string;
    tone: string;
    target_audiens: string;
    call_to_action: string;
    keyword: string;
    panjang_caption: string;
    promosi_khusus: string;
};

export const CaptionProdukSettingInitial: CaptionProdukSettingType = {
    nama_produk: "",
    deskripsi_produk: "",
    harga_produk: "",
    manfaat_utama: "",
    tone: "",
    target_audiens: "",
    call_to_action: "",
    keyword: "",
    panjang_caption: "",
    promosi_khusus: "",
};

export default function CaptionProdukTab() {
    const [setting, setSetting] = useState<CaptionProdukSettingType>(
        CaptionProdukSettingInitial
    );

    const [results, setResults] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function onClickStart() {
        setIsLoading(true);
        setResults([]);

        try {
            const theOutput = await fetchAI({
                ...setting,
                feature_type: FeatureEnum.CaptionProduk,
            });
            if (theOutput.ok) {
                setResults(theOutput.data || []);
            } else {
                throw new Error(theOutput.message);
            }
        } catch (err) {
            console.error(err);
            swalError(err);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section>
            <Card className="mb-4">
                <Heading as="h4" size="3">
                    Buat Caption Produk
                </Heading>
                <Text as="p" size="1">
                    Minta bantuan AI Asisten untuk membuat caption pada produk
                    Anda.
                </Text>

                <Separator my="3" size="4" />
                <Grid gap="4" columns={{ md: "2", sm: "1" }} width="auto">
                    <DataList.Root className="h-min">
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Nama Produk
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.nama_produk}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                nama_produk: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Nama lengkap produk atau layanan yang
                                        akan dipromosikan.
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Deskripsi Produk
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.deskripsi_produk}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                deskripsi_produk:
                                                    e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Penjelasan singkat tentang fitur,
                                        manfaat, atau keunggulan produk.
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Harga Produk
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.harga_produk}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                harga_produk: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Harga produk. Contoh : Rp25000
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Manfaat Utama
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.manfaat_utama}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                manfaat_utama: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Apa keuntungan utama yang didapat
                                        konsumen dengan membeli produk ini?
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Promosi Khusus
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.promosi_khusus}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                promosi_khusus: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Apakah ada diskon, penawaran khusus,
                                        atau event terkait produk?
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                    <DataList.Root className="h-min">
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Tone / Nada
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.tone}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                tone: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Bagaimana Anda ingin menyampaikan pesan?
                                        (lucu, formal, inspiratif, dll.)
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Target Audiens
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.target_audiens}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                target_audiens: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Siapa yang ingin Anda sasar dengan
                                        produk ini? (umur, jenis kelamin, minat,
                                        dll.)
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Call to Action
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.call_to_action}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                call_to_action: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Apa tindakan yang ingin Anda dorong dari
                                        audiens? (beli sekarang, kunjungi
                                        website, dll.)
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Keyword / Hashtag
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.keyword}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                keyword: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Kata kunci yang relevan dengan produk
                                        dan ingin dipromosikan.
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Panjang Caption
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.panjang_caption}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                panjang_caption: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Panjang caption yang ingin dibuat
                                        (panjang, pendek, sedang)
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </Grid>
            </Card>

            <Button
                onClick={onClickStart}
                loading={isLoading}
                disabled={isLoading}
            >
                <MagicWandIcon />
                Buat Caption
            </Button>

            <Grid className="my-4" columns={{ sm: "1", md: "3" }} gap="4">
                {results.map((res, idx) => {
                    return (
                        <Card key={idx}>
                            <Text>{res}</Text>
                        </Card>
                    );
                })}
            </Grid>
        </section>
    );
}
