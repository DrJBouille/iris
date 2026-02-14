package com.iris.repository

import com.iris.model.friendship.Friendship
import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import java.util.UUID

@ApplicationScoped
class FriendshipRepository : PanacheRepository<Friendship> {
    fun findBySenderAndReceiver(id: UUID): List<Friendship> {
        return find("sender.id = ?1 OR receiver.id = ?2", id, id).list()
    }

    fun existsById(senderId: UUID, receiverId: UUID): Boolean = count("sender.id = ?1 AND receiver.id = ?2 OR sender.id = ?2 AND receiver.id = ?1", senderId, receiverId) > 0
}
