import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Author from "../models/authors.js"
import { generateJWT } from "../auth/jwt.js"

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_URI,
  },
  async (_, __, profile, passportNext) => {
    try {
      const { email, given_name, family_name, sub } = profile._json
      const user = await Author.findOne({ email })
      if (user) {
        const accessToken = await createAccessToken({
          _id: user._id,
          role: user.role,
        })
        passportNext(null, { accessToken })
      } else {
        const newUser = new Author({
          name: given_name,
          lastName: family_name,
          email,
          googleId: sub,
        })
        await newUser.save()
        const accessToken = await generateJWT({
            lastName: newUser.lastName,
            email: newUser.email,
          })
        passportNext(null, { accessToken })
      }
    } catch (error) {
      passportNext(error)
    }
  }
)

export default googleStrategy
