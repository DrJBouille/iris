package com.iris.model.friend_request

import com.iris.model.user.IrisUser
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "friend_request")
class FriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: UUID? = null

    @ManyToOne
    @JoinColumn(name = "sender_id")
    lateinit var sender: IrisUser

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    lateinit var receiver: IrisUser

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var status: Status = Status.PENDING

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now()
}