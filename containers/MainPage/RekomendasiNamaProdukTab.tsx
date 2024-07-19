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

export type RekomendasiNamaProdukSettingType = {
    tema: string;
    nama_produk: string;
    deskripsi_produk: string;
    harga_produk: string;
    sosial_media: string;
    tone: string;
    target_audiens: string;
    call_to_action: string;
    keyword: string;
    panjang_caption: string;
};

export const RekomendasiNamaProdukSettingInitial: RekomendasiNamaProdukSettingType =
    {
        tema: "",
        nama_produk: "",
        deskripsi_produk: "",
        harga_produk: "",
        sosial_media: "",
        tone: "",
        target_audiens: "",
        call_to_action: "",
        keyword: "",
        panjang_caption: "",
    };

type Props = {};

export default function RekomendasiNamaProdukTab({}: Props) {
    const [setting, setSetting] = useState<RekomendasiNamaProdukSettingType>(
        RekomendasiNamaProdukSettingInitial
    );

    const [results, setResults] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function onClickStart() {
        setIsLoading(true);
        setResults([]);

        try {
            const theOutput = await fetchAI({
                ...setting,
                feature_type: FeatureEnum.RekomendasiNamaProduk,
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
                    Buat Caption Sosial Media
                </Heading>
                <Text as="p" size="1">
                    Minta bantuan AI Asisten untuk membuat caption sosial media.
                </Text>

                <Separator my="3" size="4" />
                <Grid gap="4" columns={{ md: "2", sm: "1" }} width="auto">
                    <DataList.Root className="h-min">
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Tema / Topik
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.tema}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                tema: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Contoh : Promosi produk baru skincare
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
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
                                        Contoh : Scrum Care
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
                                        Contoh : Serum wajah dengan kandungan
                                        vitamin C, melembapkan kulit
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
                                        Contoh : Rp25000
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Sosial Media
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.sosial_media}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                sosial_media: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Contoh : Instagram
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
                                        Contoh : Lucu dan santai
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
                                        Contoh : Wanita berusia 20-30 tahun
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
                                        Contoh : Ajak followers untuk membeli
                                        produk atau memberikan komentar
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
                                        Contoh : #skincarenatural, #glowingskin,
                                        #kulitcerah
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
                                        Contoh : Pendek
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
