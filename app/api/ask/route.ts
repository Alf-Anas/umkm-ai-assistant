import { CaptionSosMedSettingType } from "@/containers/MainPage/CaptionSosialMediaTab";
import { FeatureEnum } from "@/types/feature.enum";
import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from "@google/generative-ai";
import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || "";

type CaptionSosialMediaDataType = {
    feature_type: FeatureEnum.CaptionSosialMedia;
} & CaptionSosMedSettingType;

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
            * aaa : ${tema || "-"}
            
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
    console.log(response);
    return response.text();
}

export async function POST(request: Request) {
    const { feature_type, ...restRequest } = await request.json();

    try {
        switch (feature_type) {
            case FeatureEnum.CaptionSosialMedia:
                const res = await runCaptionSosialMedia(restRequest);
                console.log(res);
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
