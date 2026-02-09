package com.iris.service

import jakarta.inject.Singleton
import jakarta.websocket.Session
import java.util.concurrent.ConcurrentHashMap

@Singleton
class SignalingSessionManager {

    private val sessions = ConcurrentHashMap<String, Session>()
    private val userIdBySession = ConcurrentHashMap<Session, String>()

    fun addSession(userId: String, session: Session) {
        sessions[userId] = session
        userIdBySession[session] = userId
    }

    fun removeSession(session: Session) {
        val userId = userIdBySession.remove(session)
        if (userId != null) {
            sessions.remove(userId)
        }
    }

    fun sendToUser(userId: String, message: String): Boolean {
        val session = sessions[userId]
        return if (session != null && session.isOpen) {
            try {
                session.asyncRemote.sendText(message)
                true
            } catch (e: Exception) {
                e.printStackTrace()
                false
            }
        } else {
            false
        }
    }

    fun getUserId(session: Session): String? {
        return userIdBySession[session]
    }
}