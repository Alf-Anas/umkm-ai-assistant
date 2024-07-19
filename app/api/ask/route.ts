import { CaptionProdukSettingType } from "@/containers/MainPage/CaptionProdukTab";
import { CaptionSosMedSettingType } from "@/containers/MainPage/CaptionSosialMediaTab";
import { RekomendasiNamaBisnisSettingType } from "@/containers/MainPage/RekomendasiNamaBisnisTab";
import { RekomendasiNamaProdukSettingType } from "@/containers/MainPage/RekomendasiNamaProdukTab";
import { FeatureEnum } from "@/types/feature.enum";
import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from "@google/generative-ai";
import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || "";

function commonSetting() {
    const MODEL_NAME = process.env.GOOGLE_GEMINI_MODEL || "";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    return { model, generationConfig, safetySettings };
}

async function runCaptionSosialMedia({
    tema,
    nama_produk,
    harga_produk,
    deskripsi_produk,
    tone,
    keyword,
    call_to_action,
    target_audiens,
    panjang_caption,
    sosial_media,
}: CaptionSosMedSettingType) {
    if (!API_KEY) {
        console.error("Please provide the API Key.");
        return;
    }

    const { model, generationConfig, safetySettings } = commonSetting();

    const parts = [
        {
            text: `Buatlah caption menarik untuk postingan media sosial dengan detail sebagai berikut:

            * Tema : ${tema || "-"}
            * Nama Produk : ${nama_produk || "-"}
            * Deskripsi Produk : ${deskripsi_produk || "-"}
            * Harga Produk : ${harga_produk || "-"}
            * Sosial Media : ${sosial_media || "-"}
            * Tone : ${tone || "-"}
            * Target Audiens : ${target_audiens || "-"}
            * Call to Action : ${call_to_action || "-"}
            * Keyword : ${keyword || "-"}
            * Panjang Caption : ${panjang_caption || "-"}
            
            Beri setidaknya 3 rekomendasi caption dalam format array string.
            `,
        },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });

    const { response } = result;
    return response.text();
}
async function runCaptionProduk({
    nama_produk,
    harga_produk,
    deskripsi_produk,
    manfaat_utama,
    promosi_khusus,
    tone,
    keyword,
    call_to_action,
    target_audiens,
    panjang_caption,
}: CaptionProdukSettingType) {
    if (!API_KEY) {
        console.error("Please provide the API Key.");
        return;
    }

    const { model, generationConfig, safetySettings } = commonSetting();

    const parts = [
        {
            text: `Buatlah caption menarik untuk sebuah produk dengan detail sebagai berikut:

            * Nama Produk : ${nama_produk || "-"}
            * Deskripsi Produk : ${deskripsi_produk || "-"}
            * Harga Produk : ${harga_produk || "-"}
            * Manfaat Utama : ${manfaat_utama || "-"}
            * Promosi Khusus : ${promosi_khusus || "-"}
            * Tone : ${tone || "-"}
            * Target Audiens : ${target_audiens || "-"}
            * Call to Action : ${call_to_action || "-"}
            * Keyword : ${keyword || "-"}
            * Panjang Caption : ${panjang_caption || "-"}
            
            Beri setidaknya 3 rekomendasi caption dalam format array string.
            `,
        },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });

    const { response } = result;
    return response.text();
}
async function runRekomendasiNamaProduk({
    kategori_produk,
    target_pasar,
    fitur_utama,
    nilai_jual_utama,
    tone,
    konotasi,
    bahasa,
    panjang_nama,
    contoh_nama,
    nama_dilarang,
}: RekomendasiNamaProdukSettingType) {
    if (!API_KEY) {
        console.error("Please provide the API Key.");
        return;
    }

    const { model, generationConfig, safetySettings } = commonSetting();

    const parts = [
        {
            text: `Berikan beberapa opsi nama untuk sebuah produk dengan detail sebagai berikut:

            * Kategori Produk : ${kategori_produk || "-"}
            * Target Pasar : ${target_pasar || "-"}
            * Fitur Utama : ${fitur_utama || "-"}
            * Nilai Jual Utama : ${nilai_jual_utama || "-"}
            * Konotasi : ${konotasi || "-"}
            * Tone : ${tone || "-"}
            * Bahasa : ${bahasa || "-"}
            * Panjang Nama : ${panjang_nama || "-"}
            * Contoh Nama yang Disukai : ${contoh_nama || "-"}
            * Nama yang Dilarang : ${nama_dilarang || "-"}
            
            Beri setidaknya 5 rekomendasi nama dalam format array string.
            `,
        },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });

    const { response } = result;
    return response.text();
}
async function runRekomendasiNamaBisnis({
    jenis_bisnis,
    target_pasar,
    nilai_jual_utama,
    visi_misi,
    tone_brand,
    kata_kunci,
    konotasi,
    bahasa,
    panjang_nama,
    contoh_nama_disukai,
    nama_dilarang,
}: RekomendasiNamaBisnisSettingType) {
    if (!API_KEY) {
        console.error("Please provide the API Key.");
        return;
    }

    const { model, generationConfig, safetySettings } = commonSetting();

    const parts = [
        {
            text: `Berikan beberapa opsi nama untuk sebuah bisnis dengan detail sebagai berikut:

            * Jenis Bisnis: ${jenis_bisnis || "-"}
            * Target Pasar: ${target_pasar || "-"}
            * Nilai Jual Utama: ${nilai_jual_utama || "-"}
            * Visi dan Misi: ${visi_misi || "-"}
            * Tone atau Nuansa Brand: ${tone_brand || "-"}
            * Kata Kunci Utama: ${kata_kunci || "-"}
            * Konotasi yang Diinginkan: ${konotasi || "-"}
            * Bahasa: ${bahasa || "-"}
            * Panjang Nama: ${panjang_nama || "-"}
            * Contoh Nama yang Disukai: ${contoh_nama_disukai || "-"}
            * Nama yang Dilarang: ${nama_dilarang || "-"}
            
            Beri setidaknya 5 rekomendasi nama dalam format array string.
            `,
        },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });

    const { response } = result;
    return response.text();
}

export async function POST(request: Request) {
    const { feature_type, ...restRequest } = await request.json();

    try {
        let res: string | undefined;
        switch (feature_type) {
            case FeatureEnum.CaptionSosialMedia:
                res = await runCaptionSosialMedia(restRequest);
                return NextResponse.json(
                    { success: true, data: res },
                    { status: 200 }
                );
            case FeatureEnum.CaptionProduk:
                res = await runCaptionProduk(restRequest);
                return NextResponse.json(
                    { success: true, data: res },
                    { status: 200 }
                );
            case FeatureEnum.RekomendasiNamaProduk:
                res = await runRekomendasiNamaProduk(restRequest);
                return NextResponse.json(
                    { success: true, data: res },
                    { status: 200 }
                );
            case FeatureEnum.RekomendasiNamaBisnis:
                res = await runRekomendasiNamaBisnis(restRequest);
                return NextResponse.json(
                    { success: true, data: res },
                    { status: 200 }
                );
            default:
                throw new Error("Feature type not found!");
        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
