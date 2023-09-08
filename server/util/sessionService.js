const { Session, User } = require('../models')

const createSession = async (userId) => {
  const session = await Session.create({ userId })
  return session
}

const getSession = async (sid) => {
  try {
    const session = await Session.findByPk(sid, {
      attributes: ['sid', 'expires'],
      include: {
        model: User,
        attributes: ['name', 'email', 'id']
      }
    })
    return session.get({ plain: true })
  } catch (error) {
    console.log(error)
    return null
  }
}

const deleteSession = async (sid) => {
  try {
    const session = await Session.findOne({ where: { sid } })
    if (session) {
      await session.destroy()
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

const getAllUserSessions = async (userId) => {
  const sessions = await Session.findAll({ where: { userId } })
  if (sessions.length === 0) {
    return null
  }
  return sessions
}

module.exports = {
  createSession,
  getSession,
  deleteSession,
  getAllUserSessions
}
