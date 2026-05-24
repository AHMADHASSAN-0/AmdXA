const axios = require("axios");
const { cmd } = require("../command");
async function fetchFonts(text) {
  const apiUrl = `https://www.dark-yasiya-api.site/other/font?text=${encodeURIComponent(text)}`;
  const response = await axios.get(apiUrl, { timeout: 10000 });
  const data = response.data;
const fontStyles = {
  1: {
    name: "𝐁𝐨𝐥𝐝",
    upper: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙",
    lower: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳",
    nums:  "𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
  },
  2: {
  name: "𝘐𝘵𝘢𝘭𝘪𝘤",
    upper: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡",
    lower: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻",
    nums:  "0123456789"
  },
  3: {
    name: "𝙱𝚘𝚕𝚍 𝙸𝚝𝚊𝚕𝚒𝚌",
    upper: "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕",
    lower: "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯",
    nums:  "0123456789"
  },
  4: {
    name: "𝓢𝓬𝓻𝓲𝓹𝓽",
    upper: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩",
    lower: "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃",
    nums:  "0123456789"
  },
    5: {
    name: "𝔉𝔯𝔞𝔨𝔱𝔲𝔯",
    upper: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
    lower: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷",
    nums:  "0123456789"
  },
  6: {
    name: "𝕯𝖔𝖚𝖇𝖑𝖊 𝕱𝖗𝖆𝖐𝖙𝖚𝖗",
    upper: "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅",
    lower: "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟",
    nums:  "0123456789"
  },
  7: {
    name: "𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜",
    upper: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
    lower: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫",
    nums:  "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡"
  },
  8: {
    name: "𝚂𝚊𝚗𝚜 𝙱𝚘𝚕𝚍",
    upper: "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭",
    lower: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇",
    nums:  "𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"
  },
  9: {
    name: "𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎",
    upper: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉",
    lower: "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣",
    nums:  "𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"
  },
  10: {
    name: "Ⓒⓘⓡⓒⓛⓔⓓ",
    upper: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ",
    lower: "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ",
    nums:  "⓪①②③④⑤⑥⑦⑧⑨"
  },
  11: {
  name: "Ｆｕｌｌｗｉｄｔｈ",
    upper: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ",
    lower: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ",
    nums:  "０１２３４５６７８９"
  },
  12: {
    name: "Sᴍᴀʟʟ Cᴀᴘs",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ",
    nums:  "0123456789"
  },
  13: {
    name: "U͟n͟d͟e͟r͟l͟i͟n͟e͟",
    upper: "A͟B͟C͟D͟E͟F͟G͟H͟I͟J͟K͟L͟M͟N͟O͟P͟Q͟R͟S͟T͟U͟V͟W͟X͟Y͟Z͟",
    lower: "a͟b͟c͟d͟e͟f͟g͟h͟i͟j͟k͟l͟m͟n͟o͟p͟q͟r͟s͟t͟u͟v͟w͟x͟y͟z͟",
    nums:  "0͟1͟2͟3͟4͟5͟6͟7͟8͟9͟"
  },
  14: {
    name: "S̶t̶r̶i̶k̶e̶",
    upper: 
    "A̶B̶C̶D̶E̶F̶G̶H̶I̶J̶K̶L̶M̶N̶O̶P̶Q̶R̶S̶T̶U̶V̶W̶X̶Y̶Z̶",
    lower: "a̶b̶c̶d̶e̶f̶g̶h̶i̶j̶k̶l̶m̶n̶o̶p̶q̶r̶s̶t̶u̶v̶w̶x̶y̶z̶",
    nums:  "0̶1̶2̶3̶4̶5̶6̶7̶8̶9̶"
  },
  15: {
    name: "𝖲𝖺𝗇𝗌 𝖨𝗍𝖺𝗅𝗂𝖼",
    upper: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡",
    lower: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻",
    nums:  "0123456789"
  }
};
  let result = null;
function convertText(text, styleNum) {
  const style = fontStyles[styleNum];
  if (!style) return text;
  if (data.result && Array.isArray(data.result)) {
    result = data.result;
  } else if (data.data && Array.isArray(data.data)) {
    result = data.data;
      } else if (data.results && Array.isArray(data.results)) {
    result = data.results;
  } else if (Array.isArray(data)) {
    result = data;
  }
  const upperArr = [...style.upper];
  const lowerArr = [...style.lower];
  const numsArr  = [...style.nums];
  return result;
  return [...text].map(ch => {
    const u = ch.toUpperCase();
    if (ch >= "A" && ch <= "Z") return upperArr[ch.charCodeAt(0) - 65] || ch;
    if (ch >= "a" && ch <= "z") return lowerArr[ch.charCodeAt(0) - 97] || ch;
    if (ch >= "0" && ch <= "9") return numsArr[ch.charCodeAt(0) - 48] || ch;
    return ch;
  }).join("");
}
cmd({
  pattern: "fancy",
  alias: ["font", "style"],
  react: "✍️",
  desc: "Convert text into various fancy fonts (all).",
  desc: "Convert text into all 15 fancy font styles.",
  category: "tools",
  filename: __filename
}, async (conn, m, store, { from, quoted, args, q, reply }) => {
  try {
    if (!q) {
      return reply("❎ Please provide text to convert into fancy fonts.\n\n*Example:* .fancy Hello");
      }, async (conn, m, store, { from, q, reply }) => {
  if (!q) {
    return reply("❎ Text provide karo.\n\n*Example:* .fancy Hello");
  }
    const result = await fetchFonts(q);
  const output = Object.keys(fontStyles).map(num => {
    const converted = convertText(q, parseInt(num));
    return `*[${num}] ${fontStyles[num].name}:*\n${converted}`;
  }).join("\n\n");
    if (!result || result.length === 0) {
      return reply("❌ No fonts received from API. Please try again later.");
    }
    
    const fonts = result.map((item, i) => {
      const name = item.name || item.title || item.type || `Style ${i + 1}`;
      const text = item.result || item.text || item.output || item.font || "";
      return `*[${i + 1}] ${name}:*\n${text}`;
    }).join("\n\n");
    const resultText = `✨ *Fancy Fonts Converter* ✨\n\n${fonts}\n\n> *Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`;
    await conn.sendMessage(from, { text: resultText }, { quoted: m });
  } catch (error) {
    console.error("❌ Error in fancy command:", error.message);
    
   reply(`⚠️ Error: ${error.message}`);
  }
  const resultText = `✨ *Fancy Fonts* ✨\n\n${output}\n\n> *Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`;
  await conn.sendMessage(from, { text: resultText }, { quoted: m });
});
for (let i = 1; i <= 15; i++) {
-27
+8
    cmd({
      pattern: `fancy${num}`,
      react: "✍️",
      desc: `Convert text into fancy font style #${num}.`,
      desc: `Fancy font style #${num} — ${fontStyles[num].name}`,
      category: "tools",
      filename: __filename
    }, async (conn, m, store, { from, quoted, args, q, reply }) => {
from, quoted, args, q, reply }) => {
      try {
        if (!q) {
          return reply(`❎ Please provide text.\n\n*Example:* .fancy${num} Hello`);
        }
    }, async (conn, m, store, { from, q, reply }) => {
      if (!q) {
        return reply(`❎ Text provide karo.\n\n*Example:* .fancy${num} Hello`);
      }
        const result = await fetchFonts(q);
        if (!result || result.length === 0) {
          return reply("❌ No fonts received from API. Please try again later.");
        }
        if (!result[num - 1]) {
          return reply(`❌ Font style #${num} not available. API only has ${result.length} fonts.`);
        }
        const item = result[num - 1];
        const name = item.name || item.title || item.type || `Style ${num}`;
        const text = item.result || item.text || item.output || item.font || "";
        const resultText = `✨ *Fancy Font #${num} — ${name}* ✨\n\n${text}\n\n> *Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`;
        await conn.sendMessage(from, { text: resultText }, { quoted: m });
      } catch (error) {
        console.error(`❌ Error in fancy${num} command:`, error.message);
reply(`⚠️ Error: ${error.message}`);
      }
      const converted = convertText(q, num);
      const resultText = `✨ *[${num}] ${fontStyles[num].name}* ✨\n\n${converted}\n\n> *Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`;
      await conn.sendMessage(from, { text: resultText }, { quoted: m });
    });
  })(i);
      }
      
