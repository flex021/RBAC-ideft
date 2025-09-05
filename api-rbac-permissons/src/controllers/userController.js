import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { MOCK_USERS_LEVEL_1 } from '~/models/mockDatabase-lv-1'
import { MOCK_USERS_LEVEL_2 } from '~/models/mockDatabase-lv-2'
import { MOCK_USERS_LEVEL_3 } from '~/models/mockDatabase-lv-3'
import { ACCESS_TOKEN_SECRET_SIGNATURE, JwtProvider, REFRESH_TOKEN_SECRET_SIGNATURE } from '~/providers/JwtProvider'


const login = async (req, res) => {
  try {
    if (req.body.email !== MOCK_USERS_LEVEL_3.EMAIL || req.body.password !== MOCK_USERS_LEVEL_3.PASSWORD) {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'Your email or password is incorrect!' })
      return
    }
    const userInfo = {
      id: MOCK_USERS_LEVEL_3.ID,
      email: MOCK_USERS_LEVEL_3.EMAIL,
      role: MOCK_USERS_LEVEL_3.ROLES
    }

    const accessToken = await JwtProvider.generateToken(
      userInfo,
      ACCESS_TOKEN_SECRET_SIGNATURE,
      '1h'
    )

    const refreshToken = await JwtProvider.generateToken(
      userInfo,
      REFRESH_TOKEN_SECRET_SIGNATURE,
      '14 days'
    )

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.status(StatusCodes.OK).json({
      ...userInfo,
      accessToken,
      refreshToken
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')

    res.status(StatusCodes.OK).json({ message: 'Logout API success!' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const refreshToken = async (req, res) => {
  try {
    const refreshTokenFromCookie = req.cookies?.refreshToken

    const refreshTokenFromBody = req.body?.refreshToken

    const refreshTokenDecoded = await JwtProvider.veryfyToken(
      // refreshTokenFromCookie,
      refreshTokenFromBody,
      REFRESH_TOKEN_SECRET_SIGNATURE
    )
    const userInfo = {
      id: refreshTokenDecoded.id,
      email: refreshTokenDecoded.email,
      role: refreshTokenDecoded.role
    }

    const accessToken = await JwtProvider.generateToken(
      userInfo,
      ACCESS_TOKEN_SECRET_SIGNATURE,
      5
    )
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.status(StatusCodes.OK).json({ accessToken })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Refresh Token API failed!' })
  }
}

export const userController = {
  login,
  logout,
  refreshToken
}
