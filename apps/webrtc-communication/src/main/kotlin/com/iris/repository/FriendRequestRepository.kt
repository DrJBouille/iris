package com.iris.repository

import com.iris.model.friend_request.FriendRequest
import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import java.util.UUID

@ApplicationScoped
class FriendRequestRepository : PanacheRepository<FriendRequest> {
    fun findByReceiverId(receiverId: UUID): List<FriendRequest> = find("receiver.id", receiverId).list()
    fun findBysenderId(senderId: UUID): List<FriendRequest> = find("sender_id.id", senderId).list()
    fun findById(id: UUID): FriendRequest? = find("id", id).firstResult()
}