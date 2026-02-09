package com.iris.model.friendship

import com.iris.model.user.IrisUser
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "friendship")
class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: UUID? = null

    @ManyToOne
    @JoinColumn(name = "sender_id")
    lateinit var sender: IrisUser

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    lateinit var receiver: IrisUser

    var createdAt: LocalDateTime = LocalDateTime.now()
}