# CitrusTrack-Tucumán

## Project Structure

This project consists of two main folders:

### backEnd
Node.js + Express backend application
- **Location**: `/backEnd`
- **Technology**: Node.js with Express v5.1.0
- **Port**: 3000 (configurable via PORT environment variable)
- **Routes**:
  - `GET /` - Welcome message
  - `GET /health` - Health check endpoint

**How to run:**
```bash
cd backEnd
npm install
npm start
```

### frontEnd
React + Vite frontend application
- **Location**: `/frontEnd`
- **Technology**: React v19.2.0 with Vite v7.2.2
- **Scripts**:
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run lint` - Run ESLint
  - `npm run preview` - Preview production build

**How to run:**
```bash
cd frontEnd
npm install
npm run dev
```