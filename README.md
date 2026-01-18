# Global Coco Lanka 🥥

"From Tree to Table — Pure Coconut Power"

A modern e-commerce platform for premium Ceylon coconut products, featuring a "Ceylon Coconut Excellence" theme with a clean, tropical aesthetic.

## 🚀 Live Demo

**[Visit the Live Website](https://global-coco-lanka.vercel.app/)**
*(Note: If this link doesn't work, check your Vercel dashboard for the exact URL assigned to your project)*

## 🛠️ Technologies Used

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Shadcn UI
- **Backend:** Node.js, Express, MongoDB (Atlas)
- **Deployment:** Vercel (Monorepo deployment)

## 📦 Project Structure

- `frontend/`: React application (Vite)
- `backend/`: Express server (Node.js)

## 🏃‍♂️ Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/KithminiWasala/GLOBAL-COCO-LANKA.git
    cd GLOBAL-COCO-LANKA
    ```

2.  **Install dependencies:**
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the `backend/` directory:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4.  **Run the servers:**
    open two terminals:
    ```bash
    # Terminal 1: Backend
    cd backend
    npm run dev

    # Terminal 2: Frontend
    cd frontend
    npm run dev
    ```

## 🚀 Deployment

This project is configured for **Vercel**.
1.  Import the repo to Vercel.
2.  Add `MONGO_URI` and `JWT_SECRET` environment variables.
3.  Deploy!
