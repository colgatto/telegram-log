module.exports = {
    default: {
        text:     `{{emojiType}}{{projectName}}\n[{{date}}]\nCODE: {{code}}\n{{text}}`,
        html:     `{{emojiType}}{{projectName}}\n[{{date}}]\nCODE: {{code}}\n{{text}}`,
        markdown: `{{emojiType}}{{projectName}}\n[{{date}}]\nCODE: {{code}}\n{{text}}`
    },
    minimal: {
        text:     `{{emojiType}}{{text}}`,
        html:     `{{emojiType}}{{text}}`,
        markdown: `{{emojiType}}{{text}}`
    }
}
