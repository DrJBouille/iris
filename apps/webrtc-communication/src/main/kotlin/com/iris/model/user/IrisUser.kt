package com.iris.model.user

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "iris_user")
class IrisUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: UUID? = null

    @Column(name = "keycloak_id", unique = true, nullable = false)
    lateinit var keycloakId: String

    @Column(length = 24, nullable = false)
    lateinit var username: String

    @Column(length = 255, nullable = false)
    lateinit var email: String

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now()
}