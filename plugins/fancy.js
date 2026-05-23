const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fancy",
  alias: ["font", "style"],
  react: "✍️",
  desc: "Convert text into various fancy fonts (all).",
  category: "tools",
  filename: __filename
}, async (conn, m, store, { from, quoted, args, q, reply }) => {
  try {
    if (!q) {
      return reply("❎ Please provide text to convert into fancy fonts.\n\n*Example:* .fancy Hello");
    }

    const apiUrl = `https://www.dark-yasiya-api.site/other/font?text=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl);

    if (!response.data.status) {
      return reply("❌ Error fetching fonts. Please try again later.");
    }

    const fonts = response.data.result.map((item, i) => `*[${i + 1}] ${item.name}:*\n${item.result}`).join("\n\n");
    const resultText = `✨ *Fancy Fonts Converter* ✨\n\n${fonts}\n\n> *Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`;

    await conn.sendMessage(from, { text: resultText }, { quoted: m });
  } catch (error) {
    console.error("❌ Error in fancy command:", error);
    reply("⚠️ An error occurred while fetching fonts.");
  }
});

for (let i = 1; i <= 15; i++) {
  (function (num) {
    cmd({
      pattern: `fancy${num}`,
      react: "✍️",
      desc: `Convert text into fancy font style #${num}.`,
      category: "tools",
      filename: __filename
    }, async (conn, m, store, { from, quoted, args, q, reply }) => {
      try {
        if (!q) {
          return reply(`❎ Please provide text.\n\n*Example:* .fancy${num} Hello`);
        }

        const apiUrl = `https://www.dark-yasiya-api.site/other/font?text=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);

        if (!response.data.status) {
          return reply("❌ Error fetching fonts. Please try again later.");
        }

        const result = response.data.result;

        if (!result[num - 1]) {
          return reply(`❌ Font style #${num} not available.`);
        }

        const item = result[num - 1];
        const resultText = `✨ *Fancy Font #${num} — ${item.name}* ✨\n\n${item.result}\n\n> *Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`;

        await conn.sendMessage(from, { text: resultText }, { quoted: m });
      } catch (error) {
        console.error(`❌ Error in fancy${num} command:`, error);
        reply("⚠️ An error occurred while fetching the font.");
      }
    });
  })(i);
}
