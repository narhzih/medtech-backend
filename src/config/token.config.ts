export const cookieConfig = {
    name: 'Auth',
    info: {
        httpOnly: true, // prevents JavaScript access
        secure: process.env.NODE_ENV === 'production', // use HTTPS in prod
        sameSite: 'strict' as const,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    }
}
