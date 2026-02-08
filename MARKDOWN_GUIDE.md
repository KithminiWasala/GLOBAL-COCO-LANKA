# Markdown Guide 📝

## 🛠️ How to Create and Use in VS Code

1.  **Create a file:** Right-click in the file explorer -> New File -> `filename.md`.
2.  **Write content:** Use the syntax guide below.
3.  **Preview:** Press `Ctrl + Shift + V` to open the preview, or click the "Open Preview to the Side" icon in the top right.

---

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. Created by John Gruber in 2004, Markdown is now one of the world’s most popular markup languages.

## 1. Headers

Use `#` for headers. The number of `#` determines the header level.

```markdown
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header
```

## 2. Text Formatting

- **Bold**: Use `**text**` or `__text__`
- *Italic*: Use `*text*` or `_text_`
- ~~Strikethrough~~: Use `~~text~~`
- `Inline Code`: Use backticks `` `text` ``

## 3. Lists

### Unordered List
Use `-`, `+`, or `*`.

```markdown
- Item 1
- Item 2
  - Sub-item A
  - Sub-item B
```

### Ordered List
Use numbers followed by a period.

```markdown
1. First item
2. Second item
3. Third item
```

## 4. Links and Images

### Links
`[Link Text](URL)`

Example: `[Global Coco Lanka](https://global-coco-lanka.vercel.app/)`

### Images
`![Alt Text](Image URL)`

Example: `![Logo](/path/to/logo.png)`

## 5. Code Blocks

Use triple backticks for code blocks. You can specify the language for syntax highlighting.

```javascript
function greet(name) {
  console.log("Hello, " + name);
}
```

## 6. Blockquotes

Use `>` for blockquotes.

> This is a blockquote.
> It can span multiple lines.

## 7. Horizontal Rule

Use three or more dashes, asterisks, or underscores.

```markdown
---
***
___
```

## 8. Tables

Create tables using pipes `|` and hyphens `-`.

```markdown
| Feature | Status |
| :--- | :--- |
| Search | ✅ Done |
| Cart | 🚧 WIP |
| Auth | ❌ To Do |
```

---

## Example for Your Project (`README.md`)

Here is an example structure for your `README.md`:

```markdown
# Project Name

Brief description of the project.

## Features

- Feature 1
- Feature 2

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/user/repo.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Run the development server:

```bash
npm run dev
```
```
