const { cmd } = require('../command');
const axios = require('axios');

const API_BASE_URL = 'https://ahmadhassan-eight.vercel.app/api';

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Get pairing code for AHMAD-MD bot",
    category: "owner",
    use: ".pair 923259158XXX",
    filename: __filename
}, async (conn, mek, m, {
    q,
    senderNumber,
    reply,
    react
}) => {

    try {

        await react('⏳');

        // =========================
        // GET NUMBER
        // =========================
        const phoneNumber = q
            ? q.replace(/[^0-9]/g, '')
            : senderNumber.replace(/[^0-9]/g, '');

        if (!phoneNumber) {
            await react('❌');
            return reply("❌ Please provide a number\nExample: .pair 923001234567");
        }

        if (phoneNumber.length < 10 || phoneNumber.length > 15) {
            await react('❌');
            return reply("❌ Invalid phone number format");
        }

        // =========================
        // FETCH SERVERS
        // =========================
        let serversResponse;

        try {
            serversResponse = await axios.get(
                `${API_BASE_URL}/servers`,
                {
                    timeout: 20000
                }
            );
        } catch (e) {
            console.log("SERVER FETCH ERROR:", e.message);

            await react('❌');
            return reply("❌ Failed to connect to API server");
        }

        // =========================
        // CHECK SERVER LIST
        // =========================
        if (
            !serversResponse.data ||
            !Array.isArray(serversResponse.data.servers)
        ) {
            console.log("INVALID SERVER RESPONSE:", serversResponse.data);

            await react('❌');
            return reply("❌ Invalid server list response");
        }

        const servers = serversResponse.data.servers;

        if (servers.length === 0) {
            await react('❌');
            return reply("❌ No active servers found");
        }

        // =========================
        // RANDOM SERVER
        // =========================
        const randomServer =
            servers[Math.floor(Math.random() * servers.length)];

        if (!randomServer.url) {
            await react('❌');
            return reply("❌ Invalid server URL");
        }

        const serverUrl = randomServer.url.replace(/\/$/, '');

        console.log("SELECTED SERVER:", serverUrl);

        // =========================
        // GET PAIR CODE
        // =========================
        let response;

        try {

            response = await axios.get(
                `${serverUrl}/code`,
                {
                    params: {
                        number: phoneNumber
                    },
                    timeout: 60000
                }
            );

        } catch (e) {

            console.log(
                "PAIR API ERROR:",
                e.response?.data || e.message
            );

            await react('❌');

            return reply(
                `❌ Pair API Failed\n\n${
                    e.response?.data?.message ||
                    e.message
                }`
            );
        }

        console.log("PAIR RESPONSE:", response.data);

        // =========================
        // GET CODE FROM RESPONSE
        // =========================
        const pairingCode =
            response.data?.code ||
            response.data?.pair ||
            response.data?.pairingCode;

        if (!pairingCode) {

            console.log("INVALID PAIR RESPONSE:", response.data);

            await react('❌');

            return reply("❌ Pair code not found in API response");
        }

        // =========================
        // SUCCESS
        // =========================
        await react('✅');

        const msg = `
╭━━〔 AHMAD-MD PAIR 〕━━⬣
┃
┃ 🔐 CODE: ${pairingCode}
┃ 🌐 SERVER: ${randomServer.name || 'Unknown'}
┃
┃ 📱 HOW TO CONNECT
┃ 1. Open WhatsApp
┃ 2. Linked Devices
┃ 3. Link a Device
┃ 4. Enter this code
┃
╰━━━━━━━━━━━━━━⬣
`;

        await reply(msg);

    } catch (error) {

        console.log("FULL ERROR:", error);

        await react('❌');

        return reply(
            `❌ Error:\n${error.message}`
        );
    }
});
