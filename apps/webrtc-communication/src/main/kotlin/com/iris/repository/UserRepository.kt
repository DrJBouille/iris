package com.iris.repository

import com.iris.model.user.IrisUser
import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import java.util.UUID

@ApplicationScoped
class UserRepository : PanacheRepository<IrisUser> {
    fun findByKeycloakId(keycloakId: String): IrisUser? = find("keycloakId", keycloakId).firstResult()
    fun findById(id: UUID): IrisUser? = find("id", id).firstResult()
    fun existsByUsername(username: String): Boolean = count("username", username) > 0
    fun deleteById(id: UUID): Boolean = delete("id", id) > 0

}