package com.iris.repository

import com.iris.model.friendship.Friendship
import com.iris.model.user.IrisUser
import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import java.util.UUID

@ApplicationScoped
class FriendshipRepository : PanacheRepository<Friendship> {
  fun findFriends(userId: UUID): List<IrisUser> {
    val friendships = find("sender.id = ?1 OR receiver.id = ?1", userId).list<Friendship>()

    return friendships.map { friendship ->
      if (friendship.sender.id == userId) friendship.receiver
      else friendship.sender
    }
  }
    fun existsById(senderId: UUID, receiverId: UUID): Boolean = count("sender.id = ?1 AND receiver.id = ?2 OR sender.id = ?2 AND receiver.id = ?1", senderId, receiverId) > 0
}
