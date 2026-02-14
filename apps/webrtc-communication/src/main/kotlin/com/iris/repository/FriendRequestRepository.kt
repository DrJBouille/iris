package com.iris.repository

import com.iris.model.friend_request.FriendRequest
import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import java.util.UUID

@ApplicationScoped
class FriendRequestRepository : PanacheRepository<FriendRequest> {
    fun findByReceiverId(receiverId: UUID): List<FriendRequest> = find("receiver.id", receiverId).list()
    fun findByReceiverIdAndPending(receiverId: UUID): List<FriendRequest> = find("receiver.id = ?1 and status = PENDING", receiverId).list()
    fun findBySenderId(senderId: UUID): List<FriendRequest> = find("sender.id", senderId).list()
    fun findBySenderIdAndPending(senderId: UUID): List<FriendRequest> = find("sender.id = ?1 and status = PENDING", senderId).list()
    fun findById(id: UUID): FriendRequest? = find("id", id).firstResult()

    fun existsPendingBetweenUsers(senderId: UUID, receiverId: UUID): Boolean =
      count(
        "(sender.id = ?1 AND receiver.id = ?2 OR sender.id = ?2 AND receiver.id = ?1) AND status = PENDING",
        senderId,
        receiverId,
      ) > 0
}
