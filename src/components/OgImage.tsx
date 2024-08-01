// ref: https://blog.70-10.net/posts/satori-og-image/
import satori from "satori";
import sharp from "sharp";
import fs from "fs";

export const OG_IMAGE_COMPONENT_VERSION = "2.0.1";

export const IMAGE_WIDTH = 1280;
export const IMAGE_HEIGHT = 720;
const FONT_FILE_PATH = "./src/fonts/NotoSansJP/NotoSansJP-ExtraBold.ttf";

const logoText = fs.readFileSync("./public/logo.png");
const logoDataURL = `data:image/png;base64,${logoText.toString("base64")}`;

export const getOgImage = async (text: string) => {
    const fontData = (await getFontData()) as ArrayBuffer;
    const svg = await satori(
        <main
            style={{
                height: "100%",
                width: "100%",
                background: "linear-gradient(135deg, #32B3EB, #2D6AE1)",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div
                style={{
                    width: "90%",
                    height: "90%",
                    background: "rgb(255, 255, 255, 0.9)",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                    boxShadow: `
          0.8px 0.8px 4.4px rgba(0, 0, 0, 0.02),
          2px 2px 10.5px rgba(0, 0, 0, 0.028),
          3.8px 3.8px 19.8px rgba(0, 0, 0, 0.035),
          6.7px 6.7px 35.3px rgba(0, 0, 0, 0.042),
          12.5px 12.5px 66px rgba(0, 0, 0, 0.05),
          30px 30px 158px rgba(0, 0, 0, 0.07)`
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}
                >
                    <img
                        src={logoDataURL}
                        style={{
                            margin: "auto",
                            marginTop: "50px",
                            width: "200px"
                        }}
                    />
                </div>
                <h1
                    style={{
                        fontSize: "67px",
                        fontFamily: "Noto Sans JP",
                        fontWeight: 800,
                        display: "block",
                        width: "100%",
                        padding: "0 1.5em",
                        margin: "auto",
                        color: "#555",
                        transform: "translateY(-40px)"
                    }}
                >
                    {text}
                </h1>
            </div>
        </main>,
        {
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            fonts: [
                {
                    name: "Noto Sans JP",
                    data: fontData,
                    style: "normal"
                }
            ]
        }
    );

    return await sharp(Buffer.from(svg)).png().toBuffer();
};

const getFontData = () => {
    const fontFile = fs.readFileSync(FONT_FILE_PATH);
    return fontFile.buffer;
};
