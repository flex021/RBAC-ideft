import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { MOCK_USERS_LEVEL_1 } from '~/models/mockDatabase-lv-1'
import { MOCK_USERS_LEVEL_2 } from '~/models/mockDatabase-lv-2'
import { MOCK_USERS_LEVEL_3,
  MOCK_USERS_LEVEL_3_ADMIN,
  MOCK_USERS_LEVEL_3_MODERATOR,
  MOCK_USERS_LEVEL_3_CLIENT
} from '~/models/mockDatabase-lv-3'
import { ACCESS_TOKEN_SECRET_SIGNATURE, JwtProvider, REFRESH_TOKEN_SECRET_SIGNATURE } from '~/providers/JwtProvider'


const DEMO_USERS = [
  MOCK_USERS_LEVEL_3_ADMIN,
  MOCK_USERS_LEVEL_3_MODERATOR,
  MOCK_USERS_LEVEL_3_CLIENT
]

const findUserByCredentials = (email, password) => {
  return DEMO_USERS.find(user =>
    user.EMAIL === email && user.PASSWORD === password
  )
}

const createUserInfo = (user) => ({
  id: user.ID,
  email: user.EMAIL,
  role: user.ROLES
})

const createCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: ms('14 days')
})

const generateAndSetTokens = async (res, userInfo) => {
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

  const cookieOptions = createCookieOptions()

  res.cookie('accessToken', accessToken, cookieOptions)
  res.cookie('refreshToken', refreshToken, cookieOptions)

  return { accessToken, refreshToken }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const foundUser = findUserByCredentials(email, password)

    if (!foundUser) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'Your email or password is incorrect!'
      })
    }

    const userInfo = createUserInfo(foundUser)

    const { accessToken, refreshToken } = await generateAndSetTokens(res, userInfo)

    res.status(StatusCodes.OK).json({
      ...userInfo,
      accessToken,
      refreshToken
    })

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error'
    })
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
      '1h'
    )

    const cookieOptions = createCookieOptions()
    res.cookie('accessToken', accessToken, cookieOptions)

    res.status(StatusCodes.OK).json({ accessToken })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Refresh Token API failed!'
    })
  }
}

export const userController = {
  login,
  logout,
  refreshToken
}
