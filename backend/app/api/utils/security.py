from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.db.prisma import prisma

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = await prisma.user.find_unique(
        where={"id": token}
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user
