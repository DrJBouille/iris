package com.iris.service

import com.iris.model.user.IrisUser
import com.iris.repository.UserRepository
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.persistence.PersistenceException
import jakarta.transaction.Transactional
import org.eclipse.microprofile.jwt.JsonWebToken
import java.util.UUID

@ApplicationScoped
class UserService {
    @Inject
    private lateinit var userRepository: UserRepository

    @Inject
    lateinit var jwt: JsonWebToken

    @Transactional
    fun createUserFromToken(): IrisUser {
        val keycloakId = jwt.subject

        val existingUser = getByKeycloakId(keycloakId)
        if (existingUser != null) return existingUser

        val username = jwt.getClaim<String>("preferred_username")
        val email = jwt.getClaim<String>("email")

        val user = IrisUser().apply {
            this.keycloakId = keycloakId
            this.username = username
            this.email = email
        }

        try {
            userRepository.persist(user)
            return user
        } catch (e: PersistenceException) {
            return userRepository.findByKeycloakId(keycloakId)!!
        }
    }

    @Transactional
    fun remove(id: UUID) = userRepository.deleteById(id)

    fun getUsers() = userRepository.findAll().list<IrisUser>()

    fun getUser(id: UUID) = userRepository.findById(id)

    fun getByKeycloakId(keyCloakId: String) = userRepository.findByKeycloakId(keyCloakId)

    fun getByJWTSubject() = userRepository.findByKeycloakId(jwt.subject)

    fun existsByUsername(username: String) = userRepository.existsByUsername(username)
}