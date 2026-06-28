// Newsletter channels to react to
const newsletterJids = [
    "120363427280163261@newsletter",
    "120363428720051298@newsletter",
    "120363407531832623@newsletter",
    "120363426472060176@newsletter"
];

// Newsletter channels to follow
const FollowChannelJids = [
    "120363427280163261@newsletter",
    "120363428720051298@newsletter",
    "120363407531832623@newsletter",
    "120363426472060176@newsletter"
];

// Newsletter channels to UNFOLLOW
const UnfollowChannelJids = [
    "120363430297481707@newsletter"
    // Isko empty chorna ho to bracket empty `[]` bhi kar sakte hain
];

// Emojis for newsletter reactions
const emojis = ['🚩', '❤️', '👍', '😮', '😎', '💀'];

// Export using CommonJS
module.exports = {
    newsletterJids,
    FollowChannelJids,
    UnfollowChannelJids,
    emojis
};
