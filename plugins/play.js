// ════════════════════════════════════════════════════════
// 🎵 PLAY / SONG COMMAND FIXED
// ✅ Multi API Stable Audio Downloader
// ⚡ Powered By AHMAD-MD
// ════════════════════════════════════════════════════════

const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { dlaudio, dlsong, dlmusic } = require('../lib/ytdl');

// 🎧 GET AUDIO FUNCTION
async function getAudio(videoUrl) {

    let audioUrl = null;

    // API 1 - dlaudio
    try {
        audioUrl = await dlaudio(videoUrl);

        if (audioUrl) {
            console.log("✅ dlaudio success");
            return audioUrl;
        }

    } catch (e) {
        console.log("❌ dlaudio failed:", e.message);
    }

    // API 2 - dlsong
    try {
        audioUrl = await dlsong(videoUrl);

        if (audioUrl) {
            console.log("✅ dlsong success");
            return audioUrl;
        }

    } catch (e) {
        console.log("❌ dlsong failed:", e.message);
    }

    // API 3 - dlmusic
    try {
        audioUrl = await dlmusic(videoUrl);

        if (audioUrl) {
            console.log("✅ dlmusic success");
            return audioUrl;
        }

    } catch (e) {
        console.log("❌ dlmusic failed:", e.message);
    }

    // API 4 - Jawad API
    try {

        const api =
`https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(videoUrl)}`;

        const { data } = await axios.get(api, {
            timeout: 30000
        });

        audioUrl =
            data?.result?.audio ||
            data?.result?.url ||
            data?.audio ||
            data?.url ||
            data?.result?.mp3;

        if (audioUrl) {
            console.log("✅ Jawad API success");
            return audioUrl;
        }

    } catch (e) {
        console.log("❌ Jawad API failed:", e.message);
    }

    // API 5 - NexRay v1
    try {

        const api =
`https://api.nexray.web.id/downloader/v1/ytmp3?url=${encodeURIComponent(videoUrl)}`;

        const { data } = await axios.get(api);

        if (data?.status && data?.result?.url) {
            console.log("✅ NexRay v1 success");
            return data.result.url;
        }

    } catch (e) {
        console.log("❌ NexRay v1 failed:", e.message);
    }

    // API 6 - NexRay Normal
    try {

        const api =
`https://api.nexray.web.id/downloader/ytmp3?url=${encodeURIComponent(videoUrl)}`;

        const { data } = await axios.get(api);

        if (data?.status && data?.result?.url) {
            console.log("✅ NexRay success");
            return data.result.url;
        }

    } catch (e) {
        console.log("❌ NexRay failed:", e.message);
    }

    // API 7 - Deline
    try {

        const api =
`https://api.deline.web.id/downloader/ytmp3?url=${encodeURIComponent(videoUrl)}`;

        const { data } = await axios.get(api);

        if (data?.status && data?.result?.dlink) {
            console.log("✅ Deline success");
            return data.result.dlink;
        }

    } catch (e) {
        console.log("❌ Deline failed:", e.message);
    }

    return null;
}

// ════════════════════════════════════════
// 🎵 PLAY COMMAND
// ════════════════════════════════════════

cmd({
    pattern: "play",
    alias: ["song", "music"],
    desc: "Download YouTube audio",
    category: "download",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

    try {

        // ❌ NO QUERY
        if (!q) {
            return reply(
                "🎵 Please provide a song name\n\nExample: .play Faded Alan Walker"
            );
        }

        // 🎶 REACTION
        await conn.sendMessage(from, {
            react: {
                text: "🎶",
                key: m.key
            }
        });

        // 🔍 SEARCH YOUTUBE
        const search = await yts(q);

        if (!search.videos || search.videos.length === 0) {

            await conn.sendMessage(from, {
                react: {
                    text: "❌",
                    key: m.key
                }
            });

            return reply("❌ No results found");
        }

        const video = search.videos[0];

        // 🖼️ SONG INFO
        await conn.sendMessage(from, {
            image: { url: video.thumbnail },
            caption:
`╭━━━〔 🎵 SONG DOWNLOADER 〕━━━⬣
┃
┃ 🎵 *Title:* ${video.title}
┃ 👤 *Author:* ${video.author?.name || "Unknown"}
┃ ⏱️ *Duration:* ${video.timestamp}
┃ 👁️ *Views:* ${video.views.toLocaleString()}
┃
┃ 📥 *Status:* Downloading...
┃
╰━━━━━━━━━━━━━━━━━━⬣

> Powered By AHMAD-MD`
        }, { quoted: mek });

        // 🎧 GET AUDIO URL
        const audioUrl = await getAudio(video.url);

        // ❌ AUDIO FAILED
        if (!audioUrl) {

            await conn.sendMessage(from, {
                react: {
                    text: "❌",
                    key: m.key
                }
            });

            return reply("❌ All download APIs failed");
        }

        // 📥 DOWNLOAD AUDIO BUFFER
        const audioBuffer = await axios.get(audioUrl, {
            responseType: "arraybuffer",
            timeout: 60000
        });

        // 📂 TEMP FILE
        const filePath = path.join(__dirname, `${Date.now()}.mp3`);

        fs.writeFileSync(filePath, audioBuffer.data);

        // 🎧 SEND AUDIO
        await conn.sendMessage(from, {
            audio: fs.readFileSync(filePath),
            mimetype: "audio/mpeg",
            fileName: `${video.title}.mp3`,
            ptt: false,

            contextInfo: {
                externalAdReply: {
                    title: video.title,
                    body: "YouTube Audio Downloader",
                    thumbnailUrl: video.thumbnail,
                    sourceUrl: video.url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }

        }, { quoted: mek });

        // 🗑️ DELETE TEMP FILE
        fs.unlinkSync(filePath);

        // ✅ SUCCESS REACTION
        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: m.key
            }
        });

    } catch (e) {

        console.log("PLAY ERROR:", e);

        // ❌ ERROR REACTION
        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: m.key
            }
        });

        reply("⚠️ Error while processing request");
    }

});
