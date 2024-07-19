import { FeatureEnum } from "@/types/feature.enum";
import { swalError } from "@/utils";
import { fetchAI } from "@/utils/fetch-ai";
import { MagicWandIcon } from "@radix-ui/react-icons";
import {
    Badge,
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

export type RekomendasiNamaBisnisSettingType = {
    jenis_bisnis: string;
    target_pasar: string;
    nilai_jual_utama: string;
    visi_misi: string;
    tone_brand: string;
    kata_kunci: string;
    konotasi: string;
    bahasa: string;
    panjang_nama: string;
    contoh_nama_disukai: string;
    nama_dilarang: string;
};

export const RekomendasiNamaBisnisSettingInitial: RekomendasiNamaBisnisSettingType =
    {
        jenis_bisnis: "",
        target_pasar: "",
        nilai_jual_utama: "",
        visi_misi: "",
        tone_brand: "",
        kata_kunci: "",
        konotasi: "",
        bahasa: "",
        panjang_nama: "",
        contoh_nama_disukai: "",
        nama_dilarang: "",
    };

export default function RekomendasiNamaBisnisTab() {
    const [setting, setSetting] = useState<RekomendasiNamaBisnisSettingType>(
        RekomendasiNamaBisnisSettingInitial
    );

    const [results, setResults] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function onClickStart() {
        setIsLoading(true);
        setResults([]);

        try {
            const theOutput = await fetchAI({
                ...setting,
                feature_type: FeatureEnum.RekomendasiNamaBisnis,
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
                    Minta Rekomendasi Nama Bisnis
                </Heading>
                <Text as="p" size="1">
                    Minta bantuan AI Asisten untuk merekomendasikan nama bisnis
                    Anda.
                </Text>

                <Separator my="3" size="4" />
                <Grid gap="4" columns={{ md: "2", sm: "1" }} width="auto">
                    <DataList.Root className="h-min">
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Jenis Bisnis
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.jenis_bisnis}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                jenis_bisnis: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Apa yang akan Anda jual atau lakukan?
                                        (produk fisik, jasa, digital, dll.)
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Target Pasar
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.target_pasar}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                target_pasar: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Siapa konsumen ideal Anda? (umur, jenis
                                        kelamin, minat, gaya hidup)
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Nilai Jual Utama
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.nilai_jual_utama}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                nilai_jual_utama:
                                                    e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Apa yang membuat bisnis Anda unik atau
                                        berbeda dari kompetitor?
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Visi dan Misi
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.visi_misi}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                visi_misi: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Apa tujuan jangka panjang bisnis Anda?
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Tone atau Nuansa Brand
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.tone_brand}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                tone_brand: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Apakah brand ingin terlihat mewah,
                                        modern, klasik, lucu, atau profesional?
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                    <DataList.Root className="h-min">
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Kata Kunci Utama
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.kata_kunci}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                kata_kunci: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Kata atau frasa apa yang ingin Anda
                                        sorot dalam nama bisnis?
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Konotasi yang Diinginkan
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.konotasi}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                konotasi: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Apakah nama bisnis harus terdengar unik,
                                        mudah diingat, atau memiliki makna
                                        tertentu?
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Bahasa
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.bahasa}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                bahasa: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Bahasa apa yang ingin digunakan untuk
                                        nama bisnis?
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Panjang Nama
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.panjang_nama}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                panjang_nama: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Apakah nama bisnis lebih baik pendek,
                                        sedang, atau panjang?
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Contoh Nama yang Disukai
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.contoh_nama_disukai}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                contoh_nama_disukai:
                                                    e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Jika ada, berikan beberapa contoh nama
                                        yang Anda sukai sebagai referensi.
                                    </Blockquote>
                                </Box>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">
                                Nama yang Dilarang
                            </DataList.Label>
                            <DataList.Value>
                                <Box className="w-full">
                                    <TextField.Root
                                        className="w-full"
                                        size="2"
                                        value={setting.nama_dilarang}
                                        onChange={(e) =>
                                            setSetting((oldState) => ({
                                                ...oldState,
                                                nama_dilarang: e.target.value,
                                            }))
                                        }
                                    />
                                    <Blockquote size="1">
                                        Sebutkan nama yang ingin Anda hindari
                                        karena alasan tertentu.
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
                Minta Rekomendasi
            </Button>

            {results.length > 0 && (
                <Card className="my-4 w-fit">
                    <Grid columns={{ sm: "1", md: "1" }} gap="4">
                        {results.map((res, idx) => {
                            return (
                                <Badge
                                    key={idx}
                                    size="3"
                                    color="indigo"
                                    className="w-fit"
                                >
                                    {res}
                                </Badge>
                            );
                        })}
                    </Grid>
                </Card>
            )}
        </section>
    );
}
