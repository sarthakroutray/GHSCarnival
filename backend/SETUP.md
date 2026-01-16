# Backend Setup Instructions

## 1. Install Dependencies

```powershell
cd backend
pip install -r requirements.txt
```

## 2. Configure Environment

Create `backend/.env` from the example:

```powershell
cp .env.example .env
```

Edit `.env` and add:

```dotenv
# Database connection (from Supabase dashboard)
DATABASE_URL=postgresql://postgres.<ref>:<password>@aws-1-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.<ref>:<password>@aws-1-<region>.pooler.supabase.com:5432/postgres

# CORS origins
CORS_ORIGINS=http://localhost:5173

# Supabase JWT Secret (from Supabase Settings → API → JWT Secret)
SUPABASE_JWT_SECRET=your-jwt-secret-here
```

**Note:** Leave `SUPABASE_JWT_SECRET` empty for development mode (uses user IDs as tokens).

## 3. Generate Prisma Client

```powershell
cd backend
prisma generate
```

## 4. Run Database Migrations

```powershell
prisma migrate dev --name initial
```

## 5. Seed Database

```powershell
python app/db/seed.py
```

This creates:
- 5 sports (Box Cricket, Football, Basketball, Volleyball, Table Tennis)
- 1 super admin user
- 5 sport admin users (one per sport)
- Demo matches for each sport
- Welcome announcement

## 6. Start the Server

```powershell
# From backend directory
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Or from the app directory:
```powershell
cd app
python main.py
```

## 7. Test the API

Open: http://localhost:8000/docs (Swagger UI)

Test endpoints:
- Health: `GET /health`
- Sports: `GET /public/sports`
- Matches: `GET /public/matches`
- Live Stream: `GET /public/live-stream` (opens SSE connection)

Test admin endpoints:
- Get current user: `GET /auth/me` (requires Bearer token)
- List admin matches: `GET /admin/matches` (requires Bearer token)

## Development Mode Testing

Use seeded admin IDs as Bearer tokens:
- Super Admin: `demo-super-admin`
- Cricket Admin: `admin-box-cricket`

In Swagger UI or Postman:
1. Click "Authorize" button
2. Enter: `demo-super-admin`
3. Test protected endpoints

## Production Mode (with Supabase Auth)

1. Get JWT Secret from Supabase:
   - Dashboard → Settings → API → JWT Secret
2. Add to `.env`: `SUPABASE_JWT_SECRET=<your-secret>`
3. Frontend will get JWT from Supabase Auth
4. Pass JWT as Bearer token to backend
5. Backend verifies JWT signature automatically

## Troubleshooting

### "Module not found" errors
```powershell
pip install -r requirements.txt
prisma generate
```

### Database connection errors
- Check DATABASE_URL in `.env`
- Ensure Supabase project is active
- Check firewall/network settings

### "User not found" after JWT verification
- User must exist in database
- Create user with same ID as Supabase Auth user ID
- Or use seed script to create test users
