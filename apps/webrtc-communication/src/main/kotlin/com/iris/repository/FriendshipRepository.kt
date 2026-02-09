package com.iris.repository

import com.iris.model.friendship.Friendship
import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import java.util.UUID

@ApplicationScoped
class FriendshipRepository : PanacheRepository<Friendship> {
    fun findBySenderAndReceiver(id: UUID): List<Friendship> {
        return find("sender.id = ?1 and receiver.id = ?2", id, id).list()
    }

    fun existsById(id: UUID): Boolean = count("sender.id = ?1 and receiver.id = ?2", id, id) > 0
}