package com.iris.service

import com.iris.model.friend_request.FriendRequest
import com.iris.model.friend_request.Status
import com.iris.model.user.IrisUser
import com.iris.repository.FriendRequestRepository
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.transaction.Transactional
import java.util.UUID

@ApplicationScoped
class FriendRequestService {
    @Inject
    private lateinit var friendRequestRepository: FriendRequestRepository

    @Inject
    private lateinit var userService: UserService

    @Transactional
    fun sendFriendRequest(receiver: IrisUser): FriendRequest? {
        val sender = userService.getByJWTSubject() ?: return null

        val friendRequest = FriendRequest().apply {
            this.sender = sender
            this.receiver = receiver
        }

        friendRequestRepository.persist(friendRequest)
        return friendRequest
    }

    @Transactional
    fun changeFriendRequestStatus(status: Status, friendRequest: FriendRequest): FriendRequest {
        val friendRequest = FriendRequest().apply {
            this.status = status
        }

        friendRequestRepository.persist(friendRequest)
        return friendRequest
    }

    fun getFriendRequest(id: UUID) = friendRequestRepository.findById(id)

    fun getReceivedFriendRequests(receiverId: UUID): List<FriendRequest> = friendRequestRepository.findByReceiverId(receiverId)

    fun getSendFriendRequests(senderId: UUID): List<FriendRequest> = friendRequestRepository.findBysenderId(senderId)
}