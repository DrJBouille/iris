package com.iris

import jakarta.websocket.*
import jakarta.websocket.server.PathParam
import jakarta.websocket.server.ServerEndpoint
import java.util.concurrent.ConcurrentHashMap

@ServerEndpoint("/message/{value}")
class MessagingSocket {
    companion object {
        private val userIdBySession = ConcurrentHashMap<Session, String>()
    }

    @OnOpen
    fun onOpen(session: Session, @PathParam("value") value: String) {
        println("OPEN $value")
        userIdBySession[session] = value
        session.asyncRemote.sendText("TEST")
    }

    @OnMessage
    fun onMessage(message: String, session: Session) {
        println("RECV $message")
        session.asyncRemote.sendText("ECHO $message")
    }

    @OnClose
    fun onClose(session: Session) {
        println("CLOSE")
        userIdBySession.remove(session)
    }

    @OnError
    fun onError(session: Session?, t: Throwable) {
        t.printStackTrace()
    }
}
