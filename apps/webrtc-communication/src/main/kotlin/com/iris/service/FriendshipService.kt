package com.iris.service

import com.iris.model.friendship.Friendship
import com.iris.model.user.IrisUser
import com.iris.repository.FriendshipRepository
import com.iris.repository.UserRepository
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.transaction.Transactional
import java.util.UUID

@ApplicationScoped
class FriendshipService {
    @Inject
    private lateinit var friendshipRepository: FriendshipRepository

    @Transactional
    fun createFriendship(sender: IrisUser, receiver: IrisUser): Friendship {
        val friendship = Friendship().apply {
            this.sender = sender
            this.receiver = receiver
        }

        friendshipRepository.persist(friendship)
        return friendship
    }

    fun getFriends(id: UUID) = friendshipRepository.findBySenderAndReceiver(id)

    fun existsById(id: UUID) = friendshipRepository.existsById(id)
}