import { StatusCodes } from 'http-status-codes'
import { ACCESS_TOKEN_SECRET_SIGNATURE, JwtProvider } from '~/providers/JwtProvider'

const isAuthorized = async (req, res, next) => {
  const accessTokenFromCookie = req.cookies?.accessToken

  if (!accessTokenFromCookie) {
    res.status(StatusCodes.UNAUTHORIZED).json( { message: 'Unauthorized! (Token not found!)' } )
    return
  }

  const accessTokenFromHeader = req.headers.authorization

  if (!accessTokenFromHeader) {
    res.status(StatusCodes.UNAUTHORIZED).json( { message: 'Unauthorized! (Token not found!)' } )
    return
  }

  try {
    const accessTokenDecoded = await JwtProvider.veryfyToken(
      // accessTokenFromCookie,
      accessTokenFromHeader.substring('Bearer '.length),
      ACCESS_TOKEN_SECRET_SIGNATURE
    )

    req.jwtDecoded = accessTokenDecoded

    next()
  } catch (error) {
    if (error.message?.includes('jwt expired')) {
      res.status(StatusCodes.GONE).json( { message: 'Need to refresh token!' } )
      return
    }
    res.status(StatusCodes.UNAUTHORIZED).json( { message: 'Unauthorized! Please Login.' } )

  }
}

export const authMiddleware = {
  isAuthorized
}
