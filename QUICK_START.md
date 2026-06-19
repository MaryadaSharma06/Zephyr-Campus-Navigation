# 🎯 Zephyr Backend - Quick Start (5 Minutes)

## What Changed?

Previously: Anyone could login with any email/password (demo only)

**Now:** 
- ✅ Users MUST create account first
- ✅ Login validates against registered accounts
- ✅ Feedback saved with user information
- ✅ Accounts stored in database (JSON files)

---

## 🚀 Get Started in 3 Steps

### Step 1: Install (1 minute)
```bash
cd e:\Downloads\ZEPHYR-main\ZEPHYR-main
npm install
```

### Step 2: Start Server (30 seconds)
```bash
npm start
```

You'll see:
```
🚀 Zephyr Backend Server Running 🚀
📍 Server: http://localhost:5000
```

### Step 3: Test It (2 minutes)
1. Open: `login-signup.html`
2. Click "Sign Up"
3. Create account: 
   - Email: `test@gmail.com`
   - Password: `Test123456` (8+ chars, 1 uppercase, 1 number)
4. Click "Create Account"
5. Redirects to homepage ✅

---

## 🧪 Test Scenarios

### ✅ Scenario 1: New User Signup
```
Email: alice@example.com
Password: Alice123456
Result: Account created, logged in
```

### ❌ Scenario 2: Duplicate Email
```
Email: alice@example.com (same as above)
Password: Alice123456
Result: Error - "Email already registered"
```

### ✅ Scenario 3: Correct Login
```
Email: alice@example.com
Password: Alice123456
Result: Logged in successfully
```

### ❌ Scenario 4: Wrong Password
```
Email: alice@example.com
Password: WrongPassword123
Result: Error - "Incorrect password"
```

### ❌ Scenario 5: Non-existent User
```
Email: bob@example.com
Password: Password123
Result: Error - "Account not found. Please sign up first"
```

---

## 📊 View Your Data

After testing, check what was saved:

### View Users:
```
http://localhost:5000/api/users
```
Shows all registered accounts

### View Feedback:
```
http://localhost:5000/api/feedback
```
Shows all feedback submissions

### View User's Feedback:
```
http://localhost:5000/api/feedback/user/alice@example.com
```
Shows feedback from specific user

---

## 🎨 How It Works

### Before (❌ Demo Only):
```
User enters ANY email/password → Logged in (no validation)
```

### After (✅ Secure):
```
Signup: Create account (password validated) → Account stored
Login: Email exists? → Password matches? → Logged in
Feedback: Auto-save with user info
```

---

## 📁 Where Data is Stored

Two JSON files in your project folder:

**`users.json`** - All user accounts
```json
{
  "email": "alice@example.com",
  "firstName": "Alice",
  "password": "Alice123456",
  ...
}
```

**`feedback.json`** - All feedback
```json
{
  "email": "alice@example.com",
  "message": "Great app!",
  ...
}
```

---

## ⚠️ Stop Server

When done testing:
```bash
Ctrl + C
```

Restart server:
```bash
npm start
```

---

## 🆘 Not Working?

**Backend not starting?**
- Make sure in correct folder: `e:\Downloads\ZEPHYR-main\ZEPHYR-main\`
- Run: `npm install` first
- Try: `node server.js`

**Can't login with new account?**
- Check backend is running
- Check browser console for errors (F12)
- Verify account was created (check `users.json`)

**Feedback not saving?**
- Make sure you're logged in
- Backend must be running
- Check email is correct

**Port error?**
- Port 5000 already in use
- Close other apps or wait a minute

---

## 📚 Full Docs

For detailed information, see: `BACKEND_SETUP.md`

---

## 🎓 What You Learned

✅ How backend validates authentication
✅ How to prevent duplicate accounts
✅ How to link feedback to users
✅ How to store data persistently
✅ How to build simple APIs

**This is production-grade thinking!** In real apps, you'd use databases instead of JSON files, but the concepts are the same.

---

## 🚀 Ready?

1. Run: `npm start`
2. Open: `login-signup.html`
3. Test signup/login
4. Submit feedback
5. Check data at: `http://localhost:5000/api/users`

**Let's go!** 🎉
