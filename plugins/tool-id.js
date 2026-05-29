//Ahmad MD

const { cmd } = require('../command');

// lid to pn function for the existing command
async function lidToPhone(conn, lid) {
    try {
        const pn = await conn.signalRepository.lidMapping.getPNForLID(lid);
        if (pn) {
            return cleanPN(pn);
        }
        return lid.split("@")[0];
    } catch (e) {
        return lid.split("@")[0];
    }
}

// cleanPn
function cleanPN(pn) {
    return pn.split(":")[0];
}

// EXISTING ID COMMAND - DO NOT MODIFY
cmd({
    pattern: "id",
    alias: ["chatid", "jid", "gjid", "channelid", "newsletter", "cid"],  
    desc: "Get various IDs (chat, user, group, or channel)",
    react: "⚡",
    category: "utility",
    filename: __filename,
}, async (conn, mek, m, { 
    from, isGroup, reply, sender, fromMe, botNumber2
}) => {
    try {
        // Check if user is asking for channel ID
        if (m.text && m.text.includes('whatsapp.com/channel/')) {
            const match = m.text.match(/whatsapp\.com\/channel\/([\w-]+)/);
            if (!match) return reply("⚠️ *Invalid channel link format.*\n\nMake sure it looks like:\nhttps://whatsapp.com/channel/xxxxxxxxx");

            const inviteId = match[1];
            let metadata;
            
            try {
                metadata = await conn.newsletterMetadata("invite", inviteId);
            } catch (e) {
                return reply("❌ Failed to fetch channel metadata. Make sure the link is correct.");
            }

            if (!metadata || !metadata.id) return reply("❌ Channel not found or inaccessible.");

            return reply(`> ${metadata.id}`);
        }

        if (isGroup) {
            // Get group JID only (no LID)
            const groupJID = from.includes('@g.us') ? from : `${from}@g.us`;
            return reply(`> *Group JID:* ${groupJID}`);
            
        } else {
            // Private chat (Inbox) - show s.whatsapp.net format
            if (fromMe) {
                // Owner in inbox - show bot's s.whatsapp.net
                const botPN = botNumber2.split('@')[0];
                return reply(`> *Your ID:* ${botPN}@s.whatsapp.net`);
            } else {
                // Others in inbox - convert LID to s.whatsapp.net
                let senderPN = sender.split('@')[0];
                
                if (sender.includes('@lid')) {
                    senderPN = await lidToPhone(conn, sender);
                }
                
                // Format as s.whatsapp.net only
                return reply(`> *Your ID:* ${senderPN}@s.whatsapp.net`);
            }
        }

    } catch (e) {
        console.error("ID Command Error:", e);
        return reply(`⚠️ Error: ${e.message}`);
    }
});

// UPDATED COMMAND: Get LID by typing number or mention
cmd({
    pattern: "getlid",
    alias: ["lidonly", "lid", "mylid"],  
    desc: "Get LID by providing a phone number, mentioning someone, or for yourself",
    react: "🆔",
    category: "utility",
    filename: __filename,
}, async (conn, mek, m, { 
    from, isGroup, reply, sender, fromMe, botNumber2, mentionUser, q
}) => {
    try {
        let targetJid = "";

        // Case 1: Agar text me direct number diya gaya ho (.lid 923259158***)
        if (q && q.trim()) {
            let cleanNumber = q.replace(/[^0-9]/g, ''); // Sirf digits nikalne ke liye
            if (cleanNumber.length >= 10) {
                targetJid = `${cleanNumber}@s.whatsapp.net`;
            } else {
                return reply("⚠️ *Invalid number format.* Please provide a complete number with country code.");
            }
        }
        // Case 2: Agar kisi ko mention kiya gaya ho
        else if (mentionUser && mentionUser.length > 0) {
            targetJid = mentionUser[0];
        }

        // Agar target mil gaya (Number ya Mention ke zariye)
        if (targetJid) {
            try {
                // WhatsApp server/cache se check karna ke is number ka LID kya hai
                const lidMapping = await conn.signalRepository.lidMapping.getLIDForPN(targetJid.split('@')[0]);
                if (lidMapping) {
                    return reply(`> *Number:* ${targetJid.split('@')[0]}\n> *LID:* ${lidMapping}`);
                } else {
                    // Agar direct mapping nahi mili, to fallback query user format check karega
                    if (targetJid.includes('@lid')) {
                        return reply(`> *LID:* ${targetJid}`);
                    }
                    return reply(`❌ Is number ki LID database/cache me nahi mili. Ya to ye number chat me active nahi hai ya system me store nahi hai.`);
                }
            } catch (err) {
                return reply(`❌ LID fetch karne me masla aya. User shayad setup nahi hai.`);
            }
        }

        // Case 3: Default (Agar khali .lid likha ho to khud ka return kare)
        if (isGroup) {
            if (sender.includes('@lid')) {
                return reply(`> *Your LID:* ${sender}`);
            } else {
                return reply(`⚠️ You don't have a LID format in this chat.`);
            }
        } else {
            if (fromMe) {
                if (botNumber2.includes('@lid')) {
                    return reply(`> *Bot LID:* ${botNumber2}`);
                } else {
                    return reply(`> *Bot Number:* ${botNumber2}`);
                }
            } else {
                if (sender.includes('@lid')) {
                    return reply(`> *Your LID:* ${sender}`);
                } else {
                    return reply(`⚠️ You don't have a LID format. Your current ID: ${sender}`);
                }
            }
        }

    } catch (e) {
        console.error("GetLID Command Error:", e);
        return reply(`⚠️ Error: ${e.message}`);
    }
});
          
