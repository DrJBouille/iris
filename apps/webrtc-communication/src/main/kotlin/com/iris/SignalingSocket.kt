package com.iris

import com.iris.service.SignalingSessionManager
import com.iris.service.UserService
import com.nimbusds.jwt.JWTParser
import jakarta.inject.Inject
import jakarta.json.Json
import jakarta.websocket.*
import jakarta.websocket.server.PathParam
import jakarta.websocket.server.ServerEndpoint
import java.io.StringReader

@ServerEndpoint("/signal/{token}")
class SignalingSocket {

    companion object {
        lateinit var userService: UserService
        lateinit var sessionManager: SignalingSessionManager
    }

    @Inject
    fun init(userService: UserService, sessionManager: SignalingSessionManager) {
        SignalingSocket.userService = userService
        SignalingSocket.sessionManager = sessionManager
    }

    @OnOpen
    fun onOpen(session: Session, @PathParam("token") token: String) {
        try {
            val jwt = JWTParser.parse(token).jwtClaimsSet
            val username = jwt.getClaim("preferred_username") as? String ?: jwt.subject

            sessionManager.addSession(username, session)

            session.asyncRemote.sendText("""{"type":"connected","userId":"$username"}""")
        } catch (e: Exception) {
            e.printStackTrace()
            session.close()
        }
    }

    @OnMessage
    fun onMessage(message: String, session: Session) {
        val json = Json.createReader(StringReader(message)).readObject()
        val to = json.getString("to", null) ?: return
        sessionManager.sendToUser(to, message)
    }

    @OnClose
    fun onClose(session: Session) {
        sessionManager.removeSession(session)
    }

    @OnError
    fun onError(session: Session?, t: Throwable) {
        t.printStackTrace()
    }
}
