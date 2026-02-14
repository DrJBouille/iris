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

    @Inject
    private lateinit var friendshipService: FriendshipService

    @Transactional
    fun sendFriendRequest(receiver: IrisUser): FriendRequest? {
        val sender = userService.getByJWTSubject() ?: return null

        if (friendRequestRepository.existsPendingBetweenUsers(sender.id!!, receiver.id!!)) return null
        if (friendshipService.existsById(sender.id!!, receiver.id!!)) return null

        val friendRequest = FriendRequest().apply {
            this.sender = sender
            this.receiver = receiver
        }

        friendRequestRepository.persist(friendRequest)
        return friendRequest
    }

    @Transactional
    fun changeFriendRequestStatus(status: Status, friendRequest: FriendRequest): FriendRequest {
        friendRequest.status = status
        return friendRequest
    }

    fun getFriendRequest(id: UUID) = friendRequestRepository.findById(id)

    fun getReceivedFriendRequests(receiverId: UUID): List<FriendRequest> = friendRequestRepository.findByReceiverIdAndPending(receiverId)

    fun getSendFriendRequests(senderId: UUID): List<FriendRequest> = friendRequestRepository.findBySenderIdAndPending(senderId)
}
