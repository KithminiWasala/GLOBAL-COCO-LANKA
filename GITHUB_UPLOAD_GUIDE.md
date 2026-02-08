# How to Upload to GitHub 🚀

Since your project is already connected to GitHub, follow these 3 simple steps whenever you make changes.

## 1. Check Status
First, see which files have been changed.
```bash
git status
```
*   **Red files:** Changed but not ready to commit.
*   **Green files:** Ready to commit.

## 2. strict Add & Commit
Prepare your changes and give them a name (message).
```bash
# Add all changes
git add .

# Save them with a message
git commit -m "Describe your changes here"
```
*Example:* `git commit -m "Updated home page design"`

## 3. Push to GitHub
Send your saved changes to the cloud.
```bash
git push
```
*   This uploads your code to the `main` branch on GitHub.

---

## 💡 Quick Cheat Sheet

| Command | Description |
| :--- | :--- |
| `git status` | Check what changed |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Save changes |
| `git push` | Upload to GitHub |
| `git pull` | Download new changes |

---

### ✅ Current Status
I ran `git status` for you, and your project is currently **Clean and Up-to-Date**.
You don't need to upload anything right now! But use this guide next time you make edits.
